//Creacion del dropdown
function renderDropdown(options) {
  d3.select("#dropdown")
    .append("select")
    .attr("id", "selection")
    .selectAll("option")
    .data(options)
    .enter()
    .append("option")
    .attr("value", (d) => d)
    .text((d) => d);
}

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
