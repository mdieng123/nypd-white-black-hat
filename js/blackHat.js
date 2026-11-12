// blackHat.js (Person B)
// PLACEHOLDER: Person B replaces this with the black hat chart.
// See PROJECT.md for the plan and the four tricks.
// data is the same list of rows the white hat uses: { allegation_type, rank, outcome, count }

function drawBlackHat(data) {
  d3.select('#black-hat')
    .append('p')
    .text('Black hat chart goes here (Person B). It gets ' + data.length + ' rows of data.');
}
