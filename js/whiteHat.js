// whiteHat.js (Person A)
// White hat: 100% stacked bars showing all three outcomes for each group.

const outcomes = ['Substantiated', 'Exonerated', 'Unsubstantiated'];

// Neutral colors. Substantiated is darkest because it's the outcome our question is about.
const outcomeColors = {
  'Substantiated': '#4C78A8',
  'Exonerated': '#9ecae9',
  'Unsubstantiated': '#d9d9d9'
};

function drawWhiteHat(data) {
  // Chart 1: by type of allegation, sorted by how often they were substantiated
  drawOutcomeBars('#white-type', data, 'allegation_type', null);

  // Chart 2: by rank, in order from lowest to highest rank
  const rankOrder = ['Police Officer', 'Sergeant', 'Detective', 'Lieutenant', 'Captain and above'];
  drawOutcomeBars('#white-rank', data, 'rank', rankOrder);
}

// groupField: the column to make one bar for ('allegation_type' or 'rank')
// order: list of groups in the order to draw them, or null to sort by substantiated rate
function drawOutcomeBars(containerId, data, groupField, order) {
  const margin = { top: 50, right: 120, bottom: 50, left: 150 };
  const width = 800 - margin.left - margin.right;
  const height = 260 - margin.top - margin.bottom;

  // Add up the allegations for each group and outcome
  let groups = {};
  data.forEach(d => {
    const name = d[groupField];
    if (!groups[name]) {
      groups[name] = { name: name, total: 0, Substantiated: 0, Exonerated: 0, Unsubstantiated: 0 };
    }
    groups[name][d.outcome] += d.count;
    groups[name].total += d.count;
  });
  let rows = Object.values(groups);

  if (order) {
    rows.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  } else {
    rows.sort((a, b) => b.Substantiated / b.total - a.Substantiated / a.total);
  }

  // Make one segment per group and outcome. start = where the segment begins (0 to 1).
  let segments = [];
  rows.forEach(row => {
    let start = 0;
    outcomes.forEach(outcome => {
      const share = row[outcome] / row.total;
      segments.push({ group: row.name, outcome: outcome, count: row[outcome], total: row.total, share: share, start: start });
      start += share;
    });
  });

  // Create SVG
  const svg = d3.select(containerId)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([0, 1]).range([0, width]);
  const y = d3.scaleBand().domain(rows.map(d => d.name)).range([0, height]).padding(0.25);

  // Axes
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format('.0%')));

  svg.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(y));

  // X-axis label
  svg.append('text')
    .attr('class', 'labels')
    .attr('x', width / 2)
    .attr('y', height + 40)
    .attr('text-anchor', 'middle')
    .text('Share of allegations');

  // Bars
  svg.selectAll('.segment')
    .data(segments)
    .join('rect')
    .attr('class', 'segment')
    .attr('x', d => x(d.start))
    .attr('y', d => y(d.group))
    .attr('width', d => x(d.share))
    .attr('height', y.bandwidth())
    .style('fill', d => outcomeColors[d.outcome])
    .style('stroke', 'white')
    .on('mouseover', function (event, d) {
      d3.select(this).style('stroke', 'black');
      showTooltip(event,
        `<strong>${d.group}</strong><br/>
        ${d.outcome}: ${d3.format(',')(d.count)} of ${d3.format(',')(d.total)} allegations (${d3.format('.1%')(d.share)})`);
    })
    .on('mouseout', function () {
      d3.select(this).style('stroke', 'white');
      hideTooltip();
    });

  // Percent labels inside the bars (only if there's room)
  svg.selectAll('.segment-label')
    .data(segments.filter(d => x(d.share) > 35))
    .join('text')
    .attr('class', 'segment-label')
    .attr('x', d => x(d.start + d.share / 2))
    .attr('y', d => y(d.group) + y.bandwidth() / 2 + 4)
    .attr('text-anchor', 'middle')
    .style('fill', d => d.outcome === 'Substantiated' ? 'white' : 'black')
    .text(d => d3.format('.0%')(d.share));

  // Number of allegations at the end of each bar, so readers know how big each group is
  svg.selectAll('.total-label')
    .data(rows)
    .join('text')
    .attr('class', 'total-label')
    .attr('x', width + 8)
    .attr('y', d => y(d.name) + y.bandwidth() / 2 + 4)
    .text(d => d3.format(',')(d.total) + ' allegations');

  // Legend
  svg.selectAll('.legend-box')
    .data(outcomes)
    .join('rect')
    .attr('class', 'legend-box')
    .attr('x', (d, i) => i * 160)
    .attr('y', -35)
    .attr('width', 12)
    .attr('height', 12)
    .style('fill', d => outcomeColors[d])
    .style('stroke', '#999');

  svg.selectAll('.legend-text')
    .data(outcomes)
    .join('text')
    .attr('class', 'legend-text')
    .attr('x', (d, i) => i * 160 + 18)
    .attr('y', -25)
    .text(d => d);
}
