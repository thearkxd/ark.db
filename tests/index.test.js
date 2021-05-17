const { expect } = require("chai");
const { Database } = require("..");
const db = new Database();
console.log(db.ping());

describe("Basic Test", () => {
	it("Should set", (done) => {
		const str = db.set("test", "<3");
		expect(str).to.equal("<3");

		let arr = db.set("authors", ["barbarbar338", "theark", "stark"]);
		expect(arr.length).to.equal(3);

		db.push("authors", "laark");
		arr = db.get("authors");
		expect(arr.length).to.equal(4);

		done();
	});

	it("Should get", (done) => {
		const str = db.get("test");
		expect(str).to.equal("<3");

		const arr = db.get("authors");
		expect(arr.length).to.equal(4);

		done();
	});
});
