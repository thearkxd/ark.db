const Error = require("../../Util/Error");
const { EventEmitter } = require("events");
const mongoose = require("mongoose");

module.exports = class Base extends EventEmitter {
	/**
	 * @param {String} mongoConnectURL
	 * @param {Object} options
	 * @constructor
	 */
	constructor(mongoConnectURL, options = {}) {
		super();
		if (
			!mongoConnectURL ||
			typeof mongoConnectURL !== "string" ||
			!mongoConnectURL.startsWith("mongodb")
		)
			throw new Error("Please specify a valid Mongo connect URL!");
		if (options && typeof options !== "object")
			throw new Error("Options you specified is not an object!");
		this.mongoURL = mongoConnectURL;
		this.options = options;
		this.connection = this._connect(this.mongoURL);
		this.connection.on("error", (e) => this.emit("error", e));
		this.connection.on("open", () => {
			this.connectedAt = new Date();
			this.emit("connected");
		});
	}

	/**
	 * @param {String} mongoURL
	 * @returns {Promise<Connection>}
	 */
	_connect(mongoURL) {
		if (
			!mongoURL ||
			typeof mongoURL !== "string" ||
			!mongoURL.startsWith("mongodb")
		)
			throw new Error("Please specify a valid Mongo connect URL!");
		this.mongoURL = mongoURL;
		delete this.options.useCreateIndex;
		delete this.options.useNewUrlParser;
		delete this.options.useUnifiedTopology;
		delete this.options.useFindAndModify;
		return mongoose.createConnection(this.mongoURL, {
			...this.options,
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});
	}

	/**
	 * @returns {Promise<void>}
	 */
	_disconnect() {
		this.connectedAt = undefined;
		this.mongoURL = null;
		return this.connection.close(true);
	}
};
