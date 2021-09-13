"use strict";

import { parseObject } from "../../Util";
import { set, get, unset } from "../../Util/lodash";
import { DatabaseError } from "../../Util/Error";
import { Base } from "./Base";
import schema from "./Schema";
import { MongoModel, MongoOptions } from "../../types/types";
import { Connection } from "mongoose";

export class MongoDB extends Base {
	schema: any;

	constructor(
		mongoConnectURL: string,
		name = "arkdb",
		options: MongoOptions = {}
	) {
		super(mongoConnectURL, options);
		this.schema = schema(this.connection, name);
	}

	public async get(key: string): Promise<any> {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		const arr = key.split(".");
		const data = await this.schema.findOne({ Key: arr[0] });
		if (!data) return null;
		if (arr.length > 1) {
			if (data.Value && typeof data.Value === "object")
				return get(data.Value, arr.slice(1).join("."));
			return null;
		}
		return data.Value;
	}

	public fetch(key: string): Promise<any> {
		return this.get(key);
	}

	public async has(key: string): Promise<boolean | undefined> {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		const arr = key.split(".");
		const data = await this.schema.findOne({ Key: arr[0] });
		if (arr.length > 1) {
			if (data.Value && typeof data.Value === "object")
				return !!(await this.get(key));
		} else return !!data;
	}

	public async set(key: string, value: any): Promise<MongoModel> {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (!value) throw new DatabaseError("Please specify a valid value!");
		const parsed = parseObject(set({}, key, value));
		return this.schema.findOneAndUpdate(
			{ Key: parsed.key },
			{ $set: { Value: parsed.value } },
			{ upsert: true, new: true }
		);
	}

	public async delete(key: string): Promise<boolean> {
		if (!key) throw new DatabaseError("Please specify a valid key!");
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

	public async add(key: string, count: number): Promise<MongoModel> {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (!count) throw new DatabaseError("Please specify a valid count!");
		const data = (await this.get(key)) || 0;
		if (isNaN(data)) throw new DatabaseError("Data is not a number!");
		return this.set(key, data + count);
	}

	public async subtract(key: string, count: number): Promise<MongoModel> {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (!count) throw new DatabaseError("Please specify a valid count!");
		const data = (await this.get(key)) || 0;
		if (isNaN(data)) throw new DatabaseError("Data is not a number!");
		return this.set(key, data - count);
	}

	public async push(key: string, el: any): Promise<MongoModel> {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (el !== 0 && !el && typeof el !== "boolean")
			throw new DatabaseError("Please specify a valid element!");
		const data = (await this.get(key)) || [];
		if (!Array.isArray(data))
			throw new DatabaseError("Data is not an array!");
		data.push(el);
		return this.set(key, data);
	}

	public async pull(key: string, el: any): Promise<MongoModel> {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (el !== 0 && !el && typeof el !== "boolean")
			throw new DatabaseError("Please specify a valid element to pull!");
		const data = (await this.get(key)) || [];
		if (!Array.isArray(data))
			throw new DatabaseError("The data is not a array!");
		const newData = data.filter((x) => x !== el);
		return this.set(key, newData);
	}

	public async all(): Promise<MongoModel> {
		return this.schema.find({});
	}

	public async clear(): Promise<MongoModel> {
		return this.schema.deleteMany({});
	}

	public uptime(): number {
		if (!this.connectedAt) return 0;
		return Date.now() - this.connectedAt.getTime();
	}

	public connect(url: string): Connection {
		return this._connect(url);
	}

	public disconnect(): Promise<void> {
		return this._disconnect();
	}

	public async updateModel(name: string): Promise<typeof schema> {
		this.schema = schema(await this.connection, name);
		return this.schema;
	}

	public createModel(name: string): MongoDB {
		if (!name)
			throw new DatabaseError("Please provide a valid model name!");
		return new MongoDB(this.mongoURL, name, this.options);
	}

	public createSchema(name: string): MongoDB {
		return this.createModel(name);
	}

	public async createDatabase(dbName: string): Promise<MongoDB> {
		if (!dbName)
			throw new DatabaseError("Please provide a valid database name!");
		return new MongoDB(
			this.mongoURL.replace((await this.connection).name, dbName),
			this.schema.modelName,
			this.options
		);
	}

	public async createCollection(dbName: string): Promise<MongoDB> {
		return await this.createDatabase(dbName);
	}

	public async dropDatabase(): Promise<void> {
		return (await this.connection).dropDatabase();
	}

	public async dropCollection(): Promise<void> {
		return await this.dropDatabase();
	}
}
