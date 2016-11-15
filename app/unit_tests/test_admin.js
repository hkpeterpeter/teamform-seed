describe('teamform-admin-app', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
   var $scope;
   describe('change min size test', function() {

	  it('test change size', function() {
	  	var value = 2;
        $scope.changeMinTeamSize(3);
	  	expect( $scope.param.minTeamSize ).toEqual(5);
	  });

   });


});