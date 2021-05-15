# ark.db
<img src="https://img.shields.io/npm/v/ark.db?color=%2351F9C0&label=version">
<img src="https://img.shields.io/npm/dt/ark.db.svg?color=%2351FC0&maxAge=3600">
<br>
<img src="https://nodei.co/npm/ark.db.png?downloads=true&downloadRank=true&stars=true">

# Installation
**Warning:** `ark.db` is requires node.js version greater than 12!
```
npm i ark.db
```

Or, if you're using [yarn](https://yarnpkg.com/)

```
yarn add ark.db
```

Also, if you want to use `ark.db` in browser

```html
<script src="https://unpkg.com/ark.db@2.4.1/dist/LocalStorage.min.js"></script>
<script>
  const db = new LocalStorage();
</script> 
```

# Why ark.db?

-   Fastest JSON database module in NPM.
-   Lightweight

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

// To update or set your data;
db.set("example", "test"); // -> test

// To get your data;
db.get("example"); // -> test

// To delete your data;
db.delete("example"); // -> true

// To increase your data;
db.add("example", 2); // -> 2

// To decrase your data;
db.subtract("example", 1); // -> 1

// To learn database has the data;
db.has("example"); // -> true

// To push the data;
db.push("example", { test: "test" }); // -> { test: "test" }

// To pull the data;
db.pull("example", { test: "test" }); // -> []

// To get all data;
db.all();

// To delete all data;
db.clear();
```

## Thanks

Thanks to [Stark](https://discord.com/users/332926821706498063), [Laark](https://discord.com/users/814919032884428840) and [hmal](https://discord.com/users/337967184070311936) for his/her helpings.

## Contact

[Discord Server](https://discord.gg/UEPcFtytcc), [Theark](https://discord.com/users/350976460313329665), [Stark](https://discord.com/users/332926821706498063), [Laark](https://discord.com/users/814919032884428840)

## Changelog

### 2.4.1

-   Added `LocalStorage` adapter.

### 2.4.0

-   Added `pretty` and `write` properties to some methods.
-   Added `relative path` feature.

### 2.3.1

-   Fixed multiple bugs.

### 2.1.1, 2.0.0, 2.3.0

-   Fixed a bug.

### 2.1.0

-   Added pull method.
-   Get and set methods are accelerated.

### 2.0.0

-   Large-scale optimizations have been made.
-   All methods are synchronous.

### 1.1.2

-   A little accelerated.

### 1.1.1

-   Fixed some bugs.

### 1.1.0

-   All methods are asynchronous.
