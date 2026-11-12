// main.js
// Loads the data once and draws both charts.

function init() {
  d3.csv('./data/allegations_summary.csv', d3.autoType)
    .then(data => {
      console.log('Loaded', data.length, 'rows');
      drawWhiteHat(data);
      drawBlackHat(data);
    })
    .catch(error => console.error('Error loading data:', error));
}

window.addEventListener('load', init);
