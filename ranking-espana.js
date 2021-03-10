patrimonies = "https://raw.githubusercontent.com/MiguelCabezasPuerto/PAIPO/master/UNESCO_patrimonio-espana.json";
var data = [];
var orderedData = [];
//}

d3.queue()
	.defer(d3.json, patrimonies, function(d) {
		data = d
		orderedData = sortJSON(data, 'pop');


    const sample = [
      {
        province: data[0].name,
        value: data[0].pop,
        color: '#000000'
      },
      {
		    province: data[1].name,
        value: data[1].pop,
        color: '#00a2ee'
      },
      {
		    province: data[2].name,
        value: data[2].pop,
        color: '#fbcb39'
      },
      {
		    province: data[3].name,
        value: data[3].pop,
        color: '#007bc8'
      },
      {
		    province: data[4].name,
        value: data[4].pop,
        color: '#65cedb'
      }
    ];

    const svg = d3.select('svg');
    const svgContainer = d3.select('#container');
    
    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

// Mueve el SVG con el futuro contenido 80px en el eje X e Y
    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

// Se crea la escala del eje X con scaleBand que divide el rango desde cero hasta la anchura en trozos iguales
    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(sample.map((s) => s.province))
      .padding(0.4)

// Se crea el eje Y estableciendo el valor más bajo y más alto del gráfico mediante domain y se divide el gráfico entre esos dos limites a partes iguales con range  
    var yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, data[0].pop]);


    console.log(yScale.ticks(10));
// Se crea el eje izquierdo (la linea) con la escala creada anteriormente
    const makeYLines = () => d3.axisLeft()
      .scale(yScale)

// Se añaden líneas de cuadrícula horizontales de fondo
    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    chart.append('g')
      .call(d3.axisLeft(yScale).ticks(data[0].pop));

    chart.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )

// Se crea el gráfico de barras
    const barGroups = chart.selectAll()
      .data(sample) //con cuantos elementos se cuenta
      .enter()     //identifica los elementos restantes si la entrada de datos es mas larga que la seleccion
      .append('g')
//Para ello se le añaden rectangulos
    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.province)) 
      .attr('y', (g) => yScale(g.value))   
      .attr('height', (g) => height - yScale(g.value))// se escala el alto de cada rectangulo
      .attr('width', xScale.bandwidth())//se escala el ancho de cada rectangulo
      .on('mouseenter', function (actual, i) { // se añade la funcion a realizar cuando se pulsa sobre uno de los rectangulos
        d3.selectAll('.value')
          .attr('opacity', 0)

        d3.select(this)
          .transition()  //para animar los cambios en el gráfico
          .duration(300)  // duracion de la animación en milisegundos
          .attr('opacity', 0.6) // hace el rectangulo menos opaco 
          .attr('x', (a) => xScale(a.province) - 5) 
          .attr('width', xScale.bandwidth() + 10) // amplía la anchura del rectángulo

        const y = yScale(actual.value)

        line = chart.append('line') //se añade la línea de seguimiento cuando se pulsa un rectángulo
          .attr('id', 'limit')    
          .attr('x1', 0)    // posicion desde la que se pinta en el eje X
          .attr('y1', y)    // posicion desde la que se pinta en el eje Y
          .attr('x2', width) // posicion hasta la que se pinta en el eje X
          .attr('y2', y)      // posicion hasta la que se pinta en el eje Y

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.province) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.value) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.value - actual.value) // funcion que calcula la diferencia entre cada rectángulo y el rectángulo sobre el que se está pulsando
            
            let text = ''
            if (divergence > 0) text += '+' //si la diferencia es positiva de concatena delante  '+'
            text += `${divergence}`

            return idx !== i ? text : '';
          })

      })
      .on('mouseleave', function () { // se añade la funcion a realizar cuando se deja de pulsar sobre uno de los rectangulos
        d3.selectAll('.value')
          .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.province)) 
          .attr('width', xScale.bandwidth()) // se vuelve a redimensionar al ancho original

        chart.selectAll('#limit').remove()  
        chart.selectAll('.divergence').remove() // se elimina el texto de diferencia en el resto de rectángulos
      })
// Se añade a cada rectángulo el valor que toma y se posiciona
    barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.province) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.value) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${a.value}`)
 
 // Etiqueta para el eje Y   
    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('World Heritage Assets')
// Etiqueta para el eje X
    svg.append('text')
      .attr('class', 'label')
      .attr('x', width / 2 + margin)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'middle')
      .text('Province')
// Título del gráfico
    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2 + margin)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('TOP 5 provinces World Heritage Assets')
// Etiqueta para indicar la fuente de los datos
    svg.append('text')
      .attr('class', 'source')
      .attr('x', width - margin / 2)
      .attr('y', height + margin * 1.7)
      .attr('text-anchor', 'start')
      .text('Source: UNESCO, 2020')
	})
	.await(ready);

//loadData();
function ready(error){
console.log(data);
console.log(orderedData);
}


function sortJSON(array_json, key) {
   return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}