const User = require("../db/user")

module.exports = function (app) {

app.get("/api/notes", function(req, res) {
  User.getNote()
  .then(notes => res.json(notes))
  .catch(err => res.status(500).json(err)) 
})

app.post("/api/notes", function(req, res) {
 User.addNote(req.body)
 .then(note => res.json(note))
 .catch(err => res.status(500).json(err)) 
})

app.delete("/api/notes/:id", function(req, res) {
 User.deleteNote(req.params.id)
 .then(() => res.json({ok: true}))
 .catch(err => res.status(500).json(err)) 
})
}