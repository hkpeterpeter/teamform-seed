// inject firebase service
var app = angular.module("chatRoom", ["firebase"]); 

app.controller("chatRoomCtrl", 

	// Implementation the todoCtrl 
	function($scope, $firebaseArray) {

		$scope.input = {
			message: "",
			date: ""
		}
		// sync with firebaseArray
		var ref = firebase.database().ref("chatRoom");
		$scope.chatList = $firebaseArray(ref);

		$scope.addMessage = function() {
			
			// update the date
			if ( $scope.input.message != "" ) {
				$scope.input.date = new Date().toString();
				// add an input question
				$scope.chatList.$add($scope.input);
			}
		}

	}
);