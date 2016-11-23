/**
 * Created by Samuel on 2/11/2016.
 */

//var teamapp = angular.module("dashboard", ['firebase']);

teamapp.controller("dashboardController", function ($rootScope, $scope, $firebaseArray, $firebaseObject) {
    var userRef = firebase.database().ref('users/' + $rootScope.currentUser.id);

    var skillsRef = userRef.child('/skills');
    $scope.displayUser={};
    console.log($scope.displayUser);
    $scope.displayUser = $firebaseObject(userRef);
    $scope.displayUser.profilePic="zhuxinyu/img/load5.gif";
    $scope.displayUser.name="Loading...";
     $scope.displayUser.email="Loading...";
     
   

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
        });
    };


    $scope.skillsList = $firebaseArray(skillsRef);

    $scope.newSkill = '';
    $scope.receiveNewSikll = function () {
        $scope.skillsList.$add($scope.newSkill);
        $scope.newSkill = '';
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

    $scope.acceptInvitation = function(index){
        //To add him to the member list
        var thisteamMemberList = $firebaseArray( firebase.database().ref('/teams/'+$scope.invitedList[index].$value + '/membersID') );
        thisteamMemberList.$loaded().then(function(){
            //Check the parent event's max team size
            var belongstoEvent = $firebaseObject(firebase.database().ref('/teams/' + $scope.invitedList[index].$value + '/belongstoEvent'));
            belongstoEvent.$loaded().then(function () {
                var parentEventID = belongstoEvent.$value;
                var parentEventFirebase = $firebaseObject(firebase.database().ref('/events/'+parentEventID));
                parentEventFirebase.$loaded().then(function(){
                    var parentEventSizeCap = parentEventFirebase.maxSize;
                    if (thisteamMemberList.length < parentEventSizeCap){
                        thisteamMemberList.$add($rootScope.currentUser.id);
                        //To remove him from the "invited people" list
                        var thisteamInvitedPeople = $firebaseArray(firebase.database().ref('/teams/'+$scope.invitedList[index].$value + '/invitedPeople'));
                        thisteamInvitedPeople.$loaded().then(function(){
                            for (var i = 0; i<thisteamInvitedPeople.length; i++){
                                if (thisteamInvitedPeople[i].$value == $rootScope.currentUser.id){
                                    thisteamInvitedPeople.$remove(i);
                                }
                            }
                        });
                        //To update his own copy of "teams as member"
                        $scope.memberList.$add($scope.invitedList[index].$value);
                        //To remove this team from his "being invited list"
                        $scope.invitedList.$remove(index);
                    }
                    else{
                        console.log("this team is already full.")
                    }
                });
            });
        });
    };


    $scope.turndownInvitation = function(index){
        //To remove her from the "invited people" list
        var thisteamInvitedPeople = $firebaseArray(firebase.database().ref('/teams/'+$scope.invitedList[index].$value + '/invitedPeople'));
        thisteamInvitedPeople.$loaded().then(function(){
            for (var i = 0; i<thisteamInvitedPeople.length; i++){
                if (thisteamInvitedPeople[i].$value == $rootScope.currentUser.id){
                    thisteamInvitedPeople.$remove(i);
                }
            }
        });
        $scope.invitedList.$remove(index);
    };

    $scope.withdrawApplication = function(index){
        //To remove her from that team's
        var thatteamid = $scope.applyingList[index].$value;
        var thatteamsPendingApplicants = $firebaseArray(firebase.database().ref('/teams/' + thatteamid + '/pendingApplicants'));
        thatteamsPendingApplicants.$loaded().then(function(){
           for (var i=0; i<thatteamsPendingApplicants.length; i++){
               if (thatteamsPendingApplicants[i].$value == $rootScope.currentUser.id){
                   thatteamsPendingApplicants.$remove(i);
               }
           }
        });
        //To remove that team from her teamsApplying array
        $scope.applyingList.$remove(index);
    }


});

