const Error = require("../../Util/Error");
const { EventEmitter } = require("events");
const mongoose = require("mongoose");

module.exports = class Base extends EventEmitter {
	/**
	 * @param {String} mongoConnectURL
	 * @constructor
	 */
	constructor(mongoConnectURL) {
		super();
		if (
			!mongoConnectURL ||
			typeof mongoConnectURL !== "string" ||
			!mongoConnectURL.startsWith("mongodb")
		)
			throw new Error("Please specify a valid Mongo connect URL!");
		this.mongoURL = mongoConnectURL;
		this._connect(this.mongoURL);
		this.connection = mongoose.connection;
		this.connection.on("error", (e) => this.emit("error", e));
		this.connection.on("open", () => {
			this.connectedAt = new Date();
			this.emit("connected");
		});
	}

	/**
	 * @param {String} mongoURL
	 * @returns {Connection}
	 */
	_connect(mongoURL) {
		if (
			!mongoURL ||
			typeof mongoURL !== "string" ||
			!mongoURL.startsWith("mongodb")
		)
			throw new Error("Please specify a valid Mongo connect URL!");
		this.mongoURL = mongoURL;
		return mongoose.connect(this.mongoURL, {
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
