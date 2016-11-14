//notificationCtrl
app.controller("notificationCtrl",

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject,Helper) {

		var my_event_list =[];

		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;
			var ref = firebase.database().ref('users/' + authData.uid + '/writable');
			$scope.myEvents = $firebaseObject(ref);
            ref = firebase.database().ref('events');
            $scope.events = $firebaseArray(ref);

		});

		$scope.changeState = function(eid,nid){
			helper.changeReadState($scope.authData.uid,eid,nid);

		}



		console.log("notification");
	}
);