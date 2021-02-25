// Sort
// Is activated when the selection from the dropdown change, the functions sorts the data of the selected year
function dropdownSort() {
  selectedSort = d3.select("#selection").node().value;
  if (selectedSort == "Ascendente") {
    data[dataRender].sort((a, b) => {
      return d3.ascending(a.idh, b.idh);
    });
  } else if (selectedSort == "Descendente") {
    data[dataRender].sort((a, b) => {
      return d3.descending(a.idh, b.idh);
    });
  } else if (selectedSort == "Alfabetico") {
    data[dataRender].sort((a, b) => {
      return d3.ascending(a.estado, b.estado);
    });
  }
  let windowWidth = document.querySelector("main").clientWidth;
  if (windowWidth <= 480) {
    margins = { top: 5, bottom: 5, left: 55, right: 25 };
    chartHeight =
      document.querySelector("#chartContainer").offsetHeight -
      margins.top -
      margins.bottom;
    renderHorizontal();
    paintState();
  } else {
    renderChart();
    paintState();
  }
}

//Change Year
//Is activated when the selection from the years-dropdown change, takes the value from the selected year and changes the value of dataRender
function changeYear() {
  const selectedOption = d3.select(this).node().value;
  dataRender = selectedYear.indexOf(selectedOption);
  let windowWidth = document.querySelector("main").clientWidth;
  if (windowWidth <= 480) {
    margins = { top: 5, bottom: 5, left: 55, right: 25 };
    chartHeight =
      document.querySelector("#chartContainer").offsetHeight -
      margins.top -
      margins.bottom;
    renderHorizontal();
    dropdownSort();
    paintState();
  } else {
    renderChart();
    dropdownSort();
    paintState();
  }
}

// paintState receives the name of the state from the dropdown, search the id of the selected state and saves it as a string, then the id is used with d3 to change the color of the bar in the chart, finally calls idhStats()
function paintState() {
  selectedState = d3.select("#state").node().value;
  let stateID;
  data[dataRender].forEach((element) => {
    if (element.estado == selectedState) {
      stateID = `#${element.id}`;
    }
  });
  d3.selectAll(".bars").style("fill", "#02A196");
  d3.select(stateID).style("fill", "#DF8601");
  idhStats(selectedState);
}

// Recieves the name of the selected state as parameter then searchs for the IDH value per year and stores it in an array, then use the array to calculate the main, max and min
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
  d3.select("#selectedState").text(node);
  d3.select("#averageIDH").text(averageIDH);
  d3.select("#maxIDH").text(maxIDH);
  d3.select("#minIDH").text(minIDH);
}
