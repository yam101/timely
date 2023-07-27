ej.base.registerLicense('ORg4AjUWIQA/Gnt2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5UdEViXntYcnVSQmhZ');

import { scheduleObj} from '../main.js';
import { locationData } from '../location.js';
import {data} from '../eventData.js';

// Data for tree object
var treeData = [
    {id: "0", name: "All bookings", selected: true},
    {id: "1", name: "Computer Bookings", hasChild: true, expanded: true},
    {id: "2", name: "Area Bookings", hasChild: true, expanded: true},
]

// Add data to tree object
for (var i=0;i<locationData.length;i++) {
    if (locationData[i].category == "Computer Bookings") {
        treeData.push({id: (i+3).toString(), name: locationData[i].location, pid:"1"});
    }
    else {
        treeData.push({id: (i+3).toString(), name: locationData[i].location, pid:"2"});
    }
};

// Initialize tree object
var treeObj = new ej.navigations.TreeView({
    fields: { dataSource: treeData, id: "id", text: "name", selected: "selected", parentID: "pid", hasChildren: "hasChild", expanded: "expanded" },
    nodeSelected: onSelect,
    selectedNodes: ["0"],
    allowTextWrap: true
});
treeObj.appendTo("#treeView");

var filteredData = [];
// Function is called when one of the tree object nodes is selected
function onSelect(args) {
    var nodeText = args.nodeData.text;

    // Doesn't do anything if the user selects the header nodes
    if(nodeText == "Computer Bookings" || nodeText == "Area Bookings") {
        args.cancel = true;
    }
    // If the user filters by all bookings, it binds all the data to the calendar
    else if (nodeText == "All bookings") {
        document.getElementById("change-lab-name").innerText = "Calendar view | " + nodeText;
        scheduleObj.eventSettings.dataSource = data;
        scheduleObj.dataBind();
    }
    // Otherwise, it will filter the events based on the node that the user selected
    else{
        document.getElementById("change-lab-name").innerText = "Calendar view | " + nodeText;
        filteredData = [];
        var fildata = filter(nodeText);
        filteredData = filteredData.concat(fildata);
          
        scheduleObj.eventSettings.dataSource = filteredData;
        scheduleObj.dataBind();
    }
}

// Method for filtering through events in data array based on matching room type
function filter(id) {
    var dm = new ej.data.DataManager({ json: data });
    var CurData = dm.executeLocal(new ej.data.Query().where("RoomType", 'equal', id));
    return CurData;
}

export {treeObj, treeData, filteredData};