// Dependencies
// =================================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

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
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Returns all saved notes as JSON
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

// Receive a note to save on the request body, add it to db.json
// app.post("/api/notes", function(req, res) {
//     db.push(req.body);
// });





// Start server to begin listening
// =================================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})
