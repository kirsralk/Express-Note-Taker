// Dependencies
// =================================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var util = require("util");

// Set up Express
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// ROUTES
// =================================================================

// Basic route that sends user to the main 'index.html' page
// app.get("*", function(req, res){
//     res.sendFile(path.join(__dirname, "./public/index.html"));
// });

app.get("/", function(req, res){
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

// Receive a note to save, add it to db.json
app.post("/api/notes", function(req, res) {

    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            const file = JSON.parse(data);
            const query = req.query;
            file.push(query);
            const json = JSON.stringify(file);

            fs.writeFile("db/db.json", json, "utf8", (err) => {
                if (err) {
                    console.error(err);
                    return
                } else {
                    console.log("\nFile Contents after append:\n",
                    fs.readFileSync("db/db.json", "utf8"));
                }
            });
        }
        
    });

});

// Delete a note from db.json
app.delete("/api/notes/:id", function (req, res) {
    let userJson = require("./db/db.json");
    let deleteId = req.params.id; //Get the id through req.params.id of the object you are going to delete
    console.log("deleted id= " + deleteId);
    let deleteObj = userJson.find(user => user.id == deleteId); // As you have only Id of the object, we want to get the entire object from the array. find() will fetch the object from the array whose id is equal to deleteId and assign it to deleteObj.
    let deleteIndex = userJson.indexOf(deleteObj); //Find the index of the object fetched from the JSON array.
    userJson.splice(deleteIndex,1); // Splice/ remove the object from the JSON Array.
    res.send(deleteObj); // Send the deleted object as response.
    // console.log(res);
    console.log(deleteObj);
    console.log(userJson);
    const json = JSON.stringify(userJson);

    fs.writeFile("db/db.json", json, "utf8", (err) => {
        if (err) {
            console.error(err);
            return
        } else {
            console.log("\nFile Contents after deletion:\n",
            fs.readFileSync("db/db.json", "utf8"));
        }
    });

});


// Start server to begin listening
// =================================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})
