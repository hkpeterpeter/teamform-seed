describe('Test admin.js', function() {
   
	var $scope, AdminCtrl;
	if(firebase.apps.length === 0) {
		initalizeFirebase();
	}
	
	beforeEach(module('teamform-admin-app'));
	beforeEach(inject(function($rootScope, $controller) {
		console.log("admin test");
		// compile = $compile;
		$scope = $rootScope.$new();
		AdminCtrl = $controller('AdminCtrl', {$scope: $scope});
	}));

	// function getCompiledElement() {
	// 	var element = angular.element('<div login></div>');
	// 	var compiledElement = compile(element)($scope);
	// 	$scope.$digest();
	// 	return compiledElement;
	// }
	
	// it('should contain span.close', function() {
	// 	var spanElement = getCompiledElement().find('span.close');
	// 	expect(spanElement).toBeDefined();
	// 	expect(spanElement.text()).toEqual("&times;");
	// });

	it('test paramLoadedCallback', function() {
		$scope.param = {};
		$scope.paramLoadedCallback();
		expect($scope.paramTest).toEqual("maxUndefined minUndefined noAdmin");
	});

	it("test getMemberName", function() {
		$scope.users = [
			{ $id: "234", "name": "apple" },
			{ $id: "5486asd", "name": "hello" }
		];
		expect($scope.getMemberName("234")).toEqual("apple");
		expect($scope.getMemberName("5486asd")).toEqual("hello");
		expect($scope.getMemberName("id_not_exist")).toEqual("null");
	});
		
	it("test getTeamMember", function() {
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

	it("test smartAssignment", function() {
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
		
		function calculatSum(teamMembers) {
			var sum = 0;
			for(var idx = 0; idx < teamMembers.length; idx++) {
				for(var tmpIdx = 0; tmpIdx < $scope.member.length; tmpIdx++) {
					if($scope.member[tmpIdx].$id == teamMembers[idx]) {
						sum += $scope.member[tmpIdx].weight;
						break;
					}
				}
			}
			return sum;
		}
		
		$scope.smartAssignment();
		// no new member for full team
		expect($scope.team[0].teamMembers.length).toEqual(1);
		expect($scope.team.length).toEqual(4);
		expect(calculatSum($scope.team[1].teamMembers)).toEqual(7);
		expect(calculatSum($scope.team[2].teamMembers)).toEqual(2);
		expect(calculatSum($scope.team[3].teamMembers)).toEqual(8);
		
		// test all members have a team
		var nbMemInTeam = 0;
		for(var idx = 0; idx < $scope.member.length; idx++) {
			if($scope.member[idx].inTeam) nbMemInTeam++;
		}
		expect(nbMemInTeam).toEqual($scope.member.length);
	});

	it("test changeMinTeamSize", function() {
		$scope.param.minTeamSize = 5;
		$scope.param.maxTeamSize = 10;
		$scope.changeMinTeamSize(1);
		expect($scope.param.minTeamSize).toEqual(6);

		$scope.changeMinTeamSize(-10);
		expect($scope.param.minTeamSize).toEqual(6);
	});
	
	it("test changeMaxTeamSize", function() {
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

	it("test hasTeam true", function() {
		var member = {inTeam: "dummy"};
		expect($scope.hasTeam(member)).toEqual(true);
	});

	it("test hasTeam false", function() {
		var member = {weight: 10};
		expect($scope.hasTeam(member)).toEqual(false);
	});
	
	it("test willEnableSmartAssignment false", function() {
		$scope.member = [
			{$id: "member1", inTeam: "Team1"},
			{$id: "member3", inTeam: "Team2"},
			{$id: "member2", inTeam: "Team3"}
		]
		expect($scope.willEnableSmartAssignment()).toEqual(false);
		

		$scope.member = [{$id: "member1", inTeam: "Team1"}];
		expect($scope.willEnableSmartAssignment()).toEqual(false);
	});
	
	it("test willEnableSmartAssignment true", function() {
		$scope.member = [
			{$id: "member1", inTeam: "Team1"},
			{$id: "member3"}];
		expect($scope.willEnableSmartAssignment()).toEqual(true);
	});
	
	it("test getTotalWeight", function() {
		$scope.member = [
			{$id: "member1", weight: 5},
			{$id: "member3", weight: 12}];
		var team = ["member1", "member3"];
		expect($scope.getTotalWeight(team)).toEqual(17);
		
		team = ["member_not_exist"];
		expect($scope.getTotalWeight(team)).toEqual(0);
	});

});