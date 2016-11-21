angular.module('teamform-signin-app', ['firebase'])
.controller('SigninCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function ($scope, $firebaseObject, $firebaseArray) {

    // TODO: implementation of MemberCtrl


    // Call Firebase initialization code defined in site.js
    initializeFirebase();
    $scope.btn_signin = function () {
        firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).then(function () { window.location.href = "index.html"; }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);

        });

        
    }

}]);