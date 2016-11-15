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
      var email = $('#input_email').val();
      var password = $('#input_password').val();
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
      var email = $('#input_email').val();
      var password = $('#input_password').val();
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    });

    $("#btn_login_fb").click(function(){


      console.log("creating Facebook provider");
      var Facebookprovider = new firebase.auth.FacebookAuthProvider();
      console.log("Facebook Login start");
      firebase.auth().signInWithRedirect(Facebookprovider);
    });

});



angular.module('teamform-app', ['firebase'])
.controller('LoginCtrl', ['$scope', '$firebaseObject', '$firebaseArray','$firebaseAuth', function($scope, $firebaseObject, $firebaseArray, $firebaseAuth) {

  // Call Firebase initialization code defined in site.js
  initalizeFirebase();
  $scope.firebaseUser = null;
  $scope.message = null;
  $scope.error = null;
  $scope.uid = null;
  $scope.logedin =false;
  $scope.profile= null;
  $scope.auth = $firebaseAuth();

  $scope.loginValidation=function(){
    if($scope.username==null&&$scope.password==null){
      $scope.message = "Please fill in the email and password above";
      return false;
    }
    return true;
  }

  $scope.emailAccCreate=function(){
    if($scope.loginValidation()==false){
      return false;
    }
    $scope.auth.$createUserWithEmailAndPassword($scope.username, $scope.password)
    .then(function(firebaseUser) {
			$scope.firebaseUser=firebaseUser;
      $scope.message = "User created with uid: " + firebaseUser.uid;
    })
    .catch(function(error) {
      $scope.error = error;
    });
  };

  $scope.emailLogin=function(){
    if($scope.loginValidation()==false){
      return false;
    }
    // console.log("$scope.username,$scope.password",$scope.username,$scope.password);
    firebase.auth().signInWithEmailAndPassword($scope.username, $scope.password).catch(function(error){
      $scope.error = error.message;
      console.error("email Login failed(ng):", error);
    });
  };

  $scope.fbLogin=function(){
    $scope.auth.$signInWithPopup("facebook")
    // .then(function(result) {
    //   $scope.firebaseUser = firebaseUser;
    //   // console.log("FB Login successfully(ng)",user);
    // })
    .catch(function(error) {
      $scope.error = error.message;
      console.error("FB Login fail(ng)",error);
    });
  };

  $scope.signOut =function(){
    $scope.auth.$signOut();
  }

  $scope.auth.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.message = "Signed in as:"+ firebaseUser.uid;
      $scope.logedin =true;
      $scope.uid = firebaseUser.uid;
      $scope.profile = getProfile(firebaseUser.uid);
       console.log("Signed in as:", firebaseUser.uid);
    } else {
      $scope.logedin =false;
      $scope.message = "Signed out";
      console.log("Signed out");
    }
  });

  var getProfile = function(uid){
    var path= "profile/"+uid;
    var ref = firebase.database().ref(path);
    var profile = $firebaseObject(ref);
    profile.$loaded()
      .catch(function(error) {
        $scope.error = error.message;
        console.error("Error:", error);
      });
    return profile;
  }
  this.getProfile = getProfile;
}]);
