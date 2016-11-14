teamapp.filter('adminRequest', function ($rootScope, $firebaseObject) {
		return function(items) {
			var event = '0';
			
			var filtered = [];
			for (var key in items) {
				if (items[key].eventID.toString() == event) {
					filtered.push(items[key]);
				};
			};
			return filtered;
	};
});
teamapp.controller('admin_ctrl', function($scope, $rootScope, $firebaseObject, $firebaseArray, filterFilter) {
	$rootScope.user_ref=firebase.database().ref("users");
	$rootScope.event_ref=firebase.database().ref("events");
	$rootScope.team_ref=firebase.database().ref("teams");

	$scope.adminUserRequest = true;
  $scope.adminUserNotRequest = true;
  $scope.adminTeamFull = true;
  $scope.adminTeamNotFull = true;

  $rootScope.admintesting = '0';
  $scope.event = $firebaseObject($rootScope.event_ref.child('0'));

  $scope.event.$loaded().then(function(){
  	
  	//$rootScope.eventTeams = event.allTeams;
  	$scope.minSize = $scope.event.minSize;
  	$scope.maxSize = $scope.event.maxSize;
  	$scope.size = $scope.maxSize - $scope.minSize + 1;
  	var admin = $firebaseObject($rootScope.user_ref.child($scope.event.adminID));
  	admin.$loaded().then(function(){
  		$scope.eventInfo = {
  			name: $scope.event.eventName,
  			admin: admin.name
  		};
  	});
  

		$scope.teams = $firebaseArray($rootScope.team_ref.orderByChild("belongstoEvent").equalTo($scope.event.$id.toString()));

		$scope.users = [];
		//console.log(event.waitingUsers);
		for (var key in $scope.event.waitingUsers) {
			$scope.users.push($firebaseObject($rootScope.user_ref.child($scope.event.waitingUsers[key])));
		};

	//event loaded ends
	});

	
	// Functions - TEAM
	// Get number of team members
	$scope.getLength = function(team) {
		if (team.membersID != null)
			return Object.keys(team.membersID).length + 1;
		else
			return 1;
	}

	// Delete a team
	$scope.remove = function(team) { 
  		var index = $scope.teams.indexOf(team);
  		$scope.teams.splice(index, 1); 
  		$rootScope.team_ref.child(team.$id.toString()).remove();    
	};

	$scope.adminMergeTeam = function(team) {
		var teamName = team.adminMerge;
		var mergedTeam;
		for (var key in $scope.teams) {
			if ($scope.teams[key].teamName == teamName) {
				mergedTeam = $scope.teams[key];
			};
		};

		if (mergedTeam == null || teamName == null) {
			console.log("No Such Team");
			return;
		};

		var mergedTeamSize = $scope.getLength(mergedTeam);
		var curTeamSize = $scope.getLength(team);
		if (mergedTeamSize + curTeamSize > $scope.maxSize) {
			console.log("exceed team member limit");
			return;
		};
		
		var newMembers = $firebaseArray($rootScope.team_ref.child(mergedTeam.$id.toString()).child("membersID"));
		newMembers.$add(team.leaderID);
		for (var key in team.membersID) {
			newMembers.$add(team.membersID[key]);
		};

		var newInvites = $firebaseArray($rootScope.team_ref.child(mergedTeam.$id.toString()).child("invitedPeople"));
		for (var key in team.invitedPeople) {
			newInvites.$add(team.invitedPeople[key]);
		};

		$scope.remove(team);
	
	};


// Functions - USER
	$scope.adminAddUserToTeam = function(key, request, user) {
		var curTeamSize = $scope.getLength($scope.teams.$getRecord(request.teamID.toString()));
		var curTeamMember = $firebaseArray($rootScope.team_ref.child(request.teamID.toString()).child("membersID"));
		if (curTeamSize < parseInt($scope.maxSize)) {
			//Add user to team member
			curTeamMember.$add(user.$id.toString());

			var curUser = $rootScope.user_ref.child(user.$id.toString());

			//Add user to teamAsMember
			var curUserIn = curUser.child("teamsAsMember");
			var curUserInList = $firebaseArray(curUserIn);
			//var curUserOutList = $firebaseArray(curUserOut);
			curUserInList.$add(request.teamID);

			//Delete this request from teamsApplying
			var curUserOut = $firebaseObject(curUser);
			curUserOut.$loaded().then(function(){

				for (var key in curUserOut.teamsApplying) {
					//console.log(curUserOut.teamsApplying.teamID);
					if (curUserOut.teamsApplying[key].eventID == $scope.event.$id) {
						$rootScope.user_ref.child(user.$id.toString()).child("teamsApplying").child(key).remove();
					}
				};
			});


			//curUserOutList.$remove(request);
			var index = $scope.users.indexOf(user);
  		$scope.users.splice(index, 1);  
			// Remove waiting user from database-event
			for (var key in $scope.event.waitingUsers) {
				if($scope.event.waitingUsers[key] == user.$id) {
					$rootScope.event_ref.child('0').child('waitingUsers').child(key).remove();
					break;
				};
			};
			
		} else {
			console.log("the team is full");
		}
	};

	$scope.adminAddUserToOtherTeam = function(user) {
		var teamName = user.adminAdd;
		var teamID;
		var curTeamSize;

		for (var key in $scope.teams) {
			if ($scope.teams[key].teamName == teamName) {
				teamID = $scope.teams[key].$id;
				curTeamSize = $scope.getLength($scope.teams[key]);
			};
		};

		if (teamID == null || teamName == null) {
			console.log("No Such Team");
			return;
		}
			
		var curTeamMember = $firebaseArray($rootScope.team_ref.child(teamID.toString()).child("membersID"));

		if (curTeamSize < parseInt($scope.maxSize)) {
			//Add user to team member
			curTeamMember.$add(user.$id.toString());

			var curUser = $rootScope.user_ref.child(user.$id.toString());

			//Add user to teamAsMember
			var curUserIn = curUser.child("teamsAsMember");
			var curUserInList = $firebaseArray(curUserIn);
			curUserInList.$add(teamID);
			
			//Delete all requests of this event from teamsApplying
			var curUserOut = $firebaseObject(curUser);
			curUserOut.$loaded().then(function(){
				//console.log(curUserOut);
				for (var key in curUserOut.teamsApplying) {
					//console.log(curUserOut.teamsApplying.teamID);
					if (curUserOut.teamsApplying[key].eventID == $scope.event.$id) {
						$rootScope.user_ref.child(user.$id.toString()).child("teamsApplying").child(key).remove();
					}
				};
			});		


			var index = $scope.users.indexOf(user);
  		$scope.users.splice(index, 1);  
			// Remove waiting user from database-event
			for (var key in $scope.event.waitingUsers) {
				if($scope.event.waitingUsers[key] == user.$id) {
					$rootScope.event_ref.child('0').child('waitingUsers').child(key).remove();
					break;
				};
			};
		} else {
			console.log("the team is full");
		};
	};

// Filter - team
  	
	$scope.teamFilter = function(item) {
		var curTeamSize = $scope.getLength(item);
		if ($scope.adminTeamFull == false && $scope.adminTeamNotFull == false) {
			return false;
		};
		if ($scope.adminTeamFull == true && $scope.adminTeamNotFull == false) {
			if (curTeamSize != $scope.maxSize) {
				return false;
			};
		};
		if ($scope.adminTeamFull == false && $scope.adminTeamNotFull == true) {
			if (curTeamSize == $scope.maxSize) {
				return false;
			};
		};

		if (!$scope.adminTeamSearch || (item.teamName.toString().toLowerCase().indexOf($scope.adminTeamSearch.toString().toLowerCase()) != -1) ) {
			return true;
		} else {
			var skills = angular.toJson(item.desiredSkills);
			if (skills.toString().toLowerCase().indexOf($scope.adminTeamSearch.toString().toLowerCase()) != -1) {
				return true;
			} else {
				return false;
			};
		};
	};

	// Filter - user
	$scope.userFilter = function(item) {
		if ($scope.adminUserRequest == false && $scope.adminUserNotRequest == false) {
			return false;
		};
		if ($scope.adminUserRequest == false && $scope.adminUserNotRequest == true) {
			var requested = false;
			for (var key in item.teamsApplying) {
				if (item.teamsApplying[key].eventID == $scope.event.$id) {
					requested = true;
					break;
				}
			};
			if (!requested)
				return false;
		};
		if ($scope.adminUserRequest == true && $scope.adminUserNotRequest == false) {
			for (var key in item.teamsApplying) {
				if (item.teamsApplying[key].eventID == $scope.event.$id)
					return false;
			};
		};

		if (!$scope.adminUserSearch || (item.name.toString().toLowerCase().indexOf($scope.adminUserSearch.toString().toLowerCase()) != -1) ) {
			return true;
		} else {
			if (item.skills == null)
				return false;
			for (var key in item.skills) {
				if (item.skills.hasOwnProperty(key)) {
					if (item.skills[key].toString().toLowerCase().indexOf($scope.adminUserSearch.toString().toLowerCase()) != -1) {
						return true;
					};
				};
			};
			return false;
		};
	};
});

