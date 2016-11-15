'use strict';

//
// TODO: Rewrite todo_test.js to achieve 100% statement/branch coverage
//

describe('Test angular_invite.js', function() {
   	var $scope;
   
   	beforeEach(module('angular_invite_app'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$controller('angular_invite_ctrl', {$scope:$scope});
	  }));

   describe('variable Test', function() {
		  
		  /*it('list_users',function(){
		  	expect(list_users).toEqual(["ikari1","ikari2","shinji","van","andyw"]);
		  });*/

	  	  it('$scope.users', function() {
	  	  	expect($scope.users).toEqual({
	  	  	"ikari1":{"name":"ikari","intro":"My hands stuck to my face again!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["cpp","java","sql"]},
			"shinji":{"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg","select":"glyphicon glyphicon-unchecked","tag":["angularjs","html","css","sql"]},
			"ikari2":{"name":"ikari","intro":"someone make me my sandwich!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["firebase","css"]},
			"van":{"name":"van","intro":"ddf","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["html","sql"]},
			"andyw":{"name":"andy","intro":"boxing","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["javascript","sql"]}
	  	  	});
	  	  });

	  	  it('selected',function(){
		  	expect($scope.selected).toEqual({});
		  });

	  	  it('tag',function(){
		  	expect($scope.tag).toEqual({
				"javascript":  {"users":["andyw"], "teams":[]},
				"angularjs":  {"users":["shinji"], "teams":[]},
				"html":  {"users":["shinji","van"], "teams":[]},
				"css":  {"users":["shinji","ikari2"], "teams":[]},
				"java":  {"users":["ikari1"], "teams":[]},
				"cpp":  {"users":["ikari1"], "teams":[]},
				"sql": {"users":["ikari1","shinji","van","andyw"], "teams":[]}
			  });
		  });
	  	  it('current tag',function(){
		  	expect($scope.currentTag).toEqual(["javascript","angularjs","html","css","java","cpp","sql"]);
		  });
		  it('result tag',function(){
		  	expect($scope.resultTag).toEqual([]);
		  });
		  it('$scope.filtered', function() {
	  	  	expect($scope.filtered).toEqual({
			"ikari1":{"name":"ikari","intro":"My hands stuck to my face again!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["cpp","java","sql"]},
			"shinji":{"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg","select":"glyphicon glyphicon-unchecked","tag":["angularjs","html","css","sql"]},
			"ikari2":{"name":"ikari","intro":"someone make me my sandwich!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["firebase","css"]},
			"van":{"name":"van","intro":"ddf","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["html","sql"]},
			"andyw":{"name":"andy","intro":"boxing","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["javascript","sql"]}
			});
	  	  });
   });

   describe('function Test', function() {
   		it('reset',function(){
			var index = 2;
	   		$scope.reset(index);// html
	   		expect($scope.resultTag).toEqual(["html"]);
	   		expect($scope.currentTag).toEqual(["javascript","angularjs","css","java","cpp","sql"]);
	   		expect($scope.filtered).toEqual({
			"shinji":{"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg","select":"glyphicon glyphicon-unchecked","tag":["angularjs","html","css","sql"]},
			"van":{"name":"van","intro":"ddf","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["html","sql"]}
			});
		});
   		it('delete',function(){
	   		var index = 0;
	   		$scope.resultTag=["html","angularjs"];
	   		$scope.currentTag=["javascript","css","java","cpp","sql"];
	   		$scope.delete(index);// html
	   		expect($scope.resultTag).toEqual(["angularjs"]);
	   		expect($scope.currentTag).toEqual(["javascript","css","java","cpp","sql","html"]);
   		});
   		it('click button',function(){
	   		var event = {"target":{"id":"van"}};
	   		$scope.clickButton(event);
	   		expect($scope.users.van.select).toEqual("glyphicon glyphicon-check");
	   		$scope.clickButton(event);
	   		expect($scope.users.van.select).toEqual("glyphicon glyphicon-unchecked");
   		});

   });
});
