//notificationCtrl
app.controller("notificationCtrl",

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {

		var my_event_list =[];

		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;
			var ref = firebase.database().ref('users/' + authData.uid + '/writable');
			$scope.myEvents = $firebaseObject(ref);
		});







		console.log("notification");
	}
);