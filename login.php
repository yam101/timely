<?php
include "db_conn.php";
session_start();

/* Determines if microsoft login returned an account name, and if it did, 
it will assign this to the session variable and returns it */
if (isset($_POST['name'])) {
    $name = $_POST['name'];
    $_SESSION['name'] = $name;
    echo $name;
    exit();
}

// Determines if username and password are entered for admin login
if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['login'])) {  
    // Method that validates username
    function validate ($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    } 

    // Sends username and password to validation method
    $uname = validate($_POST['username']);
    $pass = validate($_POST['password']);

    // Selects the matching username and password combination
    $sql = "SELECT * FROM users WHERE username='$uname' AND password='$pass'";

    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) === 1) {  
        $row = mysqli_fetch_assoc($result);
        // Determines if username and password combo match
        if ($row['username'] === $uname && $row['password'] === $pass) {
            $_SESSION['name'] = $row['name'];
            echo "success";
            exit();
        }
        else {
            echo "fail";
            exit();
        }
        exit();
    }
    else {
        echo "fail";
        exit();
    }
}