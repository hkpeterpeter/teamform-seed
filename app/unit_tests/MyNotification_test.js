// Testing of NotificationController
describe('TestNotification', function() {
   var $scope, $rootScope, $controller;

   beforeEach(module('mainApp'));

   beforeEach(inject(function(_$rootScope_, _$controller_){
   		$rootScope = _$rootScope_;
   		$controller=_$controller_;
   }));

   beforeEach(function(){
   		$scope=$rootScope.$new();
   		$controller("NotificationController",{$scope: $scope});
   });
	// == Now, we can start testing using $scope ===

 	// Testing the default username 
  	it('test the user', function(){
      expect($scope.userList[0].Name).toEqual("Peter");
      expect($scope.userList[0].Info).toEqual("He invites you into the team.");
      expect($scope.userList[1].Info).toEqual("He wants to join your team.");
      expect($scope.userList[2].Info).toEqual("Someone left the team.");
    });

    
    it('test the whetherfromteam',function(){
      expect($scope.whetherfromteam(2)).toEqual(false);
      expect($scope.whetherfromteam(0)).toEqual(true);
    });

    it('test the remove', function(){
      $scope.removeuser(0);
      expect($scope.userList[0].Name).toEqual("Jason");
    });
}); 