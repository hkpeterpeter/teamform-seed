$(document).ready(function(){
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // ...
      console.log("Facebook Login successfully");
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
      console.log("Facebook Login failed");
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);
  });

    $("#btn_admin").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "admin.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });

    $("#btn_leader").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "team.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });

    $("#btn_member").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "member.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });

    $("#btn_create_email_acc").click(function(){
      var email = "vivtony00@yahoo.com.hk";
      var password = "abcd1234";
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log("email_acc create failed");
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
    });
    $("#btn_login_out").click(function(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Sign-out successful.");
      }, function(error) {
        // An error happened.
        console.log("Sign-out failed");
        console.log(error.code);
        console.log(erroe.message);
      });
    });
    $("#btn_login_email").click(function(){
      var email = "vivtony00@yahoo.com.hk";
      var password = "abcd1234";
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("User is signed in");
        } else {
          // No user is signed in.
          console.log("No User is signed in");
        }
      });
    });

    $("#btn_login_fb").click(function(){


      console.log("creating Facebook provider");
      var Facebookprovider = new firebase.auth.FacebookAuthProvider();
      console.log("Facebook Login start");
      firebase.auth().signInWithRedirect(Facebookprovider);
    });

});

angular.module('teamform-login-app', ['firebase'])
.controller('LoginCtrl', ['$scope', '$firebaseObject', '$firebaseArray','$firebaseAuth', function($scope, $firebaseObject, $firebaseArray, $firebaseAuth) {
  // Call Firebase initialization code defined in site.js
  initalizeFirebase();
  $scope.firebaseUser = null;
  $scope.message = null;
  $scope.error = null;

  $scope.auth = $firebaseAuth();

  $scope.loginValidation=function(){
    if($scope.loginUser==null&&$scope.loginPW==null){
      $scope.message = "Please fill in the email and password above";
      return false;
    }
    return true;
  }

  $scope.emailAccCreate=function(){
    if($scope.loginValidation()==false){
      return false;
    }
    $scope.auth.$createUserWithEmailAndPassword($scope.loginUser, $scope.loginPW)
    .then(function(firebaseUser) {
      $scope.message = "User created with uid: " + firebaseUser.uid;
    }).catch(function(error) {
      $scope.error = error;
    });
  };

  $scope.emailLogin=function(){
    // console.log("$scope.loginUser,$scope.loginPW",$scope.loginUser,$scope.loginPW);
    $scope.auth.$signInWithEmailAndPassword($scope.loginUser, $scope.loginPW)
    .then(function(firebaseUser) {
      $scope.firebaseUser=firebaseUser;
      // console.log("Signed in as:", $scope.firebaseUser.uid);
    }).catch(function(error) {
      $scope.error = error;
      console.error("email Login failed(ng):", error);
    });
  };

  $scope.fbLogin=function(){
    $scope.auth.$signInWithPopup("facebook")
    .then(function(result) {
      $scope.firebaseUser = firebaseUser;
      // console.log("FB Login successfully(ng)",user);
    }).catch(function(error) {
      $scope.error = error;
      console.error("FB Login fail(ng)",error);
    });
  };

  $scope.signOut =function(){
    $scope.auth.$signOut();
  }

  $scope.auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.message = "Signed in as:"+ firebaseUser.uid;
      console.log("Signed in as:", firebaseUser.uid);
    } else {
      $scope.message = null;
      console.log("Signed out");
    }
  });

}]);
