<?php
/**
 * Created by PhpStorm.
 * User: cristiprg
 * Date: 24-1-16
 * Time: 17:08
 */

function connectToMySQL(){
    $con = mysql_connect('104.155.100.124', 'root', '2IMV20');
    if (!$con){
        die('Could not connect: ' . mysql_error($con));
    }

    mysql_select_db('newschema');
    return $con;
}

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
    movie_info_idx.info_type_id = 112;
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
