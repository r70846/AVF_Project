// Russell Gaspard
// Project 4
// AVF 1310
// Mobile Development
// Full Sail University

/////// SET UP PAGE & EVENT BINDERS ////////////////////////////////

document.addEventListener("deviceready", fnDeviceReady, false);

function fnDeviceReady() {
        //alert("device ready");
    
		$("#outputWords").html('<h2 id="wlabel">Words:</h2>');
		$("#photoList").html('');				//Clear word display area & photo display areas
		$('#kword').val('');                    //Clear keyword input field
        
        //Event binders
        $('#goButton').on('click', fnGo);		//Call function to process keyword
        $('#home').on('click', fnHome);			//Call function to navigate home
        
        //Provide initial explanation/instruction
        $("#message").html("<hr/><p>Enter a key word above to generate related words and photos.<p><hr/>");
    
};


var fnHome = function(){
	window.location.href = "index.html";
};


var fnConnection = function(){
    
    var sText = "";
	var cType = navigator.connection.type;
    var connection = {};
    
    connection[Connection.UNKNOWN]  = 'Unknown';
    connection[Connection.ETHERNET] = 'Ethernet';
    connection[Connection.WIFI]     = 'WiFi';
    connection[Connection.CELL_2G]  = '2G Cell';
    connection[Connection.CELL_3G]  = '3G Cell';
    connection[Connection.CELL_4G]  = '4G Cell';
    connection[Connection.CELL]     = 'Generic Cell';
    connection[Connection.NONE]     = 'No Network';
    
    var sConnection = connection[cType];
    
    if(sConnection === 'No Network'){
        sText = "<hr/><p>Service unavailable. No network connection at this time.</p><hr/>";
    }else{
        sText = "<hr/><p>Loading through"+ sConnection + " connection...</p><hr/>";
        
    }
    
    $("#message").html(sText);
};


var fnGo = function (eData){
    //alert("Hello?");
    eData.preventDefault();                     //Prevent page reload from button push
    
	var tag = $('#kword').val();				//Get keyword
    if(tag.length > 0){
    
        $("#message").html('');                     //Clear Connection Message
        $("#outputWords").html('<h2 id="wlabel">Words:</h2>');
        $("#photoList").html('');					//Clear word display area & photo display areas
        
        fnConnection();							    //Call Show Connection type while loading
        fnInstagram(tag);							//Call Instagram API function
        fnThesaurus(tag);							//Call Thesaurus API function
    };
};

/////// JSONP REMOTE DATA API 1 : INSTAGRAM /////////////////////////

	//Search Instagram for users tag word: Setup callback
var fnInstagram = function (word) {
	var address = "https://api.instagram.com/v1/tags/" + word + 
			"/media/recent?callback=?&amp;client_id=d51f6ee392ba41dfa0c28e580e9fa5da&amp;min_id=10";
	$.getJSON(address, fnDisplayPics);
};

										//Retrieve and append each photo into the list on our page
var fnDisplayPics = function (info){	
	$.each(info.data, function(i, pic) {
		var photo = "<div class='imgWrap'><img src='" + pic.images.standard_resolution.url + "' /></div>";
		$("#photoList").append(photo);
	});
    $("#message").html('');            //Clear Connection Message
};
	
/////// JSONP REMOTE DATA API 2 : THESAURUS /////////////////////////

var fnThesaurus = function (word){						//Insert keyword in URL & fire AJAX call
	var address = "http://words.bighugelabs.com/api/2/cd242e86697b9eac71be92244bb679ad/" + word + "/json"
    $.ajax({
        type: "GET",
        url: address,
        dataType: "jsonp",
        jsonpCallback: 'fnDisplayWords'
    });
};

var fnDisplayWords = function (info){
	//We cannot know if return data has "noun", "verb" and/or "adjective" groupings..
	//If statements search for each time and prevent throwing error id its not there..
	
	if(info.noun != undefined){	
		$.each(info.noun.syn, function(i, syn) {
			console.log("noun");
			var strn = "<span> " + syn + " :</span>";   
			$("#outputWords").append(strn);
		}); 
	};
	if(info.verb != undefined){
		$.each(info.verb.syn, function(i, syn) {
			console.log("vrb");
            var strn = "<span> " + syn + " :</span>";
			$("#outputWords").append(strn);
		}); 
	};
	if(info.adjective != undefined){
		$.each(info.adjective.syn, function(i, syn) {
			console.log("adj");
            var strn = "<span> " + syn + " :</span>";
			$("#outputWords").append(strn);
		}); 
	};	
}; 
		

	

	
