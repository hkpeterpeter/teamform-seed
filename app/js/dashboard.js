app.controller("dashboardCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject, $window) {



		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;
			if (authData) console.log(authData);
			else {
				console.log("signed out");
				$window.location.href = '/';
			}
		});

		$scope.logout = function(){
			Auth.$signOut().then(function(){
				console.log("Logged out");
			}).catch(function(error){
				console.log(error);
			});
		};
		

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

app.controller("eventDCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {
		console.log("event detail");
	}
);

//notificationCtrl
app.controller("notificationCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {
		console.log("notification");
	}
);


//requestCtrl
app.controller("requestCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {
		console.log("request");
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
app.controller("profileCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {
		console.log("profile");
	}
);