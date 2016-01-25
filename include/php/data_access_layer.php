<?php
/**
 * Created by PhpStorm. This file contains the functions that perform SQL
 * queries on the database.
 * Basically, just some handy-functions ... that's it
 * User: cristiprg
 * Date: 25-1-16
 * Time: 13:47
 */

/**
 * Returns JSON like this:
 * [ { "id" : <id1>, "title" : <title1> }, { "id" : <idN>, "title" : <titleN> }]
 */
function getTop250Movies($con){

    $query_string = <<<EOT
SELECT
    title.id, title.title
FROM
    newschema.movie_info_idx
        JOIN
    newschema.title ON movie_info_idx.movie_id = title.id
WHERE
    movie_info_idx.info_type_id = 112 ORDER BY title.title;
EOT;


    $result = mysql_query($query_string, $con);
    $rows = array();
    while($r = mysql_fetch_assoc($result)){

        // convert everything to UTF8 first
        array_walk_recursive($r, function(&$val){
            $val = utf8_encode($val);
        });

        $rows[] = $r;
    }

    return $rows;
}

function getCommonCast($con){

    // return cached in session
    if ($_SESSION["commonCast"]){
        return $_SESSION["commonCast"];
    }

    // get the actors for each movie

    $query_string = <<<EOT
SELECT * FROM newschema.common_cast_movies_top250;
EOT;

    $common_cast = array();
    $result = mysql_query($query_string, $con);
    while ($r = mysql_fetch_assoc($result)) {

        // convert everything to UTF8 first
        array_walk_recursive($r, function (&$val) {
            $val = utf8_encode($val);
        });

        // for now, ignore the id's, but they might be helpful in the future (for sure they'll be ...)
        //$rows[] = $r;

        $common_cast[ $r['movie1_title'] ][ $r['movie2_title'] ] [] = $r['actor_name'];

    }

    $_SESSION["commonCast"] = $common_cast;
    return $common_cast;
}
