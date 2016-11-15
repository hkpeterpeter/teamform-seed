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
.controller('IndexCtrl', ['$scope', '$firebaseObject', '$firebaseArray','$window', function($scope, $firebaseObject, $firebaseArray,$window) {
    
    initalizeFirebase();

    var eventRef, refPath;

    refPath = "/event/"
    eventRef = firebase.database().ref(refPath);
    $scope.events = [];
    $scope.events = $firebaseArray(eventRef);

    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var userPath = "/user/" + user.uid;
        var userref = firebase.database().ref(userPath);
        $scope.userObj = $firebaseObject(userref);
    } else {
    

    // No user is signed in.
    }
    });


    $scope.viewevent = function(eventname) {
        // Finally, go back to the front-end
        window.location.href= "event.html?q=" + eventname;

    }


    //Logout
    $scope.logout = function(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("Sign-out successful");
    $window.alert("You are signed-out");
    }, function(error) {
     // An error happened.
    console.log("Sign-out unsuccessful");
    });
};

}]);