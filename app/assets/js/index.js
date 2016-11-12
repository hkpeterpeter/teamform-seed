$(document).ready(function(){

    $("#btn_admin").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "admin.html?q=" + val;
			var event_name = $('#input_text').val();
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


});


angular.module('teamform-index-app', ['firebase'])
.controller('IndexCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
    
    initalizeFirebase();

    var eventRef, refPath;

    refPath = "/event/"
    eventRef = firebase.database().ref(refPath);
    $scope.events = [];
    $scope.events = $firebaseArray(eventRef);


    $scope.viewevent = function(eventname) {
        // Finally, go back to the front-end
        window.location.href= "event.html?q=" + eventname;

    }

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