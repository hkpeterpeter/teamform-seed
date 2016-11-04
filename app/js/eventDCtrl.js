//team list controller
app.controller("eventDCtrl",

    // Implementation the todoCtrl 
    function($scope, Auth, $firebaseArray, $firebaseObject, $stateParams, $window, Helper,  ngDialog) {
        console.log("event detail");

        //initialize
        $scope.isManaging = false;
        $scope.userdata = "";
        $scope.selectTeam = false;
        $scope.eventID = "-KVcVgeRPOOdr-vUyDLV";
        personToBeAdded="";
        Auth.$onAuthStateChanged(function(authData) {
            $scope.userData = authData;

            //get role of user
            ref = firebase.database().ref("users/" + $scope.userData.uid + "/writable");
            $scope.obj = $firebaseObject(ref);
            $scope.obj.$loaded().then(function(data){
                if($scope.obj[$scope.eventID]===undefined) 
                    $scope.role="visitor";
                else 
                    $scope.role=$scope.obj[$scope.eventID].position;
            })
            
            // console.log($scope.obj);
            if (authData) {

            } else console.log("signed out");
        });

        // eventInfo
         // eventID = $stateParams.eid;
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
        var dialogue;
        $scope.createTeamDialogue = function(){
            dialogue = ngDialog.open({
                template: 'templates/createTeam.html',
                className: 'ngdialog-theme-plain',
                scope: $scope,
                height: '40%',
                width: '50%'
            });
        }
        $scope.newTeam={
            max: 0,
            name: "",
            desc: "",
            currentSize: 0,
            members: {},
            tags: {}

        }
        $scope.createTeam=function(){
            console.log($scope.newTeam);
            // newTeam.members[$scope.userData.uid]=$scope.userData.uid;
            helper.createTeam($scope.userData.uid,$scope.eventID,$scope.newTeam);
            dialogue.close();
        }

        


    }
);