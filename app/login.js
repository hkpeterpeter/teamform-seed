var app = angular.module("loginApp", ["firebase"]);

// and use it in our controller
app.controller("Signin", ["$scope", '$firebaseAuth', function($scope, $firebaseAuth) {
   
     
   var provider = new firebase.auth.FacebookAuthProvider();

   $scope.login = function() {

    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    });
     
     };
   
   
   
}]);
