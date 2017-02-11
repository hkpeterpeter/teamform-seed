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
teamapp.controller('admin_ctrl', function($scope, $rootScope, $q, $timeout, $firebaseObject, $firebaseArray, filterFilter) {
	$rootScope.user_ref=firebase.database().ref("users");
	$rootScope.event_ref=firebase.database().ref("events");
	$rootScope.team_ref=firebase.database().ref("teams");

	$scope.adminUserRequest = true;
  $scope.adminUserNotRequest = true;
  $scope.adminTeamFull = true;
  $scope.adminTeamNotFull = true;

  $rootScope.admintesting = '0';
  if ($rootScope.clickedEvent != null) {
  	console.log("not null");
  	$scope.event = $rootScope.clickedEvent; //$firebaseObject($rootScope.event_ref.child('0'));
  };
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
	//update invited people name
	$scope.updateteaminfo = function() {
		console.log($scope.teams);
		$rootScope.user_ref.once('value').then(function(snapshot) {
			for (var team in $scope.teams) {
				if ($scope.teams[team].invitedPeople != null) {
					$scope.teams[team].invitedName = [];
					for (var u in $scope.teams[team].invitedPeople) {
						var curkey = $scope.teams[team].invitedPeople[u].toString();
						$scope.teams[team].invitedName.push(snapshot.val()[curkey].name);
					//$scope.teams[team].invitedPeople[u] = {}
					}
				//$scope.teams[team]
				};
	//update team members
				if ($scope.teams[team].membersID != null) {
					$scope.teams[team].membersName = [];
					for (var u in $scope.teams[team].membersID) {
						var curkey = $scope.teams[team].membersID[u].toString();
						$scope.teams[team].membersName.push(snapshot.val()[curkey].name);
					};
				//$scope.teams[team]
				};
	//update leader
						if ($scope.teams[team].leaderID != null) {

						var curkey = $scope.teams[team].leaderID.toString();
						$scope.teams[team].leaderName = snapshot.val()[curkey].name;
					//$scope.teams[team].invitedPeople[u] = {}
						}
			};
		});	
	};

	$scope.updateteaminfo();

	
	// Functions - TEAM
	// Get number of team members
	$scope.getLength = function(team) {
		if (team.membersID != null)
			return Object.keys(team.membersID).length + 1;
		else
			return 1;
	}

	// Delete a team
	$scope.setactive = function($index) {
		$scope.activeclass=$index;
	};

	$scope.remove = function(team) { 
  		//var index = $scope.teams.indexOf(team);
  		//$scope.teams.splice(index, 1); 
  		angular.element(document.querySelector("#"+team.teamName)).addClass("animated flipOutY");
  		console.log("called");
  		//$scope.teamclass="animated flipOutY";
  		console.log(team);

		for (var waituser in $scope.users) {
			console.log(waituser);
			if ($scope.users[waituser].teamsApplying != null) {
				for (var waitteam in $scope.users[waituser].teamsApplying) {
					if ($scope.users[waituser].teamsApplying[waitteam].teamID == team.$id) {
						delete $scope.users[waituser].teamsApplying[waitteam];
						$rootScope.user_ref.child($scope.users[waituser].$id).child("teamsApplying").child(waitteam).remove();
					}
				};
				console.log(waituser);
			};
		};

  		$timeout(function(){
  			$rootScope.team_ref.child(team.$id.toString()).remove();
  		}, 500);
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
			Materialize.toast('Cannot find a team named ' + teamName, 4000);
			angular.element(document.querySelector("#"+team.teamName)).addClass("animated tada");
			$timeout(function(){
				angular.element(document.querySelector("#"+team.teamName)).removeClass("animated tada");
			}, 500);
			return false;
		};

		if ($scope.canMergeTeams(mergedTeam, team) == false) {
			Materialize.toast("It exceeds maximum number of team members!", 4000);
			angular.element(document.querySelector("#"+team.teamName)).addClass("animated tada");
			$timeout(function(){
				angular.element(document.querySelector("#"+team.teamName)).removeClass("animated tada");
			}, 500);
			return false;
		};
		
		var newMembers = $firebaseArray($rootScope.team_ref.child(mergedTeam.$id.toString()).child("membersID"));
		newMembers.$add(team.leaderID);

		/*
		$firebaseArray($rootScope.user_ref.child(team.leaderID.toString()).child("teamsAsMember")).$add(mergedTeam.$id.toString());
		var leader = $firebaseObject($rootScope.user_ref.child(team.leaderID.toString()))
		
		leader.$loaded().then(function(){
			for (var keyl in leader.teamsAsLeader) {
				if (leader.teamsAsLeader[keyl].toString() == team.$id.toString())
					$rootScope.user_ref.child(team.leaderID.toString()).child("teamsAsLeader").child(keyl).remove();
			};
		});*/
		//$rootScope.user_ref.child(team.leaderID.toString()).child("teamsAsLeader").child(team.$id.toString()).remove();
		for (var key in team.membersID) {
		/*var curu = $firebaseObject($rootScope.user_ref.child(team.membersID[key].toString()))
		curu.$loaded().then(function(){
			for (var keyu in curu.teamsAsMember) {
				if (curu.teamsAsMember[keyu].toString() == team.$id.toString())
					$rootScope.user_ref.child(team.membersID[key].toString()).child("teamsAsMember").child(keyu).remove();
			};
		});			
			var curMemTeam = $firebaseArray($rootScope.user_ref.child(team.membersID[key].toString()).child("teamsAsMember"));
			curMemTeam.$add(team.$id.toString());*/
			newMembers.$add(team.membersID[key]);
		};

		var newInvites = $firebaseArray($rootScope.team_ref.child(mergedTeam.$id.toString()).child("invitedPeople"));
		for (var key in team.invitedPeople) {
			var exist = false;
			for (var keym in mergedTeam.invitedPeople) {
				if (mergedTeam.invitedPeople[keym].toString() == team.invitedPeople[key].toString()) {
					exist = true;
					break;
				}
			}
			if (!exist)
				newInvites.$add(team.invitedPeople[key]);
			//$firebaseArray($rootScope.user_ref.child(team.invitedPeople[key].toString()).child("teamsAsInvitedPeople")).$add(mergedTeam.$id.toString());
			//$rootScope.user_ref.child(team.invitedPeople[key].toString()).child("teamsAsInvitedPeople").child(team.$id.toString()).remove();
		};
		$scope.updateteaminfo();

		for (var waituser in $scope.users) {
			console.log(waituser);
			if ($scope.users[waituser].teamsApplying != null) {
				var exist = false;
				for (var waitteam in $scope.users[waituser].teamsApplying) {
					if ($scope.users[waituser].teamsApplying[waitteam].teamID == mergedTeam.$id) {
						exist = true;
					}
				};
				if (!exist) {
					$scope.users[waituser].teamsApplying.push({eventID: $scope.event.$id, teamID: mergedTeam.$id, teamName: mergedTeam.teamName})
					$firebaseArray($rootScope.user_ref.child($scope.users[waituser].$id).child("teamsApplying")).$add({eventID: $scope.event.$id, teamID: mergedTeam.$id, teamName: mergedTeam.teamName});
				}
				console.log(waituser);
			};
		};

		$scope.remove(team);
		
/*
				for (var waitteam in waituser.teamsApplying) {
					if (waitteam.teamID == team.$id) {
						if (exist = false) {
							waitteam.teamID = mergedTeam.$id;
							waitteam.teamName = mergedTeam.teamName;
						} else {
      var index = $scope.users.indexOf(waituser);
      $scope.users.splice(index, 1);
						}
					}
				};
*/

		$timeout(function(){
		Materialize.toast('Success! The member of ' + teamName + ' is updated!', 4000);
		angular.element(document.querySelector("#"+teamName+"num")).addClass("animated rubberBand");
		$scope.adminrequestbtn="animated rubberBand";
		}, 800);
		
		return true;
	
	};
	$scope.startdragging = function(event, ui, team1) {
		$rootScope.draggedteam = team1;
	};
	$scope.stopdragging = function(event, ui, team1) {
		var deferred = $q.defer();
		$rootScope.droppedteam = team1;
		var confirmtext = "Are you sure to merge team " + $rootScope.draggedteam.teamName + " into team " + $rootScope.droppedteam.teamName + "?";
		if (confirm(confirmtext)) {
			$rootScope.draggedteam.adminMerge = $rootScope.droppedteam.teamName;
			if ($scope.adminMergeTeam($rootScope.draggedteam) == false){
				deferred.reject();
			} else {
				deferred.resolve();
			}
		} else {
			deferred.reject();
		}
		return deferred.promise;
	};

/*
	$scope.beforeDrop = function(event, ui, team1) {
    	var deferred = $q.defer();
    	if (confirm('Are you sure to merge two teams?')) {
      	deferred.resolve();
      	console.log(event);
      	console.log(ui);
      	console.log(team1);
      	console.log($(event.target).scope().team);
    	} else {
      	deferred.reject();
    	}
    	return deferred.promise;
  	};
*/

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

  $scope.adminAddUser = function(teamID, curTeamSize, curTeamMember, user) {
    if (curTeamSize < parseInt($scope.maxSize)) {
      //Add user to team member
      curTeamMember.$add(user.$id.toString());

      var curUser = $rootScope.user_ref.child(user.$id.toString());

      

      //Add user to teamAsMember
      var curUserIn = curUser.child("teamsAsMember");
      var curUserInList = $firebaseArray(curUserIn);
      curUserInList.$add(teamID);

      //Delete this request from teamsApplying
      var curUserOut = $firebaseObject(curUser);
      curUserOut.$loaded().then(function(){
        for (var key in curUserOut.teamsApplying) {
          if (curUserOut.teamsApplying[key].eventID == $scope.event.$id) {
            $rootScope.user_ref.child(user.$id.toString()).child("teamsApplying").child(key).remove();
          }
        };
      });

      //Delete this from invitedPeople if it is in
      for (var team in $scope.teams) {
      	if ($scope.teams[team].invitedPeople != null) {
      		for (var invite in $scope.teams[team].invitedPeople) {
      			if ($scope.teams[team].invitedPeople[invite].toString() == user.$id.toString()) {
      				console.log($rootScope.team_ref.child($scope.teams[team].$id.toString()).child("invitedPeople").child(invite).toString());
      				$rootScope.team_ref.child($scope.teams[team].$id.toString()).child("invitedPeople").child(invite).remove();
      			}
      		}
      	}
	  }
      $scope.updateteaminfo();

	angular.element(document.querySelector("#"+user.name)).addClass("animated flipOutY");
	Materialize.toast('Success! ' + user.name + ' is added successfully!', 4000);

  	$timeout(function(){
      var index = $scope.users.indexOf(user);
      $scope.users.splice(index, 1); 
  	}, 500);
 

      // Remove waiting user from database-event
      for (var key in $scope.event.waitingUsers) {
        if($scope.event.waitingUsers[key] == user.$id) {
          $rootScope.event_ref.child('0').child('waitingUsers').child(key).remove();
          break;
        };
      };
      
    } else {
      console.log("the team is full");
      return false;
    }   
    return true;
  };

// Functions - USER
  $scope.adminAddUserToTeam = function(key, request, user) {
    var curTeamSize = $scope.getLength($scope.teams.$getRecord(request.teamID.toString()));
    var curTeamMember = $firebaseArray($rootScope.team_ref.child(request.teamID.toString()).child("membersID"));
    var teamID = request.teamID;
    $scope.adminAddUser(teamID, curTeamSize, curTeamMember, user);


  };

  $scope.adminAddUserToOtherTeam = function(user) {
    console.log("test");
    var teamName = user.adminAdd;
    var curTeamSize;

    var team = $scope.findTeamByName(teamName);

    if (team == null || teamName == null) {
	Materialize.toast('Cannot find a team named ' + teamName, 4000);
	angular.element(document.querySelector("#"+user.name)).addClass("animated tada");
	$timeout(function(){
		angular.element(document.querySelector("#"+user.name)).removeClass("animated tada");
	}, 500);

      return;
    }
    var teamID = team.$id;
    var curTeamSize = $scope.getLength(team);
    var curTeamMember = $firebaseArray($rootScope.team_ref.child(teamID.toString()).child("membersID"));
    $scope.adminAddUser(teamID, curTeamSize, curTeamMember, user);

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

