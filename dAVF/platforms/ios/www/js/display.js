// Russell Gaspard
// Project 3
// AVF 1310
// Mobile Development
// Full Sail University

/////// SET UP PAGE & EVENT BINDERS ////////////////////////////////

document.addEventListener("deviceready", fnDeviceReady, false);

function fnDeviceReady() {
        //alert("device ready");
    
		$("#outputWords").html('<span id="wlabel"><h2>Words:</h2></span>');
		$("#photoList").html('');				//Clear word display area & photo display areas
		$('#kword').val('');                    //Clear keyword input field
        
        //Event binders
        $('#goButton').on('click', fnGo);		//Call function to process keyword
	};

var fnGo = function (eData){
    //alert("Hello?");
    eData.preventDefault();                     //Prevent page reload from button push
	$("#outputWords").html('<span id="wlabel"><h2>Words:</h2></span>');
	$("#photoList").html('');					//Clear word display area & photo display areas
	var tag = $('#kword').val();				//Get keyword
	fnInstagram(tag);							//Call Instagram API function
	fnThesaurus(tag);							//Call Thesaurus API function
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
		

	

	
