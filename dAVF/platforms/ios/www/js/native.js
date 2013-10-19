// Russell Gaspard
// Project 2
// AVF 1310
// Mobile Development
// Full Sail University

/////// CODE FOR DISPLAY PAGE ////////////////////////////////

document.addEventListener("deviceready", fnDeviceReady, false);

	//$(function() { fnDeviceReady() });
	
function fnDeviceReady() {
        //alert("device ready");
		$("#outputDevice").html('');

        //Event binders
        $('#btnDevice').on('click', fnShowDevice);
        $('#btnBrowser').on('click', fnBrowser);
    
        $('#btnSave').on('click', fnSave);
        $('#btnList').on('click', fnList);
        $('#btnClear').on('click', fnClear);
    
        $('#btnSnap').on('click', fnSnap);
	};

	function fnGo(eData){
        eData.preventDefault();
        var key = Date.now();
        alert(key);
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

    function fnSave(eData){
        eData.preventDefault();
    
            var key = Date.now();
            var item = $('#kword').val();
        
            if(item != ''){
                window.localStorage.setItem(key, item);
                alert("item stored");
                $('#kword').val('');
            }else{
                alert("no item value");
            };
     };
        
        
    function fnList(eData){
        eData.preventDefault();

        var len = window.localStorage.length;
        var sText = "";
        
        for (var i=0; i<len; i++){
            //sText = sText + window.localStorage.key(i) + " : " + window.localStorage.item(i) + \n ;
            var key = window.localStorage.key(i);
            var item = window.localStorage.getItem(key);
            sText = sText + key + " : " + item + "\n" ;
        };
        alert(sText);
    };

    function fnClear(eData){
        eData.preventDefault();
        window.localStorage.clear();
        //window.localStorage.removeItem("key");
    };





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


