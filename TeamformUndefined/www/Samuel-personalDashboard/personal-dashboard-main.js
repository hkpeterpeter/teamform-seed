/**
 * Created by Samuel on 2/11/2016.
 */

//var teamapp = angular.module("dashboard", ['firebase']);

teamapp.controller("dashboardController", function ($rootScope, $scope, $firebaseArray, $firebaseObject) {
    var userRef = firebase.database().ref('users/' + $rootScope.currentUser.$id);
    $scope.idcopy = $rootScope.currentUser.id;
    if(!$rootScope.currentUser.id){
        $scope.idcopy = $rootScope.currentUser.$id;
    }
    var skillsRef = userRef.child('/skills');
    $scope.displayUser={};
    console.log($scope.displayUser);
    $scope.displayUser = $firebaseObject(userRef);
    $scope.displayUser.profilePic="zhuxinyu/img/load5.gif";
    $scope.displayUser.name="Loading...";
     $scope.displayUser.email="Loading...";
     console.log($rootScope.currentUser.id);



    $scope.newName = '';
    $scope.receiveNewName = function(){
        var nameFirebaseRef = $firebaseObject(userRef.child('/name'));
        nameFirebaseRef.$loaded().then(function () {
           nameFirebaseRef.$value = $scope.newName;
            nameFirebaseRef.$save().then(function() {
            }, function(error) {
                console.log("Error:", error);
            });
            $scope.newName = '';
            Materialize.toast("Your custom name has been changed.", 4000);
        });
    };


    $scope.skillsList = $firebaseArray(skillsRef);

    $scope.newSkill = '';
    $scope.receiveNewSikll = function () {
        var skillsFirebase = $firebaseArray(skillsRef);
        var doesntExist = true;
        skillsFirebase.$loaded().then(function () {
            for (var i=0; i<skillsFirebase.length; i++){
                if (skillsFirebase[i].$value == $scope.newSkill){
                    doesntExist = false;
                }
            }
            // if (doesntExist == true){
            //     skillsFirebase.$add($scope.newSkill);
            //     $scope.newSkill = '';
            //     Materialize.toast("New skill added.", 4000);
            // }
            // else{
            //     Materialize.toast("Sorry, this skill already exists.", 4000);
            // }
            if ($scope.newSkill.length > 10){
                Materialize.toast("Sorry, please limit your skill to 10 characters", 4000);
            }
            else if (doesntExist == false){
                Materialize.toast("Sorry, this skill already exists.", 4000);
            }
            else{
                    skillsFirebase.$add($scope.newSkill);
                    $scope.newSkill = '';
                    Materialize.toast("New skill added.", 4000);
            }
        });
    };

    $scope.retrieveEvents = function(){
        var eventsRef = userRef.child('/eventsManaging');
        $scope.eventsList = $firebaseArray(eventsRef);
        return true;
    };
    $scope.retrieveEvents();

    $scope.retrieveApplying = function(){
        var applyingRef = userRef.child('/teamsApplying');
        $scope.applyingList = $firebaseArray(applyingRef);
        return true;
    };
    $scope.retrieveApplying();

    $scope.retrieveLeading = function(){
        var leadingTeams = userRef.child('/teamsAsLeader');
        $scope.leadingList = $firebaseArray(leadingTeams);
        return true;
    };
    $scope.retrieveLeading();

    $scope.retrieveMember = function(){
        var memberTeams = userRef.child('/teamsAsMember');
        $scope.memberList = $firebaseArray(memberTeams);
        return true;
    };
    $scope.retrieveMember();

    $scope.retrieveInvited = function(){
        var invitedTeams = userRef.child('/teamsAsInvitedPeople');
        $scope.invitedList = $firebaseArray(invitedTeams);
        return true;
    };
    $scope.retrieveInvited();

    $scope.invitationDisplay = [];

    // $scope.$watch("invitedList", function (newValue, oldValue) {
    //     for (var i = 0; i < $scope.invitedList.length; i++) {
    //         var invitingTeam = $firebaseObject(firebase.database().ref('teams/' + $scope.invitedList[i].$value));
    //         $scope.invitationDisplay[i] = "You are cordially invited to team " + $firebaseObject(firebase.database().ref('teams/' + $scope.invitedList[i].$value)).teamName + " in event " +
    //         $firebaseObject(firebase.database().ref('teams/' + $scope.invitedList[i].$value)).belongstoEvent;
    //     }
    // }, true);


    $scope.unreadFilter = {"read": false};    //Used as front-end display filter ONLY

    var notifsRef = userRef.child('/notifs');
    $scope.notifs = $firebaseArray(notifsRef);
    $scope.last10Notifs = $firebaseArray(notifsRef.orderByKey().limitToLast(10));
    $scope.showAllNotifs = false;
    $scope.show10Notifs = true;
    $scope.showAll = function(){
        $scope.showAllNotifs = true;
        $scope.show10Notifs = false;
    };
    $scope.showLess = function () {
        $scope.showAllNotifs = false;
        $scope.show10Notifs = true;
    };

    $scope.acceptInvitation = function(index){
        //To add him to the member list
        var teamid = $scope.invitedList[index].$value;
        var thisteamMemberList = $firebaseArray( firebase.database().ref('/teams/'+ teamid + '/membersID') );
        thisteamMemberList.$loaded().then(function(ref1){
            //Check the parent event's max team size
            var belongstoEvent = $firebaseObject(firebase.database().ref('/teams/' + teamid + '/belongstoEvent'));
            belongstoEvent.$loaded().then(function (ref2) {
                var parentEventID = ref2.$value;
                var parentEventFirebase = $firebaseObject(firebase.database().ref('/events/'+parentEventID));
                parentEventFirebase.$loaded().then(function(ref3){
                    var parentEventSizeCap = ref3.maxSize;
                    if (ref1.length < parentEventSizeCap){

                        ref1.$add($scope.idcopy);
                        //To remove him from the "invited people" list
                        var thisteamInvitedPeople = $firebaseArray(firebase.database().ref('/teams/'+ teamid + '/invitedPeople'));
                        thisteamInvitedPeople.$loaded().then(function(ref4){
                            console.log(ref4);
                            console.log($scope.idcopy);
                            for (var i = 0; i<ref4.length; i++){

                                if (ref4[i].$value == $scope.idcopy){
                                    ref4.$remove(ref4[i]);

                                }
                            }

                        });





                        //To update his own copy of "teams as member"
                        $scope.memberList.$add($scope.invitedList[index].$value);
                        //To remove this team from his "being invited list"
                        $scope.invitedList.$remove(index);
                        Materialize.toast("Invitation accepted.", 4000);





                    }
                    else{
                        Materialize.toast("This team is already full. You cannot join it anymore.", 4000); // 4000 is the duration of the toast
                    }
                });
            });
        });
    };


    $scope.turndownInvitation = function(index){
        //To remove her from the "invited people" list
        var teamid = $scope.invitedList[index].$value;
        var thisteamInvitedPeople = $firebaseArray(firebase.database().ref('/teams/'+teamid+ '/invitedPeople'));
        thisteamInvitedPeople.$loaded().then(function(){
            for (var i = 0; i<thisteamInvitedPeople.length; i++){
                if (thisteamInvitedPeople[i].$value == $scope.idcopy){
                    thisteamInvitedPeople.$remove(i);
                }
            }
        });
        $scope.invitedList.$remove(index);
        Materialize.toast("You have successfully turned down this invitation", 4000);
    };

    $scope.withdrawApplication = function(index){
        //To remove her from that team's
        var thatteamid = $scope.applyingList[index].$value;
        var thatteamsPendingApplicants = $firebaseArray(firebase.database().ref('/teams/' + thatteamid + '/pendingApplicants'));
        thatteamsPendingApplicants.$loaded().then(function(){
           for (var i=0; i<thatteamsPendingApplicants.length; i++){
               if (thatteamsPendingApplicants[i].$value == $scope.idcopy){
                   thatteamsPendingApplicants.$remove(i);
               }
           }
        });
        //To remove that team from her teamsApplying array
        $scope.applyingList.$remove(index);
        Materialize.toast("You have successfully withdrawn this application.", 4000);
    }


});
