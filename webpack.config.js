const path = require("path");

module.exports = {
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
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			}
		]
	}
};
