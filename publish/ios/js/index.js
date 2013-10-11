// Russell Gaspard
// Project 2
// AVF 1310
// Mobile Development
// Full Sail University


//First time home page loads....
$('#home').on('pageinit', function(){
	
});	

//Every time display page loads....
$('#dis').on('pageshow', function(){

	$("#kword").val("");   //Clear text field
	$("#outputPhotos").html('<li id="message"><h2>Photos</h2></li>'); //Clear display area

});

//First time display page loads....
$('#dis').on('pageinit', function(){


/////// CODE FOR DISPLAY PAGE ////////////////////////////////

	function fnGo(){
		var tag = $('#kword').val();
		fnThesaurus(tag);
		fnInstagram(tag);
	};


	function fnThesaurus(word){
		var address = "http://words.bighugelabs.com/api/2/cd242e86697b9eac71be92244bb679ad/" + word + "/json"
		
        $.ajax({
            type: "GET",
            url: address,
            dataType: "jsonp",
            jsonpCallback: 'fnFilter'
        });
	};

	function fnFilter(info){
		alert("Made it here");
		console.log(info);
	};

	//Search Instagram for users tag word
	function fnInstagram(word) {
		var address = "https://api.instagram.com/v1/tags/" + word + 
			"/media/recent?callback=?&amp;client_id=d51f6ee392ba41dfa0c28e580e9fa5da&amp;min_id=10";
		$.getJSON(address, fnDisplayPics);
	};


	var fnDisplayPics = function (info){
		//Clear display space of previous serches
		$("#outputPhotos").html('<li id="message"><h2>Photos</h2></li>');
		
		//Place each Photo and label into the list
		$.each(info.data, function(index, photo) {
		var pic = "<li><img src='" + photo.images.standard_resolution.url + "' alt='" + photo.user.id
				+ "' /><h4>" + photo.user.full_name + ", <em>(" + photo.user.username + ")</em></h4></li>";
			$("#outputPhotos").append(pic);
		}); 
	};
	
	
	//Event binders	
	$('#goButton').on('click', fnGo);
	
	
});	

