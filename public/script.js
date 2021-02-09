$("#saveNote").on("click", function(event) {
    event.preventDefault();

    // Here we grab the form elements
    var newNote = {
      title: $("#note-title").val().trim(),
      text: $("#note-text").val().trim(),
    };

    console.log("New note contents: " + JSON.stringify(newNote));

    // $.post("/api/notes", newNote,
    //   function(data) {

    //     // If a table is available... tell user they are booked.
    //     // if (data) {
    //       alert("Yay! Your note was posted!");
    //     // }

    //     // // If a table is available... tell user they on the waiting list.
    //     // else {
    //     //   alert("Sorry you are on the wait list");
        

    //     // Clear the form when submitting
    //     $("#note-title").val("");
    //     $("#note-text").val("");
    //   });

    $.ajax({
        url: "api/notes",
        method: "POST",
        headers: {
            'Authorization': 'Basic ' +btoa('_system:SYS'),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST'
        }
    });

    });

$("#start").on("click", function(event) {
        alert("this button works");
        $.ajax({
            url: "notes",
            method: "GET",
            // headers: {
            //     'Authorization': 'Basic ' +btoa('_system:SYS'),
            //     'Access-Control-Allow-Origin': '*',
            //     'Content-Type': 'application/json',
            //     'Access-Control-Allow-Methods': 'GET, POST'
            // }
          
        });
    
        });