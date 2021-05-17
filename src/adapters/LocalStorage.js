"use strict";

const Error = require("../Util/Error");
const {
	lodash: { get, has, set, unset }
} = require("../Util");

module.exports = class LocalStorage {
	/**
	 * @type {Object}
	 * @private
	 */
	#data;

	/**
	 * @constructor
	 */
	constructor() {
		const data = JSON.parse(localStorage.getItem("arkdb"));
		if (!data || typeof data !== "object")
			localStorage.setItem("arkdb", "{}");
		this.#data = data || {};
	}

	/**
	 * @param {String} key
	 * @returns {any}
	 */
	get(key) {
		return get(this.#data, key);
	}

	/**
	 * @param {String} key
	 * @returns {Boolean}
	 */
	has(key) {
		return has(this.#data, key);
	}

	/**
	 * @param {String} key
	 * @param {any} value
	 * @returns {any}
	 */
	set(key, value) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (!value) throw new Error("Please specify a valid value!");
		set(this.#data, key, value);
		this.write();
		return this.get(key);
	}

	/**
	 * @returns {void}
	 */
	write() {
		localStorage.setItem("arkdb", JSON.stringify(this.#data));
	}

	/**
	 * @param {String} key
	 * @returns {Boolean}
	 */
	delete(key) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		unset(this.#data, key);
		this.write();
		return true;
	}

	/**
	 * @param {String} key
	 * @param {Number} count
	 * @returns {Number}
	 */
	add(key, count) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (!count || typeof count !== "number")
			throw new Error("Please specify a valid count!");
		const data = this.get(key) || 0;
		if (isNaN(data)) throw new Error("Data is not a number");
		return this.set(key, data + count);
	}

	/**
	 * @param {String} key
	 * @param {Number} count
	 * @returns {Number}
	 */
	subtract(key, count) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (!count || typeof count !== "number")
			throw new Error("Please specify a valid count!");
		const data = this.get(key) || 0;
		if (isNaN(data)) throw new Error("Data is not a number");
		return this.set(key, data - count);
	}

	/**
	 * @param {String} key
	 * @param {any} el
	 * @returns {any}
	 */
	push(key, el) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (el !== 0 && !el && typeof el !== "boolean")
			throw new Error("Please specify a valid element to push!");
		const data = this.get(key) || [];
		if (!Array.isArray(data)) throw new Error("Data is not an array");
		data.push(el);
		return this.set(key, data);
	}

	/**
	 * @param {String} key
	 * @param {any} el
	 * @returns {Boolean}
	 */
	pull(key, el) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (!el) throw new Error("Please specify a valid element to pull!");
		const data = this.get(key) || [];
		if (!Array.isArray(data)) throw new Error("The data is not a array!");
		const newData = data.filter((x) => !x.includes(el));
		return this.set(key, newData);
	}

	/**
	 * @returns {Boolean}
	 */
	clear() {
		this.#data = {};
		this.write();
		return true;
	}
};
