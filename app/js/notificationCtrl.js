//notificationCtrl
app.controller("notificationCtrl",

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject,Helper) {


		Auth.$onAuthStateChanged(function(authData){
			if(authData){
			$scope.authData = authData;
			var ref = firebase.database().ref('users/' + authData.uid + '/writable');
			$scope.myEvents = $firebaseObject(ref);
            ref = firebase.database().ref('events');
            $scope.events = $firebaseArray(ref);

		}});

        $scope.search_model = "all";

        $scope.filterEvent = function(items, filter_model) {
            var result = {};
            angular.forEach(items, function(value, key) {
                if (key == filter_model || filter_model == "all") {
                    result[key] = value;
                }
            });
            return result;
        }



		$scope.changeState = function(eid,nid){
			Helper.changeReadState($scope.authData.uid,eid,nid);

		}




		console.log("notification");
	}
);