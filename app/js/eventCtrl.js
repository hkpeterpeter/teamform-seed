//eventCtrl
app.controller("eventCtrl", 

	// Implementation the todoCtrl

	function($scope, Auth, $firebaseArray, $firebaseObject) {

        var eventIdList = [];

        //display all the events

		Auth.$onAuthStateChanged(function(authData){
			$scope.authData = authData;

            //fetch eventIdList

            var ref = firebase.database().ref('users/' + authData.uid + '/readOnly/eventIdList');
            eventIdList = $firebaseArray(ref);
		});



        //fetch event info according to eventIdList
        ref = firebase.database().ref('events');
        var events = $firebaseArray(ref);
        var eventObjList =[];
        var eventInfoList =[];


        for(var i=0;i<eventIdList.length;i++){
             eventObjList.push(events.$getRecord(eventIdList[i]));
            eventInfoList.push(eventObjList[i].eventInfo);
            eventInfoList[i].eid = eventIdList[i];
        }

        $scope.eventInfoList = eventInfoList;

        //create new event
        $scope.input = {
            ddl: "",
            min:"",
            max:"",
            name:"",
            desc: ""
        }

        $scope.addEvent= function (){

            if ($scope.input.ddl != "" && $scope.input.min != "" && $scope.input.max != "" &&$scope.input.name != "" && $scope.input.desc !="") {
                Auth.$onAuthStateChanged(function(authData){
                    $scope.authData = authData;
                        console.log(authData.uid);

                        var ref = firebase.database().ref("users/" + authData.uid + "/writable");
                        var readonlyObj = $firebaseObject(ref);
                        readonlyObj.ddl = $scope.input.ddl;
                        readonlyObj.min = $scope.input.min;
                        readonlyObj.max = $scope.input.max;
                        readonlyObj.desc = $scope.input.desc;
                        readonlyObj.$save();


                        // ref = firebase.database().ref("users/" + userData.uid + "/writable");
                        // var wirteObj = $firebaseObject(ref);
                        // wirteObj


                        ref = firebase.database().ref("users/uidList");
                        var uidlistObj = $firebaseArray(ref);
                        //console.log(uidlistObj);
                        uidlistObj.$add(userData.uid);


                        ref = firebase.database().ref("users/nameList");
                        // var namelistObj = $firebaseObject(ref);
                        var dict = {};
                        dict[$scope.input.name] = userData.uid;
                        ref.update(dict);
                        // // namelistObj.$add(dict);

                        // namelistObj[$scope.input.name] = userData.uid;
                        // console.log(namelistObj);
                        // namelistObj.$save();

                    }).catch(function(error) {
                    $window.alert(error);
                });
            } else {
                $window.alert("Missing required fields!");
            }
        };



        console.log("event");
	}
);