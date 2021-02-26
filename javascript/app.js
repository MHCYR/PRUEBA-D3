//dataRender represents the index of the year that is going to be render
let data = createData(2010, 2015, statesMX);
let dataRender = 0;

//MARGINS
let margins = { top: 50, bottom: 80, left: 30, right: 30 };

//CHART WIDTH AND HEIGHT
let chartWidth =
  document.querySelector("#chartContainer").offsetWidth -
  margins.left -
  margins.right;
let chartHeight = 500 - margins.top - margins.bottom;

// DROPDOWNS
// States dropdown
const states = data[dataRender].map((d) => d.estado);
renderDropdown(states, "state");
let selectedState = d3.select("#state").node().value;
// Year dropdown
// selectedYear = ["2010", "2011", "2012", "2013", "2014", "2015"];
renderDropdown(selectedYear, "year");
// Sort dropdown
const sort = ["Alfabetico", "Ascendente", "Descendente"];
renderDropdown(sort, "selection");
let selectedSort = d3.select("#selection").node().value;

// Dropdowns events listeners
d3.select("#selection").on("change", dropdownSort);
d3.select("#year").on("change", changeYear);
d3.select("#state").on("change", paintState);

//RENDER
//Render the chart when the DOM is loaded
document.addEventListener("DOMContentLoaded", renderChart());

//Responsive Render, when the size of the screen is less than 480px renders a horizontal chart
let chartDivWidth = document.querySelector("#chartContainer");
const resize_ob = new ResizeObserver(() => {
  let windowWidth = document.querySelector("main").clientWidth;
  chartWidth =
    document.querySelector("#chartContainer").offsetWidth -
    margins.left -
    margins.right;
  if (windowWidth <= 480) {
    margins = { top: 5, bottom: 5, left: 55, right: 25 };
    chartHeight =
      document.querySelector("#chartContainer").offsetHeight -
      margins.top -
      margins.bottom;
    chartWidth =
      document.querySelector("#chartContainer").offsetWidth -
      margins.left -
      margins.right;
    renderHorizontal();
  } else {
    margins = { top: 50, bottom: 80, left: 30, right: 30 };
    chartHeight =
      document.querySelector("#chartContainer").offsetHeight -
      margins.top -
      margins.bottom;
    renderChart();
  }
});
resize_ob.observe(chartDivWidth);
