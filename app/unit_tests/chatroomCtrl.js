describe('chatroomCtrl', function(){
    beforeEach(module('chatroomApp', 'firebase'));
	var ctrl, firebase, $scope;

	beforeEach(inject(function($controller, $firebase, $firebaseArray){
		$scope = {};
		ctrl = $controller('chatroomCtrl', {
			$scope: $scope,
			$firebaseArray: $firebaseArray})
	}));

    it('addNewMessage', function(){
        $scope.tempcontent = "Typing";
        $scope.addNewMessage();
        expect($scope.tempcontent).toEqual("Typing");
	});

      it('hasChatRecord', function(){
        var currentMemberList =["0001","0005"];
       $scope.addNewMessage(currentMemberList);
	});

	

});
