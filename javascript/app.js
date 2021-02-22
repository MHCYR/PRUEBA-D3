let data = [data2010, data2011];
let dataRender = 0;

//MARGINS
const margins = { top: 50, bottom: 20, left: 50, right: 50 };

//ANCHO Y LARGO DEL GRAFICO
const chartWidth = 600 - margins.left - margins.right;
const chartHeight = 400 - margins.top - margins.bottom;

// DROPDOWNS
// sort
const sort = ["Alfabetico", "Ascendente", "Descendente"];
renderDropdown(sort, "selection");
//año
let selectedYear = ["2010", "2011"];
renderDropdown(selectedYear, "year");
//estados
const selectedState = data[dataRender].map((d) => d.estado);
renderDropdown(selectedState, "state");

// Dropdowns events listeners
d3.select("#selection").on("change", dropdownSort);
d3.select("#year").on("change", dropdownYear);
d3.select("#state").on("change", dropdownState).on("change", idhStats);

//RENDER
//Render cuando carga el DOM
document.addEventListener("DOMContentLoaded", renderChart());
