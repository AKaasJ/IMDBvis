<?php
/**
 * Created by PhpStorm.
 * User: cristiprg
 * Date: 1/24/2016
 * Time: 1:20 AM
 */

// http://php.net/manual/en/function.array-search.php#91365
function recursive_array_search($needle,$haystack) {
    foreach($haystack as $key=>$value) {
        $current_key=$key;
        if($needle===$value OR (is_array($value) && recursive_array_search($needle,$value) !== false)) {
            return $current_key;
        }
    }
    return false;
}

/**
 * Checks whether there should be a link between movie1 and movie2, aka movie1 and movie2 are similar
 * TODO: needs refinement - now it's more or less a placeholder, just to prove the concept, we consider similar if they at least three common actors
 * CAUTION: reads the sliders global variables (received by the GET request)
 * @param $movie1
 * @param $movie2
 * @param $actors list of common actors of movie1 and movie2
 * @return true if movie1 and movie2 are similar, false otherwise
 */
function checkLinkRequirements($movie1, $movie2, $actors){
    return count($actors) >= 3;
}

require "include/php/mysql_connection.php";
require "include/php/data_access_layer.php";
$con = connectToMySQL();

// get slider values
$common_cast_slider_value = $_GET['common_cast_slider_value'];
$common_genre_slider_value = $_GET['common_genre_slider_value'];
$common_director_slider_value = $_GET['common_director_slider_value'];
$score_filter_slider_value = $_GET['score_filter_slider_value'];

//$result = mysql_query("SELECT * FROM `name` WHERE id='". $id ."'", $con);
// table links (link_id, movie1_id, movie2_id);
// $resultLinks = [ [1, 1, 2], [2, 2, 3], [3, 2, 4]]


$movies = getTop250Movies($con);
$commonCast = getCommonCast($con);

if(!movies or !$commonCast){
    die('Could not get data: ' . mysql_error());
}

$trimmedResult = array();

// generate the d3graph-friendly object, ready to be json-serialized

// firstly, create all the nodes
// TODO: nodes are the same for each request (as in top 250), only the links change (this is little overhead anyway)
foreach($movies as $movie)
{
    $trimmedResult['nodes'][] = array(
        'id' => $movie['title'],
        //'size' => 60, //new
        //'score' => 0, //new
        //'type' => Circle, //new
        //'group' => 1, //old
    );
}

// secondly, add a link for each <movie1, movie2> pair
// this may be a bit tricky, because the links are defined as
// pair of indeces of the previously defined nodes
// TODO: replace super-slow and unnecessary recursive array search with something more intelligent for finding the index of a movie

$links = array();
foreach ($commonCast as $movie1 => $value) {
    // $value is an array of movie2 => list_of_actors

    $movie1_index = recursive_array_search($movie1, $movies);
    foreach($value as $movie2 => $actors) {

        // compute score for the <movie1, movie2> pair
        $score = 0;
        $score += count($actors) * $common_cast_slider_value;


        $movie2_index = recursive_array_search($movie2, $movies);
        $links[] = array(
            'source' => $movie1_index,
            'target' => $movie2_index,
            '__score' => $score // TODO: avoid including this in the response
        );
    }
}

// sort the links and retain the X % percent, as specified in the filter slide
usort($links, function($a, $b) {
    return $b['__score'] - $a['__score'];
});

$links = array_slice($links, 0, count($links) * $score_filter_slider_value/100, true);

$trimmedResult['links'] = $links;

echo json_encode($trimmedResult);

mysql_close($con);
