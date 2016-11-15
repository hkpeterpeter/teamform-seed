describe('chatroomCtrl', function(){
    beforeEach(module('chatroomApp', 'firebase'));
	var ctrl, firebase, $scope;

	beforeEach(inject(function($controller, $firebase, $firebaseArray){
		$scope = {};
		ctrl = $controller('chatroomCtrl', {
			$scope: $scope,
			$firebaseArray: $firebaseArray})
	}));

<<<<<<< HEAD
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
=======
    it('addNewMessage', function(){
        $scope.tempcontent = "Typing";
        $scope.addNewMessage();
        expect($scope.tempcontent).toEqual("Typing");
	});

      it('hasChatRecord', function(){
        var currentMemberList =["0001","0005"];
       $scope.addNewMessage(currentMemberList);
	});
>>>>>>> c03a0b3441feda90b5aab1e8b8fca06fdba39219

	

});
