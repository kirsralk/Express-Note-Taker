// Dependencies
var express = require("express");
var path = require("path");

// Set up Express
var app = express();
var PORT = 3000;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Start server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})
