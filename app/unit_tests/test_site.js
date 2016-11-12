describe('Test site.js', function() {

	beforeEach(function() {
		console.log("site.js");
	});
	describe('test get member name', function() {
		it("get all team member's name", function() {
			var team1 = [ "123", "456" ];
			var team2 = [ "wsdw45" ];
			var users = [
				{ $id: "456", "name": "hello" },
				{ $id: "123", "name": "world" },
				{ $id: "wsdw45", "name": "bye" }
			];
			var firstRet = getTeamMembersName(team1, users);
			var secondRet = getTeamMembersName(team2, users);
			expect(firstRet[0]).toEqual("world");
			expect(firstRet[1]).toEqual("hello");
			expect(secondRet[0]).toEqual("bye");
		})
	});
   
});