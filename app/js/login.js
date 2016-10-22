// inject firebase service
var app = angular.module("questionApp", ["firebase"]); 

app.factory("Auth", function($firebaseAuth){
	return $firebaseAuth();
});


app.controller("questionCtrl", 

	function($scope, Auth, $firebaseArray, $firebaseObject) {

		$scope.input = {
			name: "",
			pwd: ""
		}

		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;

			if (authData) console.log(authData);
			else console.log("signed out");
		});

		$scope.login = function(){
			console.log('in');
			Auth.$signInWithEmailAndPassword(
				$scope.input.name,
				$scope.input.pwd
			).then(function(authData){
				console.log("Logged in as:", authData);
			}).catch(function(error){
				console.log("Authentication failed:", error);
			});

		};

		$scope.logout = function(){
			Auth.$signOut().then(function(){
				console.log("Logged out");
			}).catch(function(error){
				console.log(error);
			});
		};

	}
);