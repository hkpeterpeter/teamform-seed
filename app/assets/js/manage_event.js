$(document).ready(function(){
	

	$('#text_event_name').text("Error: Invalid event name");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' ) {
		$('#text_event_name').text("Event name: " + eventName);
		
	}

});

angular.module('teamform-event-app', ['firebase'])
.controller('EventCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	// TODO: implementation of AdminCtrl
	
	// Initialize $scope.param as an empty JSON object
	$scope.param = {};
			
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();
	
	var refPath, ref, eventName;

	eventName = getURLParameter("q");
	refPath = "/event/" + eventName + "/param";	
	ref = firebase.database().ref(refPath);
	
	// Link and sync a firebase object
	
	firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var userPath = "/user/" + user.uid;
        var userref = firebase.database().ref(userPath);
        $scope.userObj = $firebaseObject(userref);
    } else {
    

    // No user is signed in.
    }
    });
	
	$scope.param = $firebaseObject(ref);

	$scope.param.$loaded()
		.then( function(data) {
			// Fill in some initial values when the DB entry doesn't exist			
			if(typeof $scope.param.TeamSize == "undefined"){				
				$scope.param.TeamSize = 3;
			}

			if(typeof $scope.param.MaxTeam == "undefined"){				
				$scope.param.MaxTeam = 5;
			}
			// Enable the UI when the data is successfully loaded and synchornized
			$('#event_page_controller').show(); 

			var user = firebase.auth().currentUser;
			$scope.param.EventAdmin = user.displayName;
			$scope.param.EventName = eventName;
			$scope.param.EventData = eventdate;
			$scope.param.No_of_Team = 0;		
		}) 
		.catch(function(error) {
			// Database connection error handling...
			//console.error("Error:", error);
		});
		
	
	refPath = "/event/"+ eventName + "/team";	
	$scope.team = [];
	$scope.team = $firebaseArray(firebase.database().ref(refPath));
	
	
	refPath = "/event/"+ eventName + "/team/member";
	$scope.member = [];
	$scope.member = $firebaseArray(firebase.database().ref(refPath));
	
	

	$scope.changeTeamSize = function(delta) {
		var newVal = delta;
		$scope.param.TeamSize = newVal;
		$scope.param.$save();
	}

	$scope.changeMaxTeams = function(delta) {

		var newVal = $scope.param.MaxTeam + delta;
		if (newVal < 10 && newVal > 0 ) {
			$scope.param.MaxTeam = newVal;
		} 
		$scope.param.$save();
	}


	$scope.saveFunc = function() {
		$scope.param.$save();
		
		// Finally, go back to the front-end
		window.location.href= "event.html?q=" +eventName;
	}
	
}]);