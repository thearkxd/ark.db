const { sep } = require("path");

module.exports = {
	lodash: require("./lodash"),
	absolute: (base, rel) => {
		const st = base.split(sep);
		const arr = rel.split(sep);
		st.pop();
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === ".") continue;
			if (arr[i] === "..") st.pop();
			else st.push(arr[i]);
		}
		return st.join(sep);
	},
	parseObject: (object) => {
		if (!object || typeof object !== "object")
			return { key: undefined, value: undefined };
		return {
			key: Object.keys(object)[0],
			value: object[Object.keys(object)[0]]
		};
	}
};
