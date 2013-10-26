// Russell Gaspard
// Project 4
// AVF 1310
// Mobile Development
// Full Sail University


/////// SET UP PAGE & EVENT BINDERS ////////////////////////////////

document.addEventListener("deviceready", fnDeviceReady, false);

function fnDeviceReady() {
    //alert("device ready");
    $("#output").html('');                          //Make sure we have a clean page to report to
    
    //Event binders
    $('#home').on('click', fnHome);					//Call function to navigate home
    $('#btnBrowser').on('click', fnBrowser);        //Launch function that uses native "in-app browser" funtionality to visit platform specifc site
    $('#btnPosition').on('click', fnPosition);      //Launch function to report Latitude and Longitude via native "geolocation"
    $('#btnHistory').on('click', fnHistory);        //Launch function to report position history as saved in native "local-storage"
    $('#btnClear').on('click', fnClear);            //Launch function to clear native "local-storage" for this app
    
    fnLogo();                                       //Launch function that uses native "device" queries to detect platform & change logo
};

/////// NAVIGATE HOME /////////////////////////
var fnHome = function(){
	window.location.href = "index.html";
};

/////// NATIVE FEATURE 1: DEVICE SPECIFICATIONS /////////////////////////

var fnLogo = function () {
    var platform = device.platform;                     //use native "device" querrry to detect platform
    //alert(platform);
    
    if(platform === "iOS" || platform === "Android"){
        $('#platform').removeClass('phonegap').addClass(platform);
    }
};                                                      //change class attribute of img tag to swap css background-image


/////// NATIVE FEATURE 2: IN-APP BROWSER //////////////////////////////

var fnBrowser = function (eData){
    eData.preventDefault();                             //Prevent page reload from button push
    var platform = device.platform;                     //use native "device" querrry to detect platform
    switch(platform){                                   //switch statement uses appropriate site for in-app browser
        case "iOS":
            var ref = window.open('http://www.apple.com', '_blank', 'location=yes');
            break;
        case "Android":
            var ref = window.open('http://www.android.com', '_blank', 'location=yes');
            break;
        default:
            var ref = window.open('http://www.phonegap.com', '_blank', 'location=yes');
    };
};

/////// NATIVE FEATURE 3: Geolocation (MASHUP - with MapBox Remote Data Service) //////

var fnPosition = function (eData) {                      //Get geolocation data, set up callbacks
    eData.preventDefault();                              //Prevent page reload from button push
    navigator.geolocation.getCurrentPosition(fnSuccess, fnError);
};


var fnSuccess = function (geo) {
    var lat = geo.coords.latitude;                      //Get Latitude and Longitude
    var lon = geo.coords.longitude;
    var position = '<p>Latitude: ' + lat + '</p><p>Longitude: ' +  lon + '</p>';
    fnMapBox(lon,lat);
    //$('#output').append(position);                        //Write results to the page
    
    //var entry = $('#output').html();
    //fnSave(entry);                                   //Call function to record in local storage
};

var fnError = function (err) {
    //alert(err.message );                              //Display and save error messages same way for testing
    var error = '<h2>Position Unavailable:</h2><p>' + err.message + '</p>';
    $('#output').html(error);
    fnSave(error);
}

/////// MASHUP: MapBox Geolocation Service //////////////////////////////////////

var fnMapBox = function(lon,lat){
    var address = "http://api.tiles.mapbox.com/v3/russellmgaspard.map-hvrxgfg4/geocode/" +lon + "," + lat + ".jsonp";
    
    $.ajax({
           type: "GET",
           url: address,
           dataType: "jsonp",
           jsonpCallback: 'grid',
           });
};


function grid(data){
    //alert(data.results[0][0].name);
    var location = '<h2>' + data.results[0][0].name + '</h2>';
    var position = '<p>Longitude: ' + data.query[0] + '</p><p>Latitude: ' +  data.query[1] + '</p>';
    var entry = location + position;
    $('#output').html(entry);
    fnSave(entry);                                   //Call function to record in local storage
    
};

/////// NATIVE FEATURE 4: LOCAL STORAGE //////////////////////////////

var fnSave = function (data){
	var key = Date.now();								//Create key in milliseconds
	window.localStorage.setItem(key, data);				//Save data in local storage
};
        
        
var fnHistory = function (eData){
    eData.preventDefault();                             //Prevent page reload from button push
	var len = window.localStorage.length;               //How many entries to loop through?
	var sText = "<h2>History:</h2><ul>";                //Begin html string for history list
	for (var i=0; i<len; i++){                          //Loop through local storage
		var key = window.localStorage.key(i);           //Retrieve key
		var item = window.localStorage.getItem(key);    //Retrieve item
		sText = sText + "<li>" + item + "</li>";        //Append html string
	};
		sText = sText + "</ul>";                        //complete html string and publish to page
		$('#output').html(sText);
};

var fnClear = function fnClear(eData){
    eData.preventDefault();                             //Prevent page reload from button push
	window.localStorage.clear();                        //Clear local storage & reset display area
	$('#output').html('');
};

