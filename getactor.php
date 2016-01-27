<?php
/**
 * Created by PhpStorm.
 * User: cristiprg
 * Date: 1/24/2016
 * Time: 1:20 AM
 */

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

require "include/php/helper_functions.php";
$movieData = get_data();
$movies = $movieData['movies'];
$commonCast = $movieData['commonCast'];
$commonGenres = $movieData['commonGenres'];
$commonDirectors = $movieData['commonDirectors'];

// get slider values
$common_cast_slider_value = round($_GET['common_cast_slider_value']);
$common_genre_slider_value = round($_GET['common_genre_slider_value']);
$common_director_slider_value = round($_GET['common_director_slider_value']);
$score_filter_slider_value = round($_GET['score_filter_slider_value']);
$selected_radio = $_GET['selected_radio'];


$trimmedResult = array();

// generate the d3graph-friendly object, ready to be json-serialized

// firstly, create all the nodes
// TODO: nodes are the same for each request (as in top 250), only the links change (this is little overhead anyway)
foreach($movies as $movie)
{
    $trimmedResult['nodes'][] = array(
        'id' => $movie['title'],
        'production_year' => $movie['production_year'],
        'size' => $movie['rating'],
        'type' => "circle"
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

$scores = array(); // map <movie1_id, movie2_id, score>
$max_score = 0;
// subscore 1 - common cast subscore

if (strcmp($selected_radio, "common_cast_slider") == 0) {
    foreach ($commonCast as $movie1 => $value) {
        // $value is an array of movie2 => list_of_actors

        $movie1_index = recursive_array_search($movie1, $movies);
        foreach ($value as $movie2 => $actors) {

            // compute score for the <movie1, movie2> pair
            //$sub_score = count($actors) * $common_cast_slider_value;
            //$sub_score = count($actors) / $max_number_common_actors;
            $sub_score = (count($actors) >= $common_cast_slider_value) ? count($actors) : 0;

            if ($sub_score == 0) continue; // just for optimization

            $movie2_index = recursive_array_search($movie2, $movies);

            if (!isset($scores[$movie1_index][$movie2_index]))
                $scores[$movie1_index][$movie2_index] = 0;

            $scores[$movie1_index][$movie2_index] += $sub_score;
            $max_score = max($max_score, $sub_score);
        }
    }
}

// subscore 2 - common genres subscore
if (strcmp($selected_radio, "common_genre_slider") == 0) {
    foreach ($commonGenres as $movie1 => $value) {
        // $value is an array of movie2 => list_of_genres

        $movie1_index = recursive_array_search($movie1, $movies);
        foreach ($value as $movie2 => $genres) {

            // compute score for the <movie1, movie2> pair
            //$sub_score = count($genres) * $common_genre_slider_value;
            //$sub_score = count($genres) / $max_number_common_genres;
            $sub_score = (count($genres) >= $common_genre_slider_value) ? count($genres) : 0;

            if ($sub_score == 0) continue;

            $movie2_index = recursive_array_search($movie2, $movies);

            if (!isset($scores[$movie1_index][$movie2_index]))
                $scores[$movie1_index][$movie2_index] = 0;

            $scores[$movie1_index][$movie2_index] += $sub_score;
        }
    }
}


// subscore 3 - common directors subscore
if (strcmp($selected_radio, "common_director_slider") == 0) {
    foreach ($commonDirectors as $movie1 => $value) {
        // $value is an array of movie2 => list_of_genres

        $movie1_index = recursive_array_search($movie1, $movies);
        foreach ($value as $movie2 => $directors) {

            // compute score for the <movie1, movie2> pair
            //$sub_score = count($genres) * $common_genre_slider_value;
            //$sub_score = count($genres) / $max_number_common_genres;
            $sub_score = (count($directors) >= $common_director_slider_value) ? count($directors) : 0;

            if ($sub_score == 0) continue;

            $movie2_index = recursive_array_search($movie2, $movies);

            if (!isset($scores[$movie1_index][$movie2_index]))
                $scores[$movie1_index][$movie2_index] = 0;

            $scores[$movie1_index][$movie2_index] += $sub_score;
        }
    }
}

$threshold_score = $max_score * $score_filter_slider_value / 100;

//var_dump($max_score);
//var_dump($threshold_score);

$links = array();
foreach ($scores as $movie1_index => $value) {

    foreach($value as $movie2_index => $score){
  //      if ($score < $threshold_score) continue;

        $links[] = array(
            'source' => $movie1_index,
            'target' => $movie2_index,
            'common_elements' => $score
        );
    }
}

//// sort the links and retain the X % percent, as specified in the filter slide
//usort($links, function($a, $b) {
//    return $b['__score'] - $a['__score'];
//});
//
//$links = array_slice($links, 0, count($links) * $score_filter_slider_value/100, true);
////var_dump($links);

//var_dump(count($links));
$trimmedResult['links'] = $links;

echo json_encode($trimmedResult);

//mysql_close($con);
