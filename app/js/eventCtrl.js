//eventCtrl
app.controller("eventCtrl", 

	// Implementation the todoCtrl 
	function($scope, Auth, $firebaseArray, $firebaseObject) {
		Auth.$onAuthStateChanged(function(authData){
            if (authData){
                $scope.authData = authData;
                //console.log(authData.uid);
                var ref = firebase.database().ref('users/' + authData.uid + '/writable');
                $scope.myEvents = $firebaseObject(ref);
                // var event_id_list = [];

                ref = firebase.database().ref('events');
                $scope.events = $firebaseArray(ref);


                // myEvents.$loaded().then(function(myEvents){
                //     for (key in myEvents){
                //         event_id_list.push(key);
                //     };
                //     ref = firebase.database().ref('events');
                //     $firebaseArray(ref).$loaded().then(function(events){
                //         var eventObjList =[];
                //         var eventInfoList =[];                    
                //         for(var i=0;i<event_id_list.length;i++){
                //              eventObjList.push(events.$getRecord(event_id_list[i]));
                //             eventInfoList = eventobjList[i].eventInfo;
                //         }
                //         $scope.eventInfoList = eventInfoList;       
                //     });
             
                // });
                // var event_id_list = $firebaseArray(ref);

                //fetch event info according to event_id_list

            }
            else console.log("signed out");
		});

        //fetch event_id_list


		console.log("event");
	}
);