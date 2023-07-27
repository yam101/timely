import { scheduleObj, agendaObj } from "./main.js";

var data = [];
var userEvents = [];

// Ajax request to call the data file to get the event data from local database
$.ajax({
    type:'POST',
    url: "data.php",
    data: {
        action: "events"
    },
    success: function(response) {
        var arr = response.split('|');

        for (var i=0; i<(arr.length-1);i++) {
            var event = JSON.parse(arr[i]);

            event.StartTime=new Date(event.StartTime);
            event.EndTime= new Date(event.EndTime);
            data.push(event);
        }   
        
        scheduleObj.refresh();

        /* The following filters through the events and only displays the current 
        user events in the agenda rather than all of them
        */
        if (userName != "admin") {
            var fildata = (function() {
                var dm = new ej.data.DataManager({ json: data });
                var CurData = dm.executeLocal(new ej.data.Query().where("User", 'equal', userName));
                return CurData;
            })();
    
            userEvents = userEvents.concat(fildata);
            agendaObj.eventSettings.dataSource = userEvents;
        }
        else {
            userEvents = data;
            agendaObj.eventSettings.dataSource = userEvents;
        }
    }
});

export {data, userEvents};