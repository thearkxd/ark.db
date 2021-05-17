const { Schema } = require("mongoose");

const DefaultSchema = new Schema({
	Key: {
		type: String,
		required: true
	},
	Value: {
		type: Schema.Types.Mixed,
		required: true
	}
});

module.exports = (connection, name) => connection.model(name, DefaultSchema);
