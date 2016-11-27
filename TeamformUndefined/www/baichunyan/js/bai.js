teamapp.controller('eventX', ['$scope', "$rootScope", "$firebaseObject", "$firebaseArray", function($scope, $rootScope, $firebaseObject, $firebaseArray) {

  $scope.currentEvent = $rootScope.clickedEvent.$id;

  $scope.currentUser = $rootScope.currentUser.id;
  $scope.events = $rootScope.events;
  $scope.users = $rootScope.users;
  $scope.teams = $rootScope.teams;
  $scope.showTeams = true;
  $scope.showTeamForm = false;
  $scope.create_team = "create team";
  $scope.notParticipated = true;



  var allData = $firebaseObject(firebase.database().ref("/"));
  $scope.processData = function(allData, currentEventID, currentTeamID, currentUserID) {
    var events = allData.events;

    var curEvent = {
      eventName: events[currentEventID].eventName,
      eventDescription: events[currentEventID].description,
      eventBG: events[currentEventID].imageURL
    };

    var teamsCurEvent = [];

    var teams = allData.teams;

    //select teams in this event
    for (var key in teams) {
      var t = teams[key];
      if (t.belongstoEvent == currentEventID && (key == currentTeamID || t.isPrivate == false)) {
        t.teamID = key;
        teamsCurEvent.push(t);
      }
    }


    //move my team in the first position
    for (var i = 0; i < teamsCurEvent.length; i++) {
      if (teamsCurEvent[i].teamID == currentTeamID) {
        $scope.notParticipated = false;
        var temp = teamsCurEvent[0];
        teamsCurEvent[0] = teamsCurEvent[i];
        teamsCurEvent[i] = temp;
      }
    }
    return {
      event: curEvent,
      team: teamsCurEvent,
      user: allData.users
    };

  }




  $scope.clickCount = 0;

  $scope.showBody = function(id) {
    $(".collapsible-body-" + id).slideToggle(100);
    $scope.clickCount++;

  };

  allData.$loaded().then(function(data) {

    $scope.preprocessData(data);
  });

  $scope.preprocessData = function(allData) {
    try {
      for (var i in allData.users[$scope.currentUser].teamsAsMember) {
        candidate = allData.users[$scope.currentUser].teamsAsMember[i];
        if (allData.teams[candidate] != undefined && allData.teams[candidate].belongstoEvent == $scope.currentEvent) {
          $scope.currentTeam = candidate;
          break;
        }
      }
    } catch (err) {
      $scope.currentTeam = undefined;
    }

    $scope.readyData = $scope.processData(allData, $scope.currentEvent, $scope.currentTeam, $scope.currentUser);
  };

  $scope.initShowBody = function(id) {
    if ($scope.clickCount == 0) {
      $(".collapsible-body-" + id).slideToggle(100);
    }
  };

  $scope.flip = function($event) {
    $scope.showTeams = !$scope.showTeams;
    $scope.showTeamForm = !$scope.showTeamForm;
    $scope.create_team = $scope.showTeams ? "create team" : "cancel";
    //$event.stopPropagation();
  };

  $scope.removeTeam = function($event, id) {
    for (var j = 0; j < $scope.readyData.team.length; ++j) {
      if ($scope.readyData.team[j].teamID == id) {
        break;
      }
    }
    $scope.readyData.team.splice(j, 1);
    $event.stopPropagation();
  };

  $scope.joinTeam = function($event, id) {
    $firebaseArray($rootScope.user_ref.child($rootScope.currentUser.id).child("teamsAsMember")).$add(id);
    $firebaseArray($rootScope.team_ref.child(id).child("membersID")).$add($scope.currentUser);
    $scope.notParticipated = false;
    for (var i = 0; i < $scope.readyData.team.length; ++i) {
      if ($scope.readyData.team[i].teamID == id) {
        $rootScope.addNotify($rootScope.currentUser.id, "You have joined " + $scope.readyData.team[i].teamName, "", "", "System");
        Materialize.toast("You have joined " + $scope.readyData.team[i].teamName, 3000);
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
      console.log(teamID);

      $firebaseArray($rootScope.user_ref.child($rootScope.currentUser.id).child("teamsAsLeader")).$add(teamID);


      $rootScope.addNotify($rootScope.currentUser.id, "A new team " + team.teamName + " has been created", "", "", "System");

      Materialize.toast("Your new team " + team.teamName + " has been created", 3000);
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
