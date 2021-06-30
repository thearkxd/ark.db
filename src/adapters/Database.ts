"use strict";

import { existsSync, writeFileSync, readFileSync } from "graceful-fs";
import parentModule from "parent-module";
import { isAbsolute, dirname, sep } from "path";
import { absolute } from "../Util";
import { set, get, has, unset } from "../Util/lodash";
import { DatabaseError } from "../Util/Error";
import { WriteOptions } from "../@types/types";

export class Database {
	private readonly dbFilePath: string;
	private jsonData: Record<string, unknown>;

	constructor(file = "arkdb.json") {
		file = file.endsWith(".json") ? file : `${file}.json`;
		this.dbFilePath =
			file === "arkdb.json" || isAbsolute(file)
				? process.cwd() + sep + file
				: absolute(dirname(<string>parentModule()) + sep, file);
		this.jsonData = {};
		if (existsSync(this.dbFilePath)) this.jsonData = this.read();
		else writeFileSync(this.dbFilePath, "{}", "utf-8");
	}

	public get(key: string): any {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		return get(this.jsonData, key);
	}

	public fetch(key: string): any {
		return this.get(key);
	}

	public has(key: string): boolean {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		return has(this.jsonData, key);
	}

	public set(
		key: string,
		value: any,
		options: WriteOptions = { write: true, pretty: false }
	): any {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (typeof value !== "boolean" && value !== 0 && !value)
			throw new DatabaseError("Please specify a valid value!");
		set(this.jsonData, key, value);
		if (options.write) this.write(options);
		return this.get(key);
	}

	private write(
		options: WriteOptions = { write: true, pretty: false }
	): void {
		const str = options.pretty
			? JSON.stringify(this.jsonData, null, 2)
			: JSON.stringify(this.jsonData);
		writeFileSync(this.dbFilePath, str);
	}

	public delete(
		key: string,
		options: WriteOptions = { write: true, pretty: false }
	): boolean {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		unset(this.jsonData, key);
		if (options.write) this.write(options);
		return true;
	}

	public add(key: string, count: number, options: WriteOptions): any {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (!count) throw new DatabaseError("Please specify a valid count!");
		const data = get(this.jsonData, key) || 0;
		if (isNaN(<number>data))
			throw new DatabaseError("Data is not a number!");
		this.set(key, <number>data + count, options);
		return this.get(key);
	}

	public subtract(key: string, count: number, options: WriteOptions): any {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (!count) throw new DatabaseError("Please specify a valid count!");
		const data = get(this.jsonData, key) || 0;
		if (isNaN(<number>data))
			throw new DatabaseError("Data is not a number");
		this.set(key, <number>data - count, options);
		return this.get(key);
	}

	public push(key: string, el: any, options: WriteOptions): any {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (el !== 0 && !el && typeof el !== "boolean")
			throw new DatabaseError("Please specify a valid element to push!");
		const data = get(this.jsonData, key) || [];
		if (!Array.isArray(data))
			throw new DatabaseError("Data is not an array");
		data.push(el);
		this.set(key, data, options);
		return this.get(key);
	}

	public pull(key: string, el: any, options: WriteOptions): boolean {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (el !== 0 && !el && typeof el !== "boolean")
			throw new DatabaseError("Please specify a valid element to pull!");
		const data = get(this.jsonData, key) || [];
		if (!Array.isArray(data))
			throw new DatabaseError("The data is not a array!");
		const newData = data.filter((x) => x !== el);
		this.set(key, newData, options);
		return this.get(key);
	}

	public all(): Record<string, unknown> {
		return this.jsonData;
	}

	public clear(): boolean {
		this.jsonData = {};
		this.write();
		return true;
	}

	private read(): Record<string, unknown> {
		return JSON.parse(
			readFileSync(this.dbFilePath, { encoding: "utf-8" }) || "{}"
		);
	}

	private _get(): number {
		const start = Date.now();
		this.get("arkdb");
		return Date.now() - start;
	}

	private _set(): number {
		const start = Date.now();
		this.set("arkdb", "arkdb");
		return Date.now() - start;
	}

	public ping(): Record<string, unknown> {
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
}
