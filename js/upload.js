ej.base.registerLicense('ORg4AjUWIQA/Gnt2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5UdEViXntYcnVSQmhZ');

import { locationData } from "./location.js";
import { scheduleObj, modifyChange} from "./main.js";
import { data } from "./eventData.js";

const body = document.querySelector("body"),
importBtn = document.querySelector(".importBtn"),
modalImport = document.querySelector(".modal-import"),
overlay = document.querySelector(".overlay"),
closeImportModalBtn = document.querySelector(".btn-close-import"),
addImportBtn = document.querySelector(".addBtn-import"),
cancelImportBtn = document.querySelector(".cancelBtn-import");

var roomImport = document.querySelector("#room-import");

// Initalizing room/location object for importing a file
var roomObj= new ej.dropdowns.DropDownList({
    dataSource: locationData,
    // Map the appropriate columns from location data to the fields property
    fields: {groupBy: 'category', text: 'location', value: location.value},
    placeholder: 'Select a category',
    popupHeight: '200px',
    change: enableImport
});
roomObj.appendTo("#room-import");

var dropElement = document.getElementsByClassName('control-fluid')[0];

// Initialize the uploader component
var uploadObj = new ej.inputs.Uploader({
    asyncSettings: {
        saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove',
    },
    removing: function (args) {
        args.postRawFile = false;
    },
    dropArea: dropElement,
    autoUpload: false,
    allowedExtensions: '.ics',
    multiple: false,
    success: onUploadSuccess
});
uploadObj.appendTo('#fileupload');

// Get file after successful upload
function onUploadSuccess(args) {
    // Find largest event id
    var arrObjIds = data.map(elements => {
        return elements.Id;
    });
    var maxId = Math.max(...arrObjIds);

    // Get uploaded file data 
    var formData = new FormData();
    formData.append('file', args.file.rawFile);
    formData.append('fileName', args.file.rawFile.name);
    formData.append('room', roomObj.value);
    formData.append('id', maxId);

    // Send request to server to upload file to server
    $.ajax({
        type:'POST',
        url: "upload.php",
        data: formData,
        async: false,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
        }
    });

    // Send request to server to get the updated file from server
    $.ajax({
        type:'GET',
        url: "upload/newfile.ics",
        success: function(response) {
            modifyChange(true);
            var importFile = new File([response], "newfile");
            // Updates calendar
            scheduleObj.importICalendar(importFile);
            closeImportModal();
        }
    });
}

// Continue file uploading to the element
function addImport() {
    uploadObj.upload(uploadObj.getFilesData());
}

// Opens import window
function openImportModal() {
    modalImport.classList.remove("hidden");
    overlay.classList.remove("hidden");
    body.style.overflow = "hidden";
}
// Closes import window
function closeImportModal() {
    roomObj.value = null;
    uploadObj.clearAll();
    modalImport.classList.add("hidden");
    overlay.classList.add("hidden");
    body.style.overflow = "auto";
}

// Method for validing the user has entered all fields in 
function enableImport() {
    var inputs=[roomImport]
    var isValid = true;
    for (var i = 0; i < inputs.length; i++){
        var changedInput = inputs[i];
        if (changedInput.value === null || changedInput.value.trim() === "" ) {
            isValid = false;
            break;
        }
    }

    // Change the state of the add import button
    addImportBtn.disabled = !isValid;
    if (!isValid) {
        addImportBtn.classList.add("disabled");
    }
    else{
        addImportBtn.classList.remove("disabled");
    }
}

importBtn.addEventListener("click", openImportModal);
closeImportModalBtn.addEventListener("click", closeImportModal);
cancelImportBtn.addEventListener("click", closeImportModal);
addImportBtn.addEventListener("click", addImport);