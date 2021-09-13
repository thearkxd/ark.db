import { Schema, Connection } from "mongoose";
import { MongoModel } from "../../types/types";

const DefaultSchema = new Schema<MongoModel>({
	Key: {
		type: String,
		required: true
	},
	Value: {
		type: Schema.Types.Mixed,
		required: true
	}
});

export default (connection: Connection, name: string) =>
	connection.model<MongoModel>(name, DefaultSchema);
