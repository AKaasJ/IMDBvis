<?php
/**
 * Created by PhpStorm.
 * User: cristiprg
 * Date: 1/24/2016
 * Time: 1:20 AM
 */

require "include/php/mysql_connection.php";
$con = connectToMySQL();

$id = $_GET['id'];

//$result = mysql_query("SELECT * FROM `name` WHERE id='". $id ."'", $con);
// table links (link_id, movie1_id, movie2_id);
// $resultLinks = [ [1, 1, 2], [2, 2, 3], [3, 2, 4]]


$result = getTop250Movies($con);


$trimmedResult = array();
foreach($result as $movie)
{
    $trimmedResult['nodes'][] = array(
        'name' => $movie['title'],
        'group' => 1,
    );
}

$i = 0;
foreach($trimmedResult['nodes'] as $node)
{
    if ($i != 0) {
        $trimmedResult['links'][] = array(
            'source' => $i,
            'target' => $i-1,
            'weight' => 1,
        );
    }
    $i++;
}

/*
$array = array(
  'nodes' => array(
      array('name' => 'aaaa', 'group' => 1),
      array('name' => 'aaaa', 'group' => 1),
      array('name' => 'aaaa', 'group' => 1),
  ),
    'links' => array(
        array('source'=> 2, 'target'=> 1, 'weight'=>1),
        array('source'=> 2, 'target'=> 0, 'weight'=>1),
    )
);
*/

//{
//    "nodes":[
//		{"name":"node1","group":1},
//		{"name":"node2","group":2},
//		{"name":"node3","group":2},
//		{"name":"node4","group":3}
//	],
//	"links":[
//		{"source":2,"target":1,"weight":1},
//		{"source":0,"target":2,"weight":3}
//	]
//}

//TODO change back in $result

if(!$trimmedResult){
    die('Could not get data: ' . mysql_error());
}

$trimmedResult = json_encode($trimmedResult);


echo $trimmedResult;

mysql_close($con);



