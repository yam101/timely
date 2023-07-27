<?php 
session_start();

if (isset($_SESSION['name'])) {

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>timely</title>

    <link rel="icon" href="images/timely-logo.png"/>

    <!-- CSS -->
    <!-- Essential JS 2 theme (Dependency Styles) -->
    <link href="https://cdn.syncfusion.com/ej2/22.1.34/material3.css" rel="stylesheet" type="text/css"/>

    <!-- Javascript -->
    <!-- Essential JS 2 global script (Dependency Scripts) -->
    <script src="https://cdn.syncfusion.com/ej2/22.1.34/dist/ej2.min.js" type="text/javascript"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://alcdn.msauth.net/browser/2.32.2/js/msal-browser.min.js"></script>

    <link rel="stylesheet" type="text/css" href="css/main.css" />

    <!-- Boxicons CSS -->
    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"/>
  </head>
  <body>
    <div class="circle-1"></div>
    <div class="circle-2"></div>
    <div class="drop-overlay hidden"></div>

    <div class="header">
      <img src="images/timely-logo.png" alt="" class="logo"> 
      <h2 class="title">timely</h2>

      <div class="user-link">
        <i class="bx bx-user-circle"></i>
        <h3 class="name"> <?php echo $_SESSION['name']?></h3>
        <div class="dropdown">
          <button class="dropBtn"><i class='bx bx-chevron-down'></i></button>
          <div class="dropdown-content hidden">
            <a href="logout.php"><i class='bx bx-log-out'></i> Sign out</a>
          </div>
        </div>
      </div>
    </div>

    <div class="maincontent">
      <div id="toast_type"></div>
      <div class="control">
        <button class="btn-main" id="btn-event"><i class='bx bx-plus'></i> Add a booking</button>
        <button class="importBtn"><i class='bx bx-upload'></i> Import a file</button>
        <div class="container-filter">
          <h3 class="location-title">Locations</h3>
          <button class="openLab restricted"><i class='bx bx-plus'></i></i></button>
          <div id="treeView"></div>
        </div>
      </div>

      <div class="container">
        <div class="control-title">
          <h2 id="change-lab-name">Calendar view | All bookings</h2>
          <h2 class="agenda-title hidden">Agenda view</h2>

          <div class="dropdown-view">
            <button class="dropBtn-view"><i class='bx bx-chevron-down'></i></button>
            <div class="dropdown-content-view hidden">
              <button class="change-view">Agenda</button>
            </div>
          </div>
        </div>

        <div class="booking">
          <div id="Schedule"></div>
        </div>
    
        <div class="upcoming-booking hidden">
          <div id="Agenda"></div>
        </div>  
      </div>

    </div>
    
    <div class="modal-lab hidden">
      <div class="modal-content">
        <button class="btn-close-lab"><i class='bx bx-x'></i></button>
        <h3>Add a new location</h2>
        <input class="new-lab-input" type="text" placeholder="Location name">
        <div class="category">
          <p>Add to:</p>
          <input type="text" id="category">
        </div>
        <div>
          <p class="text-colour">Colour:</p>
          <div class="colourpicker-content">
            <input id="circle-palette" type="color">
          </div>
        </div>

        <button class="addBtn disabled" disabled>Add</button>
        <button class="cancelBtn">Cancel</button>
      </div>
    </div>

    <div class="modal-import hidden">
      <div class="modal-header">
        <button class="btn-close-import"><i class='bx bx-x'></i></button>
        <h3>Upload from file</h3>
      </div>
      <div class="import-content">
        <p>Import events from an .ics file by dragging it here or by browsing this computer.</p>
        <input type='file' id='fileupload' name='UploadFiles'/>
        <p>Select the calendar you want to import the file to.</p>
        <input type="text" id="room-import" class="e-field"/>
      </div>

      <div class="modal-footer">
        <button class="addBtn-import disabled" disabled>Import</button>
        <button class="cancelBtn-import">Cancel</button>
      </div>
    </div>
    <div class="overlay hidden"></div>

    <script id="EventEditorTemplate" type="text/x-template">
      <table class="custom-event-editor" width="100%" cellpadding="6">
        <tbody>
          <tr>
            <td class="e-textlabel">
              <img src="images/text.png" alt="" class="text-png" />
            </td>
            <td colspan="4">
              <input id="Subject" class="e-field text-input" type="text" placeholder="Title" value="" name="Subject" required/>
            </td>
          </tr>

          <tr>
            <td class="e-textlabel">
              <img src="images/person.png" alt="" class="user-png" />
            </td>
            <td colspan="1" style="line-height: 0px;">
              <p id="user">Created by: </p>
            </td>
          </tr>

          <tr>
            <td class="e-textlabel">
              <img src="images/pin.png" alt="" class="pin-png" />
            </td>
            <td colspan="2">
              <input type="text" id="rooms" name="rooms" class="e-field" style="width: 100%" />
            </td>
          </tr>

          <tr>
            <td class="e-textlabel">
              <img src="images/clock.png" alt="" class="clock-png" />
            </td>
            <td colspan="2">
                <input id="StartTime" class="e-field" type="text" name="StartTime" />
            </td>
          </tr>
          <tr>
            <td class="e-textlabel"></td>
            <td colspan="2">
                <input id="EndTime" class="e-field" type="text" name="EndTime" />
            </td>
          </tr>

          <tr>
            <td class="e-textlabel">
              <img src="images/left-align.png" alt="" class="left-align" />
            </td>
            <td colspan="4">
                <textarea id="Description" class="e-field e-input description" name="Description" rows="3" cols="50" placeholder="Add a description"
                style="width: 100%; height: 60px !important; resize: vertical"></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </script>  

    <script type="text/javascript">
      var userName = "<?php echo $_SESSION['name']?>";
    </script>

    <script type="module" src="js/upload.js"></script>
    <script type="module" src="js/addLocation.js"></script>
    <script type="module" src="js/components/color.js"></script>
    <script type="module" src="js/components/dropdown.js"></script>
    <script type="module" src="js/main.js"></script>
    <script src="js/microsoft.js"></script>

  </body>
</html>

<?php 
}else {
  header("Location: index.php");
  exit();
}
?>