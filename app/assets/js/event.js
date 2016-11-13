




angular.module('teamform-event-app', ['firebase'])
.controller('EventCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	initalizeFirebase();
	$scope.input = {teamname:''};

	var refPath;
	eventName = getURLParameter("q");
	refPath = "/event/" + eventName + "/param";
	ref = firebase.database().ref(refPath);
	$scope.eventinfo = $firebaseObject(ref);

	$scope.createteam = function() {
		
		// Finally, go back to the front-end
		var path = eventName +"&tn=" + $scope.input.teamname;
		window.location.href= "manage_team.html?q="+ path;
	}
 
}]);