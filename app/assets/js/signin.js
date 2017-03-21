angular.module('teamform-signin-app', ['firebase'])
.controller('SigninCtrl', ['$scope', '$firebaseObject', '$firebaseArray', "$firebaseAuth",'$window',function($scope, $firebaseObject, $firebaseArray,$firebaseAuth,$window) {
         
    // Call Firebase initialization code defined in site.js
    initalizeFirebase();

$scope.SignIn = function(e) {
    e.preventDefault();
    var email = $scope.user.email;
    var password = $scope.user.password;
    var username;

    firebase.auth().signInWithEmailAndPassword(email,password)
        .then(function(user) {
            //Success callback
            console.log('Authentication successful');
            $window.alert("You Logined");

            window.location.href= "index.html";

        }, function(error) {
            //Failure callback
            console.log('Authentication failure');
        });
}
     
    // Auth Logic will be here
}]);
