$(document).ready(function(){
	
	$('#admin_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' ) {
		$('#text_event_name').text("Event name: " + eventName);
	}

});

angular.module('teamform-admin-app', ['firebase'])
.controller('AdminCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	// TODO: implementation of AdminCtrl
	
	// Initialize $scope.param as an empty JSON object
	$scope.param = {};
	
	var refPath, ref, eventName;

	eventName = getURLParameter("q");
	refPath = eventName + "/admin/param";
	ref = firebase.database().ref(refPath);
		
	// Link and sync a firebase object	
	$scope.param = $firebaseObject(ref);
	$scope.param.$loaded().then(function(data) {
		if(typeof $scope.param.maxTeamSize == "undefined"){
			$scope.param.maxTeamSize = 10;
		}
		if(typeof $scope.param.minTeamSize == "undefined"){
			$scope.param.minTeamSize = 1;
		}
		$('#admin_page_controller').show();
	});
	
	refPath = eventName + "/team";
	$scope.team = [];
	$scope.team = $firebaseArray(firebase.database().ref(refPath));

	refPath = eventName + "/member";
	$scope.member = [];
	$scope.member = $firebaseArray(firebase.database().ref(refPath));

	$scope.retrieveNamesFromJSON = function(jsonObj) {
		var result = [];
		angular.forEach(jsonObj, function(member) {
			$.each($scope.member, function(i, obj) {
				if(member == obj.$id) {
					result.push(obj.name);
				}
			});
		});
		return result;
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
			if(a.weight < b.weight) return -1;
			if(a.weight > b.weight) return 1;
			return 0;
		});
		
		// calculate weighted sum of each non-full group
		var teamWeight = [];
		var teams = [];
		for(var idx = 0; idx < $scope.team.length; idx++) {
			var team = $scope.team[idx];
			if(team.size == team.teamMembers.length) continue; // already full
			
			var sum = 0;
			for(var memIdx = 0; memIdx < team.teamMembers.length; memIdx++) {
				sum += team.teamMembers[memIdx].weight;
			}
			teamWeight.push(sum);
			teams.push(team);
		}
		
		while(teams.length > 0 && members.length > 0) {
			// get the team with minimum weighted sum
			var teamIdx = 0;
			var minWeight = teamWeight[teamIdx];
			var member = members[0];
			for(var idx = 0; idx < teamWeight.length; idx++) {
				if(teamWeight[idx] < minWeight) {
					minWeight = teamWeight[idx];
					teamIdx = idx;
				}
			}
			
			// add the current member to the team
			var team = teams[teamIdx];
			team.teamMembers.push({id: member.id,
				weight: member.weight});
			teamWeight[teamIdx] += member.weight;
			
			if(team.size == team.teamMembers.length) { // already full
				teams.splice(teamIdx, 1); // remove the team from list
				teamWeight.splice(teamIdx, 1);
			}
			members.splice(0, 1); // remove the current member from list
		}
		
		while(members.length > 0) {
			// create new team(s) and assign remaining members to the team
			var team = {size: $scope.param.maxTeamSize, teamMembers:[]};
			for(var idx = 0; idx < $scope.param.maxTeamSize && members.length > 0; idx++) {
				team.teamMembers.push(members[0]);
				members.splice(0, 1);
			}
			$scope.team.push(team);
		}
		$scope.param.$save(); //TODO is it necessary?
	};
	
}]);