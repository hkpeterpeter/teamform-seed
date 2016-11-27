//homeCtrl
app.controller("homeCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject, Helper) {
		console.log("home");
		Auth.$onAuthStateChanged(function(authData){
            if (authData){
                $scope.authData = authData;
                //console.log(authData.uid);
                var ref = firebase.database().ref('users/' + authData.uid + '/writable');
                $scope.myEvents = $firebaseObject(ref);

                ref = firebase.database().ref('events');
                $scope.events = $firebaseArray(ref);

				var ref = firebase.database().ref("users/" + $scope.authData.uid + "/writable");
				$scope.myEventList=$firebaseObject(ref);

				var ref2 = firebase.database().ref("events");
				$scope.allEvents=$firebaseArray(ref2);                

                // $scope.AllEvents = $firebaseObject(ref);


                //ref.orderByChild("eventInfo.name").equalTo($scope.input.searchName).on("child_added", function(snapshot) {
                //    console.log(snapshot);
                //});





            }
            else console.log("signed out");
		});

		$scope.withdrawApp = function(eid, tid){
			Helper.withdrawApplication($scope.authData.uid, eid, tid);
		}

		$scope.acceptInvi = function(eid, tid){
			Helper.acceptInvitation($scope.authData.uid, eid, tid);
		}

		$scope.declineInvi = function(eid, tid){
			Helper.declineInvitation($scope.authData.uid, eid, tid);
		}

		$scope.changeState = function(eid,nid){
			Helper.changeReadState($scope.authData.uid,eid,nid);

		}

	}
);
