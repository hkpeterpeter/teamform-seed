teamapp.controller('eventX', ['$scope', "$rootScope", "$firebaseObject", "$firebaseArray", function($scope, $rootScope, $firebaseObject, $firebaseArray) {

  $scope.currentEvent = $rootScope.clickedEvent.$id;
  $scope.currentUser = $rootScope.currentUser.$id;
  $scope.events = $rootScope.events;
  $scope.users = $rootScope.users;
  $scope.teams = $rootScope.teams;
  $scope.showTeams = true;
  $scope.showTeamForm = false;
  $scope.create_team = "create team";
  $scope.notParticipated = true;
  var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if (!findNaN && typeof Array.prototype.indexOf === 'function') {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function(needle) {
        var i = -1,
          index = -1;

        for (i = 0; i < this.length; i++) {
          var item = this[i];

          if ((findNaN && item !== item) || item === needle) {
            index = i;
            break;
          }
        }

        return index;
      };
    }

    return indexOf.call(this, needle) > -1;
  };
  $scope.getCurrentEvent = function() {
    var curEvent = $firebaseObject(firebase.database().ref('events/' + $scope.currentEvent));
    curEvent.$loaded().then(function(data) {
      $scope.curEvent = {
        eventName: data.eventName,
        eventDescription: data.description,
        eventBG: data.imageUrl
      };
    });
    var teams = firebase.database().ref('events/' + $scope.currentEvent).child('/allTeams');
    $scope.teams = $firebaseArray(teams);
    console.log($scope.teams);
    $firebaseArray(teams).$loaded().then(function(datas) {
      $firebaseObject($rootScope.user_ref.child($scope.currentUser)).$loaded().then(function(user) {
        for (var i = 0; i < datas.length; ++i) {
          for (var key in user.teamsAsLeader) {
            if (user.teamsAsLeader[key] == datas[i].teamID) {
              $scope.notParticipated = false;
            }
          }
          for (var key in user.teamsAsMember) {
            if (user.teamsAsMember[key] == datas[i].teamID) {
              $scope.notParticipated = false;
            }
          }
        }

      });


    });
  }
  $scope.getCurrentEvent();

  // var allData = $firebaseObject(firebase.database().ref("/"));
  // $scope.processData = function(allData, currentEventID, currentTeamID, currentUserID) {
  //   var events = allData.events;
  //
  //   var curEvent = {
  //     eventName: events[currentEventID].eventName,
  //     eventDescription: events[currentEventID].description,
  //     eventBG: events[currentEventID].imageURL
  //   };
  //
  //   var teamsCurEvent = [];
  //
  //   var teams = allData.teams;
  //
  //   //select teams in this event
  //   for (var key in teams) {
  //     var t = teams[key];
  //     if (t.belongstoEvent == currentEventID && (key == currentTeamID || t.isPrivate == false)) {
  //       t.teamID = key;
  //       teamsCurEvent.push(t);
  //     }
  //   }
  //
  //
  //   //move my team in the first position
  //   for (var i = 0; i < teamsCurEvent.length; i++) {
  //     if (teamsCurEvent[i].teamID == currentTeamID) {
  //       $scope.notParticipated = false;
  //       var temp = teamsCurEvent[0];
  //       teamsCurEvent[0] = teamsCurEvent[i];
  //       teamsCurEvent[i] = temp;
  //     }
  //   }
  //   return {
  //     event: curEvent,
  //     team: teamsCurEvent,
  //     user: allData.users
  //   };
  //
  // }
  //
  //
  //
  //
  // $scope.clickCount = 0;
  //
  // // $scope.showBody = function(id) {
  // //   $(".collapsible-body-" + id).slideToggle(100);
  // //   $scope.clickCount++;
  // //
  // // };
  //
  // allData.$loaded().then(function(data) {
  //
  //   $scope.preprocessData(data);
  // });
  //
  // $scope.preprocessData = function(allData) {
  //   try {
  //     for (var i in allData.users[$scope.currentUser].teamsAsMember) {
  //       candidate = allData.users[$scope.currentUser].teamsAsMember[i];
  //       if (allData.teams[candidate] != undefined && allData.teams[candidate].belongstoEvent == $scope.currentEvent) {
  //         $scope.currentTeam = candidate;
  //         break;
  //       }
  //     }
  //   } catch (err) {
  //     $scope.currentTeam = undefined;
  //   }
  //
  //   $scope.readyData = $scope.processData(allData, $scope.currentEvent, $scope.currentTeam, $scope.currentUser);
  // };

  // $scope.initShowBody = function(id) {
  //   if ($scope.clickCount == 0) {
  //     $(".collapsible-body-" + id).slideToggle(100);
  //   }
  // };

  $scope.flip = function($event) {
    $scope.showTeams = !$scope.showTeams;
    $scope.showTeamForm = !$scope.showTeamForm;
    $scope.create_team = $scope.showTeams ? "create team" : "cancel";
    //$event.stopPropagation();
  };

  $scope.removeTeam = function($event, id) {
    for (var j = 0; j < $scope.teams.length; ++j) {
      if ($scope.teams[j].teamID == id) {
        break;
      }
    }
    $scope.teams.splice(j, 1);
    $event.stopPropagation();
  };

  $scope.joinTeam = function($event, id) {
    console.log($scope.currentUser);
    $firebaseArray($rootScope.user_ref.child($scope.currentUser).child("teamsAsMember")).$add(id);
    $firebaseArray($rootScope.team_ref.child(id).child("membersID")).$add($scope.currentUser);
    $scope.notParticipated = false;
    for (var i = 0; i < $scope.teams.length; ++i) {
      if ($scope.teams[i].teamID == id) {
        $rootScope.addNotify($scope.currentUser, "You have joined " + $scope.teams[i].teamID, "", "", "System");
        Materialize.toast("You have joined " + $scope.teams[i].teamID, 3000);
      }
    }


  };

  $scope.createTeam = function($event) {
    var team = {};
    // eventCreating.description=document.getElementById("event_detail").value;
    team.belongstoEvent = $scope.currentEvent;
    team.teamName = $scope.teamName;
    team.desiredSkills = $rootScope.skillsList;
    team.invitedPeople = "undefined";
    team.isPrivate = $scope.privateTeam == undefined ? false : true;
    team.leaderID = $scope.currentUser;
    team.membersID = "undefined";
    team.min_num = $scope.teamMin;
    team.max_num = $scope.teamMax;
    team.description = $scope.teamDescription;
    team.imageUrl = $scope.imageURL == "" ? $rootScope.currentUser.profilePic : $scope.imageURL;
    console.log(team);
    $rootScope.teams.$add(team).then(function(ref) {
      var teamID = ref.key;

      $firebaseArray($rootScope.user_ref.child($scope.currentUser).child("teamsAsLeader")).$add(teamID);
      $firebaseArray($rootScope.event_ref.child($scope.currentEvent).child("allTeams")).$add({leader: team.leaderID, teamID: teamID});
      $scope.notParticipated = false;
      $rootScope.addNotify($scope.currentUser, "A new team " + team.teamName + " has been created", "", "", "System");

      Materialize.toast("Your new team " + team.teamName + " has been created", 3000);
    }).catch(function(err) {
      console.error(err);
    });
    $scope.flip($event);
    // $event.stopPropagation();
  };

}]);


// teamapp.directive("fishNavi", function() {
// 	return {
// 		restrict: "E",
// 		templateUrl: "fish/fish-navi.html",
// 	};
// });
