/**
 * Created by andreas on 25-1-16.
 * Original source: http://bl.ocks.org/eyaler/10586116
 */

var graphSVGOffset = 50;
var clicked_time;
/**
 * Displays loading gif and hides everything else (just the canvas ... )
 * @param isLoading
 */
function showLoadingState(isLoading) {
    if (isLoading){
        // show loading gif
        $('#loading').show();

        // hide main canvas
        $('#mainCanvas').hide();
    }
    else {
        // hide loading gif
        $('#loading').hide();

        // show main canvas
        $('#mainCanvas').show();
    }

}

var selected_slider_value = 0;
var max_selected_slider_value = 0; // max of one of the three sliders in the control panel


function sayHello(){

    // button clicked - get the data
    // get values of sliders
    var common_cast_slider_value = common_cast_slider.value();
    var common_genre_slider_value = common_genre_slider.value();
    var common_director_slider_value = common_director_slider.value();
    //var score_filter_slider_value = score_filter_slider.value();

    var requestString = "getactor.php?";
    // get values of the radio buttons
    selected_radio=$('input[name="sliders_radio_control_panel"]:checked').val();
    switch (selected_radio){
        case "common_cast_slider":
            requestString = requestString.concat("common_cast_slider_value=", common_cast_slider_value);
            selected_slider_value = common_cast_slider_value;
            max_selected_slider_value = common_cast_slider_max;
            break;
        case "common_genre_slider":
            requestString = requestString.concat("&common_genre_slider_value=", common_genre_slider_value);
            selected_slider_value = common_genre_slider_value;
            max_selected_slider_value = common_genre_slider_max;
            break;
        case "common_director_slider":
            requestString = requestString.concat("&common_director_slider_value=", common_director_slider_value);
            selected_slider_value = common_director_slider_value;
            max_selected_slider_value = common_director_slider_max;
            break;
        default:
            alert("Please select a radio button");
            return;
    }

    // round the numbers
    selected_slider_value = Math.round(parseInt(selected_slider_value));
    max_selected_slider_value = Math.round(parseInt(max_selected_slider_value));

    // issue GET request
    //requestString = requestString.concat("&score_filter_slider_value=", score_filter_slider_value);
    requestString = requestString.concat("&selected_radio=", selected_radio);

    showLoadingState(true);
    $.get(requestString, function(data){
        //console.log(data);

        showLoadingState(false);

        displayMainCanvas(data);

        addEventsToNodes(); // for the bottom slide-menu

        addTimerForNodes();
    });
}

function addTimerForNodes(){
    var start_time;
    function start() {
        start_time = new Date();
    }
    function end() {
        var now = new Date();
        clicked_time = now-start_time;
    }

    $('.c-button').mousedown(start);
    $('.c-button').mouseup(end);

}


function displayMainCanvas(actor_movies) {
    displayGraph(actor_movies);
}

function addEventsToNodes() {

    var slideBottom = new Menu({
        wrapper: '#o-wrapper',
        type: 'slide-bottom',
        menuOpenerClass: '.c-button',
        maskId: '#c-mask'
    });

    var slideBottomBtn = document.querySelectorAll('#c-button--slide-bottom');
    var i;

    for (i=0; i < slideBottomBtn.length; i++) {

        slideBottomBtn[i].addEventListener('click', function (e) {
            e.preventDefault;

            if (clicked_time < 300)
                slideBottom.open();
        });
    }

}

/**
 * Shows a popup with information about the movie and its neighbours
 * @param data
 */
function displayMovieInformation(data){
    data = JSON.parse(data);
    displayBreadCrumbs(data.navigation_history);
    displayParticularMovieInformation(data);
    displayStackedBarChart(data);
}

/**
 * Adds a button for each element in the array
 * @param navigation_history - array of strings
 */
function displayBreadCrumbs(navigation_history){
    d3.select("#bread_crumbs div").remove();
    var container = d3.select("#bread_crumbs").append("div");

    for(var i = navigation_history.length-1; i >= 1; --i) { // greater than 1 because we don't want to display the current movie
        movie_title = navigation_history[i];
        //console.log(title);
        container.append("button")
            .on("mousedown", function (d, i) {
                console.log(this);
                $.get("/requestHandlers/getMovieInformation.php", {"movieTitle": this.id}, function (data) {
                    displayMovieInformation(data);
                });
            })
            .attr("class", "c-menu__bread_crumb")
            .attr("id", movie_title)
            .text("\u2190 " + movie_title);


    }
}

function displayParticularMovieInformation(data){
    // set the title
    d3.select("#c-menu-table #movie_info #title").text(data.movie_data.title + " (" + (data.movie_data.production_year) + ")");

    // set the rating
    d3.select("#c-menu-table #movie_info #rating").text("Rating: " + (data.movie_data.rating));

    // set the poster
    d3.select("#c-menu-table #movie_info #poster").attr("src", data.movie_data.cover_url);
}

