// Se crea la imagen SVG
const svg = d3.select("svg"),
	width = svg.attr("width"),
	height = svg.attr("height"),
	path = d3.geoPath(),
	data = d3.map(),
	worldmap = "https://raw.githubusercontent.com/MiguelCabezasPuerto/PAIPO/master/world.geojson",
	patrimonies = "https://raw.githubusercontent.com/MiguelCabezasPuerto/PAIPO/master/UNESCO_patrimonio.csv";

let centered, world;

// tipo de escala y proyeccion geografica
const projection = d3.geoRobinson()
	.scale(130)
	.translate([width / 2, height / 2]);

// Define la escala de color
const colorScale = d3.scaleThreshold()
	.domain([10, 20, 30, 40, 50])
	.range(["#BFD4FF","#72A0FF", "#5089FF", "#366CFF", "#0347CE", "#00308F"]);

const tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

// Se carga el geojson y los datos
d3.queue()
	.defer(d3.json, worldmap)
	.defer(d3.csv, patrimonies, function(d) {
		data.set(d.code, +d.pop);
	})
	.await(ready);

// Añade ala imagen el fondo y a este el evento cuando se pulsa sobre él
svg.append("rect")
  .attr("class", "background")
	.attr("width", width)
	.attr("height", height)
	.on("click", click);

// Dibujo del mapa

function ready(error, topo) {
	// topo son los datos recibidos en la funcion d3.queue function (geojson)
	// data almacena los datos procedentes del nº de patrimonios por país (fichero csv)

	// se define la función  a realiza cuando se pasa el ratón por encima de un país 
	let mouseOver = function(d) {
		d3.selectAll(".Country")
			.transition()
			.duration(200)
			.style("opacity", .5)
			.style("stroke", "transparent");
		d3.select(this)
			.transition()
			.duration(200)
			.style("opacity", 1)
			.style("stroke", "black");
		tooltip.style("left", (d3.event.pageX + 15) + "px")
			.style("top", (d3.event.pageY - 28) + "px")
			.transition().duration(400)
			.style("opacity", 1)
			.text(d.properties.name + ': ' + d.total  + ' assets');
	}

	let mouseLeave = function() {
		d3.selectAll(".Country")
			.transition()
			.duration(200)
			.style("opacity", 1)
			.style("stroke", "transparent");
		tooltip.transition().duration(300)
			.style("opacity", 0);
	}

	// Se dibuja el mapa añadiendolo al SVG
	world = svg.append("g")
    .attr("class", "world");
	world.selectAll("path")
		.data(topo.features)
		.enter()
		.append("path")
		// esta funcion de D3 adapta el mapa del geojson para su presentacion con la proyeccion previamente definida
		.attr("d", d3.geoPath().projection(projection))

		//devuelve el nombre del pais
		.attr("data-name", function(d) {
			return d.properties.name
		})

		// busca en los datos por el id del pais, obtiene el nº de patrimonios vinculados y le asigna un color segun la escala definida
		.attr("fill", function(d) {
			d.total = data.get(d.id) || 0;
			return colorScale(d.total);
		})

		.style("stroke", "transparent")
		.attr("class", function(d) {
			return "Country"
		})
		.attr("id", function(d) {
			return d.id
		})
		.style("opacity", 1)
		//añade los eventos al mapa cuando se pasa el raton por encima (entrada y salida) y cuando se hace click sobre él
		.on("mouseover", mouseOver)
		.on("mouseleave", mouseLeave)
		.on("click", click);
  
	// Da tamaño al cuadro de leyenda
	const x = d3.scaleLinear()
		.domain([0, 55])
		.rangeRound([0, 600]);

	const legend = svg.append("g")
		.attr("id", "legend");

	const legend_entry = legend.selectAll("g.legend")
		.data(colorScale.range().map(function(d) {
			d = colorScale.invertExtent(d);
			if (d[0] == null) d[0] = x.domain()[0];
			if (d[1] == null) d[1] = x.domain()[1];
			return d;
		}))
		.enter().append("g")
		.attr("class", "legend_entry");

	const ls_w = 20, // separacion horizontal entre caracteres de leyenda
		ls_h = 20;   // separacion entre lineas de la leyenda

	// al elemento leyenda se añade unos rectángulos que representan cada cuadro de la layenda y les asigna un color, un tamaño y una posición
	legend_entry.append("rect")
		.attr("x", 10)
		.attr("y", function(d, i) {
			return height - (i * ls_h) - 2 * ls_h;
		})
		.attr("width", ls_w)
		.attr("height", ls_h)
		.style("fill", function(d) {
			return colorScale(d[0]);
		})
		.style("opacity", 0.8);

	legend_entry.append("text")
		.attr("x", 40)
		.attr("y", function(d, i) {
			return height - (i * ls_h) - ls_h - 5;
		})
		.text(function(d, i) {
			if (i === 0) return "< " + d[1];
			if (d[0]>=50) return d[0] + "+" ;
			return d[0]  + " - " + d[1] ;
		});

	legend.append("text").attr("x", 10).attr("y", 300).text("No. heritage assets");

}

// Crea la funcion para cuando se hace click sobre el mapa o el fondo. Lo que se hace es coger el centro de cada pais definido en el geojson 
// y aplicarle una trasnformacion para hacer zoom sobre dicho pais pulsado
function click(d) {
  var x, y, k;



  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = -(centroid[0] * 6);
    y = (centroid[1] * 6);
    k = 3;
    centered = d;
    //si el ID del pais seleccionado es el de España, carga un nuevo HTML
    if(d.id === "ESP"){
  	setTimeout( function (){ window.location.href = "espana-unesco.html"; }, 450);
  }
  } else {
    x = 0;
    y = 0;
    k = 1;
    centered = null;
  }

  world.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  world.transition()
      .duration(750)
      .attr("transform", "translate(" + x + "," + y + ") scale(" + k + ")" );
  
}