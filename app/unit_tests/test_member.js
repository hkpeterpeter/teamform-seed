
describe('Test member.js', function() {
   
	var $scope, MemberCtrl;	

	if(firebase.apps.length === 0) {
		initalizeFirebase();
	}
	
	beforeEach(module('teamform-member-app'));
	beforeEach(inject(function($rootScope, $controller, $firebaseObject) {
		$scope = $rootScope.$new();
		MemberCtrl = $controller('MemberCtrl', {$scope: $scope});
	}));

	it("addTag 1", function() {
		$scope.tag = "C++";
		$scope.tags = ["C++", "Java"];
		$scope.addTag();
		expect($scope.tag).toBe("");		
	});

	it("addTag 2", function() {
		$scope.tag = "C++";
		$scope.tags = [];
		$scope.addTag();
		expect($scope.tags[0]).toEqual("C++");
	});

	it("test loadFunc", function() {
		$scope.eventName = "COMP3111";
		$scope.uid = "JNoZidiLINaF9M2QDzSGLOd2rWm1";
		$scope.loadFunc();
		console.log($scope.tags);
		expect($scope.memberInfo).toBeDefined();		
	});

	it("test loadFuncCallback 1", function() {
		$scope.memberInfo = {
			$id: "id",
			selection: ["Team1", "Team2"],
			invitedBy: ["Team3"],
			tags: ["C++", "Java"]
		};
		$scope.loadFuncCallback();
		expect($scope.selection).toEqual(["Team1", "Team2"]);
		expect($scope.tags).toEqual(["C++", "Java"]);
		expect($scope.loadFuncTest).toEqual("notinTeam invite");
	});

	it("test loadFuncCallback 2", function() {
		$scope.memberInfo = {
			$id: "id",
			inTeam: "Team3"
		};
		$scope.loadFuncCallback();
		expect($scope.selection).toEqual([]);
		expect($scope.tags).toEqual([]);
		expect($scope.loadFuncTest).toEqual("inTeam noinvite");
	});

	it("test acceptInv", function() {
		$scope.userInfo = {
			$id: "newMember",
			invitedBy: ["fullTeam","teamHasSeat"]
		};
		$scope.teams = [
			{$id: "fullTeam",
				"size" : 1,
				"teamMembers" : [ "full" ]},
			{$id: "teamHasSeat",
				"size" : 2,
		        "teamMembers" : [ "hasSeatMem1" ]
			}
		];
		$scope.uid = $scope.userInfo.$id;
		$scope.token = "";
		// accept invitation team already full
		$scope.acceptInv("fullTeam");
		expect($scope.token).toEqual("TeamFull");	

		$scope.acceptInv("teamHasSeat");
		expect($scope.token).toEqual("TeamAvailable");
		$scope.acceptInvCallback($scope.teams[1]);
		expect($scope.token).toEqual("TeamJoined");
	});

	it("test declineInv", function() {
		$scope.memberInfo = {invitedBy: ["SomeTeam"]};
		$scope.declineInv("NeverExist");
		expect($scope.memberInfo.invitedBy.length).toEqual(1);
		$scope.declineInv("SomeTeam");
		expect($scope.memberInfo.invitedBy.length).toEqual(0);		
	});

});