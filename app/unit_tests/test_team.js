describe('Test team.js', function() {
   
	var $scope, TeamCtrl;

	if(firebase.apps.length === 0) {
		initalizeFirebase();
	}

	beforeEach(module('teamform-team-app'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		TeamCtrl = $controller('TeamCtrl', {$scope: $scope});
	}));

	it("test retrieveTagsFromID", function() {
		$scope.member = [{
			$id: "member2", tags: ["C++", "Java"]
		},
		{
			$id: "member", tags: ["C++", "Java"]
		}];
		expect($scope.retrieveTagsFromID("member")).toEqual(["C++", "Java"]);
		$scope.member = [{$id: "member"}];
		expect($scope.retrieveTagsFromID("member")).toEqual("null");
		$scope.member = [];
		expect($scope.retrieveTagsFromID("whatever")).toEqual("null");
	});
	
	it("test retrieveScoreFromTags", function() {
		$scope.param.tags = ["C++"];
		$scope.param.weight = [5];
		expect($scope.retrieveScoreFromTags(["C++"])).toEqual(5);
		expect($scope.retrieveScoreFromTags(["C+"])).toEqual(0);
		expect($scope.retrieveScoreFromTags("null")).toEqual(0);
	});
	
	it("test smartAdd", function() {
		$scope.requests = ["member"];
		$scope.smartAdd();
	});
	
	it("test returnMaxidx", function() {
		$scope.array = [
			{score: 1},
			{score: 3},
			{score: 2}];
		expect($scope.returnMaxidx($scope.array)).toEqual(0);
		expect($scope.returnMaxidx([])).toEqual(-1);
	});
	
	it("test saveFunc", function() {
		$scope.currentUser.inTeam = "teamName";
		$scope.param.teamName = "teamName";
		$("#add").text = "Add";
		$scope.param.teamMembers =["member"];
		$scope.member = ["member"];
		$scope.saveFunc();
		$scope.param.teamMembers =[""];
		$scope.param.teanName = "";
		$scope.saveFunc();
		$scope.param.teamMembers =[];
		$scope.param.teanName = "asd";
		$scope.saveFunc();
		$("#add").text = "";
		$scope.saveFunc();
	});
	
	it("test loadFunc", function() {
		$scope.loadFunc();
		
	});
	
	it("test openCategory", function() {
		$scope.openCategory(0);
		
	});
	
	it("test processRequest", function() {
		$scope.param.teamMembers = ["a","b"];
		$scope.param.currentTeamSize =3;
		$scope.processRequest("a");
		$scope.processRequest("x");
		$scope.processRequest("y");		
		
	});
	

	it("test retrieveNameFromID", function() {
		$scope.users = [
			{$id: "123", name: "hi"},
			{$id: "456", name: "hello"},
			{$id: "789", name: "bye"},
		];
		expect($scope.retrieveNameFromID("123")).toEqual("hi");
		expect($scope.retrieveNameFromID("random")).toEqual("null");
	});

	it("test retrieveNamesFromJSON", function() {
		$scope.users = [
			{$id: "123", name: "hi"},
			{$id: "456", name: "hello"},
			{$id: "789", name: "bye"},
		];
		var teamMembers = ["123","456","789"]
		var result = $scope.retrieveNamesFromJSON(teamMembers);
		expect(result).toEqual(["hi", "hello", "bye"]);
	});

	it("test changeCurrentTeamSize", function() {
		$scope.param = {
			currentTeamSize: 2
		};
		$scope.range = {
			minTeamSize: 1, maxTeamSize: 5
		};
		$scope.changeCurrentTeamSize(1);
		expect($scope.param.currentTeamSize).toEqual(3);
		$scope.changeCurrentTeamSize(-5);
	});

	it("test refreshViewRequestsReceived", function() {
		$scope.param = {teamName: "team1"};
		$scope.member = [
			{$id: "123", selection: ["team1", "team2"]},
			{$id: "456", selection: ["team3", "team2"]},
			{$id: "789", selection: ["team1", "team3"]}
		];
		$scope.refreshViewRequestsReceived();
		expect($scope.requests).toEqual(["123", "789"]);
	});

	it("test tagChecked", function() {
		$scope.param = {
			tags: ["male", "female", "ug", "pg"]
		};
		expect($scope.tagChecked("male")).toEqual(true);
		expect($scope.tagChecked("python")).toEqual(false);
		$scope.param = {};
		expect($scope.tagChecked("python")).toEqual(false);
	});

	it("test addTags", function() {
		$scope.param = {
			tags: ["male", "female", "ug", "pg"],
			weight: [1,2,3,4]
		};
		$scope.addTags("Java");
		expect($scope.param.tags.length).toEqual(5);
		$scope.addTags("male");
		expect($scope.param.tags.length).toEqual(4);
	});
	
	it("test removeMember", function() {
		$scope.removeMember("member");
		$scope.param.teamMembers = ["a","b"];
		$scope.removeMember("member");
	});
	
	it("test checkTeam", function() {
		$scope.team = "undefined";
		$scope.checkTeam();
		$scope.param.teamName = "a";
		$scope.team = [
			{$id : "c"},
			{$id : "a"}
			];
		$scope.checkTeam();
		$scope.param.teamName = "b";
		$scope.checkTeam();
	});
	
	it("test sendInvite", function() {
		$scope.sendInvite();
		$scope.param.teamName = "b";
		$scope.teamList = {
			$id : "a"
		}
		$scope.sendInvite();
		$scope.param.teamName = "a";
		$scope.sendInvite();
	});

	// it("test removeMember 1", function() {
	// 	$scope.eventName = "COMP3111";
	// 	$scope.param = {
	// 		teamName: "Team1", teamMembers: ["Member1", "Member2"]
	// 	};
	// 	$scope.removeMember("Member1");
	// 	expect($scope.param.teamMembers.length).toEqual(1);
	// });
	// it("test removeMember 2", function() {
	// 	$scope.eventName = "COMP3111";
	// 	$scope.param = {
	// 		teamName: "Team1", teamMembers: ["Member1", "Member2"]
	// 	};
	// 	$scope.removeMember("ID1");
	// 	expect($scope.param.teamMembers.length).toEqual(2);
	// });
	// it("test removeMember 1", function() {
	// 	$scope.eventName = "COMP3111";
	// 	$scope.param = {
	// 		teamName: "Team1", teamMembers: ["Member1", "Member2"]
	// 	};
	// 	$scope.removeMember("Member1");
	// 	$scope.removeMember("Member2");
	// 	expect($scope.param.teamMembers.length).toEqual(0);
	// });
});
