describe('chatroomCtrl', function () {
	beforeEach(module('chatroomApp', 'firebase'));
	var ctrl, firebase, $scope;

	beforeEach(inject(function ($controller, $firebase, $firebaseArray) {
		$scope = {};
		ctrl = $controller('chatroomCtrl', {
			$scope: $scope,
			$firebaseArray: $firebaseArray
		})
	}));

	it('addNewMessage', function () {
		$scope.tempcontent = "Typing";
		$scope.addNewMessage();
		expect($scope.tempcontent).toEqual("Typing");
	});

	it('hasChatRecord', function () {
		var currentMemberList = ["0001", "0005"];
		$scope.addNewMessage(currentMemberList);

		$scope.chatrooms = { "0": { "members": [{}, {}, {}], "length": "3" }, "1": { "members": [{}, {}, {}], "length": "3" }, "2": { "members": [{}, {}, {}], "length": "3" }, "length": "3" };
		$scope.hasChatRecord($scope.chatrooms);
		$scope.chatrooms = { "0": { "members": [{}, {}, {}], "length": "3" }, "1": { "members": [{}, {}, {}], "length": "3" }, "2": { "members": [{}, {}, {}], "length": "3" }, "3": { "members": [{}, {}, {}], "length": "3" }, "length": "4" };
		$scope.hasChatRecord($scope.chatrooms);
	});



});
