teamapp.filter('adminRequest', function ($rootScope, $firebaseObject) {
		return function(items) {
			var event = '0';
			
			var filtered = [];
			for (var key in items) {
				if (items[key].eventID == event) {
					filtered.push(items[key]);
				};
			};
			return filtered;
	};
});
teamapp.controller('admin_ctrl', function($scope, $rootScope, $firebaseObject, $firebaseArray, filterFilter) {
  var event = $firebaseObject($rootScope.event_ref.child('0'));

  event.$loaded().then(function(){
  	
  	//$rootScope.eventTeams = event.allTeams;
  	$scope.minSize = event.minSize;
  	$scope.maxSize = event.maxSize;
  	$scope.size = $scope.maxSize - $scope.minSize + 1;
  	
  	var admin = $firebaseObject($rootScope.user_ref.child(event.adminID));
  	admin.$loaded().then(function(){
  		$scope.eventInfo = {
  			name: event.eventName,
  			admin: admin.name
  		};
  	});
  

  
  	$scope.getNumber = function(num) {
    	return new Array(num);   
		}

		$scope.teams = $firebaseArray($rootScope.team_ref.orderByChild("belongstoEvent").equalTo(event.$id.toString()));
	
		$scope.maxSize = 8;

		//$scope.teams = $rootScope.eventTeams;
		$scope.teamFilter = function(item) {
			if ($scope.adminTeamFull == false && $scope.adminTeamNotFull == false) {
				return false;
			};
			if ($scope.adminTeamFull == true && $scope.adminTeamNotFull == false) {
				if ((item.membersID.length+1) != $scope.maxSize) {
					return false;
				};
			};
			if ($scope.adminTeamFull == false && $scope.adminTeamNotFull == true) {
				if ((item.membersID.length+1) == $scope.maxSize) {
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

		$scope.getLength = function(team) {
			return Object.keys(team.membersID).length + 1;
		}

	$scope.remove = function(team) { 
  		var index = $scope.teams.indexOf(team);
  		$scope.teams.splice(index, 1); 
  		$rootScope.team_ref.child(team.$id.toString()).remove();    
	};

	$scope.adminMergeTeam = function(team) {
		var teamName = team.adminMerge;
		var mergedTeam;
		console.log(teamName);
		for (var key in $scope.teams) {
			if ($scope.teams[key].teamName == teamName) {
				mergedTeam = $scope.teams[key];
			};
		};

		if (mergedTeam == null) {
			console.log("No Such Team");
			return;
		};

		console.log(team);
		console.log(mergedTeam);
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

	$scope.users = [];
	console.log(event.waitingUsers);
	for (var key in event.waitingUsers) {
		$scope.users.push($firebaseObject($rootScope.user_ref.child(event.waitingUsers[key])));
	}


	$scope.userFilter = function(item) {
		if ($scope.adminUserRequest == false && $scope.adminUserNotRequest == false) {
			return false;
		};
		if ($scope.adminUserRequest == false && $scope.adminUserNotRequest == true) {
			var requested = false;
			for (var key in item.teamApplying) {
				console.log(item.teamApplying[key].eventID);
				console.log(item.teamApplying[key].teamName);
				console.log(event.$id);
				if (item.teamApplying[key].eventID == event.$id) {
					requested = true;
					break;
				}
			};
			if (!requested)
				return false;
		};
		if ($scope.adminUserRequest == true && $scope.adminUserNotRequest == false) {
			for (var key in item.teamApplying) {
				if (item.teamApplying[key].eventID == event.$id)
					return false;
			};
		};

		if (!$scope.adminUserSearch || (item.name.toString().toLowerCase().indexOf($scope.adminUserSearch.toString().toLowerCase()) != -1) ) {
			return true;
		} else {
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
	
	$scope.adminAddUserToTeam = function(key, request, user) {
		var curTeamMember = $firebaseArray($rootScope.team_ref.child(request.teamID.toString()).child("membersID"));
		console.log(curTeamMember);
		console.log(curTeamMember.length);
		if (curTeamMember.length < parseInt($scope.maxSize)-1) {
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
				console.log(curUserOut);
				for (var key in curUserOut.teamsApplying) {
					console.log(curUserOut.teamsApplying.teamID);
					if (curUserOut.teamsApplying[key].eventID == event.$id) {
						$rootScope.user_ref.child(user.$id.toString()).child("teamsApplying").child(key).remove();
					}
				};
			});


			//curUserOutList.$remove(request);
			var index = $scope.users.indexOf(user);
  		$scope.users.splice(index, 1);  
			// Remove waiting user from database-event
			for (var key in event.waitingUsers) {
				if(event.waitingUsers[key] == user.$id) {
					$rootScope.event_ref.child('0').child('waitingUsers').child(key).remove();
					break;
				};
			};
			
		};
	};

	$scope.adminAddUserToOtherTeam = function(user) {
		var teamName = user.adminAdd;
		var teamID;
		console.log(teamName);
		for (var key in $scope.teams) {
			if ($scope.teams[key].teamName == teamName) {
				teamID = $scope.teams[key].$id;
			};
		};

		if (teamID == null) {
			console.log("No Such Team");
			return;
		}
			
		var curTeamMember = $firebaseArray($rootScope.team_ref.child(teamID.toString()).child("membersID"));
		console.log(curTeamMember);
		console.log(curTeamMember.length);
		if (curTeamMember.length < parseInt($scope.maxSize)-1) {
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
				console.log(curUserOut);
				for (var key in curUserOut.teamsApplying) {
					console.log(curUserOut.teamsApplying.teamID);
					if (curUserOut.teamsApplying[key].eventID == event.$id) {
						$rootScope.user_ref.child(user.$id.toString()).child("teamsApplying").child(key).remove();
					}
				};
			});		

			//curUserOutList.$remove(request);

			var index = $scope.users.indexOf(user);
  		$scope.users.splice(index, 1);  
			// Remove waiting user from database-event
			for (var key in event.waitingUsers) {
				if(event.waitingUsers[key] == user.$id) {
					$rootScope.event_ref.child('0').child('waitingUsers').child(key).remove();
					break;
				};
			};
		};
	};


	//event loaded ends
	});
});
