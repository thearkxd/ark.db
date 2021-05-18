const {
	lodash: { get, has, set, unset },
	parseObject
} = require("../../Util");
const Error = require("../../Util/Error");
const Base = require("./Base");
const Schema = require("./Schema");

module.exports = class MongoDB extends Base {
	/**
	 * @param {String} mongoConnectURL
	 * @param {String} name
	 * @param {Object} options
	 * @constructor
	 */
	constructor(mongoConnectURL, name = "arkdb", options = {}) {
		super(mongoConnectURL, options);
		this.schema = Schema(this.connection, name);
	}

	/**
	 * @param {String} key
	 * @returns {Promise<void>}
	 */
	async get(key) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		const arr = key.split(".");
		const data = await this.schema.findOne({ Key: arr[0] });
		if (!data) return null;
		if (arr.length > 1) {
			if (data.Value && typeof data.Value === "object")
				return get(data.Value, arr[arr.length - 1]);
			return null;
		}
		return data.Value;
	}

	/**
	 * @param {String} key
	 * @returns {Promise<void>}
	 */
	fetch(key) {
		return this.get(key);
	}

	/**
	 * @param {String} key
	 * @returns {Promise<boolean>}
	 */
	async has(key) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		const arr = key.split(".");
		const data = await this.schema.findOne({ Key: arr[0] });
		if (arr.length > 1) {
			if (data.Value && typeof data.Value === "object")
				return has(data.Value, arr[arr.length - 1]);
		} else return !!data;
	}

	/**
	 * @param {String} key
	 * @param {any} value
	 * @returns {Promise<void>}
	 */
	async set(key, value) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (!value) throw new Error("Please specify a valid value!");
		const parsed = parseObject(set({}, key, value));
		return this.schema.findOneAndUpdate(
			{ Key: parsed.key },
			{ $set: { Value: parsed.value } },
			{ upsert: true, new: true }
		);
	}

	/**
	 * @param {String} key
	 * @returns {Promise<Boolean>}
	 */
	async delete(key) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		const arr = key.split(".");
		const data = await this.schema.findOne({ Key: arr[0] });
		if (!data) return false;
		if (data.Value && typeof data.Value === "object") {
			const newData = unset(data.Value, arr[arr.length - 1]);
			this.schema.findOneAndUpdate(
				{ Key: arr[0] },
				{ $set: { Value: newData } }
			);
			return true;
		}
		this.schema.deleteOne({ Key: arr[0] });
		return true;
	}

	/**
	 * @param {String} key
	 * @param {Number} count
	 * @returns {Promise<void>}
	 */
	async add(key, count) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (!count || typeof count !== "number")
			throw new Error("Please specify a valid count!");
		const data = (await this.get(key)) || 0;
		if (isNaN(data)) throw new Error("Data is not a number!");
		return this.set(key, data + count);
	}

	/**
	 * @param {String} key
	 * @param {Number} count
	 * @returns {Promise<void>}
	 */
	async subtract(key, count) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (!count || typeof count !== "number")
			throw new Error("Please specify a valid count!");
		const data = (await this.get(key)) || 0;
		if (isNaN(data)) throw new Error("Data is not a number!");
		return this.set(key, data - count);
	}

	/**
	 * @param {String} key
	 * @param {any} el
	 * @returns {Promise<void>}
	 */
	async push(key, el) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (el !== 0 && !el && typeof el !== "boolean")
			throw new Error("Please specify a valid element!");
		const data = (await this.get(key)) || [];
		if (!Array.isArray(data)) throw new Error("Data is not an array!");
		data.push(el);
		return this.set(key, data);
	}

	/**
	 * @param {String} key
	 * @param {any} el
	 * @returns {Promise<void>}
	 */
	async pull(key, el) {
		if (!key || typeof key !== "string")
			throw new Error("Please specify a valid key!");
		if (el !== 0 && !el && typeof el !== "boolean")
			throw new Error("Please specify a valid element to pull!");
		const data = (await this.get(key)) || [];
		if (!Array.isArray(data)) throw new Error("The data is not a array!");
		const newData = data.filter((x) => !x.includes(el));
		return this.set(key, newData);
	}

	/**
	 * @returns {Promise<void>}
	 */
	async all() {
		return this.schema.find({});
	}

	/**
	 * @returns {Promise<void>}
	 */
	async clear() {
		return this.schema.deleteMany({});
	}

	/**
	 * @returns {Number}
	 */
	uptime() {
		if (!this.connectedAt) return 0;
		return Date.now() - this.connectedAt.getTime();
	}

	/**
	 * @returns {Connection}
	 */
	connect(url) {
		return this._connect(url);
	}

	/**
	 * @returns {Promise<void>}
	 */
	disconnect() {
		return this._disconnect();
	}

	/**
	 * @param {String} name
	 * @returns {Schema}
	 */
	updateModel(name) {
		this.schema = Schema(name);
		return this.schema;
	}

	/**
	 * @param {String} name
	 * @returns {MongoDB}
	 */
	createModel(name) {
		if (!name || typeof name !== "string")
			throw new Error("Please provide a valid model name!");
		return new MongoDB(this.mongoURL, name, this.options);
	}

	/**
	 * @param {String} name
	 * @returns {MongoDB}
	 */
	createSchema(name) {
		return this.createModel(name);
	}

	/**
	 * @param {String} dbName
	 * @returns {MongoDB}
	 */
	async createDatabase(dbName) {
		return new MongoDB(
			this.mongoURL.replace((await this.connection).name, dbName),
			this.schema.modelName,
			this.options
		);
	}

	/**
	 * @param {String} dbName
	 * @returns {MongoDB}
	 */
	async createCollection(dbName) {
		return await this.createDatabase(dbName);
	}

	/**
	 * @returns {Promise<void>}
	 */
	async dropDatabase() {
		return (await this.connection).dropDatabase();
	}

	/**
	 * @returns {Promise<void>}
	 */
	async dropCollection() {
		return await this.dropDatabase();
	}
};
