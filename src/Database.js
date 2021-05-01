"use strict";

const { existsSync, writeFileSync, readFileSync } = require("fs");
const { _set, _get } = require("./Utils/Util");
const Error = require("./Error");

module.exports = class Database {
    /** @type { String } @private */
    #dbFilePath;

    /**
     * @param { String } fileName
     * @constructor
     */
    constructor(fileName = "database.json") {
        if (typeof fileName !== "string") throw new Error("Please specify a valid database name!");
        this.#dbFilePath = fileName.endsWith(".json") ? `${process.cwd()}/${fileName}` : `${process.cwd()}/${fileName}.json`;
        if (!existsSync(this.#dbFilePath)) {
            writeFileSync(this.#dbFilePath, "{}", "utf-8");
        }
    }

    /**
     * Gets the element from db.
     * @param { String } key
     * @example db.get("example");
     */
    get(key) {
        if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
        const result = _get(key, this.read() || {});
        return result ? result : undefined;
    }

    /**
     * Gets is db has the element.
     * @param { String } key
     * @example db.has("example");
     * @returns { Boolean }
     */
    has(key) {
        if (!key || typeof key !== "string")
        return !!this.get(key);
    }

    /**
     * Sets the element to db.
     * @param { String } key
     * @param { any } value
     * @example db.set("example", "test");
     */
    set(key, value) {
        if (!key || typeof key !== "string") throw new DbError("Please specify a valid key!");
        if (!value) throw new Error("Please specify a valid value!");
        const data = this.read() || {};
        const newData = _set(key, value, data);
        writeFileSync(this.#dbFilePath, JSON.stringify(newData, null, 2), { encoding: "utf-8" });
        return _get(key.split(".")[0], newData);
    }

    /**
     * Deletes the element from db.
     * @param { String } key
     * @example db.delete("example");
     * @returns { Boolean | undefined }
     */
    delete(key) {
        if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
        let data = this.read() || {};
        const locations = key.split(".");
        for (var i = 0; i < locations.length - 1; i++) {
            data = data[locations[i]] || undefined;
            if (!data) return undefined;
        }
        if (!data || !data[locations[locations.length - 1]]) throw new Error("There is no data with specified value");
        delete data[locations[locations.length - 1]];
        writeFileSync(this.#dbFilePath, JSON.stringify(data, null, 2), { encoding: "utf-8" });
        return true;
    }

    /**
     * Adds the count to element.
     * @param { String } key
     * @param { Number } count
     * @example db.add("example", 1);
     */
    add(key, count) {
        if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
        if (!count || typeof count === "string") throw new Error("Please specify a valid count!");
        const data = this.get(key) || 0;
        if (isNaN(data)) throw new Error("The data is not a number!");
        const newData = data + count;
        this.set(key, newData);
        return newData;
    }

    /**
     * Subtracts the count from element.
     * @param { String } key
     * @param { Number } count
     * @example db.subtract("example", 1);
     */
    subtract(key, count) {
        if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
        if (!count || typeof count === "string") throw new Error("Please specify a valid count!");
        const data = this.get(key) || 0;
        if (isNaN(data)) throw new Error("The data is not a number!");
        const newData = data - count;
        this.set(key, newData);
        return newData;
    }

    /**
     * Pushes the element from db.
     * @param { String } key
     * @param { any } el
     * @example db.push("example", "test");
     */
    push(key, el) {
        if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
        if (!el) throw new Error("Please specify a valid element to push!");
        const data = this.get(key) || [];
        if (!Array.isArray(data)) throw new Error("The data is not a array!");
        data.push(el);
        this.set(key, data);
        return this.get(key.split(".")[0], data);
    }

    /**
     * Pulls the element from db.
     * @param { String } key
     * @param { any } el
     * @example db.pull("example", "test");
     */
    pull(key, el) {
        if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
        if (!el) throw new Error("Please specify a valid element to pull!");
        const data = this.get(key) || [];
        if (!Array.isArray(data)) throw new Error("The data is not a array!");
        if (!data.includes(el)) throw new Error("The element you specified does not exist in array.");
        const newData = data.filter((x) => !x.includes(el));
        this.set(key, newData);
        return this.get(key.split(".")[0], newData);
    }

    /**
     * Gets all elements from db.
     * @example db.all();
     * @returns { Array }
     */
    all() {
        const data = this.read() || {};
        const resp = [];
        Object.keys(data).forEach((x) => resp.push({ ID: x, data: this.get(x) }));
        return resp;
    }

    /**
     * Deletes all elements from db.
     * @example db.clear();
     * @returns { "true" }
     */
    clear() {
        writeFileSync(this.#dbFilePath, JSON.stringify({}), { encoding: "utf-8" });
        return true;
    }

    /**
     * Gets all elements from db as an Object.
     * @example db.read();
     * @returns { Object }
     */
    read() {
        const data = readFileSync(this.#dbFilePath, { encoding: "utf-8" }) || {};
        return JSON.parse(data);
    }
};
