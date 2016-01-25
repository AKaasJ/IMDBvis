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
var common_genre_slider_max = 15;

var common_director_slider_min = 0;
var common_director_slider_max = 20;

var score_filter_slider_min = 0;
var score_filter_slider_max = 50;

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
}

function initializeSliders() {
    // 1. initialize common cast slider
    // add div container for common cast slider
    var common_cast_slider_container = d3.select("#slidersCanvas").append("div").attr("id", "common_cast_slider_container");

    // add description for common cast slider
    common_cast_slider_container.append("div").attr("id", "common_cast_slider_description").text("Extra points for each common actor");

    // add div for common cast slider
    common_cast_slider_container.append("div").attr("id", "common_cast_slider");
    common_cast_slider = d3.slider().min(common_cast_slider_min).max(common_cast_slider_max).ticks(10).showRange(true).value(6);
    d3.select("#common_cast_slider").call(common_cast_slider);


    // 2. initialize common genre slider
    // add div container for common genre slider
    var common_genre_slider_container = d3.select("#slidersCanvas").append("div").attr("id", "common_genre_slider_container");

    // add description for common genre slider
    common_genre_slider_container.append("div").attr("id", "common_genre_slider_description").text("Extra points for each common genre");

    // add div for common genre slider
    common_genre_slider_container.append("div").attr("id", "common_genre_slider");
    common_genre_slider = d3.slider().min(common_genre_slider_min).max(common_genre_slider_max).ticks(10).showRange(true).value(6);
    d3.select("#common_genre_slider").call(common_genre_slider);


    // 3. initialize common director slider
    // add div container for common director slider
    var common_director_slider_container = d3.select("#slidersCanvas").append("div").attr("id", "common_director_slider_container");

    // add description for common director slider
    common_director_slider_container.append("div").attr("id", "common_director_slider_description").text("Extra points for a common director");

    // add div for common director slider
    common_director_slider_container.append("div").attr("id", "common_director_slider");
    common_director_slider = d3.slider().min(common_director_slider_min).max(common_director_slider_max).ticks(10).showRange(true).value(6);
    d3.select("#common_director_slider").call(common_director_slider);

    // 4. initialize score filter slider
    // add div container for common director slider
    var score_filter_slider_container = d3.select("#slidersCanvas").append("div").attr("id", "score_filter_slider_container");

    // add description for score filter slider
    score_filter_slider_container.append("div").attr("id", "score_filter_slider_description").text("Retain only first X % of the edges");

    // add div for score filter slider
    score_filter_slider_container.append("div").attr("id", "score_filter_slider");
    score_filter_slider = d3.slider().min(score_filter_slider_min).max(score_filter_slider_max).ticks(10).showRange(true).value(6);
    d3.select("#score_filter_slider").call(score_filter_slider);
}