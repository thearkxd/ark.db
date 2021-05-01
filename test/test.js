const Database = require("../src/Database");
const db = new Database("database.json");

// Set a value
db.set("example", "test");

// Delete a value from database
db.delete("example");

// Get a value
db.get("example");

// Get is database has the value
db.has("example");

// Add a value to data
db.add("example", 1);

// Subtract a value from data
db.subtract("example", 1);

// Push a value to data
db.push("example", { test: "example" });

// Pull a value from data
db.pull("example", { test: "example" });

// Get all data from database
db.all();

// Delete all data from database
db.clear();