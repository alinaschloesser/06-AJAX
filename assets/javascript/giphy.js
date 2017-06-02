// Initial array of topics
var topics = ["Panda", "Tiger", "Monkey", "Turtle", "Bunny", "Dog", "Cat", ];

var movingResults;
var results;
// Generic function for capturing the topic name from the data-attribute
function getTenGifs() {
    $("#gif-location").empty();
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(queryURL);
        console.log(response);
        //$("#topics-view").html(JSON.stringify(response));
        renderButtons();
        //displaying gifs for topics
        for (var i = 0; i < 11; i++) {
            //location of rating
            var rating = response.data[i].rating;

            //location in response of each still gif
            results = response.data[i].images.fixed_height_still.url;

            //location of moving gif
            movingResults = response.data[i].images.fixed_height.url;
            $("#gif-location").append("<div data='static'><img id=" + i + " src=" + results + "><p> Rating: " + rating + "</p></div>");


            //
        }
        //clicking gif
        $("img").on("click", function() {

            if ($(this).attr("data") == "static") {

                var location = parseInt($(this).attr("id"));
                $(this).attr("src", response.data[location].images.fixed_height.url); //change to moving gif
                //$(this).html($("#gif-location").append("<span><img src=" + movingResults + ">" + rating + "</span>").attr("id", "result" + i);) = 
                $(this).attr("data", "active");

            } else {
                var location = parseInt($(this).attr("id"));
                $(this).attr("src", response.data[location].images.fixed_height_still.url);
                $(this).attr("data", "static");

            }
        });

    });
}


// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#topics-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("topic");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the HTML
        $("#topics-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-topic").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var topic = $("#topic-input").val().trim();

    // Adding the movie from the textbox to our array
    topics.push(topic);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    $("#topic-input").val(" ");

});

// Function for displaying the movie info
// We're adding a click event listener to all elements with the class "movie"
// We're adding the event listener to the document because it will work for dynamically generated elements
// $(".movies").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".topic", getTenGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();
