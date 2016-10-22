// inject firebase service
initalizeFirebase();

var app = angular.module("tfApp", ["firebase", "ui.router"]); 

app.factory("Auth", function($firebaseAuth){
	return $firebaseAuth();
});

app.config(function($stateProvider){
	$stateProvider
	.state('login', {
		url: './',
		views:{
			'login_view': {
				templateUrl: 'login.html',
				controller: 'loginController'
			},
			'dashboard_view': {}
		}
	})
	.state('signup', {
		url: '/signup',
		views:{
			'login_view': {
				templateUrl: 'sign_up.html',
				controller: 'signupCtrl'
			},
			'dashboard_view': {}
		}
	})
	.state('dashboard', {
		url: '/dashboard',
		views:{
			'dashboard_view': {
				templateUrl: 'dashboard.html',
				controller: 'dbCtrl'
			},
			'login_view': {}
		}
	})
	.state('dashboard.home', {
		url: '/home',
		templateUrl: 'home.html',
		controller: 'homeCtrl'
	})
	.state('dashboard.event', {
		url: '/event/:eid',
		templateUrl: 'event.html',
		controller: 'eventCtrl'
	})
	.state('team', {
		url: '/event/:eid/team/:tid',
		views:{
			'dashboard_view': {
				templateUrl: 'team.html',
				controller: 'teamCtrl'				
			},
			'login_view': {}
		}

	})
	.state('profile', {
		url: '/profile/:name',
		views:{
			'dashboard_view': {
				templateUrl: 'profile.html',
				controller: 'profileCtrl'				
			},
			'login_view': {}
		}
	})
});

app.controller("mainController",
	function($scope, Auth, $firebaseArray, $firebaseObject, $window){
		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;

			if (authData) {
				console.log(authData);
			}
			else console.log("signed out");
		});

	});

app.controller("loginController", 

	function($scope, Auth, $firebaseArray, $firebaseObject, $window) {


		$scope.input = {
			name: "",
			pwd: ""
		}

		Auth.$onAuthStateChanged(function(authData){
			//$scope.authData = authData;

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