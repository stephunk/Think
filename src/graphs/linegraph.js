import * as d3 from 'd3';
/**
 * Line graph abstraction for basic d3 line graph
 * @param {string} elementId - HTML element id to contain graph.
 * @param {array} dataPoints - array containing key value pairs of.
 * @param {stirng} xFilter - property to filter on X from data.
 * @param {stirng} yFilter - property to filter on Y from data.
 * @return {*} svg - returns grpah area.
 */
export const lineGraph = (elementId, dataPoints, xFilter, yFilter) => {
  // set the dimensions and margins of the graph
  const margin = {top: 10, right: 30, bottom: 30, left: 60};
  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  d3.select('#svg-' + elementId).remove();
  // append the svg object to the body of the page
  const svg = d3.select('#' + elementId)
      .append('svg')
      .attr('id', 'svg-' + elementId)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Read the data
  // When reading the csv, I must format variables:
  const data = parseData(dataPoints, xFilter, yFilter);
  // Now I can use this dataset:

  // Add X axis --> it is a date format
  const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) {
        return d.date;
      }))
      .range([0, width]);
  svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {
        return +d.value;
      })])
      .range([height, 0]);
  svg.append('g')
      .call(d3.axisLeft(y));

  svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
          .x(function(d) {
            return x(d.date);
          })
          .y(function(d) {
            return y(d.value);
          })
      );

  return {svg, x, y};
};

export const addLineToGraph = (graph, x, y, data, color, xFilter, yFilter) => {
  const filteredData = parseData(data, xFilter, yFilter);
  // Add the line
  graph.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
          .x(function(d) {
            return x(d.date);
          })
          .y(function(d) {
            return y(d.value);
          })
      );
};

/**
 *
 * @param {*} dataPoints - data points to be formated in graph spec
 * @param {string} xFilter - filtering property for X axis.
 * @param {string} yFilter - filtering property for Y axis.
 * @return {array}
 */
const parseData = (dataPoints, xFilter, yFilter) => {
  return dataPoints.map((point) => ({
    date: d3.timeParse('%Y-%m-%d')(point[xFilter]),
    value: point[yFilter],
  }));
};
