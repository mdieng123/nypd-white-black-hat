// blackHat.js (Person B)
// Intentional tricks for the assignment:
// 1. Merge Exonerated and Unsubstantiated.
// 2. Label that merged group Officer cleared.
// 3. Call allegation counts complaints.
// 4. Emphasize cleared with dark blue and downplay substantiated with pale gray.

function drawBlackHat(data) {
  const container = d3.select('#black-hat');
  container.selectAll('*').remove();

  const colors = {
    'Officer cleared': '#24476b',
    'Substantiated': '#eeeeee'
  };

  const labels = ['Officer cleared', 'Substantiated'];

  const margin = { top: 50, right: 130, bottom: 50, left: 150 };
  const width = 800 - margin.left - margin.right;
  const height = 260 - margin.top - margin.bottom;

  // Combine ranks to make one row per allegation type.
  let groups = {};

  data.forEach(d => {
    const name = d.allegation_type;

    if (!groups[name]) {
      groups[name] = {
        name: name,
        total: 0,
        cleared: 0,
        substantiated: 0
      };
    }

    groups[name].total += d.count;

    if (d.outcome === 'Substantiated') {
      groups[name].substantiated += d.count;
    } else if (
      d.outcome === 'Exonerated' ||
      d.outcome === 'Unsubstantiated'
    ) {
      groups[name].cleared += d.count;
    }
  });

  const rows = Object.values(groups);

  rows.sort((a, b) =>
    b.cleared / b.total - a.cleared / a.total
  );

  let total = 0;
  let cleared = 0;

  rows.forEach(row => {
    total += row.total;
    cleared += row.cleared;
  });

  // The title and subtitle intentionally support the misleading story.
  container.append('h3')
    .text('NYPD officers are almost always cleared');

  container.append('p')
    .text(
      d3.format('.0%')(cleared / total) + ' of ' +
      d3.format(',')(total) +
      ' complaints ended with the officer cleared. Results by complaint type.'
    );

  // Make two segments per bar.
  let segments = [];

  rows.forEach(row => {
    const share = row.cleared / row.total;

    segments.push({
      group: row.name,
      outcome: 'Officer cleared',
      count: row.cleared,
      total: row.total,
      share: share,
      start: 0
    });

    segments.push({
      group: row.name,
      outcome: 'Substantiated',
      count: row.substantiated,
      total: row.total,
      share: row.substantiated / row.total,
      start: share
    });
  });

  const svg = container.append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, width]);

  const y = d3.scaleBand()
    .domain(rows.map(d => d.name))
    .range([0, height])
    .padding(0.25);

  // Keep the full percentage scale.
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${height})`)
    .call(
      d3.axisBottom(x)
        .tickFormat(d3.format('.0%'))
    );

  svg.append('g')
    .attr('class', 'axis')
    .call(d3.axisLeft(y));

  svg.append('text')
    .attr('class', 'labels')
    .attr('x', width / 2)
    .attr('y', height + 40)
    .attr('text-anchor', 'middle')
    .text('Share of complaints');

  // Draw the dark cleared segment and pale substantiated segment.
  svg.selectAll('.segment')
    .data(segments)
    .join('rect')
    .attr('class', 'segment')
    .attr('x', d => x(d.start))
    .attr('y', d => y(d.group))
    .attr('width', d => x(d.share))
    .attr('height', y.bandwidth())
    .style('fill', d => colors[d.outcome])
    .style('stroke', 'white')
    .on('mouseover', function (event, d) {
      d3.select(this).style('stroke', 'black');

      showTooltip(event,
        `<strong>${d.group}</strong><br/>
        ${d.outcome}: ${d3.format(',')(d.count)} of
        ${d3.format(',')(d.total)} complaints
        (${d3.format('.1%')(d.share)})`
      );
    })
    .on('mouseout', function () {
      d3.select(this).style('stroke', 'white');
      hideTooltip();
    });

  // Only cleared percentages receive prominent labels inside the bars.
  svg.selectAll('.segment-label')
    .data(segments.filter(d => d.outcome === 'Officer cleared'))
    .join('text')
    .attr('class', 'segment-label')
    .attr('x', d => x(d.share / 2))
    .attr('y', d => y(d.group) + y.bandwidth() / 2 + 4)
    .attr('text-anchor', 'middle')
    .style('fill', 'white')
    .style('pointer-events', 'none')
    .text(d => d3.format('.0%')(d.share));

  // These totals count allegations but intentionally say complaints.
  svg.selectAll('.total-label')
    .data(rows)
    .join('text')
    .attr('class', 'total-label')
    .attr('x', width + 8)
    .attr('y', d => y(d.name) + y.bandwidth() / 2 + 4)
    .text(d => d3.format(',')(d.total) + ' complaints');

  // Legend
  svg.selectAll('.legend-box')
    .data(labels)
    .join('rect')
    .attr('class', 'legend-box')
    .attr('x', (d, i) => i * 180)
    .attr('y', -35)
    .attr('width', 12)
    .attr('height', 12)
    .style('fill', d => colors[d])
    .style('stroke', '#999');

  svg.selectAll('.legend-text')
    .data(labels)
    .join('text')
    .attr('class', 'legend-text')
    .attr('x', (d, i) => i * 180 + 18)
    .attr('y', -25)
    .text(d => d);

  // Polish (Person C): a definitions note like the white hat has, so the chart
  // looks just as careful. "Did not substantiate" is true, but next to the
  // label "Officer cleared" it reads as if the officer was found innocent.
  container.append('p')
    .attr('class', 'note')
    .text(
      'Officer cleared: the review board did not substantiate the complaint. ' +
      'Substantiated: the board found the officer broke NYPD rules. ' +
      'Hover over a bar to see exact numbers.'
    );

  container.append('p')
    .attr('class', 'note')
    .text(
      'Source: ProPublica, Civilian Complaints Against New York City ' +
      'Police Officers. Records from the NYC Civilian Complaint Review Board.'
    );
}