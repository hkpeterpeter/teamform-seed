$(document).ready(function(){

	$('#team_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' ) {
		$('#text_event_name').text("Event name: " + eventName);
		
	}

});

angular.module('teamform-team-app', ['firebase'])
.controller('TeamCtrl', ['$scope', '$firebaseObject', '$firebaseArray', 
    function($scope, $firebaseObject, $firebaseArray) {
		
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();
	

	var logged_in=getUID();
	

	var refPath = "";
	var eventName = getURLParameter("q");	
	
	// TODO: implementation of MemberCtrl	
	$scope.param = {
		"teamName" : '',
		"currentTeamSize" : 0,
		"teamMembers" : [],
		"teamLeader" : ''
	};
		
	

	refPath =  "events/" + eventName + "/admin";
	retrieveOnceFirebase(firebase, refPath, function(data) {	
			if (!checkLoginstate()){
		//window.alert("Please login");
		window.location.href= "redirect.html";
	}
		if ( data.child("param").val() != null ) {
			$scope.range = data.child("param").val();
			$scope.param.currentTeamSize = parseInt(($scope.range.minTeamSize + $scope.range.maxTeamSize)/2);
			//$scope.param.currentTeamSize = parseInt(($scope.range.minTeamSize + $scope.range.maxTeamSize)/2);
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
	$scope.refreshViewRequestsReceived = function() {
		
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

				var joined_teamsPath = "users/"	+ userID +"/joined_teams";
				var joined_teams_ref = firebase.database().ref(joined_teamsPath);
			
				joined_teams_ref.once("value").then(function(snapshot){
					//var teamName = teamID;
              		var hasTeam = snapshot.hasChild(teamID);
              		if (!hasTeam)
                		joined_teams_ref.child(teamID).set(getURLParameter("q"));
            	});
			}
		});
		
		$scope.$apply();
		
	}
	
	
	
	
	
	

	$scope.changeCurrentTeamSize = function(delta) {
		var newVal = $scope.param.currentTeamSize + delta;

		if (newVal >= $scope.range.minTeamSize && newVal <= $scope.range.maxTeamSize ) {
			$scope.param.currentTeamSize = newVal;
		} 

	}

	$scope.saveFunc = function() {
		
		
		var teamID = $.trim( $scope.param.teamName );
		
		if ( teamID !== '' ) {
			var current_uid=document.getElementById('uid').textContent;
			var newData = {				
				'size': $scope.param.currentTeamSize,
				'teamMembers': $scope.param.teamMembers,
				'teamLeader': current_uid
			};		
			
			var refPath = "events/" + getURLParameter("q") + "/team/" + teamID;	
			var ref = firebase.database().ref(refPath);
			var events_teamPath = "users/"	+ current_uid +"/events_teamLeader";
			var events_team_ref = firebase.database().ref(events_teamPath);
			
			events_team_ref.once("value").then(function(snapshot){
				//var teamName = teamID;
              	var hasTeam = snapshot.hasChild(teamID);
              	if (!hasTeam)
                	events_team_ref.child(teamID).set(getURLParameter("q"));
            });
			// for each team members, clear the selection in /[eventName]/team/
			
			$.each($scope.param.teamMembers, function(i,obj){
				
				
				//$scope.test += obj;
				var rec = $scope.member.$getRecord(obj);
				rec.selection = [];
				$scope.member.$save(rec);
				
				
				
			});
			

			
			ref.set(newData, function(){			

				// console.log("Success..");
				
				// Finally, go back to the front-end
				// window.location.href= "index.html";
			});
			
			
			
		}
		
		
	}
	
	$scope.loadFunc = function() {
		
		var teamID = $.trim( $scope.param.teamName );		
		var eventName = getURLParameter("q");
		var refPath = "events/" + eventName + "/team/" + teamID ;
		retrieveOnceFirebase(firebase, refPath, function(data) {	
			var current_uid=document.getElementById('uid').textContent;
			if (data.child("teamLeader").val() !=null){
				if(data.child("teamLeader").val()!= current_uid)
					window.alert("You don't have permission to edit this team!");
			}
			if ( data.child("size").val() != null ) {
				
				$scope.param.currentTeamSize = data.child("size").val();
				
				$scope.refreshViewRequestsReceived();
								
				
			} 
			
			if ( data.child("teamMembers").val() != null ) {
				
				$scope.param.teamMembers = data.child("teamMembers").val();
				
			}
			
			$scope.$apply(); // force to refresh
		});

	}
	
	$scope.changeFunc = function() {
		
		var teamID = $.trim( $scope.param.teamName );		
		if ( teamID !== '' ) {
			
			//var newData = {				
			//	'size': $scope.param.currentTeamSize,
			//	'teamMembers': $scope.param.teamMembers
			//};		
			
			var refPath = "events/" + getURLParameter("q") + "/team/" + teamID + "/size";	
			var ref = firebase.database().ref(refPath);
			
			
			
			if ($scope.param.teamMembers.length <= $scope.param.currentTeamSize)
				ref.set($scope.param.currentTeamSize);
			else{
				window.alert("Cannot set team size less than number of members!");
				var difference = $scope.param.teamMembers.length - $scope.param.currentTeamSize;
				$scope.changeCurrentTeamSize(difference);
			}
			
			
		}

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
	
	
	
	
	
	
		
}]);