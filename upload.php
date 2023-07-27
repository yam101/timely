<?php

/* Get the details of the uploaded file */
$file = $_FILES['file']['name'];
$filename = $_POST['fileName'];
$room = $_POST['room'];
$id = $_POST['id'];

/* Determine path to new file */
$location = "upload/".$file;

/* Save uploaded file to server */
if ( move_uploaded_file($_FILES['file']['tmp_name'], $location) ) { 
  echo 'File uploaded successfully';
} else { 
  echo 'File not uploaded'; 
}

// Calls jar file to update file 
exec("java -jar Upload.jar 2>&1 $filename $id $room", $output);
print_r($output);

?>