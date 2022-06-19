 //Import express from express
 const e = require('express');
const express = require('express');
 const fs = require("fs");
 const util = require("util");
 const readFile = util.promisify(fs.readFile);
 //Keep in mind you can only use this for one server use at a time
 const PORT = 3001;

 //App is storing the express server
 const app = express();
//middle ware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
 //Setting up different get routes
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});
//reads contents in db folder
app.get('/api/notes',async (req, res) => {
    const readAPIFile = await readFile("./db/db.json");
    console.log(readAPIFile);
    const parsedreadFile = await JSON.parse(readAPIFile);
    res.json(parsedreadFile);
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/notes', (req, res) => {
const readAPIFile = req.body;
// review_id: uuid()
console.log(req.body);
fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedReviews = JSON.parse(data);

        // user created a new note and sent it in body
        parsedReviews.push(req.body);
        //writing updated new notes to file
        // Write updated reviews back to the file
        fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedReviews),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }

})
//adding a response
const response = {
    status: 'success',
    body: req.body,
  };

  console.log(response);
  res.json(response);

});


app.listen(PORT, () =>
console.log(`listening on port http://localhost:${PORT}`)
);

