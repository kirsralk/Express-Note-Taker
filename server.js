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
// app.delete("/api/notes/:id", function (req, res) {

//     fs.readFile("./db/db.json", "utf8", (err, data) =>{ 
//         if (err) {
//             console.log(err)
//         } else {
            
//             let savedNotes = JSON.parse(data);
//             let noteID = req.params.id;
//             let newID = 0;

//             console.log(`Deleting note with ID ${noteID}`);
//             savedNotes = savedNotes.filter(currNote => {
//                 return currNote.id != noteID;
//             })
    
//             for (currNote of savedNotes) {
//                 currNote.id = newID.toString();
//                 newID++;
//             }
    
//     fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err)=>{
//         if (err) return console.log(err)
//     })
//     res.json(savedNotes); 
//     });
// });

//     // console.log (req);

//     fs.readFile("./db/db.json", "utf8", function (err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             const file = JSON.parse(data);
//             console.log(file);
//             file.delete(file[0]);
//         }
//     });

// });


// Start server to begin listening
// =================================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})
