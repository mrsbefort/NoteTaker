 //Import express from express
 const express = require('express');
 const fs = require("fs");
 const util = require("util");
 const readFile = util.promisify(fs.readFile);
 //Keep in mind you can only use this for one server use at a time
 const PORT = 3001;

 //App is storing the express server
 const app = express();

 //Setting up different get routes
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});
//reads contents in db folder
app.get('/api/notes',async (req, res) => {
    const readAPIFile = await readFile(__dirname + "/db/db.json");
    res.json(readAPIFile);
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () =>
console.log(`listening on port http://localhost:${PORT}`)
);

