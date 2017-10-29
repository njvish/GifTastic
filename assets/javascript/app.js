var holidays = ["New Years", "St Patricks Day", "4th of July", "Thanksgiving"];
var apikey = "&api_key=0bV3oA9jMaxzkITKj3CkIpy8IGtxDGrZ&limit=10"


newholidaybtn();

function newholidaybtn() {
    //prevent recreation of buttons and generation of buttons already in array.
    $("#holidayButtons").empty();

    for (var i = 0; i < holidays.length; i++) {
        var button = $("<button>").addClass("btn-primary button-list");
        button.attr("data-holidays", holidays[i]).html(holidays[i]);
        $("#holidayButtons").append(button);
    }
};    
	//add new button to list
	$("#addHoliday").on('click', function() {
	    var holidayEntered = $("#holidayInput").val().trim();
	    holidays.push(holidayEntered);
	    $("#holidayInput").val(" ");
	    newholidaybtn();
		event.preventDefault();
});
	// Create a variable with name of holiday clicked
	$(document.body).on("click", ".button-list", function() {
    
    var holidayClicked = $(this).data("holidays");
    // Clear out the GIFs for next set that is clicked. 	
    $("#holiday").empty();

 console.log($(this).attr("data-holidays"));

      console.log("Works");
      	//setup of api
        var newButton = $(this).attr("data-holidays");	
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newButton + apikey;

        console.log($(this).attr("data-holidays"));

        //ajax call and response with for loop that looks for the rating and holiday chosen then returns it.
        //create variables to store still and animated gifs.
		$.ajax({
          url: queryURL,
          method: "GET"
        })
        
        .done(function(response) {

          var results = response.data;
          
          for (var i = 0; i < results.length; i++) {
            
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              
              var gifDiv = $("<div class='item'>");
              
              var rating = results[i].rating;
              
              var p = $("<p>").text("Rating: " + rating);
                    
              var imgStill = results[i].images.fixed_height_still.url;
              var imgAnimated = results[i].images.fixed_height.url;

              var holidayImage = $("<img>").addClass("gif").attr("src", imgStill).attr("data-still", imgStill).attr("data-animate", imgAnimated).attr("data-state", "still");	
             
              gifDiv.append(p);
              gifDiv.append(holidayImage);
              
              $("#holiday").prepend(gifDiv);
            }
          }
        });
        //function to pause and play the gif
        //not sure why but when first holiday gif is clicked and animated. IF another holiday is chosen gif doesn't animate. click it one more time for animation..

       $("#holiday").on("click", "img.gif", function() {
            var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
         } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            }
       });
    });





	

