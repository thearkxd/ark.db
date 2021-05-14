module.exports = class Util {
	static absolute(base, rel) {
		const st = base.split("/");
		const arr = rel.split("/");
		st.pop();
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === ".") continue;
			if (arr[i] === "..") st.pop();
			else st.push(arr[i]);
		}
		return st.join("/");
	}
};
