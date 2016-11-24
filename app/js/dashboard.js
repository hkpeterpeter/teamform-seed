app.controller("dashboardCtrl",

	// Implementation the todoCtrl
	function($scope, Auth, $firebaseArray, $firebaseObject, $window) {



		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;
			if (authData) {
				ref=firebase.database().ref("users/" + authData.uid);
                $scope.user=$firebaseObject(ref);
				console.log(authData);
			}
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
