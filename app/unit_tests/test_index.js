describe("test index.js", function() {
	beforeAll(function() {
		window.onbeforeunload = function() {
			return "oh no!";
		};
	});

	it("admin button click event", function() {
		var val = adminBtnClick();
		expect(val).toEqual(false);
	});
	it("member button click event", function() {
		var val = memberBtnClick();
		expect(val).toEqual(false);
	});
	it("leader button click event", function() {
		var val = leaderBtnClick();
		expect(val).toEqual(false);
	});
});