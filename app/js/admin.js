$(document).ready(function(){
	
	$('#admin_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' ) {
		$('#text_event_name').text("Event name: " + eventName);
	}

});

function reload() {
	location.reload();
}

angular.module('teamform-admin-app', ['firebase'])
.directive('login', function() {
    return {
        restrict: 'A',
        templateUrl: 'login.html'
    };
})
.controller('AdminCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	// TODO: implementation of AdminCtrl
	
	// Initialize $scope.param as an empty JSON object
	$scope.param = {};
	$scope.event = "";
	$scope.joinedEvent = [];
	
	var refPath, ref, eventName;

	eventName = getURLParameter("q");
	refPath = eventName + "/admin/param";
	ref = firebase.database().ref(refPath);

	firebase.auth().onAuthStateChanged(function(firebaseUser) {
		if(firebaseUser) {
			var user = firebase.auth().currentUser;
			$scope.uid = user.uid;
			$scope.userInfo = $firebaseObject(firebase.database().ref().child("user").child($scope.uid));
			$scope.userInfo.$loaded().then(function() {
				if(typeof $scope.userInfo.joinedEvent != "undefined") {
					$scope.joinedEvent = $scope.userInfo.joinedEvent;
					if($scope.joinedEvent.indexOf(eventName) == -1) {
						$scope.joinedEvent.push(eventName);
					}
				}
				else {
					$scope.joinedEvent = [];
					$scope.joinedEvent.push(eventName);
				}
				firebase.database().ref().child("user").child($scope.uid).update({joinedEvent: $scope.joinedEvent});
			});
		}
	});
		
	// Link and sync a firebase object	
	$scope.param = $firebaseObject(ref);
	$scope.paramTest = "";
	$scope.paramLoadedCallback = function() {
		var user = firebase.auth().currentUser;
		if(typeof $scope.param.maxTeamSize == "undefined") {
			$scope.param.maxTeamSize = 10;
			$scope.paramTest = "maxUndefined";
		}
		if(typeof $scope.param.minTeamSize == "undefined") {
			$scope.param.minTeamSize = 1;
			$scope.paramTest += " minUndefined";
		}
		if(typeof $scope.param.eventAdmin == "undefined") {
			$scope.paramTest += " noAdmin";			
			if(user && eventName != null) {
				$scope.param.eventAdmin = user.uid;
				$scope.param.$save();
				alert("Created new event " + eventName);
				firebase.database().ref("eventList/" + eventName).set({ status: "active" });
			}
			else {	// invalid event name or not logged in
				$("#admin_page_controller button").hide();	
			}
		} else if($scope.param.eventAdmin !== firebase.auth().currentUser.uid) {
			$("#admin_page_controller button").hide();
		}
		$('#admin_page_controller').show();
		var addMemberEntryRef = firebase.database().ref().child(eventName).child("member").child(user.uid);
		var addMemberEntry = $firebaseObject(addMemberEntryRef);
		addMemberEntry.$loaded().then(function() {
			if(typeof addMemberEntry.weight === "undefined") {
				addMemberEntryRef.set({weight: 0});
			}
		});
	};

	$scope.param.$loaded().then($scope.paramLoadedCallback);
	
	refPath = eventName + "/team";
	$scope.team = [];
	$scope.team = $firebaseArray(firebase.database().ref(refPath));

	refPath = eventName + "/member";
	$scope.member = [];
	$scope.member = $firebaseArray(firebase.database().ref(refPath));
	
	$scope.users = [];
	
	$scope.member.$loaded(function(data) {
		angular.forEach(data, function(mem) {
			$scope.users.push($firebaseObject(getUserWithId(mem.$id)));
		});
	});

	
	$scope.expanded = false;
	$scope.setExpanded = function() {
		$scope.expanded = !$scope.expanded;
	};
	
	$scope.getTeamMember = function(teamMembers) {
		return getTeamMembersName(teamMembers, $scope.users);
	};
	
	$scope.terminateEvent = function() {
		alert("Closed event " + eventName);
		firebase.database().ref(eventName).remove();
		firebase.database().ref("eventList/" + eventName).update({
			status: "inactive"
		}, function() {
			window.location.href = "index.html";
		});
	};
	
	$scope.hasTeam = function(member) {
		return typeof member.inTeam !== 'undefined';
	};
	
	$scope.getMemberName = function(uid) {
		return getUserName(uid, $scope.users);
	};

	$scope.changeMinTeamSize = function(delta) {
		var newVal = $scope.param.minTeamSize + delta;
		if (newVal >=1 && newVal <= $scope.param.maxTeamSize ) {
			$scope.param.minTeamSize = newVal;
		}
		$scope.param.$save();
	};

	$scope.changeMaxTeamSize = function(delta) {
		var newVal = $scope.param.maxTeamSize + delta;
		if (newVal >=1 && newVal >= $scope.param.minTeamSize ) {
			$scope.param.maxTeamSize = newVal;
		}
		$scope.param.$save();
	};

	$scope.saveFunc = function() {
		$scope.param.$save();
		// Finally, go back to the front-end
		window.location.href= "index.html";
	};
	
	$scope.getMemberWeight = function(id) {
		for(var idx = 0; idx < $scope.member.length; idx++) {
			if($scope.member[idx].$id == id) return $scope.member[idx].weight;
		}
		return 0;
	}
	
	$scope.getTotalWeight = function(teamMembers) {
		var sum = 0;
		for(var idx = 0; idx < teamMembers.length; idx++) {
			sum += $scope.getMemberWeight(teamMembers[idx]);
		}
		return sum;
	}
	
	$scope.willEnableSmartAssignment = function() {
		if($scope.member.length == 1) return false; // only the admin itself
		
		var nbMemHasTeam = 0;
		for(var idx = 0; idx < $scope.member.length; idx++) {
			nbMemHasTeam += typeof $scope.member[idx].inTeam == 'undefined'? 0: 1;
		}
		return nbMemHasTeam != $scope.member.length;
	}
	
	$scope.smartAssignment = function() {
		if($scope.member.length < 1) return;

		// extract members who has no team
		var members = [];
		for(var idx = 0; idx < $scope.member.length; idx++) {
			if(!$scope.member[idx].inTeam) {
				members.push($scope.member[idx]);
			}
		}
		if(members.length < 1) return; // all members have a team
		
		// sort all members with descending weight 
		members.sort(function(a, b) {
			if(a.weight > b.weight) return -1;
			if(a.weight < b.weight) return 1;
			return 0;
		});

		// calculate weighted sum of each non-full group
		var teamWeight = [];
		var teams = [];
		for(var idx = 0; idx < $scope.team.length; idx++) {
			var team = $scope.team[idx];
			if(team.size == team.teamMembers.length) continue; // already full
			
			var sum = 0;
			for(var tmIdx = 0; tmIdx < team.teamMembers.length; tmIdx++) {
				for(var memIdx = 0; memIdx < $scope.member.length; memIdx++) {
					if(team.teamMembers[tmIdx] == $scope.member[memIdx].$id) {
						sum += $scope.member[memIdx].weight;
						break;
					}
				}
			}
			teamWeight.push(sum);
			teams.push(team);
		}
		
		// calculate # of new team needed
		var nbAvailable = 0;
		for(var idx = 0; idx < $scope.team.length; idx++) {
			nbAvailable += $scope.team[idx].size - $scope.team[idx].teamMembers.length;
		}
		
		var nbNewTeam = Math.ceil((members.length - nbAvailable) / $scope.param.maxTeamSize);
		for(var i = 0; i < nbNewTeam; i++) {
			var newTeam = {size: $scope.param.maxTeamSize, teamMembers: []};
			teams.push(newTeam);
			teamWeight.push(0);
		}
		
		var teamChanged = [];
		while(teams.length > 0 && members.length > 0) {
			console.log("Inside");
			// get the team with minimum weighted sum
			var teamIdx = 0;
			var minWeight = teamWeight[teamIdx];
			var nbMemberOfTeam = teams[teamIdx].teamMembers.length;
			var member = members[0];
			for(var idx = 0; idx < teamWeight.length; idx++) {
				if(teamWeight[idx] < minWeight) {
					minWeight = teamWeight[idx];
					teamIdx = idx;
				} else if(teamWeight[idx] == minWeight 
						&& teams[idx].teamMembers.length < nbMemberOfTeam) {
					teamIdx = idx;
				}
			}

			var team = teams[teamIdx];
			var isNewTeam = typeof team.$id == 'undefined';
			if(typeof team.$id == 'undefined') { // picking an new team
				team.$id = member.$id + "_team";
			}
			
			// add the current member to the team
			team.teamMembers.push(member.$id);
			member.inTeam = team.$id;
			teamWeight[teamIdx] += member.weight;
			
			if(team.size == team.teamMembers.length) { // already full
				teams.splice(teamIdx, 1); // remove the team from list
				teamWeight.splice(teamIdx, 1);
			}
			members.splice(0, 1); // remove the current member from list
			

			
			var teamPath = getURLParameter("q") + "/team/" + team.$id;
			var teamRef = firebase.database().ref(teamPath);
			var memPath = getURLParameter("q") + "/member/" + member.$id;
			var memRef = firebase.database().ref(memPath);

			memRef.update({inTeam: member.inTeam, invitedBy: []});

			if(teamChanged.indexOf(team) == -1) teamChanged.push(team);
			
		}
		for(var idx = 0; idx < teamChanged.length; idx++) {
			var team = teamChanged[idx];
			var teamPath = getURLParameter("q") + "/team/" + team.$id;
			var teamRef = firebase.database().ref(teamPath);

			console.log(team);
			memRef.update({inTeam: member.inTeam, invitedBy: []});
			teamRef.update({size: team.size, teamMembers: team.teamMembers});
		}
		//$scope.team.$save();
	};
	
}]);