angular.module('teamform-signin-app', ['firebase'])
.controller('SigninCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function ($scope, $firebaseObject, $firebaseArray) {

    // TODO: implementation of MemberCtrl


    // Call Firebase initialization code defined in site.js
    initalizeFirebase();
    $scope.btn_signin = function () {
        firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

        window.location.href = "index.html";
    }

}]);