angular.module('teamform-event-app', ['firebase'])
.controller('EventCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	initalizeFirebase();
	$scope.input = {teamname:''};

	var refPath;
	eventName = getURLParameter("q");
	refPath = "/event/" + eventName + "/param";
	ref = firebase.database().ref(refPath);
	$scope.eventinfo = $firebaseObject(ref);

<<<<<<< HEAD
	$scope.param =
	{
		"EventName" : '',
		
		"MaxTeam" : 0,
		"No_of_Team": 0,
		"TeamSize": 0

	};
	
	$scope.createteam = function() {
=======
	$scope.createteam = function(teamname) {
>>>>>>> 672a1daba15bca12ff03d680e64125a3ede760e5
		
		if(teamname!='null')
		{
			var path = eventName +"&tn=" + $scope.input.teamname;
			window.location.href= "manage_team.html?q="+ path;
			return true;
		}
		else
		{
			return false;
		}	
	}

	    var eventRef, refPath;

    teamPath = "/event/" + eventName +"/team" ;
    teamRef = firebase.database().ref(teamPath);
    $scope.teams = [];
    $scope.teams = $firebaseArray(teamRef);


    $scope.viewteam = function(teamname) {
        // Finally, go back to the front-end
        window.location.href= "team.html?q=" + eventName +"&tn=" + teamname;

    }











 
}]);