function displayStackedBarChart(data){

    // get all the movies
    movies_categories = [];
    commonActorsData = ['\u000A \u000A Common Actors'];
    commonGenresData = ['Common Genres'];
    commonDirectorsData = ['Common Directors'];

    //            commonActorsData.push(data.commonCast[movie].length);

    for (movie in data.commonCast){
        if ($.inArray(movie, movies_categories) == -1) //avoid duplicates
            movies_categories.push(movie);
    }
    for (movie in data.commonGenres){
        if ($.inArray(movie, movies_categories) == -1) { //avoid duplicates
            movies_categories.push(movie);
        }
    }
    for (movie in data.commonDirectors){
        if ($.inArray(movie, movies_categories) == -1) //avoid duplicates
            movies_categories.push(movie);
    }

    // populate bar chart data
    var i = 0;
    for (i=0; i < movies_categories.length; ++i){
        movie = movies_categories[i];

        commonActorsData.push(data.commonCast == null || data.commonCast[movie] === undefined ? 0 : data.commonCast[movie].length);
        commonGenresData.push(data.commonGenres == null || data.commonGenres[movie] === undefined ? 0 : data.commonGenres[movie].length);
        commonDirectorsData.push(data.commonDirectors == null  || data.commonDirectors[movie] === undefined ? 0 : data.commonDirectors[movie].length);
    }

    var chart = c3.generate({
        bindto: '#chart',
        data: {
            onclick: function(d, i){

                selected_movies = movies_categories[d.x];

                $.get("/requestHandlers/getMovieInformation.php", {"movieTitle" : selected_movies }, function (data){
                    displayMovieInformation(data);
                });
            },
            columns: [
                commonActorsData,
                commonGenresData,
                commonDirectorsData
            ],
            type: 'bar',
            groups: [
                [commonActorsData[0], commonGenresData[0], commonDirectorsData[0]]
            ]
        },
        grid: {
            y: {
                lines: [{value:0}]
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: movies_categories
            },
            y :{
                label: 'number of common elements',
                position: 'outer-middle'
            }
        },
        legend: {
            position : "right"
        },
        zoom: {
            enabled : true
        }
    });

    d3.select('#chart svg').append('text')
        .attr('x', d3.select('#chart svg').node().getBoundingClientRect().width / 2)
        .attr('y', 16)
        .attr('text-anchor', 'middle')
        .style('font-size', '1.4em')
        .text('Elements in common with other movies');
}


/**
 * Displays the force graph of movies
 * @param actore_movies
 */
