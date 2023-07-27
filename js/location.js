var locationData = [];

// Ajax request to call the data file to get the location data from local database
$.ajax({
    type:'POST',
    url: "data.php",
    async: false,
    data: {
        action: "location"
    },
    success: function(response) {
        var arr = response.split(',');
        var j=0;
        for (var i=0; i<(arr.length-1)/3;i++) {
            locationData.push({category: arr[j], location: arr[j+1], color: arr[j+2]})
            j+=3;
        }
    }
});

export {locationData};