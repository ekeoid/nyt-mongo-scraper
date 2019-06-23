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

        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
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

        });
    });

    $(document).on("click", ".deletenote", function() {
        event.preventDefault();
        let thisId = $(this).attr("data-id");
        let thisArtId = $(this).parent().parent().parent().attr("id").slice(9);
        
        $.ajax({
            method: "PUT",
            url: "/notes/" + thisId
        })
        .then(function(data) {
            console.log("PUT response: ", data);
            $("#notes").empty();

        })
        .then(function(data) {
            console.log("jQuery");
            console.log(thisArtId);
            
            $.ajax({
                method: "GET",
                url: "/articles/" + thisArtId
            })
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
            });
        });

        

    });

    $(document).on("click", ".deletearticle", function() {
        event.preventDefault();
        let thisId = $(this).attr("data-id");
        console.log(thisId);

        $.ajax({
            method: "POST",
            url: "/delete/" + thisId
        })
        .then(function(data) {
            console.log("PUT delete");
            location.reload();
            // $.ajax({
            //     method: "GET",
            //     url: "/articles"
            // });

        });
    });

} // end setupEventHandlers()