// inject firebase service
initalizeFirebase();

var app = angular.module("dashboard", ["firebase", "ui.router"]); 

app.factory("Auth", function($firebaseAuth){
	return $firebaseAuth();
});

app.config(function($stateProvider){
	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'home.html',
		controller: 'homeCtrl'
	})
	.state('event', {
		url: '/event/:eid',
		templateUrl: 'event.html',
		controller: 'eventCtrl'
	})
	.state('team', {
		url: '/event/:eid/team/:tid',
		templateUrl: 'team.html',
		controller: 'teamCtrl'
	})
	.state('profile', {
		url: '/profile/:name',
		templateUrl: 'profile.html',
		controller: 'profileCtrl'
	})
});


app.controller("mainController", 

	// Implementation the todoCtrl 
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

		

	}
);

//homeCtrl
app.controller("homeCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {
		console.log("home");
	}
);


//eventCtrl
app.controller("eventCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {
		console.log("event");
	}
);


//teamCtrl
app.controller("teamCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {
		console.log("team");
	}
);


//profileCtrl
app.controller("profiletrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {
		console.log("profile");
	}
);