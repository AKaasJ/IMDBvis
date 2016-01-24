<?php
/**
 * Created by PhpStorm.
 * User: cristiprg
 * Date: 1/24/2016
 * Time: 1:20 AM
 */


echo 'Connecting to database ...' . PHP_EOL;

$con = mysql_connect('104.155.100.124', 'root', '2IMV20');
if (!$con){
    die('Could not connect: ' . mysql_error($con));
}

/*echo "Success: A proper connection to MySQL was made! The my_db database is great." . PHP_EOL;
echo "Host information: " . mysqli_get_host_info($link) . PHP_EOL;*/

$id = $_GET['id'];

mysql_select_db('newschema');

$result = mysql_query("SELECT * FROM `name` WHERE id='". $id ."'", $con);

if(!$result){
    die('Could not get data: ' . mysql_error());
}

while($row =  mysql_fetch_array($result, MYSQL_ASSOC)) {
    echo "The name for the id is " . $row['name'];
}

mysql_close($con);



