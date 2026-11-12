// tooltip.js
// One tooltip for both charts. The <div id="tooltip"> is in index.html.

function showTooltip(event, html) {
  d3.select('#tooltip')
    .style('display', 'block')
    .html(html)
    .style('left', (event.pageX + 20) + 'px')
    .style('top', (event.pageY - 28) + 'px');
}

function hideTooltip() {
  d3.select('#tooltip').style('display', 'none');
}
