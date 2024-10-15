
var w = 600;
var h = 300; // Increased height to give more space for the bars
var padding = 2;
var dataset = [13, 4, 29, 23, 18, 30, 20, 18, 10, 10, 13, 15];

// Scaling
var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

// Create SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Create rects
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return yScale(d);
    })
    .style("fill", "#cfc4ae");

// Create text labels
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("x", function(d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function(d) {
        return h - yScale(d) + 15; // Position inside the bar
    })
    .attr("font-size", "15px")
    .attr("text-anchor", "middle")
    .style("fill", "white");

// Update data on button click
d3.select("#updateButton").on("click", function() {
    alert("Updating the chart!");

    var maxValue = 50; 
    var numValue = dataset.length;
    dataset = [];
    for (var i = 0; i < numValue; i++){
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);
    }

    // Rescale the xScale for new dataset length
    xScale.domain(d3.range(dataset.length));

    // Update the bars (rects)
    var bars = svg.selectAll("rect")
        .data(dataset);

    bars.enter()
        .append("rect")
        .merge(bars)
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d);
        })
        .style("fill", "#cfc4ae");

    // Update the text labels
    var texts = svg.selectAll("text")
        .data(dataset);

    texts.enter()
        .append("text")
        .merge(texts)
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            return h - yScale(d) + 15; // Adjust the label placement
        })
        .attr("font-size", "15px")
        .attr("text-anchor", "middle")
        .style("fill", "white");
});
