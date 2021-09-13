# ark.db

Small and fast JSON database for Node and browser.

![downloads](https://img.shields.io/npm/dt/ark.db) ![version](https://img.shields.io/npm/v/ark.db?color=%2351F9C0&label=version)

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
<script src="https://unpkg.com/ark.db@2.6.0/dist/LocalStorage.min.js"></script>
<script>
	const db = new LocalStorage();
</script>
```

# Features

-   Fast
-   Lightweight
-   Easy to use
-   Simple
-   Beginner friendly
-   Dot notation
-   Relative path support
-   Browser support
-   MongoDB support

## Usage

### MongoDB Usage

```js
const { MongoDB } = require("ark.db");
const db = new MongoDB("your mongo connect url", "your schema name");

// To update or set your data;
await db.set("example", "test"); // -> test

// To get your data;
await db.get("example"); // -> test

// To delete your data;
await db.delete("example"); // -> true

// To increase your data;
await db.add("example", 2); // -> 2

// To decrase your data;
await db.subtract("example", 1); // -> 1

// To learn database has the data;
await db.has("example"); // -> true

// To push the data;
await db.push("example", "test"); // -> "test"

// To pull the data;
await db.pull("example", "test"); // -> []

// To get all data;
await db.all();

// To delete all data;
await db.clear();

// To create a collection;
await db.createCollection("collection name");

// To delete collection you've connected;
await db.dropCollection();

// To learn database's uptime;
db.uptime();

// To change your schema name;
db.updateModel("new schema name");

// To create a schema;
db.createSchema("schema name");
```

### JSON Database Usage

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
db.push("example", "test"); // -> "test"

// To pull the data;
db.pull("example", "test"); // -> []

// To get all data;
db.all();

// To delete all data;
db.clear();

// To get database's ping;
db.ping();
```

## Thanks

Thanks to [Stark](https://discord.com/users/332926821706498063) and [hmal](https://discord.com/users/337967184070311936) for his helpings.

## Contact

[Discord Server](https://discord.gg/UEPcFtytcc), [Theark](https://discord.com/users/350976460313329665), [Stark](https://discord.com/users/332926821706498063)

## Changelog

### 2.7.0, 2.7.1

-   Some fixes.

### 2.6.1, 2.6.2, 2.6.3, 2.6.4, 2.6.5, 2.6.6, 2.6.7, 2.6.8, 2.6.9

-   Fixed a bug.

### 2.6.0

-   TypeScript rewrite.

### 2.4.4, 2.4., 2.4.6, 2.5.0

-   Fixed a bug.

### 2.4.3

-   Fixed some bugs.
-   Added `options` parameter while connecting to MongoDB.

### 2.4.2

-   Added `MongoDB` adapter.
-   Added MongoDB support.

### 2.4.1

-   Added `LocalStorage` adapter.
-   Added browser support.

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
