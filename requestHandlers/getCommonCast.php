<?php
/**
 * Created by PhpStorm.
 * User: cristiprg
 * Date: 25-1-16
 * Time: 0:02
 */

require "include/php/mysql_connection.php";
$con = connectToMySQL();

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

echo json_encode($common_cast);
mysql_close($con);
