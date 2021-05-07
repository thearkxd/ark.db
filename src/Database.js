"use strict";

const { existsSync, writeFileSync, readFileSync } = require("graceful-fs");
const Error = require("./Error");
const getData = require('lodash/get');
const setData = require('lodash/set');
const hasData = require('lodash/has');
const unset = require('lodash/unset');

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
    if (existsSync(this.#dbFilePath)) this.#jsonData = this.read();
    writeFileSync(this.#dbFilePath, "{}", "utf-8");
  }

  /**
   * @param { String } key
   * @returns { any }
   */
  get(key) {
    if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
    return getData(this.#jsonData, key) || null;
  }

  /**
   * @param { String } key
   * @returns { Boolean }
   */
  has(key) {
    if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
    return hasData(this.#jsonData, key);
  }

  /**
   * @param { String } key
   * @param { any } value
   * @returns { any }
   */
  set(key, value) {
    if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
    if (!value) throw new Error("Please specify a valid value!");
    const newData = setData(this.#jsonData, key, value);
    this.write();
    return newData[key];
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
    const res = unset(this.#jsonData, key);
    this.write();
    return res;
  }

  /**
   * @param { String } key
   * @param { Number } count
   * @returns { Number }
   */
  add(key, count) {
    if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
    if (!count || typeof count !== "number") throw new Error("Please specify a valid count!");
    const data = getData(this.#jsonData, key) || 0;
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
    if (!count || typeof count !== "number") throw new Error("Please specify a valid count!");
    const data = getData(this.#jsonData, key) || 0;
    if (isNaN(data)) throw new Error("Data is not a number");
    this.set(key, data - count);
    return (data - count);
  }

  /**
   * @param { String } key
   * @param { any } el
   * @returns { any }
   */
  push(key, el) {
    if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
    if (!el) throw new Error("Please specify a valid element to push!");
    const data = getData(this.#jsonData, key) || [];
    if (!Array.isArray(data)) throw new Error("Data is not an array");
    data.push(el);
    this.set(key, data);
    return data;
  }

  /**
   * @param { String } key
   * @param { any } el
   * @returns { "true" }
   */
  pull(key, el) {
    if (!key || typeof key !== "string") throw new Error("Please specify a valid key!");
    if (!el) throw new Error("Please specify a valid element to pull!");
    const data = getData(this.#jsonData, key) || [];
    if (!Array.isArray(data)) throw new Error("The data is not a array!");
    const newData = data.filter((x) => !x.includes(el));
    this.set(key, newData);
    return true;
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

  /**
   * @returns { Object }
   */
  read() {
    return JSON.parse(readFileSync(this.#dbFilePath, { encoding: 'utf-8' }) || '{}');
  }
};
