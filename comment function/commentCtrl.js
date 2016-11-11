// inject firebase service
var app = angular.module("comment", ["firebase"]); 

app.controller("commentCtrl", 

	// Implementation the todoCtrl 
	function($scope, $firebaseArray) {

		$scope.input = {
			title: "",
			desc: "",
			date: "",
			likes: 0
		}
		// sync with firebaseArray
		var ref = firebase.database().ref("comment");
		$scope.comment = $firebaseArray(ref);

		$scope.addComment = function() {
			
			// update the date
			if ( $scope.input.title != "" && $scope.input.desc != "" ) {
				$scope.input.date = new Date().toString();
				$scope.input.likes = 0;
				// add a comment
				$scope.comment.$add($scope.input);
			}
		}

	}
);