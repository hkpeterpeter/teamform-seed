angular.module('teamform-index-app', ['firebase'])
.controller('IndexCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function ($scope, $firebaseObject, $firebaseArray) {

    // TODO: implementation of MemberCtrl


    // Call Firebase initialization code defined in site.js
    initalizeFirebase();

    $scope.eventID = "";



    $scope.btn_admin = function() {
        var val = $scope.eventID;
        if (val !== '') {
            var url = "admin.html?q=" + val;
            window.location.href = url;
            //return false;
        }
    }

    $scope.btn_leader = function() {
        var val = $scope.eventID;
        if (val !== '') {
            var url = "team.html?q=" + val;
            window.location.href = url;
            //return false;
        }
    }

    $scope.btn_member = function() {
        var val = $scope.eventID;
        if (val !== '') {
            var url = "member.html?q=" + val;
            window.location.href = url;
            //return false;
        }
    }

}]);