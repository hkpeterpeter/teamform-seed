var teamformapp = angular.module('teamform-login-app', ['firebase']);
teamformapp.controller('LoginCtrl', ['$scope', '$firebaseObject', '$firebaseArray', "$firebaseAuth", function($scope, $firebaseObject, $firebaseArray,$firebaseAuth) {
         
    // Call Firebase initialization code defined in site.js
    initalizeFirebase();

    //Login Service
    $scope.loginwithgoogle = function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
     // The signed-in user info.
    var user = firebase.auth().currentUser;
    console.log("Logged in as:", user.displayName);

            var usersRef = firebase.database().ref('users');
            var usersArray = $firebaseArray(usersRef);

            var refPath = "user/" + user.uid;
            var ref = firebase.database().ref(refPath);
            ref.set({
                name: user.displayName,
                email: user.email

            }).then(function() {
                window.location.href= "index.html";
            });


     // ...
    }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
     var email = error.email;
     // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.error("Authentication failed:", error);
    // ...
    });

    //Logout
    $scope.logout = function(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("Sign-out successful");
    }, function(error) {
     // An error happened.
    console.log("Sign-out unsuccessful");
    });






};






 };

}]);