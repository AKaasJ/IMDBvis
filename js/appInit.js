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
var common_cast_slider_max = 40;

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
}

/**
 * Displays the sliders used to filter out links
 */
function displaySlidersCanvas(){

    initializeSliders();

    color = d3.scale.linear()
        .domain([1921, 2015])
        .range(["black", "red"]);
    // show the legend
    colorlegend("#productionYearLegend", color, "linear", {title: "production year", vertical: true, linearBoxes : 50, boxHeight : 10 });


    link_thickness = d3.scale.pow()
        .domain([3, 40])
        .range(["#888", "#888"]);
    updateLineThicknessLegend(link_thickness);
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

    common_cast_slider = d3.slider().min(common_cast_slider_min).max(common_cast_slider_max).ticks(2).showRange(true).value(3);
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
    common_genre_slider = d3.slider().min(common_genre_slider_min).max(common_genre_slider_max).ticks(5).showRange(true).value(3);
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
    common_director_slider = d3.slider().min(common_director_slider_min).max(common_director_slider_max).ticks(2).showRange(true).value(1);
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