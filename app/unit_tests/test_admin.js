describe('Test admin.js', function() {
   
	var $scope, AdminCtrl;
	if(firebase.apps.length === 0) {
		initalizeFirebase();
	}
	
	beforeEach(module('teamform-admin-app'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		AdminCtrl = $controller('AdminCtrl', {$scope: $scope});
	}));
	
	it('changeMinTeamSize', function() {
        $scope.param.minTeamSize = 1;
        $scope.param.maxTeamSize = 10;
        $scope.changeMinTeamSize(1);
		expect($scope.param.minTeamSize).toEqual(2);
    });

	it("get member name", function() {
		$scope.users = [
			{ $id: "234", "name": "apple" },
			{ $id: "5486asd", "name": "hello" }
		];
		expect($scope.getMemberName("234")).toEqual("apple");
		expect($scope.getMemberName("5486asd")).toEqual("hello");
		expect($scope.getMemberName("id_not_exist")).toEqual("null");
	});
		
	it("get all team member's name", function() {
		var team1 = [ "123", "456" ];
		var team2 = [ "wsdw45" ];
		$scope.users = [
			{ $id: "456", "name": "hello" },
			{ $id: "123", "name": "world" },
			{ $id: "wsdw45", "name": "bye" }
		];
		
		var ret1 = $scope.getTeamMember(team1);
		var ret2 = $scope.getTeamMember(team2);
		expect(ret1[0]).toEqual('world');
		expect(ret1[1]).toEqual('hello');
		expect(ret2[0]).toEqual('bye');
	});

	it("Assign all", function() {
		$scope.param.minTeamSize = 1;
		$scope.param.maxTeamSize = 3;
		$scope.team = [
			{$id: "team1",
				"size" : 1,
				"teamMembers" : [ "exist4" ]},
			{$id: "team2",
				"size" : 2,
		        "teamMembers" : [ "exist2" ]
			},
			{$id: "team3",
				"size" : 2,
		        "teamMembers" : [ "exist1" ]
			}
		];
		$scope.member = [
			{ $id: "111", "weight": 8 },
			{ $id: "123", "weight": 1 },
			{ $id: "234", "weight": 5 },
			{ $id: "exist4", inTeam: "team1", "weight": 4 },
			{ $id: "exist2", inTeam: "team2", "weight": 2 },
			{ $id: "exist1", inTeam: "team3", "weight": 1 }
		];
		$scope.users = [
			{ $id: "111", "name": "111" },
			{ $id: "123", "name": "123" },
			{ $id: "234", "name": "234" },
			{ $id: "exist4", "name": "exist4" },
			{ $id: "exist2", "name": "exist2" },
			{ $id: "exist1", "name": "exist1" }
		];
		
		$scope.smartAssignment();
		
		expect($scope.team.length).toEqual(4);
		// no new member for full team
		expect($scope.team[0].teamMembers.length).toEqual(1);
		
		// test all members have a team
		var nbMemInTeam = 0;
		for(var idx = 0; idx < $scope.member.length; idx++) {
			if($scope.member[idx].inTeam) nbMemInTeam++;
		}
		expect(nbMemInTeam).toEqual($scope.member.length);
	});

	it("changing min team size", function() {
		$scope.param.minTeamSize = 5;
		$scope.param.maxTeamSize = 10;
		$scope.changeMinTeamSize(1);
		expect($scope.param.minTeamSize).toEqual(6);

		$scope.changeMinTeamSize(-10);
		expect($scope.param.minTeamSize).toEqual(6);
	});
	
	it("changing max team size", function() {
		$scope.param.maxTeamSize = 3;
		$scope.param.minTeamSize = 1;
		$scope.changeMaxTeamSize(1);
		expect($scope.param.maxTeamSize).toEqual(4);

		$scope.changeMaxTeamSize(-10);
		expect($scope.param.maxTeamSize).toEqual(4);
	});

	it("test setExpanded", function() {
		$scope.expanded = false;
		$scope.setExpanded();
		expect($scope.expanded).toEqual(true);
	});

	it("test hasTeam", function() {
		var member = {inTeam: "dummy"};
		expect($scope.hasTeam(member)).toEqual(true);
	});

});