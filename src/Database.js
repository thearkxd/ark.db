"use strict";

const { existsSync, writeFileSync, readFileSync } = require("graceful-fs");
const { _set, _get } = require("./Utils/Util");
const Error = require("./Error");

module.exports = class Database {
  /** @type { String } @private */
  #dbFilePath;
  /** @type { Object } @private */
  #jsonData;

  /**
   * @param { String } file 
   * @constructor
   */
  constructor(file = "arkdb.json") {
    if (typeof file !== "string") throw new Error("Please specify a valid database name!");
    this.#dbFilePath = file.endsWith(".json") ? `${process.cwd()}/${file}` : `${process.cwd()}/${file}.json`;
    this.#jsonData = {};

    if (existsSync(this.#dbFilePath)) {
      this.#jsonData = this.read();
    } else {
      writeFileSync(this.#dbFilePath, "{}", "utf-8");
    }
  }

  /**
   * @param { String } key
   * @returns { any }
   */
  get(key) {
    return _get(key, this.#jsonData) || null;
  }

  /**
   * @param { String } key
   * @returns { Boolean }
   */
  has(key) {
    if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
    return !!(_get(key, this.#jsonData));
  }

  /**
   * @param { String } key
   * @param { any } value
   * @returns { any }
   */
  set(key, value) {
    if (!key || typeof key !== "string") throw new DbError("Please specify a valid key!");
    if (!value) throw new Error("Please specify a valid value!");

    _set(key, value, this.#jsonData);
    this.write();
    return _get(key.split(".")[0], this.#jsonData);
  }

  /**
   * Writes current JSON data to database file.
   */
  write() {
    writeFileSync(this.#dbFilePath, JSON.stringify(this.#jsonData, null, 2));
  }

  /**
   * @param { String } key
   * @returns { Boolean }
   */
  delete(key) {
    if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");

    const locations = key.split(".");
    for (var i = 0; i < locations.length-1; i++) {
      this.#jsonData = this.#jsonData[locations[i]] || {};
      if (Object.keys(this.#jsonData).length === 0) return false;
    }

    delete this.#jsonData[locations[locations.length - 1]];
    this.write();
    return true;
  }

  /**
   * @param { String } key
   * @param { Number } count
   * @returns { Number }
   */
  add(key, count) {
    if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
    if (!count || typeof count === "string") throw new Error("Please specify a valid count!");
    const data = this.#jsonData[key] || 0;
    if (isNaN(data)) throw new Error("Data is not a number");
    this.set(key, data + count);
    return (data + count);
  }

  /**
   * @param { String } key
   * @param { Number } count
   * @returns { Number }
   */
  subtract(key, count) {
    if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
    if (!count || typeof count === "string") throw new Error("Please specify a valid count!");
    const data = this.#jsonData[key] || 0;
    if (isNaN(data)) throw new Error("Data is not a number");
    this.set(key, data - count);
    return (data-count);
  }

  /**
   * @param { String } key
   * @param { any } el
   * @returns { any }
   */
  push(key, el) {
    const data = this.#jsonData[key] || [];
    if (!Array.isArray(data)) throw new Error("Data is not an array");
    data.push(el);
    this.set(key, data);
    return data;
  }

  /**
   * @returns { Object }
   */
  all() {
    return this.#jsonData;
  }

  /**
   * @returns { Boolean }
   */
  clear() {
    this.#jsonData = {};
    this.write();
    return true;
  }

  /*
   * @returns { Object }
   */
  read() {
    return JSON.parse(readFileSync(this.#dbFilePath, { encoding: 'utf-8' }) || '{}');
  }
};
