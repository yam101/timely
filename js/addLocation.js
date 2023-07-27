ej.base.registerLicense('ORg4AjUWIQA/Gnt2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5UdEViXntYcnVSQmhZ');

import { modifyTreeData, modifyLocationData } from './main.js';
import { locationData } from "./location.js";
import { treeObj, treeData } from "./components/tree.js";
import { colorObj } from './components/color.js';
 
// Initializing DOM variables
const body = document.querySelector("body"),
modalLab = document.querySelector(".modal-lab"),
overlay = document.querySelector(".overlay"),
openLabModalBtn = document.querySelector(".openLab"),
closeLabModalBtn = document.querySelector(".btn-close-lab"),
cancelLabBtn = document.querySelector(".cancelBtn"),
addLabBtn = document.querySelector(".addBtn");

var input = document.querySelector(".new-lab-input"),
category = document.querySelector("#category"),
color = document.querySelector("#circle-palette"),
newTreeData = treeData,
newLocationData = locationData;

// Array of category data
var categoryData = [
    {text: "Computer Bookings", value: "Category1"},
    {text: "Area Bookings", value: "Category2"}
]

// Initializing category object for adding a new lab
var categoryObj = new ej.dropdowns.DropDownList({
    dataSource: categoryData,
    placeholder: 'Select a category',
    popupHeight: '200px',
    width: '50%',
    change: enableSubmit
});

categoryObj.appendTo("#category");

// Method for validating the user has entered all fields for adding a lab
function enableSubmit() {
    var inputs=[input, category]
    var isValid = true;
    for (var i = 0; i < inputs.length; i++){
        var changedInput = inputs[i];
        if (changedInput.value === null || changedInput.value.trim() === "" ) {
            isValid = false;
            break;
        }
    }

    // Disables add button until all fields filled in
    addLabBtn.disabled = !isValid;
    if (!isValid) {
        addLabBtn.classList.add("disabled");
    }
    else{
        addLabBtn.classList.remove("disabled");
    }
}

// Method for opening the lab modal
function openLabModal() {
    modalLab.classList.remove("hidden");
    overlay.classList.remove("hidden");
    body.style.overflow = "hidden";
};
// Method for closing the lab modal
function closeLabModal() {
    modalLab.classList.add("hidden");
    overlay.classList.add("hidden");
    input.value = "";
    categoryObj.value = null;
    colorObj.value = "#f44336"
    body.style.overflow = "auto";
};

// Method for adding the new lab to the location data and tree data
function addLab() {
    var newLabName = input.value;
    var newLabCategory = category.value;
    var newLabColor = color.value;

    newLocationData.push({category: newLabCategory, location: newLabName, color: newLabColor});
    modifyLocationData(newLocationData);
    
    // Sends a request to add the new lab to the database
    $.ajax({
        type:'POST',
        url: "addLab.php",
        data: {
            category: newLabCategory,
            location: newLabName,
            color: newLabColor
        },
        success: function(response) {
            console.log(response);
        }
      });

    // Adds the lab to the correct category under the tree bar
    if (newLabCategory=="Computer Bookings") {
        newTreeData.push({id: String(treeData.length), name: newLabName, pid:"1"});
    }
    else{
        newTreeData.push({id: String(treeData.length), name: newLabName, pid:"2"});
    }

    modifyTreeData(newTreeData);
    treeObj.refresh();
    closeLabModal();
}

// Adding event listeners for buttons
openLabModalBtn.addEventListener("click", openLabModal);
closeLabModalBtn.addEventListener("click", closeLabModal);
cancelLabBtn.addEventListener("click", closeLabModal);
addLabBtn.addEventListener("click", addLab);

export {openLabModalBtn}