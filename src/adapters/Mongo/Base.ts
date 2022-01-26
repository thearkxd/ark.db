import { DatabaseError } from "../../Util/Error";
import { EventEmitter } from "events";
import mongoose, { Connection } from "mongoose";
import { MongoOptions } from "../../types/types";

export abstract class Base extends EventEmitter {
	mongoURL: string;
	options: MongoOptions;
	connection: Connection;
	connectedAt: Date | undefined;

	constructor(mongoConnectURL: string, options: MongoOptions = {}) {
		super();
		if (!mongoConnectURL || !mongoConnectURL.startsWith("mongodb"))
			throw new DatabaseError(
				"Please specify a valid Mongo connect URL!"
			);
		if (options && typeof options !== "object")
			throw new DatabaseError("Options you specified is not an object!");
		this.mongoURL = mongoConnectURL;
		this.options = options;
		this.connection = this._connect(this.mongoURL);
		this.connection.on("error", (e) => this.emit("error", e));
		this.connection.on("open", () => {
			this.connectedAt = new Date();
			this.emit("connected");
		});
	}

	protected _connect(mongoURL: string): Connection {
		if (!mongoURL || !mongoURL.startsWith("mongodb"))
			throw new DatabaseError(
				"Please specify a valid Mongo connect URL!"
			);
		this.mongoURL = mongoURL;
		delete this.options.useNewUrlParser;
		delete this.options.autoIndex;
		delete this.options.family;
		delete this.options.noDelay;
		delete this.options.autoCreate;
		return mongoose.createConnection(this.mongoURL, {
			...this.options,
			useNewUrlParser: true,
			autoIndex: true,
     			family: 4,
      			noDelay: true,
      			autoCreate: true
		});
	}

	protected _disconnect(): Promise<void> {
		this.connectedAt = undefined;
		this.mongoURL = "";
		return this.connection.close(true);
	}
}
