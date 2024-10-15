

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

d3.json("../COS30045 8.1 and 8.2 Resources/LGA_VIC.json").then(function(json){
    
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d",path);
});
var color = d3.scaleQuantize()
                .range(["rgba(242,240,247)","rgba(203,201,226)","rgba(158,154,200)","rgba(117,107,177)","#rgba(84,39,143)"]);

d3.csv("../COS30045 8.1 and 8.2 Resources/LGA_VIC.json",function(json){
    for(var i=0;i<data.length;i++){
        var dataState=data[i].state;
        var dataValue=parseFloat(data[i].value);

        for (var j=0;j<json.features.length;j++){
            var jsonState = json.feature[j].properties.name;

            if(dataState == jsonState){
                json.features[j].properties.value = dataValue;
                break;
            }
        
        }
    }
})