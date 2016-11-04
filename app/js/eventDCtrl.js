//team list controller
app.controller("eventDCtrl",

    // Implementation the todoCtrl 
    function($scope, Auth, $firebaseArray, $firebaseObject, $stateParams, $window, Helper) {
        console.log("event detail");

        //initialize
        $scope.isManaging = false;
        $scope.userdata = "";
        Auth.$onAuthStateChanged(function(authData) {
            $scope.userData = authData;

            //get role of user
            ref = firebase.database().ref("users/" + $scope.userData.uid + "/writable");
            $scope.obj = $firebaseObject(ref);
            console.log($scope.obj);
            if (authData) {

            } else console.log("signed out");
        });

        // eventInfo
        $scope.eventID = "-KVcVgeRPOOdr-vUyDLV"; // eventID = $stateParams.eid;
        eventRef = firebase.database().ref("events/" + $scope.eventID);
        $scope.eventObj = $firebaseObject(eventRef);


        //functions
        $scope.manage = function() {
            $scope.isManaging = !$scope.isManaging;
        }

        //Debug



        $scope.createEventList = Helper.debug.createEventList;


    }
);