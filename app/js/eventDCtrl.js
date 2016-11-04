//team list controller
app.controller("eventDCtrl",

    // Implementation the todoCtrl 
    function($scope, Auth, $firebaseArray, $firebaseObject, $stateParams, $window, Helper) {
        console.log("event detail");

        //initialize
        $scope.isManaging = false;
        $scope.userdata = "";
        $scope.selectTeam = false;
        personToBeAdded="";
        Auth.$onAuthStateChanged(function(authData) {
            $scope.userData = authData;

            //get role of user
            ref = firebase.database().ref("users/" + $scope.userData.uid + "/writable");
            $scope.obj = $firebaseObject(ref);
            // console.log($scope.obj);
            if (authData) {

            } else console.log("signed out");
        });

        // eventInfo
        $scope.eventID = "-KVcVgeRPOOdr-vUyDLV"; // eventID = $stateParams.eid;
        eventRef = firebase.database().ref("events/" + $scope.eventID);
        $scope.eventObj = $firebaseObject(eventRef);
        $scope.eventObj.$loaded().then(function(data){
            console.log($scope.eventObj.eventInfo);
        })

        //functions
        $scope.manage = function() {
            $scope.isManaging = !$scope.isManaging;
        };

        //Debug

        $scope.createEventList = Helper.debug.createEventList;
        $scope.deleteTeam = function(key){
            Helper.deleteTeam($scope.eventID,key);
        };
        $scope.addToTeam = function(id){
            $scope.selectTeam=!$scope.selectTeam;
            personToBeAdded=id;

        }
        $scope.toTeam=function(key){
            helper.addPersonToTeam(personToBeAdded,$scope.eventID,key);
            $scope.selectTeam=false;
            console.log(key);
        }
        console.log("test");
        


    }
);