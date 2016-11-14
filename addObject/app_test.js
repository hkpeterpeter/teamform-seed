describe('AppController', function() {


	var $scope; 
	beforeEach(module('plunker'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$controller('MainCtrl', {$scope: $scope});
	}));

	it('query', function() {
    	expect($scope.query).toEqual({});
  	});

	it('queryBy', function() {
    	expect($scope.queryBy).toEqual('$');
  	});

	it('validation', function() {
    	expect($scope.validation).toEqual({
		    "modules":
		    	[
			        {
				        "title":"name of validation1",
				        "description":"description of validation1"
			        },
		 			{
		               "title":"name of validation2",
		               "description":"description of validation2"
		              
		            }
		        ]
		  	});
  	});

  	it('add item', function() {
  		$scope.itemAmount = 'haha';
  		$scope.itemName = 'hoho';
  		$scope.addItem();
    	expect($scope.validation.modules).toContain({
            title: 'haha',
            description: 'hoho'
        });
  	});

});