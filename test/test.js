const Database = require("../src/Database");
const db = new Database("database.json");

// Set a value
await db.set("example", "test");

// Delete a value from database
await db.delete("example");

// Get a value
await db.get("example");

// Get is database has the value
await db.has("example");

// Add a value to data
await db.add("example", 1);

// Subtract a value from data
await db.subtract("example", 1);

// Push a value to data
await db.push("example", { test: "example" });

// Pull a value from data
await db.pull("example", { test: "example" });

// Get all data from database
await db.all();

// Delete all data from database
await db.clear();