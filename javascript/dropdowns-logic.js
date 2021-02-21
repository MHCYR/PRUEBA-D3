function dropdownSort() {
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
}
