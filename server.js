// Dependencies
// =================================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var util = require("util");

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
app.post("/api/notes", function(req, res) {

    fs.readFile("./db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            const file = JSON.parse(data);
            console.log("file=" + file);
            file.push({"title":"line 44","text":"444444"});
            const json = JSON.stringify(file);
            console.log("json=" + json);

        fs.writeFile("db/db.json", json, "utf8", (err) => {
            if (err) {
                console.error(err);
                return
            } else {
                console.log("\nFile Contents after append:\n",
                fs.readFileSync("db/db.json", "utf8"));
            }
        });
            console.log("line 52 ran then returned");
            return

        }

        
    });
    // var savedNotes = fs.readFileSync("./db/db.json", "utf8")
    // console.log("savedNotes var = " + savedNotes);
    // //this is grabbing the note contents!

    // var savedNotes2 = [savedNotes];
    // console.log("savedNotes2 with savedNotes = " + savedNotes2);

    // savedNotes2.push(req.query);

    // console.log("savedNotes2 after pushing query =" + savedNotes2);

    // savedNotesStr = JSON.stringify(savedNotes2);


});


// Start server to begin listening
// =================================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})
