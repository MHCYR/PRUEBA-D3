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

function dropdownYear() {
  const selectedOption = d3.select(this).node().value;
  if (selectedOption == "2010") {
    dataRender = 0;
  } else if (selectedOption == "2011") {
    dataRender = 1;
  }
  renderChart();
}

function dropdownState() {
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
}
