// Testing of NotificationController
describe('mainApp', function() {
   var $scope;

   beforeEach(module('mainApp'));

   beforeEach(inject(function($rootScope, $controller){
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
}); 