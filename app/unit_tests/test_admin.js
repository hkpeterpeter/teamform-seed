describe('Test admin.js', function() {
   
	var $scope, $rootScope, $controller;
	initalizeFirebase(); //FIXME
	
	beforeEach(function() {
		module('teamform-admin-app');
		inject(function($rootScope, $controller) {
			$scope = $rootScope.$new();
			$controller('AdminCtrl', {$scope: $scope});
		});
	});
	
	describe('test random assignment', function() {
		it("Assign all", function() {
			$scope.team = [
				{'size': 1, 'teamMembers': [{name: "exist8", weight: 8}]},
				{'size': 3, 'teamMembers': [{name: "exist4", weight: 4}]}
			];
			$scope.member = [
				{name: "weight8", weight: 8},
				{name: "weight3", weight: 3},
				{name :"weight12", weight: 12},
				{name: "weight3-2", weight: 3},
			];
			$scope.param.minTeamSize = 1;
			$scope.param.maxTeamSize = 3;
			
			$scope.smartAssignment();
			
			expect($scope.team.length).toEqual(3);
			// no new member for full team
			expect($scope.team[0].teamMembers.length).toEqual(1);
		});
	});
	
	describe('test modification on team size', function() {
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
	});

});