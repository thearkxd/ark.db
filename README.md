# Welcome to ark.db

**ark.db** module was written to save your data in json file.

## Info
<img src="https://img.shields.io/npm/v/ark.db?color=%2351F9C0&label=ark.db">
<img src="https://img.shields.io/npm/dt/ark.db.svg?color=%2351FC0&maxAge=3600">
<br>
<img src="https://nodei.co/npm/ark.db.png?downloads=true&downloadRank=true&stars=true">

# Why ark.db?
* Fast
* Lightweight
* Asynchronous

# Speed
`ark.db` is faster than `wio.db` and `lowdb`.

Benchmark results (When 100 elements are pushed into array);
```
~/Bench ❯ act -s "node arkdb.js"
act: The process took 230ms to finish.

~/Bench ❯ act -s "node lowdb.js"
act: The process took 276ms to finish.

~/Bench ❯ act -s "node wiodb.js"
act: The process took 252ms to finish.
```

## Usage

```js
const { Database } = require("arks.db");
const db = new Database();
// If you want you specify the file to save the data like; new Database("myDatas");

// To set your data to database;
await db.set("example", "test"); // returns -> test

// To get your data from database;
await db.get("example"); // returns -> test

// To delete your data from database;
await db.delete("example"); // returns -> true

// To increase your data;
await db.add("example", 2); // returns -> 2

// To decrase your data;
await db.subtract("example", 1); // returns -> 1

// To learn database has the data;
await db.has("example"); // returns -> true

// To push the data to database;
await db.push("example", { test: "test" }); // returns -> { test: "test" }

// To pull the data from database;
await db.pull("example", { test: "test" }); // returns -> []

// To get all data from database;
await db.all();

// To delete all data in database;
await db.clear();
```

## Thanks
Thanks to [Stark](https://discord.com/users/332926821706498063) for his helpings.

## Contact
[Discord Server](https://discord.gg/UEPcFtytcc), [Theark](https://discord.com/users/350976460313329665), [Stark](https://discord.com/users/332926821706498063)

## Changelog

### 1.1.2
* A little accelerated.

### 1.1.1
* Fixed some bugs.

### 1.1.0
* All methods are asynchronous.

### 1.0.0
* Module published.