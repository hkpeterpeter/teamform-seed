describe("IndexCtrl", function()
{
	if(firebase.apps.length === 0) {
		initalizeFirebase();
	}
		var $scope,IndexCtrl;
		beforeEach(module('teamform-index-app'));
		beforeEach(inject(function($rootScope,$controller, $firebaseObject, $firebaseArray,$window){
			$scope = $rootScope.$new();
			IndexCtrl = $controller('IndexCtrl',{$scope : $scope, $firebaseObject: $firebaseObject, $firebaseArray: $firebaseArray, $window: $window});
		}));



		it('if event name is exist', function() {
			expect($scope.viewevent("ABC")).toEqual(true);
			expect($scope.viewevent('null')).toEqual(false);
		});




		it('logout', function() {
			expect($scope.logout()).toEqual(false);
		});








			

});