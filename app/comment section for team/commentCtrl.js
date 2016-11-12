// Initialize Firebase
var config = {
    apiKey: "AIzaSyDRwTjOiH_DUPfAHdwTMPTLjB9qn7iKMS4",
    authDomain: "light-of-wisdom-7d1ea.firebaseapp.com",
    databaseURL: "https://light-of-wisdom-7d1ea.firebaseio.com",
    storageBucket: "light-of-wisdom-7d1ea.appspot.com",
    messagingSenderId: "411144932773"
};
firebase.initializeApp(config);

// inject firebase service
var app = angular.module("comment", ["firebase"]); 

app.controller("commentCtrl", 

	// Implementation the todoCtrl 
	function($scope, $firebaseArray) {

		$scope.input = {
			title: "",
			comment: "",
			date: "",
			likes: 0
		}
		// sync with firebaseArray
		var ref = firebase.database().ref("comment");
		$scope.comment = $firebaseArray(ref);

		$scope.addComment = function() {
			
			// update the date
			if ( /*$scope.input.title != "" && */$scope.input.comment != "" ) {
				$scope.input.date = new Date().toString();
				$scope.input.likes = 0;
				// add a comment
				$scope.comment.$add($scope.input);
			}
		}

	}
);