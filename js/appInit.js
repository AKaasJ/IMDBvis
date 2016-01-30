/**
 * Created by cristiprg on 24-1-16.
 */


/**
 * Initialize some global variables throughout the application:
 *  - sliders
 */
var common_cast_slider;
var common_genre_slider;
var common_director_slider;
var score_filter_slider;

/**
 * Min and max values for each slider.
 */
var common_cast_slider_min = 0;
var common_cast_slider_max = 10;

var common_genre_slider_min = 0;
var common_genre_slider_max = 4;

var common_director_slider_min = 0;
var common_director_slider_max = 2;

var score_filter_slider_min = 0;
var score_filter_slider_max = 50;

var color;
var link_thickness;

function initializeApplication(){
    // hide loading gif
    $('#loading').hide();

    displaySlidersCanvas();

    // first selected slider is common cast;
    common_cast_slider.isSelected(true);

    // start!!!
    sayHello();
}

/**
 * Displays:
 * 1) the sliders used to filter out links
 * 2) legend
 */
function displaySlidersCanvas(){
    initializeSliders();
    displayLegend();
}

function displayLegend(){

    // 1. production year color legend
    color = d3.scale.linear()
        .domain([1921, 2015])
        .range(["black", "red"]);
    // show the legend
    colorlegend("#productionYearLegend", color, "linear", {title: "production year", vertical: true, linearBoxes : 50, boxHeight : 10 });


    // 2. line thickness legend
    link_thickness = d3.scale.pow()
        .domain([3, common_cast_slider_max])
        .range(["#888", "#888"]);
    updateLineThicknessLegend(link_thickness);

    //// 3. node size legend
    //target = "nodeSizeLegend";
    //htmlElement = document.getElementById(target);
    //w = htmlElement.offsetWidth;          // width of container element
    //h = htmlElement.offsetHeight;         // height of container element
    //sizeSmallNode = 10;
    //sizeBigNode = 20;
    //var svg = d3.select("#".concat(target))
    //    .append("svg")
    //        .attr('width', w)
    //        .attr('height', h);
    //svg.append("circle")
    //    .attr("r", sizeSmallNode) // set here the size!!!
    //    .attr("cy", h/8)
    //    .attr("cx", w/2-1);
    //svg.append("circle")
    //    .attr("r", sizeBigNode) // set here the size!!!
    //    .attr("cy", h/2)
    //    .attr("cx", w/2-2);
    //
    //var triangle=d3.svg.symbol().type("triangle-up").size(sizeBigNode*50);
    //
    //svg.append("path")
    //    .attr("d", triangle)
    //    .attr("transform", "translate("+(w/2-2)+","+(5*h/6)+")");
//<svg width="640" height="480" xmlns="http://www.w3.org/2000/svg">
//        <!-- Created with SVG-edit - http://svg-edit.googlecode.com/ -->
//<g>
//    <title>Layer 1</title>
//    <circle id="svg_1" r="57.675461" cy="196.500009" cx="78.999998" stroke-width="5" stroke="#000000" fill="#FF0000"/>
//        <circle id="svg_2" r="31.919709" cy="71.000002" cx="82.999999" stroke-width="5" stroke="#000000" fill="#FF0000"/>
//        <rect id="svg_3" height="165" width="165" y="288" x="19" stroke-linecap="null" stroke-linejoin="null" stroke-width="5" stroke="#000000" fill="#FF0000"/>
//        <text xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" id="svg_4" y="76" x="217" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">Rating 8.0</text>
//    <text xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" id="svg_5" y="187" x="210" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">Rating 8.8</text>
//    <text xml:space="preserve" text-anchor="middle" font-family="serif" font-size="24" id="svg_6" y="366" x="252" stroke-linecap="null" stroke-linejoin="null" stroke-width="0" stroke="#000000" fill="#000000">Rating &gt; 8.8</text>
//        </g>
//        </svg>



}

