angular.module('teamform-signin-app', ['firebase'])
.controller('SigninCtrl', ['$scope', '$firebaseObject', '$firebaseArray', "$firebaseAuth",'$window',function($scope, $firebaseObject, $firebaseArray,$firebaseAuth,$window) {
         
    // Call Firebase initialization code defined in site.js
    initalizeFirebase();

$scope.SignIn = function(e) {
    e.preventDefault();
    var username = $scope.user.email;
    var password = $scope.user.password;
    firebase.auth().signInWithEmailAndPassword(username,password)
        .then(function(user) {
            //Success callback
            console.log('Authentication successful');
            $window.alert("You Login as " + user.email);
            window.location.href= "login_index.html";

        }, function(error) {
            //Failure callback
            console.log('Authentication failure');
        });
}
     
    // Auth Logic will be here
}]);
