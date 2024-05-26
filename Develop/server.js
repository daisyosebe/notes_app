const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
  });


app.get('/notes', (req, res) => res.json(noteData));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})

app.get('/routes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/dizzy', (req, res) =>{
  console.log("woof woof")
})

// app.get("*", (req, res) => res.send("no page found."))


// listen() method is responsible for listening for incoming connections on the specified port 
// telling express start listening on "port 3001" 
// Xpress will not listen to anything unless you tell it to. 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);



