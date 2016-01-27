<?php
/**
 * Created by PhpStorm.
 * User: cristiprg
 * Date: 27-1-16
 * Time: 15:43
 */

require "include/php/mysql_connection.php";
require "include/php/data_access_layer.php";

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
 * Returns the data in the following format:
 * ["movies": $movies, "commonCast" : $commonCast, "commonGenres" : $commonGenres, "commonDirectors" : $commonDirectors]
 */
function get_data(){
    $con = connectToMySQL();
// try loading movies and commmonCast from 1) sesion, 2) local data json files, 3) mysql
    $rootDir = $_SERVER['DOCUMENT_ROOT'];
    $movies_file_name = $rootDir . '/data/movies.json';
    $commonCast_file_name = $rootDir . '/data/commonCast.json';
    $commonGenres_file_name = $rootDir . '/data/commonGenres.json';
    $commonDirectors_file_name = $rootDir . '/data/commonDirectors.json';

    $movies = false;
    $commonCast = false;
    $commonGenres = false;
    $commonDirectors = false;
    $successfullyLoaded = false;

//// try loading from session
//if ($_SESSION['movies'] and $_SESSION['commonCast'] and $_SESSION['commonGenres']){
//    $movies = $_SESSION['movies'];
//    $commonCast = $_SESSION['commonCast'];
//    $commonGenres = $_SESSION['commonGenres'];
//    $successfullyLoaded = true;
//}
//else {

    if (file_exists($movies_file_name) && file_exists($commonCast_file_name) && file_exists($commonGenres_file_name) &&file_exists($commonDirectors_file_name)) {
        $movies = json_decode(file_get_contents($movies_file_name), true);
        $commonCast = json_decode(file_get_contents($commonCast_file_name), true);
        $commonGenres = json_decode(file_get_contents($commonGenres_file_name), true);
        $commonDirectors = json_decode(file_get_contents($commonDirectors_file_name), true);

        if ($movies != false && $commonCast != false && $commonGenres != false && $commonDirectors != false) {
            $successfullyLoaded = true;
        }
    }
//}

    if (!$successfullyLoaded){

        // something went wrong => reload data
        loadDataFromDB($con, $movies_file_name, $commonCast_file_name, $commonGenres_file_name,$commonDirectors_file_name);
        //$_SESSION['movies'] = $movies;
        //$_SESSION['commonCast'] = $commonCast;
        //$_SESSION['commonGenres'] = $commonGenres;
    }

    $return_value = array(
        "movies" => $movies,
        "commonCast" => $commonCast,
        "commonGenres" => $commonGenres,
        "commonDirectors" => $commonDirectors
    );

    mysql_close($con);
    return $return_value;
}


function loadDataFromDB($con, $movies_file_name, $commonCast_file_name, $commonGenres_file_name, $commonDirectors_file_name){
    global $movies;
    global $commonCast;
    global $commonGenres;

    $movies = getTop250Movies($con);
    $commonCast = getCommonCast($con);
    $commonGenres = getCommonGenres($con);
    $commonDirectors = getCommonDirectors($con);

    if ( !file_exists('data') ) {
        mkdir('data', 0700, true);
    }
    // save movies JSON
    $fp = fopen($movies_file_name, 'w');
    fwrite($fp, json_encode($movies));
    fclose($fp);

    // save commonCast
    $fp = fopen($commonCast_file_name, 'w');
    fwrite($fp, json_encode($commonCast));
    fclose($fp);

    // save commonGenres
    $fp = fopen($commonGenres_file_name, 'w');
    fwrite($fp, json_encode($commonGenres));
    fclose($fp);

    // save commonDirectors
    $fp = fopen($commonDirectors_file_name, 'w');
    fwrite($fp, json_encode($commonDirectors));
    fclose($fp);
}
