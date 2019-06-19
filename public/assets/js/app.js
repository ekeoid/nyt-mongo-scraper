$(document).ready(function() {
    setupEventHandlers();
});

function setupEventHandlers() {
    
    $(document).on("click", ".btn-save", function() {
        event.preventDefault();
        let DOM = $(this);
        console.log("click event");
        $.ajax({
            method: "POST",
            url: "/save",
            data: {
                //_id: $(this).find("a").attr("data-id"),
                title: $(this).prev().find(".post-title").text().trim(),
                link: $(this).prev().find("a").attr("href").trim(),
                description: $(this).prev().find(".post-subtitle").text().trim(),
                // image: $(this).find("img")
            }
        })
        .then(function(data){
            DOM.prev().find(".post-title").addClass("text-muted");
            DOM.prev().find(".post-subtitle").addClass("text-muted");
            // console.log(DOM.prev());
            console.log(data);
        })
        .catch(function(err){
            console.log(err);
        });
    });

    $(document).on("click", ".btn-show", function() {
        event.preventDefault();
        $("#notes").empty();
        let thisId = $(this).children().attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
            // With that done, add the note information to the page
        .then(function(data) {
            console.log(data.note);

            data.note.forEach(function(element){
                let newDiv = $("<div>");
                newDiv.addClass("note-container");

                newDiv.append("<button data-id='" + element._id + "' class='btn btn-primary deletenote'>X</button>");
                newDiv.append("<strong>" + element.title + "</strong><br/>");
                newDiv.append("<span>" + element.body + "</span>");
                newDiv.append("<hr/>");

                $("#notes").append(newDiv);
            });

            // // The title of the article
            // $("#notes").append("<h2>" + data.title + "</h2>");
            // // An input to enter a new title
            // $("#notes").append("<input id='titleinput' name='title' >");
            // // A textarea to add a new note body
            // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // // A button to submit a new note, with the id of the article saved to it
            // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        
            // // If there's a note in the article
            // if (data.note) {
            //     // Place the title of the note in the title input
            //     $("#titleinput").val(data.note.title);
            //     // Place the body of the note in the body textarea
            //     $("#bodyinput").val(data.note.body);
            // }
        });
    });



} // end setupEventHandlers()