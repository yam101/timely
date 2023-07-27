<?php
include "db_conn.php";

// Insert event data into database
if ($_POST['action'] == "addEvent") {
    $event = $_POST['event'];
    $id = $_POST['id'];
    $sql = "INSERT INTO event_data (id, event) VALUES ('$id', '$event')";
}
// Change existing event in database
else if ($_POST['action'] == "editEvent") {
    $event = $_POST['event'];
    $id = $_POST['id'];
    $sql = "UPDATE event_data SET event='$event' WHERE id='$id'";
}
// Delete event from database
else if ($_POST['action'] == "deleteEvent") {
    $id = $_POST['id'];
    $sql = "DELETE FROM event_data WHERE id='$id'";
}

// Return verification message
if (mysqli_query($conn, $sql)) {
    echo "Database updated successfully";
} 
else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
