//team list controller
app.controller("eventDCtrl",

    // Implementation the todoCtrl
    function($scope, Auth, $firebaseArray, $firebaseObject, $stateParams, $filter, Helper, ngDialog, $state) {
        console.log("event detail");

        //initialize
        $scope.isManaging = false;
        $scope.userdata = "";
        $scope.selectTeam = false;
        $scope.eventID = $stateParams.eid;
        personToBeAdded="";
        $scope.editingInfo=false;
        $scope.editButton="Edit";
        $scope.isDeletingAnn = false;
        this.Object=Object;
        Auth.$onAuthStateChanged(function(authData) {
            // console.log($scope.obj);
            if (authData) {
                $scope.userData = authData;

                ref=firebase.database().ref("users");
                $scope.users=$firebaseObject(ref);
                //get role of user
                ref = firebase.database().ref("users/" + $scope.userData.uid + "/writable");
                $scope.myEvents = $firebaseObject(ref);
                ref = firebase.database().ref("users/" + $scope.userData.uid + "/writable/"+$scope.eventID);
                $scope.myEvent = $firebaseObject(ref);
                $scope.myEvent.$loaded().then(function(data){
                    console.log("Test");
                    console.log(data);
                });
                // $scope.myEvents.$loaded().then(function(){
                //     //console.log($filter('teamId')($scope.myEvents[$scope.eventID]));
                //     invref = firebase.database().ref('events/' + $scope.eventID + "/teams/" + $filter('teamId')($scope.myEvents[$scope.eventID]) + "/invitations");
                //     $scope.inv = $firebaseObject(invref);
                // });
                // $scope.obj.$loaded().then(function(data){
                //     if($scope.obj[$scope.eventID]===undefined)
                //         $scope.role="visitor";
                //     else
                //     {
                //         $scope.role=$scope.obj[$scope.eventID].position;
                //         $scope.teamID=$scope.obj[$scope.eventID].team;
                //         console.log($scope.obj[$scope.eventID]);
                //     }
                // })

            } else console.log("signed out");
        });


        // eventInfo
         // eventID = $stateParams.eid;
        eventRef = firebase.database().ref("events/" + $scope.eventID);
        $scope.eventObj = $firebaseObject(eventRef);
        // $scope.eventObj.$loaded().then(function(data){
        //     console.log(Object.keys(data.teams).length);
        // })

        //functions
        $scope.manage = function() {
            $scope.isManaging = !$scope.isManaging;
            $scope.selectTeam = false;
        };


        // $scope.createEventList = Helper.debug.createEventList;
        $scope.deleteTeam = function(key){
            Helper.deleteTeam($scope.eventID,key);
        };
        $scope.addToTeam = function(id){
            $scope.selectTeam=!$scope.selectTeam;
            personToBeAdded=id;

        }
        $scope.toTeam=function(key){
            Helper.addPersonToTeam(personToBeAdded,$scope.eventID,key);
            $scope.selectTeam=false;
            console.log(key);
        }
        $scope.deleteAnn = function(key){
            Helper.deleteEventAnnouncement($scope.eventID,key)
            console.log(key + " been deleted");
        }
        $scope.invite=function(uid){
            Helper.sendInvitationTo(uid,$scope.eventID,$filter('teamId')($scope.myEvent));
        }
        $scope.quit=function(){
            Helper.quitEvent($scope.userData.uid,$scope.eventID);
            // $scope.role="visitor";

        }
        $scope.joinEvent=function(){
            Helper.joinEvent($scope.userData.uid,$scope.eventID);
            // $scope.role="tba";
        }


        var dialogue;
        $scope.createTeamDialogue = function(){
            dialogue = ngDialog.open({
                template: 'templates/createTeam.html',
                className: 'ngdialog-theme-plain',
                scope: $scope
            });
        };
        $scope.createAnnouncementDialogue = function(){
            dialogue = ngDialog.open({
                template: 'templates/postAnnouncement.html',
                className: 'ngdialog-theme-plain',
                scope: $scope
            });
        };
        $scope.newTeam={
            max: 0,
            name: "",
            desc: "",
            members: {},
            tags: {},
            leader: "",
            currentSize: 0,
            tags: Helper.tags
        };
        $scope.newAnn={
            a: ""
        };
        console.log($scope.newTeam);
        $scope.createTeam=function(){
            $scope.newTeam.leader=$scope.userData.uid;
            $scope.newTeam.max=parseInt($scope.newTeam.max);
            console.log($scope.newTeam);
            Helper.createTeam($scope.userData.uid,$scope.eventID,$scope.newTeam);
            dialogue.close();
            // $state.reload();


            // $scope.role=$scope.obj[$scope.eventID].position;
            // $scope.teamID=$scope.obj[$scope.eventID].team;
        }
        $scope.postAnnouncement=function(){
            console.log($scope.newAnn);
            Helper.postEventAnnouncement($scope.eventID, $scope.newAnn.a);
            dialogue.close();
        }
        $scope.deleteAnnouncementChoice=function(){
            $scope.isDeletingAnn = !$scope.isDeletingAnn;
        }
        $scope.validInvite = function(uid){
            // console.log($scope.inv, ' ' , uid);
            if ($filter('teamId')($scope.myEvent) != null) {
                for (key in $scope.eventObj.teams[$filter('teamId')($scope.myEvent)].invitations){
                    // console.log($scope.eventObj.teams[].key);
                    if (key == uid && $scope.eventObj.teams[$filter('teamId')($scope.myEvent)].invitations[key] =='pending') return false;
                }
                return true;
            }
            return false;

        };
        console.log({position:"tba",team:null});
        $scope.editInfo=function(){
            if($scope.editButton=="Edit")
            {
                $scope.editButton="Save";
                $scope.editingInfo=true;
            }
            else{
                $scope.editButton="Edit";
                $scope.editingInfo=false;
                $scope.eventObj.$save();
            }
        }

    }
);

app.filter('numKeys', function() {
    return function(json) {
        if(json===undefined)
            return 0;
        var keys = Object.keys(json)
        return keys.length;
    }
});

app.filter('role', function(){
    return function(obj) {
        if (obj === undefined){
            return 'visitor';
        }
        else
            return obj.position;
    }
});

app.filter('teamId', function(){
    return function(obj) {
        if (obj == undefined){
            return null;
        }
        else{
            //console.log(obj.team);
            return obj.team;
        }
    }
});
