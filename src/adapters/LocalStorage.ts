import { set, get, has, unset } from "../Util/lodash";
import { DatabaseError } from "../Util/Error";

export class LocalStorage {
	private data: Record<string, unknown>;

	constructor() {
		const data = JSON.parse(<string>localStorage.getItem("arkdb"));
		if (!data || typeof data !== "object")
			localStorage.setItem("arkdb", "{}");
		this.data = data || {};
	}

	public get(key: string): any {
		return get(this.data, key);
	}

	public has(key: string): any {
		return has(this.data, key);
	}

	public set(key: string, value: any) {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (!value) throw new DatabaseError("Please specify a valid value!");
		set(this.data, key, value);
		this.write();
		return this.get(key);
	}

	private write() {
		localStorage.setItem("arkdb", JSON.stringify(this.data));
	}

	public delete(key: string): true {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		unset(this.data, key);
		this.write();
		return true;
	}

	public add(key: string, count: number): number {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (!count) throw new DatabaseError("Please specify a valid count!");
		const data = this.get(key) || 0;
		if (isNaN(data)) throw new DatabaseError("Data is not a number");
		return this.set(key, data + count);
	}

	public subtract(key: string, count: number): number {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (!count) throw new DatabaseError("Please specify a valid count!");
		const data = this.get(key) || 0;
		if (isNaN(data)) throw new DatabaseError("Data is not a number");
		return this.set(key, data - count);
	}

	public push(key: string, el: any): any {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (el !== 0 && !el && typeof el !== "boolean")
			throw new DatabaseError("Please specify a valid element to push!");
		const data = this.get(key) || [];
		if (!Array.isArray(data))
			throw new DatabaseError("Data is not an array");
		data.push(el);
		return this.set(key, data);
	}

	public pull(key: string, el: any): boolean {
		if (!key) throw new DatabaseError("Please specify a valid key!");
		if (!el)
			throw new DatabaseError("Please specify a valid element to pull!");
		const data = this.get(key) || [];
		if (!Array.isArray(data))
			throw new DatabaseError("The data is not a array!");
		const newData = data.filter((x) => !x.includes(el));
		return this.set(key, newData);
	}

	public clear(): boolean {
		this.data = {};
		this.write();
		return true;
	}
}
