var app = angular.module("myApp", ["firebase"]);

// and use it in our controller
app.controller("AuthCtrl", ["$scope", '$firebaseAuth', function($scope, $firebaseAuth) {
    var ref = firebase.database().ref();
    var auth = $firebaseAuth(firebase.auth());
	
    $scope.signUp = function() {
        auth.$createUserWithEmailAndPassword($scope.rInput.email,$scope.rInput.password)
        .then(function(userData) {
            $scope.regMessage = "User " + userData.uid + " created successfully!";

            return auth.$signInWithEmailAndPassword($scope.rInput.email, $scope.rInput.password);
        }).then(function(authData) {
            console.log("Logged in as:", authData.uid);
        }).catch(function(error) {
            console.error("Error: ", error);
        });
    };
	
	$scope.signIn = function() {
        auth.$signInWithEmailAndPassword($scope.lInput.email, $scope.lInput.password)
		.then(function(authData) {
			$scope.LoginMessage = "Logged in as:" + authData.uid;
		}).catch(function(error) {
			LoginMessage = "Authentication failed:" + error;
		});
    };
}]);
