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
  if ($rootScope.bindedclickedEvent != null)
  	$scope.event = $rootScope.bindedclickedEvent; //$firebaseObject($rootScope.event_ref.child('0'));
  //$scope.event.$loaded().then(function(){
  	
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
	//});

	
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

	$scope.findTeamByName = function(teamName) {
		var mergedTeam;
		for (var key in $scope.teams) {
			if ($scope.teams[key].teamName == teamName) {
				mergedTeam = $scope.teams[key];
			};
		};

		return mergedTeam;
	}

	$scope.canMergeTeams = function(mergedTeam, team) {
		var mergedTeamSize = $scope.getLength(mergedTeam);
		var curTeamSize = $scope.getLength(team);
		if (mergedTeamSize + curTeamSize > $scope.maxSize) {
			console.log("exceed team member limit");
			return false;
		} else {
			return true;
		};
	};

	$scope.adminMergeTeam = function(team) {
		var teamName = team.adminMerge;
		var mergedTeam = $scope.findTeamByName(teamName);


		if (mergedTeam == null || teamName == null) {
			console.log("No Such Team");
			return;
		};

		if (canMergeTeams(mergedTeam, team) == false) {
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

	$scope.adminUpdateUserInfo = function(team, user) {
		var curTeamSize = $scope.getLength(team);
		if (curTeamSize >= parseInt($scope.maxSize)) {
			return false;
		};
			//Add user to team member
			var curTeamMember = team.membersID;

			curTeamMember[user.$id] = user.$id;

			//Add user to teamAsMember
			user.teamsAsMember[team.$id] = team.$id;

			//Delete this request from teamsApplying
			var curUserOut = user.teamsApplying;
				for (var key in curUserOut) {
					if (curUserOut[key].eventID == $scope.event.$id) {
						curUserOut[key] = null;
					}
				};

			//var index = $scope.users.indexOf(user);
  		//$scope.users.splice(index, 1);  
			// Remove waiting user from database-event
			for (var key in $scope.event.waitingUsers) {
				if($scope.event.waitingUsers[key] == user.$id) {
					$scope.event.waitingUsers[key] = null;
					break;
				};
			};
		return true;
	};




	$scope.findSuitableUser = function(team, users) {
		if (users == null)
			users = $scope.users;
		var invites = [];
		var notInvites = [];
		if (team.invitedPeople != null) {
		for (var i = users.length - 1; i >= 0; i--) {
			for (var key in team.invitedPeople) {
				if (team.invitedPeople[key] == users[i].$id) {
					invites.push(users[i]);
				} else {
					notInvites.push(users[i]);
				};
			};
		};
	} else {
		for (var i = users.length - 1; i >= 0; i--) {
			notInvites.push(users[i]);
		}
	}

		if (invites.length != 0) {
			var maxCover1 = -1;
			var maxCover2 = -1;
			var curUser;
			for (var i = invites.length - 1; i >= 0; i--) {
				var skillCover = 0;

				for (var key in team.desiredSkills) {
					for (var key2 in invites[i].skills) {
						if(team.desiredSkills[key] == invites[i].skills[key2]) {
							skillCover = skillCover + 1;
							break;
						}
					}
				}
				if (skillCover > maxCover1) {
					curUser = invites[i];
					maxCover1 = skillCover;
				}
			}
			$scope.adminUserSearch = curUser.name;
			console.log(curUser.name);
			console.log(notInvites.length);

			if (notInvites.length != 0) {
				for (var i = notInvites.length - 1; i >= 0; i--) {
					var skillCover = 0;

					for (var key in team.desiredSkills) {
						for (var key2 in notInvites[i].skills) {
							if(team.desiredSkills[key] == notInvites[i].skills[key2]) {
								skillCover = skillCover + 1;
								break;
							}
						}
					}
					if (skillCover > maxCover2) {
						maxCover2 = skillCover;
					}
					if (skillCover >= maxCover1 + 2) {
						curUser = notInvites[i]; 
					}
				}				
			}


			return curUser;
		} else {
			var maxCover = -1;
			var curUser;
			for (var i = notInvites.length - 1; i >= 0; i--) {
				var skillCover = 0;

				for (var key in team.desiredSkills) {
					for (var key2 in notInvites[i].skills) {
						if(team.desiredSkills[key] == notInvites[i].skills[key2]) {
							skillCover = skillCover + 1;
							break;
						}
					}
				}
				if (skillCover > maxCover) {
					curUser = notInvites[i];
					maxCover = skillCover;
				}
			}
			$scope.adminUserSearch = curUser.name;
			return curUser;			
		}

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
		if ($scope.adminUserRequest == true && $scope.adminUserNotRequest == false) {
			var requested = false;
			if (item.teamsApplying == null)
				return false;
			
				for (var key in item.teamsApplying) {
					if (item.teamsApplying[key].eventID.toString() == $scope.event.$id.toString()) {
						requested = true;
						break;
					}
				};
				if (!requested)
					return false;
			
		};
		if ($scope.adminUserRequest == false && $scope.adminUserNotRequest == true) {
			if (item.teamsApplying != null) {
				for (var key in item.teamsApplying) {
					if (item.teamsApplying[key].eventID.toString() == $scope.event.$id.toString())
						return false;
				};
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

