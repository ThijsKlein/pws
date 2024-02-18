// Define the size of the chart
const width = 300;
const height = 200;

// Define the data for the chart
const data = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 0.5 },
  { x: 3, y: 0.8 },
  { x: 4, y: 0.2 },
  { x: 5, y: 0.4 },
  { x: 6, y: 0.9 },
  { x: 7, y: 0.6 },
  { x: 8, y: 0.3 },
  { x: 9, y: 0.7 },
];

// Define the SVG element for the chart
const svg = d3.select('#loader')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Define the scales for the x and y axes
const xScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.x)])
  .range([0, width]);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.y)])
  .range([height, 0]);

// Define the line generator function for each sinusoid
const lineGenerator = d3.line()
  .x(d => xScale(d.x))
  .y(d => yScale(d.y))
  .curve(d3.curveBasis);

// Draw the three sinusoids on the chart
const line1 = svg.append('path')
  .datum(data)
  .attr('d', lineGenerator)
  .attr('stroke', '#ff5722')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

const line2 = svg.append('path')
  .datum(data)
  .attr('d', lineGenerator)
  .attr('stroke', '#4caf50')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

const line3 = svg.append('path')
  .datum(data)
  .attr('d', lineGenerator)
  .attr('stroke', '#2196f3')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

// Animate the chart by making the lines fade in and out
function animateChart() {
  line1.transition()
    .duration(2000)
    .attr('opacity', 0)
    .transition()
    .duration(2000)
    .attr('opacity', 1)
    .on('end', animateChart);

  line2.transition()
    .delay(1000)
    .duration(2000)
    .attr('opacity', 0)
    .transition()
    .duration(2000)
    .attr('opacity', 1);

  line3.transition()
    .delay(2000)
    .duration(2000)
    .attr('opacity', 0)
    .transition()
    .duration(2000)
    .attr('opacity', 1);
}

animateChart();