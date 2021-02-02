// Dependencies
// =================================================================
var express = require("express");
var path = require("path");

// Set up Express
var app = express();
var PORT = 3000;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


// ROUTES
// =================================================================

// Basic route that sends user to the main 'index.html' page
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Sends user to the 'notes.html' page
app.get("./public/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});






// Start server to begin listening
// =================================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})
