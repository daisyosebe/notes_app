const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// API Routes
// Get
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './assets/db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});
// Post
app.post('/api/notes', (req, res) => {
  const newNote = { id: uuidv4(), ...req.body };
  fs.readFile(path.join(__dirname, './assets/db/db.json'), 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, './assets/db/db.json'), JSON.stringify(notes, null, 2), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/public/notes.html'));
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets/public/index.html'));
  });

// app.delete('/api/notes/:id', (req, res) => {
  //   const { id } = req.params;
  //   fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
    //     if (err) throw err;
    //     const notes = JSON.parse(data);
    //     const updatedNotes = notes.filter(note => note.id !== id);
    //     fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(updatedNotes, null, 2), (err) => {
      //       if (err) throw err;
      //       res.json({ id });
  //     });
  //   });
  // });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });