"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
describe("Basic Test", function () {
	it("Should set", function (done) {
		var str = db.set("test", "<3");
		chai_1.expect(str).to.equal("<3");
		var arr = db.set("authors", ["barbarbar338", "theark", "stark"]);
		chai_1.expect(arr.length).to.equal(3);
		db.push("authors", "laark", { write: true, pretty: false });
		arr = db.get("authors");
		chai_1.expect(arr.length).to.equal(4);
		done();
	});
	it("Should get", function (done) {
		var str = db.get("test");
		chai_1.expect(str).to.equal("<3");
		var arr = db.get("authors");
		chai_1.expect(arr.length).to.equal(4);
		done();
	});
});
