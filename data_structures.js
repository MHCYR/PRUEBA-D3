// OPCIONES

// OPCION 1
// Array de objetos por año
let op1 = [
  {
    2010: {
      Veracruz: {
        idh: ramdomIDH(),
      },

      Aguascalientes: {
        idh: ramdomIDH(),
      },
      "Nuevo leon": {
        idh: ramdomIDH(),
      },
    },
  },
  {
    2011: {
      Veracruz: {
        idh: ramdomIDH(),
      },

      Aguascalientes: {
        idh: ramdomIDH(),
      },
      "Nuevo leon": {
        idh: ramdomIDH(),
      },
    },
  },
];

//OPCION 2
//Array de objetos por estado
let op2 = [
  {
    Veracruz: {
      2010: {
        idh: 0.2,
      },
      2011: {
        idh: 0.4,
      },
    },
  },
  {
    "Nuevo Leon": {
      2010: {
        idh: 0.2,
      },
      2011: {
        idh: 0.4,
      },
    },
  },
];

//OPCION 3
// Tener un array por cada año
let year2010 = [
  { estado: "Veracruz", idh: 0.6 },
  { estado: "Nuevo Leon", idh: 0.7 },
];
