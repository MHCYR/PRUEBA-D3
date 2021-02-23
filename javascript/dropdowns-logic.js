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
  dataRender = selectedYear.indexOf(selectedOption);
  renderChart();
}

// Mejorar para no hacer un if por cada caso
function paintState() {
  const selectedOption = d3.select(this).node().value;
  let stateID;
  data[dataRender].forEach((element) => {
    if (element.estado == selectedOption) {
      stateID = `#${element.id}`;
    }
  });
  d3.selectAll(".bars").style("fill", "aqua");
  d3.select(stateID).style("fill", "red");
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
  averageIDH = average(stateIDH).toFixed(2);
  maxIDH = Math.max(...stateIDH);
  minIDH = Math.min(...stateIDH);
  d3.select("#averageIDH").text(averageIDH);
  d3.select("#maxIDH").text(maxIDH);
  d3.select("#minIDH").text(minIDH);
}
