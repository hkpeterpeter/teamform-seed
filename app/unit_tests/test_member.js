
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

	it("test loadFuncCallback", function() {
		$scope.memberInfo = firebase.database().ref("COMP3111/member/JNoZidiLINaF9M2QDzSGLOd2rWm1");
		$scope.loadFuncCallback();
		expect($scope.selection).toEqual([]);
		expect($scope.tags).toEqual([]);
		expect($scope.loadFuncTest).toEqual("notinTeam noinvite");
	});

});