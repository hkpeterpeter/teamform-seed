//eventCtrl
app.controller("eventCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {
		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;
		});

        //fetch eventIdList

		var ref = firebase.database().ref('users/' + authData.uid + '/readOnly');
		var eventIdList = $firebaseArray(ref.eventIdList);

        //fetch event info according to eventIdList
        ref = firebase.database().ref('events');
        var events = $firebaseArray(ref);
        var eventObjList =[];
        var eventInfoList =[];

        console.log("Hello World");

        for(var i=0;i<eventIdList.length;i++){
             eventObjList.push(events.$getRecord(eventIdList[i]));
            eventInfoList.push(eventObjList[i].eventInfo);
            eventInfoList[i].eventInfo.eid = eventIdList[i];
        }




		console.log("event");
	}
);