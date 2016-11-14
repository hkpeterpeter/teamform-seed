/**
 * Created by Samuel on 2/11/2016.
 */

//var teamapp = angular.module("dashboard", ['firebase']);

teamapp.controller("dashboardController", function ($rootScope, $scope, $firebaseArray, $firebaseObject) {

    var userRef = firebase.database().ref('users/' + $rootScope.currentUser.id);

    var skillsRef = userRef.child('/skills');

    $scope.displayUser = $firebaseObject(userRef);

    $scope.skillsList = $firebaseArray(skillsRef);
    $scope.receiveNewSikll = function () {
        console.log($scope.skillsList );
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

    $scope.unreadFilter = {"read": false};    //Used as front-end display filter ONLY

    var notifsRef = userRef.child('/notifs');
    $scope.notifs = $firebaseArray(notifsRef);

    $scope.notifsDisplay = [];
    $scope.isInvitation = [];
    $scope.$watch("notifs", function (newValue, oldValue) {
        for (var i = 0; i< $scope.notifs.length; i++){
            // if ($scope.notifs[i].type === "normal"){
            //     $scope.notifsDisplay[i] = $scope.notifs[i].content;
            //     $scope.isInvitation[i] = false;
            // }
            // else if ($scope.notifs[i].type === "invitation"){
            //     $scope.notifsDisplay[i] = "You were invited to join team "+ $scope.notifs[i].content.teamName + ' whose ID is '+ $scope.notifs[i].content.teamID;
            //     $scope.isInvitation[i] = true;
            // }
            if ($scope.notifs[i].type === "invitation"){
                $scope.notifsDisplay[i] = "You were invited to join team "+ $scope.notifs[i].content.teamName + ' whose ID is '+ $scope.notifs[i].content.teamID;
                $scope.isInvitation[i] = true;
            }
            else{
                $scope.notifsDisplay[i] = $scope.notifs[i].content;
                $scope.isInvitation[i] = false;
            }
        }
    }, true);



});

