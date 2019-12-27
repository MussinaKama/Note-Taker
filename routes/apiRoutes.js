var fs = require("fs")

module.exports = function (app) {
var db = fs.readFileSync("db/db.json")
console.log("logging" + db)

app.get("/api/notes", function(req, res) {
return res.json(db);
})
}