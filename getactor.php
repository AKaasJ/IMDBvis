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

require "include/php/mysql_connection.php";
require "include/php/data_access_layer.php";
$con = connectToMySQL();

$id = $_GET['id'];

//$result = mysql_query("SELECT * FROM `name` WHERE id='". $id ."'", $con);
// table links (link_id, movie1_id, movie2_id);
// $resultLinks = [ [1, 1, 2], [2, 2, 3], [3, 2, 4]]


$movies = getTop250Movies($con);
$commonCast = getCommonCast($con);
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
foreach ($commonCast as $movie1 => $value) {
    // $value is an array of movie2 => list_of_actors

    $movie1_index = recursive_array_search($movie1, $movies);
    foreach($value as $movie2 => $actors) {

        $movie2_index = recursive_array_search($movie2, $movies);
        $trimmedResult['links'][] = array(
            'source' => $movie1_index,
            'target' => $movie2_index
        );
    }
}

if(!$trimmedResult){
    die('Could not get data: ' . mysql_error());
}

echo json_encode($trimmedResult);

mysql_close($con);
