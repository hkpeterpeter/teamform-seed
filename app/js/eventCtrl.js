//eventCtrl
app.controller("eventCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {
		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;
		});

        //fetch event_id_list

		var ref = firebase.database().ref('users/' + authData.uid + '/readOnly');
		var event_id_list = $firebaseArray(ref.eventIdList);

        //fetch event info according to event_id_list
        ref = firebase.database().ref('events');
        var events = $firebaseArray(ref);
        var eventObjList =[];
        var eventInfoList =[];


        for(var i=0;i<event_id_list.length;i++){
             eventObjList.push(events.$getRecord(event_id_list[i]));
            eventInfoList = eventobjList[i].eventInfo;
        }

        $scope.eventInfoList = eventInfoList;


		console.log("event");
	}
);