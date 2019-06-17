$(document).ready(function() {
    setupEventHandlers();
});

function setupEventHandlers() {
    $(document).on("click", ".btn-save", function(event) {
        event.preventDefault();
        
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
            console.log(data);
        })
        .catch(function(err){
            console.log(err);
        });
    });
}