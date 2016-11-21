teamapp.controller('eventX', ['$scope', "$rootScope", "$firebaseObject", "$firebaseArray", function($scope, $rootScope, $firebaseObject, $firebaseArray) {

  //FAKE $rootScope.clickedEvent
  $scope.currentEvent = 0;

  $scope.currentUser = $rootScope.currentUser.id;
  $scope.events = $rootScope.events;
  $scope.users = $rootScope.users;
  $scope.teams = $rootScope.teams;
  $scope.showTeams = true;
  $scope.showTeamForm = false;
  $scope.create_team = "create team";




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
    for (var i in allData.users[$scope.currentUser].teamsAsMember) {
      candidate = allData.users[$scope.currentUser].teamsAsMember[i];
      if (allData.teams[candidate] != undefined && allData.teams[candidate].belongstoEvent == $scope.currentEvent) {
        $scope.currentTeam = candidate;
        break;
      }
    }

    $scope.readyData = $scope.processData(allData, $scope.currentEvent, $scope.currentTeam, $scope.currentUser);
  };

  $scope.initShowBody = function(id) {
    if ($scope.clickCount == 0) {
      $(".collapsible-body-" + id).slideToggle(100);
    }
  };

  $scope.createTeam = function($event, id) {
    $scope.showTeams = !$scope.showTeams;
    $scope.showTeamForm = !$scope.showTeamForm;
    $scope.create_team = $scope.showTeams ? "create team" : "cancel";
    $event.stopPropagation();
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
    $event.stopPropagation();
  };

}]);


// teamapp.directive("fishNavi", function() {
// 	return {
// 		restrict: "E",
// 		templateUrl: "fish/fish-navi.html",
// 	};
// });
