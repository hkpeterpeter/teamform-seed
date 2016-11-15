var app = angular.module("chatRoom", ["firebase"]); 

app.controller("chatRoomCtrl", 

	function($scope, $firebaseArray) {
		$scope.input = {
			message: "",
			date: "",
			userName: ""
		}
		var eventName = getURLParameter("q");
		var ref = firebase.database().ref("chatRoom" + eventName);
		$scope.chatList = $firebaseArray(ref);

		$scope.addMessage = function() {
			// update the date
			if ( $scope.input.message != "" ) {
				firebase.auth().onAuthStateChanged(function(firebaseUser) {
					if(firebaseUser) {
						var user = firebase.auth().currentUser;
						$scope.input.userName = user.displayName;
						$scope.input.date = new Date().toString();
						$scope.chatList.$add($scope.input);
					}
				})
			}
		}
	}
);
