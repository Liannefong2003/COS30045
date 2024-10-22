var width = 300;
var height = 300;
var margin = 30;
var dataset = [
            { apples: 5, oranges: 10, grapes: 22},
            { apples: 4, oranges: 12, grapes: 28},
            { apples: 2, oranges: 19, grapes: 32},
            { apples: 7, oranges: 23, grapes: 35},
            { apples: 23, oranges: 17, grapes: 43}
        ];

var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg=d3.select("#chart")
            .append("svg")
            .attr("width",width)
            .attr("height",height);

var stack = d3.stack()
            .keys(["apples","oranges","grapes"]);

var series = stack(dataset);

var groups = svg.selectAll("g")
                .data(series)
                .enter()
                .append("g")
                .style("fill",function(d,i){
                    return color(i);
                })

var xScale = d3.scaleBand()
            .domain(d3.range(dataset.length))
            .range([0, width])
            .padding(0.1);

var yScale = d3.scaleLinear()
                .domain([0,d3.max(dataset,function(d){
                    return d.apples + d.oranges + d.grapes;
                })
            ])
            .range([height-margin,0]);

var rects = groups.selectAll("rect")
             .data(function(d){ return d;})
             .enter()
             .append("rect")
             .attr("x",function(d,i){
                return xScale(i);
             })
             .attr("y",function(d,i){
                return yScale(d[1]);
             })
             .attr("height",function(d){
                return yScale(d[0])-yScale(d[1]);
             })
             .attr("width",xScale.bandwidth());


// select the svg area
var svg = d3.select("#my_dataviz")

// Handmade legend
svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#3b75af")
svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#ef8636")
svg.append("circle").attr("cx",200).attr("cy",190).attr("r", 6).style("fill", "#519e3e")
svg.append("text").attr("x", 220).attr("y", 130).text("Apple").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 220).attr("y", 160).text("Orange").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 220).attr("y", 190).text("Grape").style("font-size", "15px").attr("alignment-baseline","middle")

