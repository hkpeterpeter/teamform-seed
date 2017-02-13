app.controller("dashboardCtrl",

	// Implementation the todoCtrl
	function($scope, Auth, $firebaseArray, $firebaseObject, $window) {



		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;
			if (authData) {
				ref=firebase.database().ref("users/" + authData.uid);
                $scope.user=$firebaseObject(ref);
				console.log(authData);
				$scope.user.$loaded().then(function(){
					$scope.user_local = $scope.user.writable;
					// console.log($scope.user_local)

					for (key in $scope.user.writable){
						// console.log(key);
						firebase.database().ref("users/" + authData.uid + "/writable/" + key + "/notifications")
						.on('child_added', function(data){
							k = data.ref.parent.parent.key;
							if ($scope.user_local[k].notifications == undefined) {
								$scope.user_local[k].notifications = {};
							}
							// console.log(k);
							// console.log($scope.user_local[k].notifications[data.key]);							
							if ($scope.user_local[k].notifications[data.key] == undefined){
								$scope.user_local[k].notifications[data.key] = data.val();
								$window.alert(data.val().content);
							}
						});

					}
				});
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
