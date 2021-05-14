const Database = require("../src/Database");
const db = new Database("./database.json");

db.set("test", "<3");
db.set("authors", ["theark", "stark"]);
db.push("authors", "laark");
