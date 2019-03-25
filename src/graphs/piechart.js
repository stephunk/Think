import * as d3 from 'd3';
/**
 *
 * @param {string} elementId - HTML element id to contain graph.
 * @param {array} dataPoints - dataset to be parsed and dsiplayed
 * @param {array} labels - set labels
 * @param {Function} clickBehaviour - callback to register click on slice.
 */
export const pieChart = (elementId, dataPoints, labels, clickBehaviour) => {
  const w = 300; // width
  const h = 300; // height
  const r = 150; // radius

  const color = d3.scaleOrdinal(d3.schemeCategory10); // builtin range of colors

  const data = parseData(dataPoints, labels);
  d3.select('svg').remove();

  const vis = d3.select('#' + elementId)
      .append('svg:svg')
      .data([data])
      .attr('width', w)
      .attr('height', h)
      .append('svg:g')
      .attr('transform', 'translate(' + r + ',' + r + ')');
  // Create arc paths
  const arc = d3.arc()
      .outerRadius(r)
      .innerRadius(0);

  // Access data
  const pie = d3.pie()
      .value(function(d) {
        return d.value;
      });

  const arcs = vis.selectAll('g.slice')
      .data(pie)
      .enter()
      .append('svg:g')
      .attr('class', 'slice')
      .on('click', (a) =>
        clickBehaviour(a.data.key)); // bind click function to all slices

  // Set colors and draw arcs
  arcs.append('svg:path')
      .attr('fill', function(d, i) {
        return color(i);
      } )
      .attr('d', arc);

  arcs.append('svg:text') // add a label to each slice
      .attr('transform', function(d) {
      // set the label's origin to the center of the arc
      // we have to make sure to set these before calling arc.centroid
        d.innerRadius = 0;
        d.outerRadius = r;
        // this gives us a pair of coordinates like [50, 50]
        return 'translate(' + arc.centroid(d) + ')';
      })
      .attr('text-anchor', 'middle') // center the text on it's origin
      .text(function(d, i) {
        return data[i].label;
      }); // get the label from our original data array
};

const parseData = (dataPoints, labels) => {
  let total = 0;
  Object.keys(dataPoints).forEach((key) => {
    total += dataPoints[key];
  });
  return Object.keys(dataPoints).map((key, index) => ({
    key: key,
    label: labels[index],
    value: (dataPoints[key]/total) * 100,
  }));
};
