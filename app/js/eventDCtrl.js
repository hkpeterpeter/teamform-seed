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
            helper.addPersonToTeam(personToBeAdded,$scope.eventID,key);
            $scope.selectTeam=false;
            console.log(key);
        }
        $scope.invite=function(uid){
            Helper.sendInvitationTo(uid,$scope.eventID,$filter('teamId')($scope.myEvents[$scope.eventID]));
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
            leader: ""
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
        $scope.validInvite = function(uid){
            // console.log($scope.inv, ' ' , uid);
            if ($filter('teamId')($scope.myEvents[$scope.eventID]) != null) {
                for (key in $scope.eventObj.teams[$filter('teamId')($scope.myEvents[$scope.eventID])].invitations){
                    // console.log($scope.eventObj.teams[].key);
                    if (key == uid && $scope.eventObj.teams[$filter('teamId')($scope.myEvents[$scope.eventID])].invitations[key] =='pending') return false;
                }
                return true;                
            }
            return false;
 
        };
        console.log({position:"tba",team:null});
        
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
        if (obj == undefined){
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