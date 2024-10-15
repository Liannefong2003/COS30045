var w = 600;
var h = 300;
var margin = { top: 20, right: 20, bottom: 30, left: 50 }; // Add margins

// Adjust width and height to account for margins
var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;

var dataset;
d3.csv("Unemployment_78-95.csv", function(d) {
    return {
        // Make new date object for each year + month
        date: new Date(+d.year, +d.month - 1),
        number: +d.number
    };
}).then(function(data) {
    dataset = data;
    lineChart(dataset);

    // Print data to console as table, for verification
    console.table(dataset, ["date", "number"]);
});

function lineChart(dataset) {
    // Define scales
    var xScale = d3.scaleTime()
        .domain([
            d3.min(dataset, function(d) { return d.date; }),
            d3.max(dataset, function(d) { return d.date; })
        ])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { return d.number; })])
        .range([height, 0]);

    // Create the SVG element
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define line generator
    var line = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.number); });

    // Append the path for the line chart
    svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", 2);

    // Append x-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")  // Move it to the bottom
        .call(d3.axisBottom(xScale));

    // Append y-axis
    svg.append("g")
        .call(d3.axisLeft(yScale));
    
    // Add the red dashed line for "Half a million unemployed"
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(500000))
        .attr("x2", width)
        .attr("y2", yScale(500000))
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4");

    // Add label for the red line
    svg.append("text")
        .attr("x", 10)
        .attr("y", yScale(500000) - 10)  // Slightly above the red line
        .text("Half a million unemployed")
        .attr("fill", "red")
        .style("font-size", "12px");
}
