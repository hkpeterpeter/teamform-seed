$(document).ready(function(){

    $("#btn_event").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "manage_event.html?q=" + val;
			var event_name = $('#input_text').val();
    		window.location.href = url ;
    		return false;
    	}
    });

});

angular.module('teamform-create_event-app', ['firebase'])
.controller('CreateEventCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	initalizeFirebase();

	var eventRef, refPath;

	refPath = "/event/"
	eventRef = firebase.database().ref(refPath);
	$scope.events = [];
	$scope.events = $firebaseArray(eventRef);


	$scope.modifyevent = function(eventname) {
		// Finally, go back to the front-end
		window.location.href= "manage_event.html?q=" + eventname;
	}
	// TODO: implementation of AdminCtrl
	
	var refPath, ref, eventName;

	eventName = getURLParameter("q");
	refPath = "/event/" + eventName + "/param";	
	ref = firebase.database().ref(refPath);
	
	// Link and sync a firebase object
	
	$scope.param = $firebaseObject(ref);
	
	refPath = "/event/"+ eventName + "/team";	
	$scope.team = [];
	$scope.team = $firebaseArray(firebase.database().ref(refPath));
	
	
	refPath = "/event/"+ eventName + "/team/member";
	$scope.member = [];
	$scope.member = $firebaseArray(firebase.database().ref(refPath));

 
}]);