import { scheduleObj } from "../main.js";

const dropDownBtn = document.querySelector(".dropBtn"),
dropOverlay = document.querySelector(".drop-overlay"),
dropDownBtnView = document.querySelector(".dropBtn-view"),
dropDownContent = document.querySelector(".dropdown-content"),
dropDownContentView = document.querySelector(".dropdown-content-view"),
changeView = document.querySelector(".change-view"),
bookingContainer = document.querySelector(".booking"),
upcomingContainer = document.querySelector(".upcoming-booking");

function toggleDropDown() {
    if (dropDownContent.classList.contains("hidden")) {
        dropDownContent.classList.remove("hidden");
        dropOverlay.classList.remove("hidden");
    }
    else {
        dropDownContent.classList.add("hidden");
        dropOverlay.classList.add("hidden");
    }
}
function toggleDropDownView() {
    if (dropDownContentView.classList.contains("hidden")) {
        dropDownContentView.classList.remove("hidden");
    }
    else {
        dropDownContentView.classList.add("hidden");
    }
}

function toggleView() {
    if (upcomingContainer.classList.contains("hidden")) {
        upcomingContainer.classList.remove("hidden");
        document.querySelector(".agenda-title").classList.remove("hidden");

        bookingContainer.classList.add("hidden");
        document.getElementById("change-lab-name").classList.add("hidden");
        changeView.innerText = "Calendar";
    }
    else {
        upcomingContainer.classList.add("hidden");
        document.querySelector(".agenda-title").classList.add("hidden");

        bookingContainer.classList.remove("hidden");
        document.getElementById("change-lab-name").classList.remove("hidden");
        changeView.innerText = "Agenda";
        scheduleObj.refresh();
    }
    dropDownContentView.classList.add("hidden");
}

dropDownBtn.addEventListener("click", toggleDropDown),
dropDownBtnView.addEventListener("click", toggleDropDownView),
dropOverlay.addEventListener("click", toggleDropDown),
changeView.addEventListener("click", toggleView);