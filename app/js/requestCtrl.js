//requestCtrl
app.controller("requestCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject, Helper) {
		console.log("request");

		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;
			if (authData) {
				console.log(authData);

				/** */
				var ref = firebase.database().ref("users/" + authData.uid + "/writable");
				$scope.myEventList=$firebaseObject(ref);

				var ref2 = firebase.database().ref("events");
				$scope.allEvents=$firebaseArray(ref2);
				
			}
			else {
				console.log("signed out");
				$window.location.href = '/';
			}
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


		
	}

	
);