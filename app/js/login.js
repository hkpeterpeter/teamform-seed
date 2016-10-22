// inject firebase service
initalizeFirebase();

var app = angular.module("login", ["firebase"]); 

app.factory("Auth", function($firebaseAuth){
	return $firebaseAuth();
});


app.controller("loginController", 

	function($scope, Auth, $firebaseArray, $firebaseObject, $window) {


		$scope.input = {
			name: "",
			pwd: ""
		}

		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;

			if (authData) {
				console.log(authData);
				$window.location.href = '/dashboard.html';
			}
			else console.log("signed out");
		});

		$scope.signedIn = function(){
			return $scope.authData != null;
		};

		$scope.login = function(){
			console.log('in');
			Auth.$signInWithEmailAndPassword(
				$scope.input.name,
				$scope.input.pwd
			).then(function(authData){
				console.log("Logged in as:", authData);
			}).catch(function(error){
				console.log("Authentication failed:", error);
			}, {remember: "sessionOnly"});

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