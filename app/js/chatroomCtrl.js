var app = angular.module("chatroomApp", ["firebase"]); 

app.controller("chatroomCtrl", 

	function($scope, $firebaseArray) {

		$scope.input = {
			content: "",
			date: "",
		}
	
		var ref = firebase.database().ref("chatroomApp");
		$scope.chatrooms = $firebaseArray(ref);

		$scope.addchatroom = function() {
			

			if ($scope.input.content != "" ) {
				$scope.input.date = new Date().toString();
				$scope.chatrooms.$add($scope.input);
			}
		}
	}
);