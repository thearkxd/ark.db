"use strict";

const { existsSync, writeFileSync, readFileSync } = require("graceful-fs");
const parentModule = require("parent-module");
const { isAbsolute, dirname, sep } = require("path");
const {
	absolute,
	lodash: { get, has, set, unset }
} = require("../Util");
const Error = require("../Util/Error");

module.exports = class Database {
	/**
	 * @type {String}
	 * @private
	 */
	#dbFilePath;
	/**
	 * @type {Object}
	 * @private
	 */
	#jsonData;

	/**
	 * @param {String} file
	 * @constructor
	 */
	constructor(file = "arkdb.json") {
		if (typeof file !== "string")
			throw new Error("Please specify a valid database name!");
		file = file.endsWith(".json") ? file : `${file}.json`;
		this.#dbFilePath =
			file === "arkdb.json" || isAbsolute(file)
				? process.cwd() + sep + file
				: absolute(dirname(parentModule()) + sep, file);
		this.#jsonData = {};
		if (existsSync(this.#dbFilePath)) this.#jsonData = this.read();
		else writeFileSync(this.#dbFilePath, "{}", "utf-8");
	}

	/**
	 * @param {String} key
	 * @returns {any}
	 */
	get(key) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		return get(this.#jsonData, key);
	}

	/**
	 * @param {String} key
	 * @returns {any}
	 */
	fetch(key) {
		return this.get(key);
	}

	/**
	 * @param {String} key
	 * @returns {Boolean}
	 */
	has(key) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		return has(this.#jsonData, key);
	}

	/**
	 * @param {String} key
	 * @param {any} value
	 * @param {Object} options
	 * @returns {any}
	 */
	set(key, value, options = { write: true, pretty: true }) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (typeof value !== "boolean" && value !== 0 && !value)
			throw new Error("Please specify a valid value!");
		set(this.#jsonData, key, value);
		if (options.write) this.write(options);
		return this.get(key);
	}

	/**
	 * @param {Object} options
	 * @returns {void}
	 */
	write(options = {}) {
		const str = options.pretty
			? JSON.stringify(this.#jsonData, null, 2)
			: JSON.stringify(this.#jsonData);
		writeFileSync(this.#dbFilePath, str);
	}

	/**
	 * @param {String} key
	 * @param {Object} options
	 * @returns {Boolean}
	 */
	delete(key, options = { write: true, pretty: true }) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		unset(this.#jsonData, key);
		if (options.write) this.write(options);
		return true;
	}

	/**
	 * @param {String} key
	 * @param {Number} count
	 * @param {Object} options
	 * @returns {Number}
	 */
	add(key, count, options = { write: true, pretty: true }) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (!count || typeof count !== "number")
			throw new Error("Please specify a valid count!");
		const data = get(this.#jsonData, key) || 0;
		if (isNaN(data)) throw new Error("Data is not a number!");
		this.set(key, data + count, options);
		return this.get(key);
	}

	/**
	 * @param {String} key
	 * @param {Number} count
	 * @param {Object} options
	 * @returns {Number}
	 */
	subtract(key, count, options = { write: true, pretty: true }) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (!count || typeof count !== "number")
			throw new Error("Please specify a valid count!");
		const data = get(this.#jsonData, key) || 0;
		if (isNaN(data)) throw new Error("Data is not a number");
		this.set(key, data - count, options);
		return this.get(key);
	}

	/**
	 * @param {String} key
	 * @param {any} el
	 * @param {Object} options
	 * @returns {any}
	 */
	push(key, el, options = { write: true, pretty: true }) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (el !== 0 && !el && typeof el !== "boolean")
			throw new Error("Please specify a valid element to push!");
		const data = get(this.#jsonData, key) || [];
		if (!Array.isArray(data)) throw new Error("Data is not an array");
		data.push(el);
		this.set(key, data, options);
		return this.get(key);
	}

	/**
	 * @param {String} key
	 * @param {any} el
	 * @param {Object} options
	 * @returns {Boolean}
	 */
	pull(key, el, options = { write: true, pretty: true }) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (el !== 0 && !el && typeof el !== "boolean")
			throw new Error("Please specify a valid element to pull!");
		const data = get(this.#jsonData, key) || [];
		if (!Array.isArray(data)) throw new Error("The data is not a array!");
		const newData = data.filter((x) => !x.includes(el));
		this.set(key, newData, options);
		return this.get(key);
	}

	/**
	 * @returns {Object}
	 */
	all() {
		return this.#jsonData;
	}

	/**
	 * @returns {Boolean}
	 */
	clear() {
		this.#jsonData = {};
		this.write();
		return true;
	}

	/**
	 * @returns {Object}
	 */
	read() {
		return JSON.parse(
			readFileSync(this.#dbFilePath, { encoding: "utf-8" }) || "{}"
		);
	}

	/**
	 * @ignore
	 * @private
	 * @returns {Number}
	 */
	_get() {
		const start = Date.now();
		this.get("arkdb");
		return Date.now() - start;
	}

	/**
	 * @ignore
	 * @private
	 * @returns {Number}
	 */
	_set() {
		const start = Date.now();
		this.set("arkdb", "arkdb");
		return Date.now() - start;
	}

	/**
	 * @returns {Object}
	 */
	ping() {
		const read = this._get();
		const write = this._set();
		const average = (read + write) / 2;
		this.delete("arkdb");
		return {
			read: `${read}ms`,
			write: `${write}ms`,
			average: `${average}ms`
		};
	}
};
