$(document).ready(function()
{
	$('#team_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' ) 
	{
		$('#text_event_name').text("Event name: " + eventName);
	}
});

angular.module('teamform-team-app', ['firebase'])
app.controller("MyAuthCtrl", ["$scope", "$firebaseAuth",
  function($scope, $firebaseAuth) 
  {
   //your code
 	$scope.auth=$firebaseAuth();
	$scope.auth.$onAuthStateChanged(function(firebaseUser) 
	{
 		if (firebaseUser) 
 		{
    		$scope.uid = firebaseUser.uid;
  		} 
  		else 
  		{
    		console.log("Signed out");
  		}
	});

		
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();

	var refPath = "";
	var eventName = getURLParameter("q");	
	
	$scope.param = 
	{
		"teamName" : '',
		"teamMembers" : [],
		"teamLeaders" : [],
		"currentTeamSize" : 0,
		"currentTeamLeaderSize": 0,
		"numPrettyGirls": 0,
		"wantedSkills":[],
		"wantedPersonalities":[],
		"wantedHoroscopes": []
	};
		

	refPath = "events/" + eventName + "/admin";
	retrieveOnceFirebase(firebase, refPath, function(data) 
	{	
		if ( data.child("param").val() != null ) 
		{
			$scope.range = data.child("param").val();
			$scope.param.currentTeamSize = parseInt(($scope.range.minTeamSize + $scope.range.maxTeamSize)/2);
			$scope.$apply(); // force to refresh
			$('#team_page_controller').show(); // show UI
		} 
	});
	
	
	refPath = "events/" + eventName + "/member";	
	$scope.member = [];
	$scope.member = $firebaseArray(firebase.database().ref(refPath));
	
	
	refPath = "events/" + eventName + "/team";	
	$scope.team = [];
	$scope.team = $firebaseArray(firebase.database().ref(refPath));
	
	
	$scope.requests = [];
	$scope.refreshViewRequestsReceived = function()
	{
		//$scope.test = "";		
		$scope.requests = [];
		var teamID = $.trim( $scope.param.teamName );	
				
		$.each($scope.member, function(i,obj) {			
			//$scope.test += i + " " + val;
			//$scope.test += obj.$id + " " ;
			
			var userID = obj.$id;
			if ( typeof obj.selection != "undefined"  && obj.selection.indexOf(teamID) > -1 ) {
				//$scope.test += userID + " " ;
				
				$scope.requests.push(userID);
			}
		});
		
		$scope.$apply();
	}
	
	
	// set team size
	$scope.changeCurrentTeamSize = function(delta) 
	{
		var newVal = $scope.param.currentTeamSize + delta;
		if (newVal >= $scope.range.minTeamSize && newVal <= $scope.range.maxTeamSize ) {
			$scope.param.currentTeamSize = newVal;
		} 
	}

	$scope.saveFunc = function() 
	{
		var teamID = $.trim( $scope.param.teamName );
		
		if ( teamID !== '' ) {
			
			var myUID;
			//get my user uid
			firebase.auth().onAuthStateChanged(function(user) {
			 	if (user) {
			 		myUID = user.uid;
   			 		// User is signed in. Get the UID.
  				} else {
  					  	console.log("Please log-in first.");
  					  	return;
    				// No user is signed in.
  				}
			});
			
			//the set of data to be updated
			var newData = {		
				'teamName': $scope.param.teamName,		
				'teamMembers': $scope.param.teamMembers,
				'teamLeaders': $scope.param.teamLeaders,
				'currentTeamSize': $scope.param.currentTeamSize,
				'currentTeamLeaderSize': $scope.param.currentTeamLeaderSize,
				'numPrettyGirls': $scope.param.numPrettyGirls,
				'wantedSkills': $scope.param.wantedSkills,
				'wantedPersonalities': $scope.param.wantedPersonalities,
				'wantedHoroscopes': $scope.param.wantedHoroscopes
			};		
			
			var refPath = "events/" + getURLParameter("q") + "/team/" + teamID;	
			var ref = firebase.database().ref(refPath);
			
			// for each team members, clear the selection in /[eventName]/team/
			
			$.each($scope.param.teamMembers, function(i,obj){
				//$scope.test += obj;
				var rec = $scope.member.$getRecord(obj);
				rec.selection = [];
				$scope.member.$save(rec);
				
			});
			
			//update data in Firebase
			ref.set(newData).then(function() {
   				console.log('Synchronization succeeded');
  			})			
			.catch(function(error) {
   				console.log('Synchronization failed');
 			});
				// console.log("Success..");
				
				// Finally, go back to the front-end
				// window.location.href= "index.html";
			//});	
		}
	}
	
	$scope.loadFunc = function() 
	{
		var teamID = $.trim( $scope.param.teamName );		
		var eventName = getURLParameter("q");
		var refPath = eventName + "/team/" + teamID ;
		retrieveOnceFirebase(firebase, refPath, function(data) 
		{	
			$scope.updateScope("teamMembers", teamMembers);
			$scope.updateScope("teamLeaders", teamLeaders);
			$scope.updateScope("currentTeamSize", currentTeamSize);
			$scope.updateScope("currentTeamLeaderSize", currentTeamLeaderSize);
			$scope.updateScope("numPrettyGirls", numPrettyGirls);
			$scope.updateScope("wantedSkills", wantedSkills);
			$scope.updateScope("wantedPersonalities", wantedPersonalities);
			$scope.updateScope("wantedHoroscopes", wantedHoroscopes);
			
			$scope.refreshViewRequestsReceived();

			$scope.$apply(); // force to refresh
		});

	}
	
	$scope.updateScope = function(entryString, parameter)
	{
			if ( data.child(entryString).val() != null ) {
				$scope.param.parameter = data.child(entryString).val();
			}
	}
	
	$scope.processRequest = function(r) 
	{
		//$scope.test = "processRequest: " + r;
		if( $scope.param.teamMembers.indexOf(r) < 0 && 
			$scope.param.teamMembers.length < $scope.param.currentTeamSize  ) 
		{	
			// Not exists, and the current number of team member is less than the preferred team size
			$scope.param.teamMembers.push(r);
			
			$scope.saveFunc();
		}
	}
	
	$scope.removeMember = function(member) 
	{
		var index = $scope.param.teamMembers.indexOf(member);
		if ( index > -1 ) 
		{
			$scope.param.teamMembers.splice(index, 1); // remove that item
			$scope.param.currentTeamSize --;
			$scope.saveFunc();
		}
	}
	
	$scope.changeLeader = function(leaderToBeSwapped = null, memberToBeSwapped = null) 
	{
		var indexLeader = $scope.param.teamLeaders.indexOf(leaderToBeSwapped);
		var indexMember = $scope.param.teamMembers.indexOf(memberToBeSwapped);

		if ( indexLeader > -1 && indexMember > -1) {
			$scope.param.teamLeaders.splice(indexLeader, 1);
			$scope.param.teamMembers.splice(indexMember, 1);
			$scope.param.teamLeaders.push(memberToBeSwapped);
			$scope.param.teamMembers.push(leaderToBeSwapped);
			
			$scope.saveFunc();
		}
	}

	$scope.addLeader = function(member = null) 
	{
		var indexMember = $scope.param.teamMembers.indexOf(member);
		if ( indexMember > -1 )
		{
			$scope.param.teamMembers.splice(indexMember, 1);
			$scope.param.teamLeaders.push(member);
			$scope.param.currentTeamLeaderSize++;
			
			$scope.saveFunc();
		}
	}
	
	$scope.removeLeader = function(leader = null) 
	{
		var indexLeader = $scope.param.teamLeaders.indexOf(leader);
		if ( indexLeader > -1 )
		{
			$scope.param.teamLeaders.splice(indexLeader, 1);
			$scope.param.teamMembers.push(leader);
			$scope.param.currentTeamLeaderSize--;
			
			$scope.saveFunc();
		}
	}
	
	$scope.addWantedSkill = function(skillString = null) 
	{
			$scope.addString(skillString, $scope.param.wantedSkills);
	}
	
	$scope.addWantedPersonalities = function(personalityString = null) 
	{
			$scope.addString(personalityString, $scope.param.wantedPersonalities);
	}
	
	$scope.addWantedHoroscopes = function(horoscopeString = null) 
	{
			$scope.addString(horoscopeString, $scope.param.wantedHoroscopes);
	}
	
	$scope.addString = function(stringToBeAdded, parameter)
	{
		var indexString = parameter.indexOf(stringToBeAdded);
		if (indexString < 0)
		{
			parameter.push(stringToBeAdded);
			$scope.saveFunc();
		}
	}
	
	$scope.removeWantedSkill = function(skillString = null) 
	{
			$scope.removeString(skillString, $scope.param.wantedSkills);
	}
	
	$scope.removeWantedPersonalities = function(personalityString = null) 
	{
			$scope.removeString(personalityString, $scope.param.wantedPersonalities);
	}
	
	$scope.removeWantedHoroscopes = function(horoscopeString = null) 
	{
			$scope.removeString(horoscopeString, $scope.param.wantedHoroscopes);
	}
	
	$scope.removeString = function(stringToBeRemoved, parameter)
	{
		var indexString = parameter.indexOf(stringToBeRemoved);
		if (indexString > -1)
		{
			parameter.splice(indexString, 1);
			$scope.saveFunc();
		}
	} 
	
	$scope.calculateNumPrettyGirls = function()
	{
		int count = 0;
		for(int i = 0; i < $scope.param.teamMembers.length; i++)
		{
			if($scope.param.teamMembers[i].gender == 'F' || $scope.param.teamMembers[i].gender == 'f')
			{
				count ++; 
			}
		}
		for(int i = 0; i < $scope.param.teamLeaders.length; i++)
		{
			if($scope.param.teamLeaders[i].gender == 'F' || $scope.param.teamLeaders[i].gender == 'f')
			{
				count ++; 
			}
		}
		$scope.param.numPrettyGirls = count;
		$scope.saveFunc();
	} 
	
	}]);
 }
]);