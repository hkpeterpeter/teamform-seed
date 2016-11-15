describe('Test site.js', function() {

	it("test getTeamMembersName", function() {
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
	});
   
	it('make sure firebase is working', function() {
		expect(firebase).toBeDefined();
	});

	it('test getRandomIntInclusive', function() {
		var value = getRandomIntInclusive(1, 3);
		expect( value>=1 && value <= 3 ).toEqual(true);
	});

	it('test getURLParameter', function() {
        var test = getURLParameter('q');
        expect(test).toEqual(decodeURIComponent((new RegExp('[?|&]q=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null);
    });

    it('test retrieveOnceFirebase', function() {
        expect(retrieveOnceFirebase(firebase, "/", null)).toBeUndefined();
    });

    it('test getUserWithId', function() {
    	expect(getUserWithId("123")).toEqual(firebase.database().ref("user/123"));
    });
});