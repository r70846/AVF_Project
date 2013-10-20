// Russell Gaspard
// Project 2
// AVF 1310
// Mobile Development
// Full Sail University



/////// SET UP PAGE & EVENT BINDERS ////////////////////////////////

document.addEventListener("deviceready", fnDeviceReady, false);
	
function fnDeviceReady() {
        //alert("device ready");
		$("#outputDevice").html('');

        //Event binders
        $('#btnDevice').on('click', fnShowDevice);
        $('#btnBrowser').on('click', fnBrowser);
    
        $('#btnSave').on('click', fnSave);
        $('#btnList').on('click', fnList);
        $('#btnClear').on('click', fnClear);
    
        $('#btnPosition').on('click', fnPosition);
    
        $('#btnSnap').on('click', fnSnap);
	};



/////// NATIVE FEATURE 1: DEVICE SPECIFICATIONS /////////////////////////


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


/////// NATIVE FEATURE 2: IN-APP BROWSER //////////////////////////////

function fnBrowser(eData){
    eData.preventDefault();
    
    var ref = window.open('http://www.nytimes.com', '_blank', 'location=yes');

}

/////// NATIVE FEATURE 3: LOCAL STORAGE //////////////////////////////

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



function fnGo(eData){
    eData.preventDefault();
    var key = Date.now();
    alert(key);
};




