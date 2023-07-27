ej.base.registerLicense('ORg4AjUWIQA/Gnt2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5UdEViXntYcnVSQmhZ');

import {data, userEvents} from './eventData.js';
import {locationData as importLocations} from './location.js';
import {toastObj, toasts} from './components/toast.js';
import {treeObj, treeData as importTreeData, filteredData} from './components/tree.js';
import {openLabModalBtn} from './addLocation.js';

// Initializing/declaring variables
var locationEnable = false;
var change = true;
var locationData = importLocations;
var treeData = importTreeData;

// Unrestricts the add lab functions for admin
if (userName == "admin") {
    openLabModalBtn.classList.remove("restricted");
}

// Initialize scheduler
var scheduleObj = new ej.schedule.Schedule({
    height: '650px',
    views: ['Day', 'WorkWeek', 'Week', 'Month'],
    currentView: 'Week',
    showQuickInfo: false,
    editorTemplate: '#EventEditorTemplate',
    popupOpen: onPopupOpen,
    eventRendered: function (args) {
        var name = args.data.RoomType;
        var room = locationData.find(obj => {
            return obj.location === name
        })
        args.element.style.backgroundColor = room.color;

    },
    actionBegin: onActionBegin,
    eventSettings: { 
        dataSource: data,
        fields: {
            location: {name: "RoomType", validation: { required: true}},
            user: {name: "User", title: "Created By: "},
            startTime: {name: 'StartTime', validation: { required: true }},
            endTime: {name: 'EndTime', validation: { required: true }}
        }
    },
    popupClose: function() {
        locationEnable = false;
    },
    eventClick: verifyUser,
    dragStart: verifyUser,
    resizeStart: verifyUser
});
scheduleObj.appendTo('#Schedule');

// This function is called when the user creates, changes or deletes an event
function onActionBegin(args) {
    var schedule = document.querySelector('.e-schedule').ej2_instances[0];
    if (args.requestType == 'eventCreate' || args.requestType == 'eventChange') {
        // Preventing the user from double booking events
        var event = args.requestType === 'eventCreate' ? args.data[0] : args.data;

        // Details of the created or changed booking
        let details = {
            StartTime: event.StartTime,
            EndTime: event.EndTime,
            RoomType: event.RoomType,
        }
        // Array of events that have the same start or end time as the selected booking
        let filteredEvents = schedule.eventBase.filterEvents(
            details.StartTime,
            details.EndTime
        );

        // Filter array by room type
        let room = filteredEvents.filter(dd => dd.RoomType == details.RoomType);

        change=true;
        for (var i=0; i<filteredEvents.length;i++) {
            if (filteredEvents.length > 0 && room.length && event.Id != filteredEvents[i].Id && filteredEvents[i].RoomType == details.RoomType) {
                // Prevent user from adding or editing event
                args.cancel = true;
                toastObj.show(toasts[1]);
                change=false;
            }
        }

        if (change) {
            /* If the user has selected one of the nodes to filter by lab location, 
            then it will add the event to the data array
             */
            if (!(treeObj.selectedNodes =="0" || treeObj.selectedNodes =="1" || treeObj.selectedNodes =="2")) {
                if (args.requestType == 'eventCreate') {
                    event.Id=data.slice(-1)[0].Id+1;
                    data.push(event);
                }
                if (args.requestType == 'eventChange') {
                    var elementPos = data.findIndex(obj => obj.Id == event.Id);
                    data[elementPos] = event;
                }
            }
        }
    }
    if (args.requestType == 'eventCreate' && change){
        toastObj.show(toasts[2]);
        agendaObj.refresh();
        // Adds the data to the user events linked to the agenda
        for(var i=0;i<args.data.length;i++) {
            var event = args.data[i];
            args.data[i].User = userName;
            if (userName!="admin") {
                userEvents.push(event);
            }

            // Sends an ajax request to add the event to the external database
            $.ajax({
                type:'POST',
                url: "event.php",
                data: {
                    event: JSON.stringify(event),
                    id: event.Id,
                    action: "addEvent"
                },
                success: function(response) {
                    console.log(response);
                }
            });
        }
    }
    // Changes one of the existing events in the database
    if (args.requestType == 'eventChange' && change) {
        var event = args.data;

        if (userName!="admin") {
            var elementPos = userEvents.findIndex(obj => obj.Id == event.Id);
            userEvents[elementPos] = event;
        }
        agendaObj.refresh();
        editEvent(event);
        toastObj.show(toasts[5]);
    }
    // Validates that user can remove event
    if(args.requestType === 'eventRemove') {
        verifyUser(args);
    }
}

