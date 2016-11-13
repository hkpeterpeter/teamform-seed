angular.module('teamform-index-app', ['firebase'])
.controller('IndexCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function ($scope, $firebaseObject, $firebaseArray) {

    // TODO: implementation of MemberCtrl


    // Call Firebase initialization code defined in site.js
    initalizeFirebase();
    $scope.eventID = "";
    $scope.currentUser = firebase.auth().currentUser;
    $scope.logined = $scope.currentUser !== null;
    $scope.btn_fb = function () {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            $scope.currentUser = result.user;
            $scope.logined = true;
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

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