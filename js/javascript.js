/**
 * Created by cristiprg on 1/23/2016.
 */

function sayHello(){
    var id = document.getElementById("ID_input").value;
    var actor_movies;
    $.get("getactor.php?id=123", function(data) {
        //alert(data);

        //alert(actor_movies);

        console.log(data);
        displayMainCanvas(data);
    });
}


function displayMainCanvas(actor_movies){
     jsonFile =
    '{ \
        "nodes":[\
        {"name":"node1","group":1},\
        {"name":"node2","group":2},\
        {"name":"node3","group":2},\
        {"name":"node4","group":3}\
    ],\
        "links":[\
        {"source":2,"target":1,"weight":1},\
        {"source":0,"target":2,"weight":3}\
    ]\
    }';

    jsonFile = actor_movies;

    //console.log(jsonFile);
    json = JSON.parse(jsonFile);
    //json = actor_movies;
    var width = 1600,
        height = 900;

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var force = d3.layout.force()
        .gravity(.05)
        .distance(100)
        .charge(-100)
        .size([width, height]);
    force
        .nodes(json.nodes)
        .links(json.links)
        .start();

    var link = svg.selectAll(".link")
        .data(json.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.sqrt(d.weight); });

    var node = svg.selectAll(".node")
        .data(json.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    node.append("circle")
        .attr("r","5");

    node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.name });

    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });

   // alert(movieJSON);
}