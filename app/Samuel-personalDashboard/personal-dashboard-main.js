/**
 * Created by Samuel on 2/11/2016.
 */

//var teamapp = angular.module("dashboard", ['firebase']);

teamapp.controller("dashboardController", function ($rootScope, $scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

    $scope.username = "Samuel He";

    $rootScope.currentUser = {};


    var userRef = firebase.database().ref('users/0');

    var obj = $firebaseObject(userRef);
    obj.$loaded().then(function () {
        console.log("loaded record:", obj.$id);
        angular.forEach(obj, function (value, key) {
            console.log(key, value);
        });

        obj.$bindTo($rootScope, "currentUser");
    });


    var skillsRef = firebase.database().ref('users/0/skills');

    $scope.skillsList = $firebaseArray(skillsRef);
    $scope.receiveNewSikll = function () {
        $scope.skillsList.$add($scope.newSkill);
        $scope.newSkill = '';
    };



    var eventsRef = firebase.database().ref('users/0/eventsManaging');
    $scope.eventsList = $firebaseArray(eventsRef);

    var applyingRef = firebase.database().ref('users/0/teamsApplying');
    $scope.applyingList = $firebaseArray(applyingRef);

    var leadingTeams = firebase.database().ref('users/0/teamsAsLeader');
    $scope.leadingList = $firebaseArray(leadingTeams);

    var memberTeams = firebase.database().ref('users/0/teamsAsMember');
    $scope.memberList = $firebaseArray(memberTeams);

    $scope.unread = {"read": false};

    var notifsRef = firebase.database().ref('users/0/notifs');
    $scope.notifs = $firebaseArray(notifsRef);

    $scope.notifsDisplay = [];
    $scope.isInvitation = [];
    $scope.$watch("notifs", function (newValue, oldValue) {
        for (var i = 0; i< $scope.notifs.length; i++){
            if ($scope.notifs[i].type === "normal"){
                $scope.notifsDisplay[i] = $scope.notifs[i].content;
                $scope.isInvitation[i] = false;
            }
            else if ($scope.notifs[i].type === "invitation"){
                $scope.notifsDisplay[i] = "You were invited to join team "+ $scope.notifs[i].content.teamName + ' whose ID is '+ $scope.notifs[i].content.teamID;
                $scope.isInvitation[i] = true;
            }
        }
    }, true);



});

