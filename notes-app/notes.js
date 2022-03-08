const { default: chalk } = require('chalk');
const fs = require('fs');

const getNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue('Your Notes'));
    notes.map((note) => console.log(note.title));

}

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((node) => note.title === title);
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log('New Note added!');
    } else {
        console.log('Note title taken!')
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue('Your Notes'));
    notes.map((note) => console.log(note.title));
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)

    saveNotes(notesToKeep);
    if(notes.length !== notesToKeep.length){
        console.log(chalk.green('Note was removed'));
    } else {
        console.log(chalk.red("Note was not removed"));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteLookup = notes.find((note) => note.title === title);

    if(!noteLookup){
        console.log(chalk.red('Note not found'));
    } else {
        console.log(chalk.green(noteLookup.title));
        console.log(chalk.blue(noteLookup.body));
    }
}

/* auxilar functions */
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}