// This sends an ajax call to edit the event in the database
function editEvent(event) {
    $.ajax({
        type:'POST',
        url: "event.php",
        data: {
            event: JSON.stringify(event),
            id: event.Id,
            action: "editEvent"
        },
        success: function(response) {
            console.log(response);
        }
    });
}

// This sends an ajax call to delete the event in the database
function deleteEvent(event) {
    $.ajax({
        type:'POST',
        url: "event.php",
        data: {
            id: event.Id,
            action: "deleteEvent"
        },
        success: function(response) {
            console.log(response);
        }
    });
}

/* The following method ensures that the user cannot edit events that are not theirs, 
but allows the admin to edit all events */
function verifyUser(args) {
    var eventUser = args.name === 'eventClick' ? args.event.User : 
    (['dragStart', 'resizeStart'].includes(args.name)) ? args.data.User : args.data[0].User;

    /* If event user property doesnt match with current user name and admin isn't logged in, 
    it will prevent deletion */
    if (eventUser !=userName && userName != "admin") {
        args.cancel = true;
        change=false;
        toastObj.show(toasts[0]);
        //alert("Not permitted to change event!");
        
    }
    else {
        if (args.name == 'dragStart') {
            args.navigation.enable = false;
        }
        else if (args.requestType=="eventRemove") {
            var event = args.data[0];
        
            // Removes event from agenda
            if (userName!="admin") {
                var elementPos = userEvents.findIndex(obj => obj.Id == event.Id);
                userEvents.splice(elementPos, 1);
            }
            agendaObj.refresh();
            deleteEvent(event);
            toastObj.show(toasts[4]);

            // Deletes the event from the data array if the user has filtered by a lab location
            if (!(treeObj.selectedNodes =="0" || treeObj.selectedNodes =="1" || treeObj.selectedNodes =="2")) {
                var elementPos = data.findIndex(obj => obj.Id == event.Id);
                data.splice(elementPos, 1);
            }
        }
    }
}

// Initialize agenda
var agendaObj = new ej.schedule.Schedule({
    width: '100%',
    height: '650px',
    views: [{ option: 'Agenda', allowVirtualScrolling: false }],
    currentView: 'Agenda',
    // Setting datasource and event fields to the user events
    eventSettings: { 
        dataSource: userEvents,
        fields: {
            location: {name: "RoomType", validation: { required: true}},
            startTime: { name: 'StartTime', validation: { required: true } },
            endTime: { name: 'EndTime', validation: { required: true } },
            user: {name: "User"}
        }
    },
    agendaDaysCount: 14,
    hideEmptyAgendaDays: true,
    editorTemplate: '#EventEditorTemplate',
    eventRendered: function (args) {
        // Colours the events based on the lab colour
        var name = args.data.RoomType;
        var room = locationData.find(obj => {
            return obj.location === name
        })
        args.element.firstChild.style.borderLeftColor = room.color;
    },

    actionBegin: function(args) {
        var schedule = document.querySelector('.e-schedule').ej2_instances[0];
        // Prevending double booking
        if (args.requestType === 'eventChange') {
            var event = args.data;

            let details = {
                StartTime: event.StartTime,
                EndTime: event.EndTime,
                RoomType: event.RoomType,
            }
            let filteredEvents = schedule.eventBase.filterEvents(
                details.StartTime,
                details.EndTime
            );
    
            let room = filteredEvents.filter(dd => dd.RoomType == details.RoomType);
    
            change=true;
            for (var i=0; i<filteredEvents.length;i++) {
                if (filteredEvents.length > 0 && room.length && event.Id != filteredEvents[i].Id && filteredEvents[i].RoomType == details.RoomType) {
                    args.cancel = true;
                    toastObj.show(toasts[1]);
                    change=false;
                }

            }
            if (change){
                /* If the user has selected one of the nodes to filter by lab location, 
                then it will update the filtered events array
                */
                if (!(treeObj.selectedNodes =="0" || treeObj.selectedNodes =="1" || treeObj.selectedNodes =="2")) {
                    var elementPos = filteredData.findIndex(obj => obj.Id == event.Id);
                    filteredData[elementPos] = event;
                    console.log(filteredData);
                }
                var elementPos = data.findIndex(obj => obj.Id == event.Id);
                data[elementPos] = event;
                console.log(data);
            }
            editEvent(event);// Calls the method to update event in database
            //scheduleObj.refresh();
            toastObj.show(toasts[5]);// Shows success message
        }
        // Deletes the event from the database and the data array
        else if (args.requestType === 'eventRemove') {
            var event = args.data[0];
            deleteEvent(event);

            var elementPos = data.findIndex(obj => obj.Id == event.Id);
            data.splice(elementPos, 1);
            //scheduleObj.refresh();
            toastObj.show(toasts[4]);
        }
    },
    popupOpen: onPopupOpen
});
agendaObj.appendTo('#Agenda');


