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



	$scope.param.$loaded()
		.then( function(data) {
			// Fill in some initial values when the DB entry doesn't exist			
			if(typeof $scope.param.TeamSize == "undefined"){				
				$scope.param.TeamSize = 3;
			}

			if(typeof $scope.param.MaxTeam == "undefined"){				
				$scope.param.MaxTeam = 12;
			}
			// Enable the UI when the data is successfully loaded and synchornized
			$('#event_page_controller').show(); 

			var user = firebase.auth().currentUser;
			$scope.param.EventAdmin = user.displayName;
			$scope.param.EventName = eventName;
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
		window.location.href= "index.html";
	}
 
}]);