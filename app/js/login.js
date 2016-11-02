
//create new module
var app = angular.module("app", []);

app.controller("AuthCtrl", ['$scope',
  function ($scope) {
    //creates provider object
    var provider = new firebase.auth.FacebookAuthProvider();
    //log in user
    $scope.login = function () {
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...some useful variables
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        //for testing
        alert(uid);

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


    };

//log out user
    $scope.logout = function () {
      firebase.auth().signOut();
      alert("you logged out");
    };

  }]);