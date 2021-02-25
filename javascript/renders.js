//Creates a dropdown, recives the options of the dropdown as an array and the HTML id as a string.
function renderDropdown(options, id) {
  d3.select("#dropdown")
    .append("select")
    .attr("id", id)
    .selectAll("option")
    .data(options)
    .enter()
    .append("option")
    .attr("value", (d) => d)
    .text((d) => d);
}

// Horizontal chart render
function renderChart() {
  const chartDiv = document.createElement("div");
  const showChart = document.getElementById("chartContainer");

  // SCALES
  const xScale = d3
    .scaleBand()
    .domain(data[dataRender].map((d) => d.estado))
    .rangeRound([0, chartWidth])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, 1]) //d3.max(data[0], (d) => d.idh)
    .range([chartHeight, 0]);

  // AXIS
  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale);

  //CREATE SVG
  const svg = d3
    .select(chartDiv)
    .append("svg")
    .attr("width", chartWidth + margins.left + margins.right)
    .attr("height", chartHeight + margins.top + margins.bottom);

  // mainG groups all the elements of the svg
  const mainG = svg
    .append("g")
    .attr("transform", `translate(${margins.left}, ${margins.top})`);

  //  g is used to wrap each element of the array (rects, labels, axis)
  const g = mainG.selectAll("g").data(data[dataRender]).enter().append("g");

  //Creates the bars of the chart
  g.append("rect")
    .attr("class", "bars")
    .attr("x", (d) => xScale(d.estado))
    .attr("y", (d) => yScale(d.idh))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => chartHeight - yScale(d.idh))
    .attr("id", (d) => d.id)
    .append("text");

  // Axis labels
  mainG
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0, ${chartHeight})`)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 6)
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start");

  mainG.append("g").call(yAxis);

  // Bars value labels
  mainG
    .selectAll(".label")
    .data(data[dataRender], (data) => data.estado)
    .enter()
    .append("text")
    .text((data) => data.idh)
    .attr("x", (data) => xScale(data.estado) + xScale.bandwidth() / 2) // coloca el inicio del label a la mitad de la barra
    .attr("y", (data) => yScale(data.idh) - 10) // coloca el label 10px arriba de donde termina la barra
    .attr("text-anchor", "middle") //justifica el texto con la mitad de la barra
    .classed("label", true)
    .style("font-size", "10");

  // Re-render
  while (showChart.firstChild) {
    showChart.firstChild.remove();
  }
  showChart.appendChild(chartDiv);
  // Mantains the color of the selected state whe the chart is re-rendered
  paintState();
}

//Horizontal Render
function renderHorizontal() {
  const chartDiv = document.createElement("div");
  const showChart = document.getElementById("chartContainer");

  const xScale = d3.scaleLinear().domain([0, 1]).range([0, chartWidth]);
  const yScale = d3
    .scaleBand()
    .domain(data[dataRender].map((d) => d.id))
    .rangeRound([0, chartHeight])
    .padding(0.1);

  const yAxis = d3.axisLeft().scale(yScale);

  const svg = d3
    .select(chartDiv)
    .append("svg")
    .attr("width", chartWidth + margins.left + margins.right)
    .attr("height", chartHeight + margins.top + margins.bottom)
    .classed("svg", true);

  const mainG = svg
    .append("g")
    .attr("transform", `translate(${margins.left}, ${margins.top})`);

  const g = mainG.selectAll("g").data(data[dataRender]).enter().append("g");

  // Chart Bars
  g.append("rect")
    .attr("class", "bars")
    .attr("x", 0)
    .attr("y", (d) => yScale(d.id))
    .attr("width", (d) => xScale(d.idh))
    .attr("height", yScale.bandwidth())
    .attr("id", (d) => d.id)
    .append("text");

  // Axis
  mainG.append("g").call(yAxis);

  // bar labels
  mainG
    .selectAll(".label")
    .data(data[dataRender], (data) => data.estado)
    .enter()
    .append("text")
    .text((data) => data.idh)
    .attr("x", (data) => xScale(data.idh) + 2) // coloca el inicio del label a la mitad de la barra
    .attr("y", (data) => yScale(data.id) + yScale.bandwidth() - 3)
    .classed("label", true)
    .style("font-size", "10");

  // Re-render
  while (showChart.firstChild) {
    showChart.firstChild.remove();
  }
  showChart.appendChild(chartDiv);

  paintState();
}
