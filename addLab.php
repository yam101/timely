<?php
include "db_conn.php";

// Get new lab data from ajax post request
$category = $_POST['category'];
$location = $_POST['location'];
$color = $_POST['color'];

// Add the data to the database in the correct fields
$sql = "INSERT INTO location_data (category, location, color) VALUES ('$category', '$location', '$color')";

// Send validation/error message
if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} 
else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}