'use restrict';

describe('chatroomCtrl', function(){
	
	beforeEach(module('chatroomApp', 'firebase'));
	var ctrl, firebase, $scope;

	beforeEach(inject(function($controller, $firebase, $firebaseArray){
		$scope = {};
		ctrl = $controller('chatroomCtrl', {
			$scope: $scope,
			//https://github.com/katowulf/mockfirebase/wiki/Testing-AngularFire
			$firebaseArray: $firebaseArray})
		//firebase = $firebase('https://comp3111-5fbe5.firebaseio.com');
	}));

	// it('createMsg', function(){
	// 	var tempObject = {}
	// 	tempObject = ctrl.createMsg("content", "date");
	// 	expect(tempObject.content).toEqual("content");
	// });

	// //http://stackoverflow.com/questions/22921484/how-can-we-test-non-scope-angular-controller-methods
	// it('hasChatRecord return -1', function(){
	// 	var result = ctrl.hasChatRecord("");
	// 	expect(result).toEqual(-1);
	// });

});
