let data = [data2010, data2011, data2012, data2013, data2014, data2015];
let dataRender = 0;

//MARGINS
let margins = { top: 50, bottom: 80, left: 30, right: 30 };

//ANCHO Y LARGO DEL GRAFICO
let chartWidth =
  document.querySelector("#chartContainer").offsetWidth -
  margins.left -
  margins.right;
let chartHeight = 500 - margins.top - margins.bottom;

// DROPDOWNS
// sort
const sort = ["Alfabetico", "Ascendente", "Descendente"];
renderDropdown(sort, "selection");
//año
let selectedYear = ["2010", "2011", "2012", "2013", "2014", "2015"];
renderDropdown(selectedYear, "year");
//estados
const selectedState = data[dataRender].map((d) => d.estado);
renderDropdown(selectedState, "state");

// Dropdowns events listeners
d3.select("#selection").on("change", dropdownSort);
d3.select("#year").on("change", changeYear);
d3.select("#state").on("change", paintState);

//RENDER
//Render cuando carga el DOM
document.addEventListener("DOMContentLoaded", renderChart());

//Render responsive, cambia cuando cambia el tamaño de la pantalla
let chartDivWidth = document.querySelector("#chartContainer");
const resize_ob = new ResizeObserver(() => {
  let windowWidth = document.querySelector("main").clientWidth;
  chartWidth =
    document.querySelector("#chartContainer").offsetWidth -
    margins.left -
    margins.right;
  if (windowWidth <= 480) {
    margins = { top: 0, bottom: 10, left: 55, right: 15 };
    chartHeight = 500 - margins.top - margins.bottom;
    renderHorizontal();
  } else {
    renderChart();
  }
});

resize_ob.observe(chartDivWidth);
