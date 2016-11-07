//notificationCtrl
app.controller("notificationCtrl",

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {

		var my_event_list =[];

		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;
			var ref = firebase.database().ref('users/' + authData.uid + '/writable');
			my_event_list = $firebaseArray(ref);
		});


		var my_notification_list = [];

		for(var i=0;i<my_event_list.length;i++) {
			for(var j=0;j<my_event_list[i].notification.length;j++){

				my_notification_list.push(my_event_list[i].notification[j]);
			}

		}

		$scope.my_notification_list = my_notification_list;






		console.log("notification");
	}
);