// This method is called when the editor window opens
function onPopupOpen(args) {
    if (args.type === 'Editor') {
        // Change the user field in the editor window based on whether an event is being created or edited
        if(args.data.User != undefined) {
            args.element.querySelector('#user').innerText="Created By: " + args.data.User;
        }
        else{
            args.element.querySelector('#user').innerText = "Created By: " + userName;
        }

        var location = args.element.querySelector('#rooms');
        
        if (!location.classList.contains('e-dropdownlist')) {
            // Initialize drop down list for category selection
            var dropDownListObject = new ej.dropdowns.DropDownList({
                dataSource: locationData,
                // Map the appropriate columns to fields property
                fields: {groupBy: 'category', text: 'location'},
                placeholder: 'Select a location',
                value: location.value,
                popupHeight: '200px',
            });
            dropDownListObject.appendTo(location);
            location.setAttribute('name', 'RoomType');

            var id = treeObj.selectedNodes;
            // If the user has not filtered by lab location enable the location field
            if (locationEnable==true || id=="0") {
                dropDownListObject.enabled = true;
                if(args.data.RoomType!=null){
                    dropDownListObject.value = args.data.RoomType;
                }
                /* Ensure that when the user tries to edit the event in the upcoming bookings column, 
                that the dropdown defaults to the location already selected*/
                else if (id!="0") {
                    dropDownListObject.value = treeData[id].name;
                } 
            }
            // Disable the location field otherwise
            else{
                dropDownListObject.value = treeData[id].name;
                dropDownListObject.enabled = false;
            }
        }
        var startValue;
        var endValue;

        var startElement = args.element.querySelector('#StartTime');
        var endElement = args.element.querySelector('#EndTime');

        if (args.target != undefined) {
            startValue=new Date(startElement.value);
            endValue=new Date(endElement.value);
        }
        // Automatically assign start and end time based on user's current date and time
        else {
            startValue = new Date();
            startValue.setMinutes(Math.ceil(startValue.getMinutes() / 30) * 30);
            endValue = new Date();
            endValue.setMinutes(Math.ceil(endValue.getMinutes() / 30) * 30 + 30);
        }

        // Validate start and end time
        var max = new Date(endValue);
        var min = new Date(startValue);

        var startObj;
        var endObj;

        if (!startElement.classList.contains('e-datetimepicker')) {
            // Initialize start time object
            startObj = new ej.calendars.DateTimePicker({ 
                value: startValue,
                placeholder: 'Start time',
                width: '250px',
                strictMode: true,
                // Set max to end value
                max: max,
                change: function() {
                    // Update min of end time on change
                    min = new Date(startObj.value);
                    endObj.min= min;
                }
            }, startElement);
        }
        
        if (!endElement.classList.contains('e-datetimepicker')) {
            // Initialize end time object
            endObj = new ej.calendars.DateTimePicker({ 
                value: endValue,
                placeholder: 'End time',
                width: '250px',
                strictMode: true,
                // Set min to start value
                min: min,
                change: function() {
                    // Change max of start time on change
                    if (endObj.value != null) {
                        max = new Date(endObj.value);
                        startObj.max = max;
                    }
                    else {
                        startObj.max=new Date(2099, 11, 31);
                    }
                }
            }, endElement);
        }

    }
}

// Manually open editor window when button is pressed
var eventBtn = document.getElementById("btn-event");
eventBtn.addEventListener("click", function() {
    locationEnable = true;
    scheduleObj.openEditor(data, 'Add');
});


function modifyChange (x) {
    change = x;
}
function modifyLocationData (x) {
    locationData = x;
}
function modifyTreeData (x) {
    treeData = x;
}

export {scheduleObj, agendaObj, modifyChange, modifyTreeData, modifyLocationData};