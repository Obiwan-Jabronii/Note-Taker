const fs = require('fs');
const path = require('path');

const validNote = (note) => {
    if (!note.title || typeof note.title !== 'string') {
        return false;
      }
      if (!note.text || typeof note.text !== 'string') {
        return false;
      }
      return true;
};

const newNote = (body, notesArr) => {
    const note = body;
    notesArr.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArr)
    );
    return notesArr;
}

const deleteNote = (query, notesArr) => {
    notesArr = notesArr.filter(note => note.id !== query.id);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'), JSON.stringify(notesArray));
  };
module.exports = {
    newNote,
    validNote,
    deleteNote
}