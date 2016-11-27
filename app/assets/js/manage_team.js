

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


	
	$scope.teaminfo = {TeamLeader:"", Description:"", Forward:"", Midfield:"", LeftBack:"", RightBack:"", Goalkeeper:""};
	$scope.input = {forward:"", midfield:"", leftBack:"", rightBack:"", goalkeeper:""};

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

	ref.set({
		TeamName: teamName,
		//TeamLeader : teamleader,
		Description : "",
		Forward : "",
		Midfield :"",
		LeftBack : "",
		RightBack :"",
		Goalkeeper :""
	});

	










	$scope.teaminfo.$loaded()
		.then( function(data) {
			// Fill in some initial values when the DB entry doesn't exist			
			// Enable the UI when the data is successfully loaded and synchornized
			//$('#manage_team_page_controller').show(); 
			$scope.teaminfo.Description = $scope.input.description;
			$scope.teaminfo.Forward = $scope.input.forward;
			$scope.teaminfo.Midfield = $scope.input.midfield;
			$scope.teaminfo.LeftBack = $scope.input.leftBack;
			$scope.teaminfo.RightBack = $scope.input.rightBack;
			$scope.teaminfo.Goalkeeper = $scope.input.goalkeeper;
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
	
	$scope.processRequest = function(r) {
		//$scope.test = "processRequest: " + r;
		
		if ( 
		    $scope.param.teamMembers.indexOf(r) < 0 && 
			$scope.param.teamMembers.length < $scope.param.currentTeamSize  ) {
				
			// Not exists, and the current number of team member is less than the preferred team size
			$scope.param.teamMembers.push(r);
			
			$scope.saveFunc();
		}
	}
	
	$scope.removeMember = function(member) {
		
		var index = $scope.param.teamMembers.indexOf(member);
		if ( index > -1 ) {
			$scope.param.teamMembers.splice(index, 1); // remove that item
			
			$scope.saveFunc();
		}
		
	}







	}
]);