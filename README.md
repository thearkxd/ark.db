# Welcome to ark.db

**ark.db** module was written to save your data in json file.

## Info
<img src="https://img.shields.io/npm/v/ark.db?color=%2351F9C0&label=ark.db">
<img src="https://img.shields.io/npm/dt/ark.db.svg?color=%2351FC0&maxAge=3600">
<br>
<img src="https://nodei.co/npm/ark.db.png?downloads=true&downloadRank=true&stars=true">

# Warning!
`ark.db` is requires node.js version greater than 12!

# Why ark.db?
* Fastest JSON database module in NPM.
* Lightweight

# Speed
Benchmark results (When 1000 elements are pushed into array);
```
laark ~/Bench ❯ act -s "node arkdb.js"
act: The process took 478ms to finish.

laark ~/Bench ❯ act -s "node lowdb.js"
act: The process took 577ms to finish.

laark ~/Bench ❯ act -s "node wiodb.js"
act: The process took 871ms to finish.

laark ~/Bench ❯ act -s "node megadb.js"
act: The process took 541ms to finish.
```

## Usage

```js
const { Database } = require("ark.db");
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
Thanks to [Stark](https://discord.com/users/332926821706498063) and [Laark](https://discord.com/users/814919032884428840) for his/her helpings.

## Contact
[Discord Server](https://discord.gg/UEPcFtytcc), [Theark](https://discord.com/users/350976460313329665), [Stark](https://discord.com/users/332926821706498063), [Laark](https://discord.com/users/814919032884428840)

## Changelog

## 2.3.0
* Fixed a bug.

## 2.2.0
* Fixed a bug.

## 2.1.1
* Fixed a bug.

### 2.1.0
* Added pull method.
* Get and set methods are accelerated.

### 2.0.0
* Large-scale optimizations have been made.
* All methods are synchronous.

### 1.1.2
* A little accelerated.

### 1.1.1
* Fixed some bugs.

### 1.1.0
* All methods are asynchronous.

### 1.0.0
* Module published.
