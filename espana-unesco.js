const svg = d3.select("svg"),
	width = svg.attr("width"),
	height = svg.attr("height"),
	path = d3.geoPath(),
	data = d3.map(),
	spainmap = "https://raw.githubusercontent.com/MiguelCabezasPuerto/PAIPO/master/provincias-espanolas.geojson",
	patrimonies = "https://raw.githubusercontent.com/MiguelCabezasPuerto/PAIPO/master/UNESCO_patrimonio-espana.csv";

let centered, spain;

const projection = d3.geoRobinson()
	.scale(1800)
	.translate([750 , 1650 ]);

const colorScale = d3.scaleThreshold()
	.domain([1, 2, 3, 4,5])
	.range(["#BFD4FF","#72A0FF", "#5089FF", "#366CFF", "#0347CE", "#00308F"]);


const tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

d3.queue()
	.defer(d3.json, spainmap)
	.defer(d3.csv, patrimonies, function(d) {
		data.set(d.code, + d.pop);
	})
	.await(ready);

svg.append("rect")
  .attr("class", "background")
	.attr("width", width)
	.attr("height", height)
	.on("click", click);






function ready(error, topo) {

	let mouseOver = function(d) {
		d3.selectAll(".Province")
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
			.text(d.properties.provincia + ': ' + d.total  + ' assets');
	}

	let mouseLeave = function() {
		d3.selectAll(".Province")
			.transition()
			.duration(200)
			.style("opacity", 1)
			.style("stroke", "transparent");
		tooltip.transition().duration(300)
			.style("opacity", 0);
	}

	spain = svg.append("g")
    .attr("class", "province");
	spain.selectAll("path")
		.data(topo.features)
		.enter()
		.append("path")
		.attr("d", d3.geoPath().projection(projection))

		
		.attr("data-name", function(d) {
			return d.properties.provincia
		})

		.attr("fill", function(d) {
			if(d.properties.codigo === "01"){
				d.total = data.$ALV;
			}if(d.properties.codigo === "02"){
				d.total = data.$ALB;
			}if(d.properties.codigo === "03"){
				d.total = data.$ALC;
			}if(d.properties.codigo === "04"){
				d.total = data.$ALM;
			}if(d.properties.codigo === "05"){
				d.total = data.$AV;
			}if(d.properties.codigo === "06"){
				d.total = data.$BAD;
			}if(d.properties.codigo === "07"){
				d.total = data.$IB;
			}if(d.properties.codigo === "08"){
				d.total = data.$BAR;
			}if(d.properties.codigo === "09"){
				d.total = data.$BU;
			}if(d.properties.codigo === "10"){
				d.total = data.$CAC;
			}if(d.properties.codigo === "11"){
				d.total = data.$CAD;
			}if(d.properties.codigo === "12"){
				d.total = data.$CAS;
			}if(d.properties.codigo === "13"){
				d.total = data.$CR;
			}if(d.properties.codigo === "14"){
				d.total = data.$COR;
			}if(d.properties.codigo === "15"){
				d.total = data.$AC;
			}if(d.properties.codigo === "16"){
				d.total = data.$CUE;
			}if(d.properties.codigo === "17"){
				d.total = data.$GER;
			}if(d.properties.codigo === "18"){
				d.total = data.$GRA;
			}if(d.properties.codigo === "19"){
				d.total = data.$GUA;
			}if(d.properties.codigo === "20"){
				d.total = data.$GUI;
			}if(d.properties.codigo === "21"){
				d.total = data.$HUE;
			}if(d.properties.codigo === "22"){
				d.total = data.$HU;
			}if(d.properties.codigo === "23"){
				d.total = data.$JA;
			}if(d.properties.codigo === "24"){
				d.total = data.$LE;
			}if(d.properties.codigo === "25"){
				d.total = data.$LER;
			}if(d.properties.codigo === "26"){
				d.total = data.$LR;
			}if(d.properties.codigo === "27"){
				d.total = data.$LU;
			}if(d.properties.codigo === "28"){
				d.total = data.$MAD;
			}if(d.properties.codigo === "29"){
				d.total = data.$MAL;
			}if(d.properties.codigo === "30"){
				d.total = data.$MU;
			}if(d.properties.codigo === "31"){
				d.total = data.$NA;
			}if(d.properties.codigo === "32"){
				d.total = data.$OR;
			}if(d.properties.codigo === "33"){
				d.total = data.$AST;
			}if(d.properties.codigo === "34"){
				d.total = data.$PA;
			}if(d.properties.codigo === "35"){
				d.total = data.$LP;
			}if(d.properties.codigo === "36"){
				d.total = data.$PO;
			}if(d.properties.codigo === "37"){
				d.total = data.$SA;
			}if(d.properties.codigo === "38"){
				d.total = data.$SCT;
			}if(d.properties.codigo === "39"){
				d.total = data.$CAN;
			}if(d.properties.codigo === "40"){
				d.total = data.$SG;
			}if(d.properties.codigo === "41"){
				d.total = data.$SE;
			}if(d.properties.codigo === "42"){
				d.total = data.$SO;
			}if(d.properties.codigo === "43"){
				d.total = data.$TA;
			}if(d.properties.codigo === "44"){
				d.total = data.$TE;
			}if(d.properties.codigo === "45"){
				d.total = data.$TO;
			}if(d.properties.codigo === "46"){
				d.total = data.$VAL;
			}if(d.properties.codigo === "47"){
				d.total = data.$VA;
			}if(d.properties.codigo === "48"){
				d.total = data.$VIZ;
			}if(d.properties.codigo === "49"){
				d.total = data.$ZAM;
			}if(d.properties.codigo === "50"){
				d.total = data.$ZAR;
			}
			return colorScale(d.total);
		})

		.style("stroke", "transparent")
		.attr("class", function(d) {
			return "Province"
		})
		.attr("id", function(d) {
			return d.id
		})
		.style("opacity", 1)
		.on("mouseover", mouseOver)
		.on("mouseleave", mouseLeave)
  
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
			if (d[0] === 0) return 0;
			if (d[0] === 1) return 1;
			if (d[0] === 2) return 2;
			if (d[0] === 3) return 3;
			if (d[0] === 4) return 4;
			if (d[0]>=5) return d[0] + "+" ;
		});

	legend.append("text").attr("x", 10).attr("y", 550).text("No. heritage assets");
}

function click(d) {
  var x, y, k;

  
  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = (centroid[0]*(-10));
    y = (centroid[1])*10;
    k = 3;
    centered = d;
  } else {
    x = 0;
    y = 0;
    k = 1;
    centered = null;
  }

  spain.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  spain.transition()
      .duration(750)
      .attr("transform", "translate(" + x + "," + y + ") scale(" + k + ")" );
  
}