<?php
///**
// * Created by PhpStorm.
// * User: cristiprg
// * Date: 25-1-16
// * Time: 0:02
// */
//
//require "include/php/mysql_connection.php";
//$con = connectToMySQL();
//
//// get the actors for each movie
//
//$query_string = <<<EOT
//SELECT * FROM newschema.common_cast_movies_top250;
//EOT;
//
//$common_cast = array();
//$result = mysql_query($query_string, $con);
//while ($r = mysql_fetch_assoc($result)) {
//
//    // convert everything to UTF8 first
//    array_walk_recursive($r, function (&$val) {
//        $val = utf8_encode($val);
//    });
//
//    // for now, ignore the id's, but they might be helpful in the future (for sure they'll be ...)
//    //$rows[] = $r;
//
//    $common_cast[ $r['movie1_title'] ][ $r['movie2_title'] ] [] = $r['actor_name'];
//
//}
//
//echo json_encode($common_cast);
//mysql_close($con);

$movieTitle = $_GET['movieTitle'];

require "include/php/helper_functions.php";

$movieData = get_data();

$movies = $movieData['movies'];
$commonCast = $movieData['commonCast'];
$commonGenres = $movieData['commonGenres'];
$commonDirectors = $movieData['commonDirectors'];

$movie_index = recursive_array_search($movieTitle, $movies);

unset($movieData['movies']); // don't send information about all the movies
$movieData['movie_data'] = $movies[$movie_index];

// send common cast to this movie
$movieData['commonCast'] = $commonCast[$movieTitle];

// send common directors to this movie
$movieData['commonDirectors'] = $commonDirectors[$movieTitle];
//var_dump($movieData['commonDirectors']);
// but the genres are filtered because they are too many => not useful information anymore
// we will the genres of the movies found in (commonCast or commonDirectors)
$commonGenres = $commonGenres[$movieTitle];

$finalCommonGenres = array();
if (is_array($movieData['commonCast'])) {
    foreach ($movieData['commonCast'] as $movie => $actors) {
        if ($commonGenres[$movie])
            $finalCommonGenres[$movie] = $commonGenres[$movie];
    }
}

if (is_array($movieData['commonDirectors'])) {
    foreach ($movieData['commonDirectors'] as $movie => $directors) {
        if ($commonGenres[$movie])
            $finalCommonGenres[$movie] = $commonGenres[$movie];
    }
}

$movieData['commonGenres'] = $finalCommonGenres;
//echo "movie info";
//var_dump($movies[$movie_index]);
//echo "common cast";
//var_dump($commonCast[$movieTitle]);
//echo "common genre";
//var_dump($commonGenres[$movieTitle]);
//echo "common directors";
//var_dump($commonDirectors[$movieTitle]);

echo json_encode($movieData);

?>