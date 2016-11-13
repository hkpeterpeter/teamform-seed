$(document).ready(function()
{
	// $('#team_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' )
	{
		$('#text_event_name').text("Event name: " + eventName);
	}
});

angular.module('teamform-team-app', ['firebase'])
.controller('TeamCtrl', ['$scope', '$firebaseObject', '$firebaseArray', "$firebaseAuth",
function($scope, $firebaseObject, $firebaseArray, $firebaseAuth)
{
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();
   //your code

	$scope.auth=$firebaseAuth();
	$scope.auth.$onAuthStateChanged(function(firebaseUser) {
		if (firebaseUser) {
			$scope.uid = firebaseUser.uid;
		} else {
			console.log("Signed out");
		}
	});



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
// >>>>>>> d594805f44704039d81c767a061af087b5ccd5f7
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
			// var userSex = obj.sex;
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

// >>>>>>> d594805f44704039d81c767a061af087b5ccd5f7
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
		var count = 0;

		//get 'profile' ref
        var userDataRef = firebase.database().ref("profile");
        //load gender using uid from profile
        userDataRef.once("value").then(function(snapshot)
        {
			for(var i = 0; i < $scope.param.teamMembers.length; i++)
			{
				if(snapshot.val().teamMembers[i].gender == 'F' || snapshot.val().teamMembers[i].gender == 'f')
				{
					count ++;
				}
			}
			for(var i = 0; i < $scope.param.teamLeaders.length; i++)
			{
				if(snapshot.val().teamLeaders[i].gender == 'F' || $scope.param.teamLeaders[i].gender == 'f')
				{
					count ++;
				}
			}
		});
		$scope.param.numPrettyGirls = count;
		$scope.saveFunc();
	}
	$scope.autoadd = function(){
		  var eventName = "/events/"+ getURLParameter("q") +"/member/";
		  console.log(eventName);
		  var ref = firebase.database().ref(eventName);
		  var event = $firebaseArray(ref);
		  console.log(event);

		  var teamPath ="/events/"+ getURLParameter("q") + "/team/";
		  var teams = firebase.database().ref(teamPath);
		  var team = $firebaseArray(teams);

		event.$loaded().then( function(data){
			outerloop:
		  for( var mem in event){
			  // console.log(mem);
			  if(mem != null && typeof mem != "undefined"){
					if ( typeof event[mem].selection != "undefined" && typeof event[mem].selection != "null"){
					  // console.log(typeof event[mem].selection,"id",event[mem]["$id"] );

					  for(var cteam in team){
						  // console.log(team[cteam]["$id"]);
						   if(typeof team[cteam]["$id"] != "undefined"){
							  //  console.log(typeof team[cteam].teamMembers);
								 if ( typeof team[cteam].teamMembers != "undefined" && typeof team[cteam].teamMembers != "null"){
									// console.log(team[cteam]["$id"]);
									if( team[cteam].teamMembers.length + team[cteam].teamLeaderSize < team[cteam].size){
										// console.log(team[cteam].teamMembers);
										event[mem].selection =[];
										firebase.database().ref("/events/"+getURLParameter("q") +"/member/" + event[mem]["$id"] ).child('selection').set(null);

										team[cteam].teamMembers.push(event[mem]["$id"]);
										firebase.database().ref("/events/"+getURLParameter("q") +"/team/" + team[cteam]["$id"] ).child('teamMembers').set(
										team[cteam].teamMembers);

										continue outerloop;
									}
								 }
								else{
									event[mem].selection =[];
									firebase.database().ref("/events/"+getURLParameter("q") +"/member/" + event[mem]["$id"] ).child('selection').set(null);
									team[cteam].teamMembers=[];
									team[cteam].teamMembers.push(event[mem]["$id"]);
									firebase.database().ref("/events/"+getURLParameter("q") +"/team/" + team[cteam]["$id"] ).child('teamMembers').set(
										team[cteam].teamMembers);

								}

							}
						}

					}
				}

			}
		})
	};

	$scope.advertise = function() {


		var adverID = $.trim( $scope.param.title );


		if ( adverID !== '' && $scope.param.advertisement !== "") {

			var newData = {
				'content': $scope.param.advertisement
			};

			var refPath = "/events/"+getURLParameter("q") + "/advertisement/" + adverID;
			var ref = firebase.database().ref(refPath);

			ref.set(newData, function(){
				// complete call back
				//alert("data pushed...");

				// Finally, go back to the front-end
				window.location.href= "index.html";
			});
		}
	}

	$scope.createteam = function(){
		console.log(
			$scope.member.map(function(e){return e.$id;}).indexOf($scope.uid)
		);
		console.log($scope.member);

		var refPath = "/events/"+getURLParameter("q") + "/member/"+ $scope.uid;
		var ref = firebase.database().ref(refPath);

		$scope.profile = getProfile($scope.uid);
		$scope.profile.$loaded().then(function(data){
			if($scope.member.map(function(e){return e.$id;}).indexOf($scope.uid) <= -1){
			var newData = {
				'name': $scope.profile["name"],
			};

			ref.set(newData, function(){});
			$scope.saveFunc();
			}
		});
	}

	var getProfile = function(uid){
	var path= "profile/"+uid;
	var ref = firebase.database().ref(path);
	var profile = $firebaseObject(ref);
	profile.$loaded()
		.catch(function(error) {
			$scope.error = error.message;
			console.error("Error:", error);
		});
	return profile;
	}

	}]);
