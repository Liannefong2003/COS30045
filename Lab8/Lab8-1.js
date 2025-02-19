

//width and height
var w = 500;
var h = 300;

var projection = d3.geoMercator()
                    .center([145,-36.5])
                    .translate([w/2,h/2])
                    .scale(2450);

var path = d3.geoPath()
            .projection(projection);

var svg = d3.select("#chart")
            .append("svg")
            .attr("width",w)
            .attr("height",h)
            .attr("fill","grey");

d3.json("https://raw.githubusercontent.com/Liannefong2003/COS30045/refs/heads/main/COS30045%208.1%20and%208.2%20Resources/LGA_VIC.json").then(function(json){
    
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d",path);
});