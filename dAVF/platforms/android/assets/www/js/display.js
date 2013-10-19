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
		$("#outputWords").html('<span id="wlabel"><h2>Words:</h2></span>');
		$("#photoList").html('');
		$('#kword').val('');
        
        //Event binders
        $('#goButton').on('click', fnGo);
	};

	function fnGo(eData){
        //alert("Hello?");
		eData.preventDefault();
		$("#outputWords").html('<span id="wlabel"><h2>Words:</h2></span>');
		$("#photoList").html('');
		var tag = $('#kword').val();
		fnInstagram(tag);
		fnThesaurus(tag);
	};

	function fnThesaurus(word){
		var address = "http://words.bighugelabs.com/api/2/cd242e86697b9eac71be92244bb679ad/" + word + "/json"
		
        $.ajax({
            type: "GET",
            url: address,
            dataType: "jsonp",
            jsonpCallback: 'fnDisplayWords'
        });
	};

	function fnDisplayWords(info){
		if(info.noun != undefined){
			$.each(info.noun.syn, function(i, syn) {
				console.log("noun");
				//var strn = "<a href='#'><span> [" + syn + "] </span></a>";
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
		

	//Search Instagram for users tag word
	function fnInstagram(word) {
		var address = "https://api.instagram.com/v1/tags/" + word + 
			"/media/recent?callback=?&amp;client_id=d51f6ee392ba41dfa0c28e580e9fa5da&amp;min_id=10";
		$.getJSON(address, fnDisplayPics);
	};


	var fnDisplayPics = function (info){
		//Clear display space of previous searches
		
		//Place each Photo and label into the list
		$.each(info.data, function(i, pic) {
		var photo = "<div class='imgWrap'><img src='" + pic.images.standard_resolution.url + "' /></div>";
			$("#photoList").append(photo);
		}); 
	};
	
	

	
