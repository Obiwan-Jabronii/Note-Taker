const express = require('express');
const router = express.Router();
const db = require('../../Develop/db/db.json')
const { newNote, validNote, deleteNote } = require('../../lib/notes')
const fs = require('fs')
const path = require('path');

router.get('/notes', (req, res) => {
    fs.readFile(
        path.join(__dirname, '../../db/db.json'), 'utf-8', (err, data) => {
          let notes = JSON.parse(data);
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          } else {
            res.json(notes);
          }
        }
      );
});
  

router.post('/notes', (req, res) => {

  req.body.id = uniqid();


  fs.readFile(
    path.join(__dirname, '../../db/db.json'), 'utf-8', (err, data) => {
      let currentNotes = JSON.parse(data);
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      } else {
  
        if (!validNote(req.body)) {
          res.status(400).send('The note is not properly formatted.');
        } else {

          let createNewNote = newNote(req.body, currentNotes);
          res.json(createNewNote);
        }
      }
    }
  );
});

router.delete('/notes/:id', (req, res) => {

  fs.readFile(
    path.join(__dirname, '../../db/db.json'), 'utf-8', (err, data) => {
      let currentNotes = JSON.parse(data);
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      } else {
        let updatedNotes = deleteNote(req.params, currentNotes);
        res.json(updatedNotes);
      }
    }
  );
});

module.exports = router;