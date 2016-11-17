$(document).ready(function(){

	$('#event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' ) {
		$('#event_name').text(eventName);
	}
});

var app = angular.module("chatRoom", ["firebase"]); 
app.directive('login', function() {
    return {
        restrict: 'A',
        templateUrl: 'login.html'
    };
});
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

		$scope.msgAlt = function(name) {
			if(name === firebase.auth().currentUser.displayName) {
				return "message-alt";
			}
			return null;
		};

		$scope.bubbleAlt = function(name) {
			if(name === firebase.auth().currentUser.displayName) {
				return "bubble-alt";
			}
			return null;
		};

		$scope.ownMsg = function(name) {
			if(name === firebase.auth().currentUser.displayName) {
				return  true;
			}
			return false;
		}

		$scope.addMessage = function() {
			// update the date
			if ( $scope.input.message !== "" ) {
				firebase.auth().onAuthStateChanged(function(firebaseUser) {
					if(firebaseUser) {
						var user = firebase.auth().currentUser;
						$scope.input.userName = user.displayName;
						$scope.input.date = new Date().toString();
						$scope.chatList.$add($scope.input);
					}
				});
			}
		};
		$scope.timeSince = function(date) {
		    var seconds = Math.floor((new Date() - new Date(date)) / 1000);
		    var interval = Math.floor(seconds / 31536000);
		    if (interval >= 1) {
		        return interval + " years ago";
		    }
		    interval = Math.floor(seconds / 2592000);
		    if (interval >= 1) {
		        return interval + " months ago";
		    }
		    interval = Math.floor(seconds / 86400);
		    if (interval >= 1) {
		        return interval + " days ago";
		    }
		    interval = Math.floor(seconds / 3600);
		    if (interval >= 1) {
		         return interval + " hours ago";
		    }
		    interval = Math.floor(seconds / 60);
		    if (interval >= 1) {
		        return interval + " minutes ago";
		    }
		    return Math.floor(seconds) + " seconds ago";
		};
	}
);
