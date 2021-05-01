# Welcome to ark.db

**ark.db** module was written to save your data in json file.

## Usage

```js
const { Database } = require("arks.db");
const db = new Database();
// If you want you specify the file to save the data like; new Database("myDatas");

// To set your data to database;
db.set("example", "test"); // returns -> test

// To get your data from database;
db.get("example"); // returns -> test

// To delete your data from database;
db.delete("example"); // returns -> true

// To increase your data;
db.add("example", 2); // returns -> 2

// To decrase your data;
db.subtract("example", 1); // returns -> 1

// To learn database has the data;
db.has("example"); // returns -> true

// To push the data to database;
db.push("example", { test: "test" }); // returns -> { test: "test" }

// To pull the data from database;
db.pull("example", { test: "test" }); // returns -> []

// To get all data from database;
db.all();

// To delete all data in database;
db.clear();
```

## Thanks
Thanks to [Stark](https://discord.com/users/332926821706498063) for his helpings.

## Contact
[Discord Server](https://discord.gg/UEPcFtytcc), [Theark](https://discord.com/users/350976460313329665), [Stark](https://discord.com/users/332926821706498063)

## Changelog

### 1.0.0
* Module published.