function updateLineThicknessLegend(link_thickness){
    d3.select("#lineThicknessLegend svg").remove();
    colorlegend("#lineThicknessLegend", link_thickness, "custom_pow", {title: "edge thickness (# common)", vertical: true, linearBoxes : 50, boxHeight : 10 });
}

function initializeSliders() {
    // 1. initialize common cast slider
    // add div container for common cast slider
    var common_cast_slider_container = d3.select("#slidersCanvas form").append("div").attr("id", "common_cast_slider_container");

    // add description for common cast slider
    common_cast_slider_container.append("div").attr("id", "common_cast_slider_description").text("Minimum actors in common:");

    // add radion button
    common_cast_slider_container.append("input")
        .attr("type", "radio")
        .attr("class", "slider-radio")
        .attr("value", "common_cast_slider")
        .attr("name", "sliders_radio_control_panel")
        .attr("checked", "true");

    // add div for common cast slider
    common_cast_slider_container.append("div").attr("id", "common_cast_slider");

    common_cast_slider = d3.slider().min(common_cast_slider_min).max(common_cast_slider_max).ticks(2).showRange(true).value(3)
        .callback(function (slider){
            if (slider.isSelected())
                theGraph.threshold(slider.value());
        });
    d3.select("#common_cast_slider").call(common_cast_slider);



    // 2. initialize common genre slider
    // add div container for common genre slider
    var common_genre_slider_container = d3.select("#slidersCanvas form").append("div").attr("id", "common_genre_slider_container");

    // add description for common genre slider
    common_genre_slider_container.append("div").attr("id", "common_genre_slider_description").text("Minimum genres in common:");

    // add radion button
    common_genre_slider_container.append("input")
        .attr("type", "radio")
        .attr("class", "slider-radio")
        .attr("value", "common_genre_slider")
        .attr("name", "sliders_radio_control_panel");

    // add div for common genre slider
    common_genre_slider_container.append("div").attr("id", "common_genre_slider");
    common_genre_slider = d3.slider().min(common_genre_slider_min).max(common_genre_slider_max).ticks(5).showRange(true).value(3)
        .callback(function (slider){
            if (slider.isSelected())
                theGraph.threshold(slider.value());
        });;
    d3.select("#common_genre_slider").call(common_genre_slider);


    // 3. initialize common director slider
    // add div container for common director slider
    var common_director_slider_container = d3.select("#slidersCanvas form").append("div").attr("id", "common_director_slider_container");

    // add description for common director slider
    common_director_slider_container.append("div").attr("id", "common_director_slider_description").text("Same director:");

    // add radion button
    common_director_slider_container.append("input")
        .attr("type", "radio")
        .attr("class", "slider-radio")
        .attr("value", "common_director_slider")
        .attr("name", "sliders_radio_control_panel");

    // add div for common director slider
    common_director_slider_container.append("div").attr("id", "common_director_slider");
    common_director_slider = d3.slider().min(common_director_slider_min).max(common_director_slider_max).ticks(2).showRange(true).value(1)
        .callback(function (slider){
            if (slider.isSelected())
                theGraph.threshold(slider.value());
        });;
    d3.select("#common_director_slider").call(common_director_slider);
    //
    //// 4. initialize score filter slider
    //// add div container for common director slider
    //var score_filter_slider_container = d3.select("#slidersCanvas").append("div").attr("id", "score_filter_slider_container");
    //
    //// add description for score filter slider
    //score_filter_slider_container.append("div").attr("id", "score_filter_slider_description").text("Retain only first X % of the edges");
    //
    //// add div for score filter slider
    //score_filter_slider_container.append("div").attr("id", "score_filter_slider");
    //score_filter_slider = d3.slider().min(score_filter_slider_min).max(score_filter_slider_max).ticks(10).showRange(true).value(6);
    //d3.select("#score_filter_slider").call(score_filter_slider);
}