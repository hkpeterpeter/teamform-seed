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

	describe('test retrieveNameFromID', function() {
		it("Apple", function() {
			$scope.retrieveNameFromID("123");
		});
	});

});