// Russell Gaspard
// Project 2
// AVF 1310
// Mobile Development
// Full Sail University

/////// CODE FOR DISPLAY PAGE ////////////////////////////////

document.addEventListener("deviceready", fnDeviceReady, false);

	//$(function() { fnDeviceReady() });
	
function fnDeviceReady() {
        alert("device ready");
		$("#outputDevice").html('');

        //Event binders
        $('#btnDevice').on('click', fnShowDevice);
        $('#btnBrowser').on('click', fnBrowser);
    
        $('#btnSnap').on('click', fnSnap);
	};

	function fnGo(eData){
        alert("Hello?");
		eData.preventDefault();
        fnShowDevice();
	};

    var fnShowDevice = function(eData) {
        eData.preventDefault();
        
        $("#outputDevice").html(
        	'Device Name: '     + device.name     + '<br />' +
        	'Device Cordova: '  + device.cordova  + '<br />' +
        	'Device Platform: ' + device.platform + '<br />' +
        	'Device UUID: '     + device.uuid     + '<br />' +
        	'Device Model: '    + device.model    + '<br />' +
        	'Device Version: '  + device.version  + '<br />'
        )
    };
////////////////////////////////////////////////////////////////////

function fnBrowser(eData){
    eData.preventDefault();
    
    var ref = window.open('http://www.nytimes.com', '_blank', 'location=yes');

}
////////////////////////////////////////////////////////////////////

function fnSnap(eData){
    eData.preventDefault();
    alert("camera");
    navigator.camera.getPicture(onSuccess,onFail,
        {quality: 50, destinationType: Camera.DestinationType.DATA_URL
    });
};

function onSuccess(imageData) {
    $("#outputImage").src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}


