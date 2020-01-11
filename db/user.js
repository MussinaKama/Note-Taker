var fs = require("fs")

var util = require("util");

let readFileAsync = util.promisify(fs.readFile);
let writeFileAsync = util.promisify(fs.writeFile);

class User {
    constructor() {
        this.lastId = 0;
    }
    readFile() {
       return readFileAsync("db/db.json", "utf8")
    }

    writeFile(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }


    async getNote() {
     return this.readFile().then(notes => {
        var allNotes;
        if (notes !== []) {
            allNotes = [].concat(JSON.parse(notes))
        } else {
            allNotes = []
        }
        return allNotes;
     })
    }
     
    async addNote(note) {
        const {title, text} = note;
        if (!title || !text) {
            throw new Error("Title and text required")
        }
        const newNote = {title, text, id: ++ this.lastId}
        return this.getNote().then(notes => [...notes, newNote]).then(note => this.writeFile(note)).then(() => newNote);
    }

    async deleteNote(id) {
        return this.getNote().then(notes => notes.filter(note => note.id !== parseInt(id)))
        .then(filteredNotes => this.writeFile(filteredNotes));
    }
}

module.exports = new User;