app.controller("Question", ["$scope", "$firebaseArray",
    function($scope, $firebaseArray) {


   	$scope.questions = {
			Question: "",
			YOYO: ""
		}

    var ref = firebase.database().ref('Question/C++');
    $scope.question = $firebaseArray(ref);

    $scope.DOIT = function() {
	  	$scope.question.$add($scope.questions);
	  }

  }
]);