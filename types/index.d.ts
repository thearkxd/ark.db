import { WriteOptions, MongoModel, MongoOptions } from "../src/types/types";
import { Connection } from "mongoose";

declare module "ark.db" {
	export class Database {
		private readonly dbFilePath: string;
		private cache: Record<string, unknown>;
		public constructor(filePath: string);
		public get: (key: string) => any;
		public fetch: (key: string) => any;
		public has: (key: string) => boolean;
		public set: (key: string, value: any, options?: WriteOptions) => any;
		private write: (options?: WriteOptions) => void;
		public delete: (key: string, options?: WriteOptions) => boolean;
		public add: (key: string, count: number, options: WriteOptions) => any;
		public subtract: (
			key: string,
			count: number,
			options: WriteOptions
		) => any;
		public push: (key: string, el: any, options: WriteOptions) => any;
		public pull: (key: string, el: any, options: WriteOptions) => boolean;
		public all: () => Record<string, unknown>;
		public clear: () => boolean;
		private read: () => Record<string, unknown>;
		private get _get(): number;
		private get _set(): number;
		private get ping(): Record<string, unknown>;
	}

	export class MongoDB {
		public schema: MongoModel;
		public constructor(
			mongoConnectURL: string,
			name: string,
			options: MongoOptions
		);
		public get: (key: string) => Promise<any>;
		public fetch: (key: string) => Promise<any>;
		public has: (key: string) => Promise<boolean | undefined>;
		public set: (key: string, value: any) => Promise<MongoModel>;
		public delete: (key: string) => Promise<boolean>;
		public add: (key: string, count: number) => Promise<MongoModel>;
		public subtract: (key: string, count: number) => Promise<MongoModel>;
		public push: (key: string, el: any) => Promise<MongoModel>;
		public pull: (key: string, el: any) => Promise<MongoModel>;
		public all: () => Promise<MongoModel>;
		public clear: () => Promise<MongoModel>;
		public uptime: () => number;
		public connect: (url: string) => Connection;
		public disconnect: () => Promise<void>;
		public updateModel: (name: string) => Promise<typeof this.schema>;
		public createModel: (name: string) => MongoDB;
		public createSchema: (name: string) => MongoDB;
		public createDatabase: (dbName: string) => Promise<MongoDB>;
		public createCollection: (dbName: string) => Promise<MongoDB>;
		public dropDatabase: () => Promise<void>;
		public dropCollection: () => Promise<void>;
	}
}
