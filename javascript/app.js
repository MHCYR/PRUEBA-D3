let data = [data2010, data2011];

//MARGINS
const margins = { top: 50, bottom: 100, left: 50, right: 50 };

//ANCHO Y LARGO DEL GRAFICO
const chartWidth = 600 - margins.left - margins.right;
const chartHeight = 400 - margins.top - margins.bottom;

// opciones del dropdown

const selectItems = ["Alfabetico", "Ascendente", "Descendente"];
renderDropdown(selectItems);

// Ordenar de acuerdo al DD
//CORREGIR DATA DE ACUERDO AL AÑO SELECCIONADO
d3.select("#selection").on("change", dropdownSort);

//Render cuando carga el DOM
document.addEventListener("DOMContentLoaded", renderChart());
