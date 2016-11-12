describe('Test team.js', function() {
   
	var $scope, $rootScope, $controller;

	beforeEach(module('teamform-team-app'));
	beforeEach(function() {
		inject(function($rootScope, $controller) {
			$scope = $rootScope.$new();
			$controller('TeamCtrl', {$scope: $scope});
		});
	});

	describe('test retrieveNameFromID', function() {
		it("Apple", function() {
			$scope.retrieveNameFromID("123");
		});
	});

});