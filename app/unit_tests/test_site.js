describe('Test site.js', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
   describe('getRandomIntInclusive Coverage Test', function() {

	  it('value within 1 to 3', function() {
	  	var value = getRandomIntInclusive(1, 3);
	  	expect( value>=1 && value <= 3 ).toEqual(true);
	  });

   });
   


describe('teamform-admin-app', function() {

	var createController, $scope;

	beforeEach(inject(function($rootScope, _$controller_){
        $scope = $rootScope.$new();
		
		createController = function() {
            return $controller('teamform-admin-app', {
                '$scope': $scope
            });
        };
	}));
	


	  it('change min size to 3', function() {
	  	$scope.changeMinTeamSize(3);
	  	expect($scope.param.minTeamSize).toBe(3);
	  });
	  
	  it('change max size to 10', function() {
	  	$scope.changeMaxTeamSize(10);
	  	expect($scope.param.minTeamSize).toBe(10);
	  });
	  
	  
});   
   
});