describe('Test member.js', function() {
   
	var $scope, $rootScope, $controller;
	
	
	beforeEach(module('teamform-member-app'));
	beforeEach(function() {
		console.log("member-app");
		inject(function($rootScope, $controller) {
			$scope = $rootScope.$new();
			$controller('MemberCtrl', {$scope: $scope});
		});
	});
	
	
	describe('test', function() {
		it("", function() {
		})
	});

});