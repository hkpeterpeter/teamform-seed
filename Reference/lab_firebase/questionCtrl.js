// inject firebase service
var app = angular.module("questionApp", ["firebase"]); 

app.controller("questionCtrl", 

	// Implementation the todoCtrl 
	function($scope, $firebaseArray) {

		$scope.input = {
			title: "",
			desc: "",
			date: "",
			likes: 0,
            dislikes: 0,
            passdate: ""
		}
		// sync with firebaseArray
		var ref = firebase.database().ref("questionApp");
		$scope.questions = $firebaseArray(ref);

		$scope.addQuestion = function() {
			
			// update the date
			if ( $scope.input.title != "" && $scope.input.desc != "" ) {
				$scope.input.date = new Date();
				$scope.input.likes = 0;
               $scope.input.dislikes = 0;
				// add an input question
				$scope.questions.$add($scope.input);
			}
		}
               
               $scope.updateDate = function() {
                var currentdate = new Date();
               $scope.input.passdate = $scope.input.date - currentdate;
               }

	}
);