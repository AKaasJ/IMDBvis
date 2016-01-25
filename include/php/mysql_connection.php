<?php
/**
 * Created by PhpStorm.
 * User: cristiprg
 * Date: 24-1-16
 * Time: 17:08
 */
session_start();
function connectToMySQL(){
    $con = mysql_connect('104.155.100.124', 'root', '2IMV20');
    if (!$con){
        die('Could not connect: ' . mysql_error($con));
    }

    mysql_select_db('newschema');
    return $con;
}
