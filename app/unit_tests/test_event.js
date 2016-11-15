describe("EventCtrl", function()
{
		var $scope, EventCtrl;	

	if(firebase.apps.length === 0) {
		initalizeFirebase();
	}
	
	beforeEach(module('teamform-event-app'));
	beforeEach(inject(function($rootScope, $controller, $firebaseObject) {
		$scope = $rootScope.$new();
		EventCtrl = $controller('EventCtrl', {$scope: $scope});
	}));



		it('if team name is exist', function() {
			expect($scope.createteam("ABC")).toEqual(true);
			expect($scope.createteam('null')).toEqual(false);
		});











			

});