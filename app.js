let randomIDH = () => (Math.round(Math.random() * (10 - 1)) + 1) / 10;

d3.csv();

// DATA
const data2010 = [
  { estado: "Veracruz", idh: randomIDH() },
  { estado: "Nuevo Leon", idh: randomIDH() },
  { estado: "Aguascalientes", idh: randomIDH() },
];

const data2011 = [
  { estado: "Veracruz", idh: randomIDH() },
  { estado: "Nuevo Leon", idh: randomIDH() },
  { estado: "Aguascalientes", idh: randomIDH() },
];

let data = [data2010, data2011];

//MARGINS
const margins = { top: 50, bottom: 100, left: 50, right: 50 };

//ANCHO Y LARGO DEL GRAFICO
const chartWidth = 600 - margins.left - margins.right;
const chartHeight = 400 - margins.top - margins.bottom;

// opciones del dropdown

const selectItems = ["Alfabetico", "Ascendente", "Descendente"];

//Creacion del dropdown
d3.select("#dropdown")
  .append("select")
  .attr("id", "selection")
  .selectAll("option")
  .data(selectItems)
  .enter()
  .append("option")
  .attr("value", (d) => d)
  .text((d) => d);

// Ordenar de acuerdo al DD
//CORREGIR DATA DE ACUERDO AL AÑO SELECCIONADO
d3.select("#selection").on("change", function () {
  const selectedOption = d3.select(this).node().value;
  if (selectedOption == "Ascendente") {
    data[0].sort((a, b) => {
      return d3.ascending(a.idh, b.idh);
    });
  } else if (selectedOption == "Descendente") {
    data[0].sort((a, b) => {
      return d3.descending(a.idh, b.idh);
    });
  } else if (selectedOption == "Alfabetico") {
    data[0].sort((a, b) => {
      return d3.ascending(a.estado, b.estado);
    });
  }
  renderChart();
});

//Render cuando carga el DOM
document.addEventListener("DOMContentLoaded", renderChart());

//FUNCION Render de la Gráfica
function renderChart() {
  const chartDiv = document.createElement("div");
  const showChart = document.getElementById("chartContainer");

  // ESCALAS
  // ATENCION SE DEBE DE ARREGLAR EL DOMINO AL AÑO QUE SE SELECCIONE DEL DROPDOWN DE AÑOS
  const xScale = d3
    .scaleBand()
    .domain(data[0].map((d) => d.estado))
    .rangeRound([0, chartWidth])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, 1]) //d3.max(data[0], (d) => d.idh)
    .range([chartHeight, 0]);

  // EJES
  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale);

  //Crear SVG
  const svg = d3
    .select(chartDiv)
    .append("svg")
    .attr("width", chartWidth + margins.left + margins.right)
    .attr("height", chartHeight + margins.top + margins.bottom);

  // Grupo principal de SVG
  const mainG = svg
    .append("g")
    .attr("transform", `translate(${margins.left}, ${margins.top})`);

  // Grupo por barra de svg
  // SE DEBE ARREGLAR LA DATA A LA DATA DEL DD DE AÑOS
  const g = mainG.selectAll("g").data(data[0]).enter().append("g");

  //Crear barras de la grafica
  //SE DEBE DE ARREGLAS LA DATA
  g.append("rect")
    .attr("class", "bars")
    .attr("x", (d) => xScale(d.estado))
    .attr("y", (d) => yScale(d.idh))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => chartHeight - yScale(d.idh))
    .append("text");

  mainG
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0, ${chartHeight})`);

  mainG.append("g").call(yAxis);

  // Labels del eje y
  g.selectAll(".label")
    .data(data[0], (data) => data.estado)
    .enter()
    .append("text")
    .text((data) => data.idh)
    .attr("x", (data) => xScale(data.estado) + xScale.bandwidth() / 2) // coloca el inicio del label a la mitad de la barra
    .attr("y", (data) => yScale(data.idh) - 10) // coloca el label 10px arriba de donde termina la barra
    .attr("text-anchor", "middle") //justifica el texto con la mitad de la barra
    .classed("label", true);

  // Re-render

  while (showChart.firstChild) {
    showChart.firstChild.remove();
  }
  showChart.appendChild(chartDiv);
}
