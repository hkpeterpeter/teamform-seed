
teamapp.controller('fishCtrl', ['$scope', "$rootScope", "$firebaseObject", "$firebaseArray", function($scope,$rootScope, $firebaseObject, $firebaseArray) {

	$scope.allTeams=[{teamID: "1", teamName: "Eevee", teamDescription: "Nothing here",
					teamLeader: {email:"1v@eev.ee", name: "Eevee", description:"None"},
					teamMembers:[{email:"1v@eev.ee", name: "Glaceon", description:"None"},
					{email:"1v@eev.ee", name: "Sylveon", description:"None"}]},
					{teamID: "2", teamName: "Eevee2", teamDescription: "Nothing here",
					teamLeader: {email:"1v@eev.ee", name: "Eevee2", description:"None"},
					teamMembers:[{email:"1v@eev.ee", name: "Glaceon2", description:"None"},
					{email:"1v@eev.ee", name: "Sylveon2", description:"None"}]}];

//keep consistent with Hamster,,,
	$rootScope.currentEvent = 0;
    $rootScope.currentTeam = 0;
    $rootScope.currentUser = 0;

    $scope.events = $rootScope.events;
    $scope.users = $rootScope.users;
    $scope.teams = $rootScope.teams;


    var allData = $firebaseObject(firebase.database().ref("/"));
    $scope.processData=function(allData, currentEventID, currentTeamID, currentUserID){
    	var events = allData.events;

    	var curEvent = {eventName: events[currentEventID].eventName, cventDescription: events[currentEventID].description,
    					eventBG: events[currentEventID].imageURL};

    	var teamsCurEvent = [];

    	var teams = allData.teams;

    	for (var key in teams){
    		var t = teams[key];
    		if (t.belongstoEvent == currentEventID && (key == currentTeamID || t.isPrivate == false)){
    			t.teamID = key;
    			teamsCurEvent.push(t);
    		}
    	}


    	//move my team in the first position
    	for (var i = 0; i < teamsCurEvent.length; i++){
    		if (teamsCurEvent[i].teamID == currentTeamID){
    			var temp = teamsCurEvent[0];
    			teamsCurEvent[0] = teamsCurEvent[i];
    			teamsCurEvent[i] = temp;
    		}
    	}

    	

    };





    $scope.currentEvent = $firebaseObject(firebase.database().ref('events/' + $rootScope.currentEvent));
    $rootScope.currentUser = $firebaseObject(firebase.database().ref('users/' + $rootScope.currentUser));
    $scope.currentTeam = $firebaseObject(firebase.database().ref('teams/' + $rootScope.currentTeam));
   // console.log($scope.currentEvent);

	$scope.showBody=function(id){
				$(".collapsible-body-"+id).slideToggle(100);
			};
}]);


teamapp.directive("fishNavi", function() {
    return {
        restrict: "E",
        templateUrl: "fish/fish-navi.html",
    };
});

