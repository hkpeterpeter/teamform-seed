

angular.module('teamform-manage_team-app', ['firebase'])
.controller('ManageTeamCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	initalizeFirebase();
	var user = firebase.auth().currentUser;
	var teamleader = "BUG";
	//var teamleader = user.displayName;
	if(user)
	{
		console.log("Logged in as:", user.displayName);
		teamleader = user.displayName;
	}
	else{
		console.error("BUG");
	}
	
	$scope.teaminfo ={};


	var eventName, teamName;
	eventName = getURLParameter("q");
	teamName = getURLParameter("tn");

	var ref, refPath;
	$scope.EventName = eventName;
	$scope.TeamName = teamName;

	//Get The team info
	refPath = "/event/" + eventName + "/team/" + teamName; 
	ref = firebase.database().ref(refPath);
	$scope.teaminfo = $firebaseObject(ref);

	$scope.input = {description : $scope.teaminfo.description};
	
	ref.update({
		TeamLeader : teamleader,
		TeamName : teamName
	});

	$scope.teaminfo.$loaded()
		.then( function(data) {
			// Fill in some initial values when the DB entry doesn't exist			

			// Enable the UI when the data is successfully loaded and synchornized
			$('#manage_team_page_controller').show(); 

			$scope.teaminfo.TeamLeader = teamleader;
			$scope.teaminfo.TeamName = $scope.input.teamname;
			$scope.teaminfo.description = $scope.input.description;	
		}) 
		.catch(function(error) {
			// Database connection error handling...
			//console.error("Error:", error);
		});

	$scope.saveFunc = function() {
		$scope.teaminfo.$save();
		// Finally, go back to the front-end
		window.location.href= "team.html?q=" + eventName +"&tn=" + teamName;
	}
	
	}






 
]);