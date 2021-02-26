//Random IDH returns a number of two digits between 0 and 1
let randomIDH = () => Math.round(Math.random() * (100 - 1) + 1) / 100;
const selectedYear = [];

// DATA
function createData(startYear, endYear, starterData) {
  let result = [];
  for (let i = startYear; i <= endYear; i++) {
    selectedYear.push(i.toString());
    let tempData = [];
    starterData.map((e) => {
      const state = {
        id: e.id,
        estado: e.estado,
        año: i,
        idh: randomIDH(),
      };
      tempData.push(state);
    });
    result.push(tempData);
  }
  return result;
}
