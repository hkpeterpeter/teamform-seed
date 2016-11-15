

angular.module('teamform-manage_team-app', ['firebase'])
.controller('ManageTeamCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	initalizeFirebase();
	var teamleader;

	firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        var userPath = "/user/" + user.uid;
        var userref = firebase.database().ref(userPath);


        userref.on("value", function(snapshot) {
  				console.log(snapshot.val());
  				teamleader = snapshot.val().name;
  				console.log(teamleader);
		}, function (errorObject) {
  			console.log("The read failed: " + errorObject.code);
		});

    } 
    else {}
    });


	
	$scope.teaminfo = {TeamLeader:"", Description:"" };
	$scope.input = {description: ""};

	var eventName, teamName;
	eventName = getURLParameter("q");
	teamName = getURLParameter("tn");

	var eventPath ="/event/" + eventName +"/param";
	var eventref = firebase.database().ref(eventPath);
	var current_team;

	eventref.once("value",function(snapshot)
	{
		console.log(snapshot.val());
		current_team = snapshot.val().No_of_Team;
		current_team = current_team +1;
		console.log(current_team);
		eventref.update(
		{
			'No_of_Team' : current_team
		}
					);

	}, function (errorObject) {
  			console.log("The read failed: " + errorObject.code);
	});






	var ref, refPath;
	$scope.EventName = eventName;
	$scope.TeamName = teamName;

	//Get The team info
	refPath = "/event/" + eventName + "/team/" + teamName; 
	ref = firebase.database().ref(refPath);
	$scope.teaminfo = $firebaseObject(ref);








	$scope.teaminfo.$loaded()
		.then( function(data) {
			// Fill in some initial values when the DB entry doesn't exist			

			// Enable the UI when the data is successfully loaded and synchornized
			$('#manage_team_page_controller').show(); 

			$scope.teaminfo.TeamLeader = teamleader;
			$scope.teaminfo.TeamName = teamName;
			$scope.teaminfo.Description = $scope.input.description;
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