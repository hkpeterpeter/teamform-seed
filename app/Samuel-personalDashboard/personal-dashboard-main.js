/**
 * Created by Samuel on 2/11/2016.
 */

//var teamapp = angular.module("dashboard", ['firebase']);

teamapp.controller("dashboardController", function ($rootScope, $scope, $firebaseArray, $firebaseObject) {
    $rootScope.currentUser.id = "-KVu4OAjfPRTsmQ_8Ict";
    var userRef = firebase.database().ref('users/' + $rootScope.currentUser.id);
    var skillsRef = userRef.child('/skills');

    $scope.displayUser = $firebaseObject(userRef);

    $scope.skillsList = $firebaseArray(skillsRef);
    $scope.receiveNewSikll = function () {
        $scope.skillsList.$add($scope.newSkill);
        $scope.newSkill = '';
    };


    var eventsRef = userRef.child('/eventsManaging');
    $scope.eventsList = $firebaseArray(eventsRef);

    var applyingRef = userRef.child('/teamsApplying');
    $scope.applyingList = $firebaseArray(applyingRef);

    var leadingTeams = userRef.child('/teamsAsLeader');
    $scope.leadingList = $firebaseArray(leadingTeams);

    var memberTeams = userRef.child('/teamsAsMember');
    $scope.memberList = $firebaseArray(memberTeams);

    var invitedTeams = userRef.child('/teamsAsInvitedPeople');
    $scope.invitedList = $firebaseArray(invitedTeams);
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

    $scope.acceptInvitation = function(index){  //TODO: check whether this team is full
        //To add him to the member list
        var thisteamMemberList = $firebaseArray( firebase.database().ref('/teams/'+$scope.invitedList[index].$value + '/membersID') );
        thisteamMemberList.$loaded().then(function(){
            console.log("this team before adding him, has " + thisteamMemberList);
            thisteamMemberList.$add($rootScope.currentUser.id);
        });

        //To remove him from the "invited people" list
        var thisteamInvitedPeople = $firebaseArray(firebase.database().ref('/teams/'+$scope.invitedList[index].$value + '/invitedPeople'));
        thisteamInvitedPeople.$loaded().then(function(){
            for (var i = 0; i<thisteamInvitedPeople.length; i++){
                if (thisteamInvitedPeople[i].$value === $rootScope.currentUser.id){
                    thisteamInvitedPeople.$remove(i);
                }
            }
        });

        //To update his own copy of "teams as member"
        $scope.memberList.$add($scope.invitedList[index].$value);

        //To remove this team from his "being invited list"
        $scope.invitedList.$remove(index);
    };

    $scope.turndownInvitation = function(index){

        //To remove him from the "invited people" list
        var thisteamInvitedPeople = $firebaseArray(firebase.database().ref('/teams/'+$scope.invitedList[index].$value + '/invitedPeople'));
        thisteamInvitedPeople.$loaded().then(function(){
            for (var i = 0; i<thisteamInvitedPeople.length; i++){
                if (thisteamInvitedPeople[i].$value === $rootScope.currentUser.id){
                    thisteamInvitedPeople.$remove(i);
                }
            }
        });
        $scope.invitedList.$remove(index);
    }


});

