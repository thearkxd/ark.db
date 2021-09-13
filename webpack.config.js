"use strict";
exports.__esModule = true;
var path = require("path");
var config = {
	entry: {
		LocalStorage: "./src/adapters/LocalStorage"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: process.argv.includes("production")
			? "[name].min.js"
			: "[name].js",
		library: "[name]"
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	}
};
exports["default"] = config;
