// Russell Gaspard
// Project 3
// AVF 1310
// Mobile Development
// Full Sail University



/////// SET UP PAGE & EVENT BINDERS ////////////////////////////////

document.addEventListener("deviceready", fnDeviceReady, false);
	
function fnDeviceReady() {
    alert("device ready");
    $("#output").html('<h2>Position:</h2>');
    
    //Event binders
    $('#btnBrowser').on('click', fnGo);
    $('#btnPosition').on('click', fnGo);
    $('#btnHistory').on('click', fnGo);
    $('#btnClear').on('click', fnGo);
    
    
    fnLogo();
};



/////// NATIVE FEATURE 1: DEVICE SPECIFICATIONS /////////////////////////


    function fnLogo() {
        var platform = device.platform;
        
        if(platform === "iOS" || platform === "Android"){
            $('#platform').removeClass('phonegap').addClass(platform);
        }
    };


/////// NATIVE FEATURE 2: IN-APP BROWSER //////////////////////////////

function fnBrowser(eData){
    eData.preventDefault();
    
    var platform = device.platform;
    
    switch(platform){
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


/////// NATIVE FEATURE 3: Geolocation //////////////////////////////////////

function fnPosition(eData) {
    eData.preventDefault();
    navigator.geolocation.getCurrentPosition(fnSuccess, fnError);
};


var fnSuccess = function(geo) {
    var position = '<h2>Position:</h2><p>Latitude: ' + geo.coords.latitude + '</p><p>Longitude: '  +
    geo.coords.longitude + '</p>';
    $('#output').html(position);
    fnSave(position);
};

function fnError(err) {
    //alert(err.message );
    var error = '<h2>Position:</h2><p>Error: ' + err.message + '</p>;
    $('#output').html(error);
    fnSave(error);
}

/////// NATIVE FEATURE 4: LOCAL STORAGE //////////////////////////////

    function fnSave(data){
            var key = Date.now();
            window.localStorage.setItem(key, data);
     };
        
        
    function fnHistory(eData){
        eData.preventDefault();

        var len = window.localStorage.length;
        var sText = "<h2>History:</h2><ul>";
        
        for (var i=0; i<len; i++){
            var key = window.localStorage.key(i);
            var item = window.localStorage.getItem(key);
            sText = sText + "<li>" + item + "</li>";
        };
            sText = sText + "</ul>";
            $('#output').html(sText);
    };

    function fnClear(eData){
        eData.preventDefault();
        window.localStorage.clear();
        $('#output').html('<h2>Position:</h2>');
    };









