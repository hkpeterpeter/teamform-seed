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
			$id: "member", tags: ["C++", "Java"]
		}];
		expect($scope.retrieveTagsFromID("member")).toEqual(["C++", "Java"]);
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
