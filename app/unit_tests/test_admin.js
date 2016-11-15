describe('teamform-admin-app', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
   describe('change size test', function() {

	  it('test change size', function() {
	      $scope.param.minTeamSize = 2;
	      $scope.param.maxTeamSize = 8;
	      $scope.changeMinTeamSize(3);
	      $scope.changeMaxTeamSize(-2);
	      expect($scope.param.minTeamSize).toEqual(5);
	      expect($scope.param.maxTeamSize).toEqual(6);
	  });

   });


});