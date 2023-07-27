<?php
// Determines the action called
if($_POST['action']=="location") {
    getLocationData();
}
else if ($_POST['action']=="events"){
    getEventData();
}
    
// Method that gets location data from database
function getLocationData() {
    include "db_conn.php";
    $query = "SELECT * FROM location_data";
    $result = mysqli_query($conn, $query);
    
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $category=$row["category"];
            $location = $row["location"];
            $color = $row["color"];
    
            // Returns formatted location data
            echo $category,",",$location,",",$color,",";
        }
    } 
}

// Method that gets event data from database
function getEventData() {
    include "db_conn.php";
    $query = "SELECT * FROM event_data";
    $result = mysqli_query($conn, $query);
    
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $event=$row["event"];

            // Returns formatted event data
            echo $event,"|";
        }
    } 
}