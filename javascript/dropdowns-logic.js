function dropdownSort() {
  const selectedOption = d3.select(this).node().value;
  if (selectedOption == "Ascendente") {
    data[dataRender].sort((a, b) => {
      return d3.ascending(a.idh, b.idh);
    });
  } else if (selectedOption == "Descendente") {
    data[dataRender].sort((a, b) => {
      return d3.descending(a.idh, b.idh);
    });
  } else if (selectedOption == "Alfabetico") {
    data[dataRender].sort((a, b) => {
      return d3.ascending(a.estado, b.estado);
    });
  }
  renderChart();
}

function changeYear() {
  const selectedOption = d3.select(this).node().value;
  if (selectedOption == "2010") {
    dataRender = 0;
  } else if (selectedOption == "2011") {
    dataRender = 1;
  }
  renderChart();
}

// Mejorar para no hacer un if por cada caso
function paintState() {
  const selectedOption = d3.select(this).node().value;
  if (selectedOption == "Veracruz") {
    d3.selectAll(".bars").style("fill", "aqua");
    d3.select("#VER").style("fill", "red");
  } else if (selectedOption == "Aguascalientes") {
    d3.selectAll(".bars").style("fill", "aqua");
    d3.select("#AGS").style("fill", "red");
  } else if (selectedOption == "Nuevo Leon") {
    d3.selectAll(".bars").style("fill", "aqua");
    d3.select("#NL").style("fill", "red");
  }
  idhStats(selectedOption);
}

//Recopila los datos de IDH del estado seleccionado
function idhStats(node) {
  const selectedOption = node;
  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
  const stateIDH = [];
  let averageIDH;
  let maxIDH;
  let minIDH;
  data.forEach((year) => {
    year.forEach((d) => {
      if (selectedOption == d.estado) {
        stateIDH.push(d.idh);
      }
    });
  });
  averageIDH = average(stateIDH);
  maxIDH = Math.max(...stateIDH);
  minIDH = Math.min(...stateIDH);
  d3.select("#averageIDH").text(averageIDH);
  d3.select("#maxIDH").text(maxIDH);
  d3.select("#minIDH").text(minIDH);
}
