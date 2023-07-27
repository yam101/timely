<?php

// Connect to database
$sname = "127.0.0.1";
$uname = "root";
$password = "";
$db_name = "database";

$conn = mysqli_connect($sname, $uname, $password, $db_name);

// Send fail message if connection failed
if (!$conn) {
    echo "Connection failed!";
}