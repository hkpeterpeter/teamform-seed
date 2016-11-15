describe('tfApp',function(){
	beforeEach(function(){
	    	module("tfApp");
	    	module(function($provide){
		        	$provide.factory('Auth', function(){
		            	$onAuthStateChanged=function(callback){
		              		callback({uid:"testUid"});
		             		 callback(null);
		           	 }
		           	return {
		              		$onAuthStateChanged:$onAuthStateChanged
		           	}
		       	 });
		        	$provide.factory('$stateParams',function(){
		        		return {
		        			uid : "testUid"
		        		}
		        	});
	     	 });
 	 });
	var $controller, auth;
	beforeEach(inject(function(_$controller_, Auth){
    	 	$controller = _$controller_;
    		auth = Auth;
  	}));
  	 describe('profileCtrl', function() {
    		var $scope, controller;
		beforeEach(function() {
      			$scope = {};
     			controller = $controller('profileCtrl', { $scope: $scope});
      		});
		it('test edit() when profile_readOnly is true', function() {
	      		$scope.profile_readOnly=true;
	      		$scope.edit();
	      		expect($scope.profile_readOnly).toEqual(false);
	      		expect($scope.button_name).toEqual("SAVE");
	    	});
		it('test edit() when profile_readOnly is false', function() {
	      		$scope.profile_readOnly=false;
	      		$scope.edit();
	      		expect($scope.profile_readOnly).toEqual(true);
	      		expect($scope.button_name).toEqual("EDIT");
	    	});
		it('test id checking', function(){
			expect($scope.button_visible).toEqual(true);
		});
 	});
});
describe('tfApp',function(){
	beforeEach(function(){
	    	module("tfApp");
	    	module(function($provide){
		        	$provide.factory('Auth', function(){
		            	$onAuthStateChanged=function(callback){
		              		callback({uid:"testUid"});
		             		 callback(null);
		           	 }
		           	return {
		              		$onAuthStateChanged:$onAuthStateChanged
		           	}
		       	 });
		        	$provide.factory('$stateParams',function(){
		        		return {
		        			uid : "id"
		        		}
		        	});
	     	 });
 	 });
	var $controller, auth;
	beforeEach(inject(function(_$controller_, Auth){
    	 	$controller = _$controller_;
    		auth = Auth;
  	}));
  	 describe('profileCtrl', function() {
    		var $scope, controller;
		beforeEach(function() {
      			$scope = {};
     			controller = $controller('profileCtrl', { $scope: $scope});
      		});
		it('test id checking', function(){
			expect($scope.button_visible).toEqual(false);
		});
 	});
});