function displayGraph(actor_movies){

    // delete current canvas
    d3.select("#mainCanvas svg").remove();
    jsonFile = actor_movies;

    var w = $('#mainCanvas').width() - graphSVGOffset;
    var h = window.innerHeight;

    var keyc = true, keys = true, keyt = true, keyr = true, keyx = true, keyd = true, keyl = true, keym = true, keyh = true, key1 = true, key2 = true, key3 = true, key0 = true

    var focus_node = null, highlight_node = null;

    var text_center = false;
    var outline = false;

    var min_score = 0;
    var max_score = 1;

    // encoding of production year 1921 -> 2015, hardcoded for now -- that makes me a saaad pandaa
    // color scale is defined in the appinit.js
    // link_thickness is defined in the appinit.js
    link_thickness = d3.scale.pow()
        .domain([selected_slider_value, max_selected_slider_value])
        .range([.5, 5]);
    updateLineThicknessLegend(link_thickness);
    var size = d3.scale.linear()
        .domain([8.0, 9.3])
        .range([10, 30]);


    var highlight_color = "blue";
    var highlight_trans = 0.1;
/*
    var size = d3.scale.pow().exponent(1)
        .domain([1,100])
        .range([8,24]);
*/
    var force = d3.layout.force()
        .linkDistance(150)
        .charge(-300)
        .size([w,h]);

    //var default_node_color = "#ccc";

//var default_node_color = "rgb(3,190,100)";
    var default_link_color = "#888";
    var nominal_base_node_size = 8;
    var nominal_text_size = 10;
    var max_text_size = 24;
    var nominal_stroke = 1.5;
    var max_stroke = 4.5;
    var max_base_node_size = 36;
    var min_zoom = 0.1;
    var max_zoom = 7;


    var svg = d3.select("#mainCanvas").append("svg");
    var g = svg.append("g");

    var zoom = d3.behavior.zoom().scaleExtent([min_zoom,max_zoom])

    svg.style("cursor","move");

    graph = JSON.parse(jsonFile);

        var linkedByIndex = {};
        graph.links.forEach(function(d) {
            linkedByIndex[d.source + "," + d.target] = true;
        });

        function isConnected(a, b) {
            return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
        }

        function hasConnections(a) {
            for (var property in linkedByIndex) {
                s = property.split(",");
                if ((s[0] == a.index || s[1] == a.index) && linkedByIndex[property]) 					return true;
            }
            return false;
        }

        force
            .nodes(graph.nodes)
            .links(graph.links)
            .start();

        var link = g.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d){
                return link_thickness(d.common_elements);
            })
            .style("stroke", function(d) {
                if (isNumber(d.score) && d.score>=0) return color(d.score);
                else return default_link_color; })


        var node = g.selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("id", "c-button--slide-bottom")
            .attr("class", "c-button")
            .call(force.drag)


        node.on("dblclick.zoom", function(d) { d3.event.stopPropagation();
            var dcx = (window.innerWidth/2-d.x*zoom.scale());
            var dcy = (window.innerHeight/2-d.y*zoom.scale());
            zoom.translate([dcx,dcy]);
            g.attr("transform", "translate("+ dcx + "," + dcy  + ")scale(" + zoom.scale() + ")");


        });




        var tocolor = "fill";
        var towhite = "stroke";
        if (outline) {
            tocolor = "stroke"
            towhite = "fill"
        }



        var circle = node.append("path")


            .attr("d", d3.svg.symbol()
                .size(function(d) { return Math.PI*Math.pow(size(d.size)||nominal_base_node_size,2); })
                .type(function(d) { return d.type; }))
                //.type("polygon")

            .style(tocolor, function(d) {
                if (isNumber(d.production_year) && d.production_year>=0) return color(d.production_year);
                else return default_node_color; })
            //.attr("r", function(d) { return size(d.size)||nominal_base_node_size; })
            .style("stroke-width", nominal_stroke)
            //.style("stroke-width", function(d){
            //    return node_size_scale(d.rating);
            //})
            //.style("stroke", function(d) { // set the stroke to the same color
            //    if (isNumber(d.production_year) && d.production_year>=0) return color(d.production_year);
            //    else return default_node_color; })
            .style(towhite, "white");


        var text = g.selectAll(".text")
            .data(graph.nodes)
            .enter().append("text")
            .attr("dy", ".35em")
            .style("font-size", nominal_text_size + "px")

        if (text_center)
            text.text(function(d) { return d.id; })
                .style("text-anchor", "middle");
        else
            text.attr("dx", function(d) {return (size(d.size)||nominal_base_node_size);})
                .text(function(d) { return '\u2002'+d.id; });

        node.on("mouseover", function(d) {
                set_highlight(d);
            })
            .on("mousedown", function(d) { d3.event.stopPropagation();
                focus_node = d;
                set_focus(d);
                if (highlight_node === null) set_highlight(d);

                // get (and display afterwards) information about the selected movie
                $.get("/requestHandlers/getMovieInformation.php", {"movieTitle" : d.id }, function (data){
                    displayMovieInformation(data);
                });
/*
                $.ajax({
                    url: "/requestHandlers/getMovieInformation.php",
                    data : {"movieTitle" : d.id }
                });*/

            }	).on("mouseout", function(d) {
            exit_highlight();

        }	);

        d3.select(window).on("mouseup",
            function() {
                if (focus_node!==null)
                {
                    focus_node = null;
                    if (highlight_trans<1)
                    {

                        circle.style("opacity", 1);
                        text.style("opacity", 1);
                        link.style("opacity", 1);
                    }
                }

                if (highlight_node === null) exit_highlight();
            });

        function exit_highlight()
        {
            highlight_node = null;
            if (focus_node===null)
            {
                svg.style("cursor","move");
                if (highlight_color!="white")
                {
                    circle.style(towhite, "white");
                    text.style("font-weight", "normal");
                    link.style("stroke", function(o) {return (isNumber(o.score) && o.score>=0)?color(o.score):default_link_color});
                }

            }
        }

        function set_focus(d)
        {
            if (highlight_trans<1)  {
                circle.style("opacity", function(o) {
                    return isConnected(d, o) ? 1 : highlight_trans;
                });

                text.style("opacity", function(o) {
                    return isConnected(d, o) ? 1 : highlight_trans;
                });

                link.style("opacity", function(o) {
                    return o.source.index == d.index || o.target.index == d.index ? 1 : highlight_trans;
                });
            }
        }


        function set_highlight(d)
        {
            svg.style("cursor","pointer");
            if (focus_node!==null) d = focus_node;
            highlight_node = d;

            if (highlight_color!="white")
            {
                circle.style(towhite, function(o) {
                    return isConnected(d, o) ? highlight_color : "white";});
                text.style("font-weight", function(o) {
                    return isConnected(d, o) ? "bold" : "normal";});
                link.style("stroke", function(o) {
                    return o.source.index == d.index || o.target.index == d.index ? highlight_color : ((isNumber(o.score) && o.score>=0)?color(o.score):default_link_color);

                });
            }
        }


        zoom.on("zoom", function() {

            var stroke = nominal_stroke;
            if (nominal_stroke*zoom.scale()>max_stroke) stroke = max_stroke/zoom.scale();
            link.style("stroke-width", function (d){
                return link_thickness(d.common_elements) * zoom.scale();
            });

            circle.style("stroke-width",stroke);
            //circle.style("stroke-width",function(d){
            //    return node_size_scale(d.rating);
            //});

            var base_radius = nominal_base_node_size;
            if (nominal_base_node_size*zoom.scale()>max_base_node_size) base_radius = max_base_node_size/zoom.scale();
            circle.attr("d", d3.svg.symbol()
                .size(function(d) { return Math.PI*Math.pow(size(d.size)*base_radius/nominal_base_node_size||base_radius,2); })
                .type(function(d) { return d.type; }))

            //circle.attr("r", function(d) { return (size(d.size)*base_radius/nominal_base_node_size||base_radius); })
            if (!text_center) text.attr("dx", function(d) { return (size(d.size)*base_radius/nominal_base_node_size||base_radius); });

            var text_size = nominal_text_size;
            if (nominal_text_size*zoom.scale()>max_text_size) text_size = max_text_size/zoom.scale();
            text.style("font-size",text_size + "px");

            g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        });

        svg.call(zoom);

        resize();
        //window.focus();
        d3.select(window).on("resize", resize).on("keydown", keydown);

        force.on("tick", function() {

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            text.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });

        function resize() {
            var width = window.innerWidth, height = window.innerHeight;
            width = $("#mainCanvas").width() - graphSVGOffset;
            svg.attr("width", width).attr("height", height);

            force.size([force.size()[0]+(width-w)/zoom.scale(),force.size()[1]+(height-h)/zoom.scale()]).resume();
            w = width;
            h = height;
        }

        function keydown() {
            if (d3.event.keyCode==32) {  force.stop();}
            else if (d3.event.keyCode>=48 && d3.event.keyCode<=90 && !d3.event.ctrlKey && !d3.event.altKey && !d3.event.metaKey)
            {
                switch (String.fromCharCode(d3.event.keyCode)) {
                    case "C": keyc = !keyc; break;
                    case "S": keys = !keys; break;
                    case "T": keyt = !keyt; break;
                    case "R": keyr = !keyr; break;
                    case "X": keyx = !keyx; break;
                    case "D": keyd = !keyd; break;
                    case "L": keyl = !keyl; break;
                    case "M": keym = !keym; break;
                    case "H": keyh = !keyh; break;
                    case "1": key1 = !key1; break;
                    case "2": key2 = !key2; break;
                    case "3": key3 = !key3; break;
                    case "0": key0 = !key0; break;
                }

                link.style("display", function(d) {
                    var flag  = vis_by_type(d.source.type)&&vis_by_type(d.target.type)&&vis_by_node_score(d.source.score)&&vis_by_node_score(d.target.score)&&vis_by_link_score(d.score);
                    linkedByIndex[d.source.index + "," + d.target.index] = flag;
                    return flag?"inline":"none";});
                node.style("display", function(d) {
                    return (key0||hasConnections(d))&&vis_by_type(d.type)&&vis_by_node_score(d.score)?"inline":"none";});
                text.style("display", function(d) {
                    return (key0||hasConnections(d))&&vis_by_type(d.type)&&vis_by_node_score(d.score)?"inline":"none";});

                if (highlight_node !== null)
                {
                    if ((key0||hasConnections(highlight_node))&&vis_by_type(highlight_node.type)&&vis_by_node_score(highlight_node.score)) {
                        if (focus_node!==null) set_focus(focus_node);
                        set_highlight(highlight_node);
                    }
                    else {exit_highlight();}
                }

            }
        }

    function vis_by_type(type)
    {
        switch (type) {
            case "circle": return keyc;
            case "square": return keys;
            case "triangle-up": return keyt;
            case "diamond": return keyr;
            case "cross": return keyx;
            case "triangle-down": return keyd;
            default: return true;
        }
    }
    function vis_by_node_score(score)
    {
        if (isNumber(score))
        {
            if (score>=0.666) return keyh;
            else if (score>=0.333) return keym;
            else if (score>=0) return keyl;
        }
        return true;
    }

    function vis_by_link_score(score)
    {
        if (isNumber(score))
        {
            if (score>=0.666) return key3;
            else if (score>=0.333) return key2;
            else if (score>=0) return key1;
        }
        return true;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }





}