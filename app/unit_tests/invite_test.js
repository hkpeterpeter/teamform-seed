'use strict';

//
// TODO: Rewrite todo_test.js to achieve 100% statement/branch coverage
//

describe('Test btnclick.js', function() {
   	var $scope;
   
   	beforeEach(module('clickApp'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
	  }));

   describe('TodoListController Test', function() {

	  	  it('$scope.users from firebase', function() {
	  	  	expect($scope.users).toEqual({
	  	  	"ikari1":{"name":"ikari","intro":"My hands stuck to my face again!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["cpp","java","sql"]},
			"shinji":{"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg","select":"glyphicon glyphicon-unchecked","tag":["angularjs","html","css","sql"]},
			"ikari2":{"name":"ikari","intro":"someone make me my sandwich!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["firebase","css"]},
			"van":{"name":"van","intro":"ddf","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["html","sql"]},
			"andyw":{"name":"andy","intro":"boxing","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["javascript","sql"]}
	  	  	});
	  	  });

		  
   });
});
