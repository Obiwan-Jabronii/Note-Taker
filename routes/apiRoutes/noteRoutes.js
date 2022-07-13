const express = require('express');
const router = express.Router();
//const { newNote, validNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const fs = require('fs');
const path = require('path');
const generateUniqueId = require('generate-unique-id')

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results)
});
  

router.post('/notes', (req, res) => {

  const newNote = req.body

  req.body.id = generateUniqueId();

  notes.push(newNote);

  fs.writeFileSync(path.join(__dirname, '../../db/db.json'),JSON.stringify({ notes }, null, 2));

  res.json(newNote);

});

// router.delete('/notes/:id', (req, res) => {

//   fs.readFile(
//     path.join(__dirname, '../../db/db.json'), 'utf-8', (err, data) => {
//       let currentNotes = JSON.parse(data);
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       } else {
//         let updatedNotes = deleteNote(req.params, currentNotes);
//         res.json(updatedNotes);
//       }
//     }
//   );
// });

module.exports = router;