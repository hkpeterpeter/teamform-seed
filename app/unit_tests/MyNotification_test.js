// Testing of HelloController
describe('NotificationController', function() {

	// Initial setup for Controller Testing
	// Reference: https://docs.angularjs.org/guide/controller
	// Meaning:
	//    Before each test, we inject the $rootScope and $controller:
	//    

	var $scope; 
	beforeEach(module('NotificationController'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$controller('NotificationController', {$scope: $scope});
	}));


 	// == Now, we can start testing using $scope ===

 	// Testing the default username 
  	it('test the user', function(){
      expect($scope.userList[0].Name).toEqual("Peter");
    });

    it('test the remove', function(){
      $scope.removeuser(0);
      expect($scope.userList[0].Name).toEqual("Jason");
    });
    it('test the whetherfromteam',function(){
      expect($scope.whetherfromteam(0)).toEqual(true);
    });