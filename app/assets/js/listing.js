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


angular.module('teamform-listing-app', ['firebase'])
.controller('ListingCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
    
    initalizeFirebase();

    var listing = getURLParameter("q");




    $scope.viewevent = function(eventname) {
        // Finally, go back to the front-end
        window.location.href= "event.html?q=" + eventname;

    }



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