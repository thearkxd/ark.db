import { Document, Schema } from "mongoose";

export interface WriteOptions {
	write?: boolean;
	pretty?: boolean;
}

export interface MongoOptions {
	useCreateIndex?: boolean;
	useNewUrlParser?: boolean;
	useUnifiedTopology?: boolean;
	useFindAndModify?: boolean;
}

export interface MongoModel extends Document {
	key: string;
	value: Schema.Types.Mixed;
}

export interface ParsedObject {
	key: string | undefined;
	value: string | undefined;
}
