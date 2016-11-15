$(document).ready(function(){

	$('#admin_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' ) {
		$('#text_event_name').text("Event name: " + eventName);

	}

});

angular.module('teamform-admin-app', ['firebase'])
.controller('profileCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

	// Initialize $scope.param as an empty JSON object
	$scope.param = {};

	// Call Firebase initialization code defined in site.js
	initalizeFirebase();

	var userID, refPath, ref;

  userID = "9uJ5BtAxCcVvHmHix0OB7GtJMkj1";
	refPath = "users/" + userID;
	ref = firebase.database().ref(refPath);

	// Link and sync a firebase object

	$scope.param = $firebaseObject(ref);
	$scope.param.$loaded()
		.then( function(data) {
			console.log(data);
			// Fill in some initial values when the DB entry doesn't exist
			if(typeof $scope.param.maxTeamSize == "undefined"){
				$scope.param.maxTeamSize = 10;
			}
			if(typeof $scope.param.minTeamSize == "undefined"){
				$scope.param.minTeamSize = 1;
			}

			// Enable the UI when the data is successfully loaded and synchornized
			$('#admin_page_controller').show();
		})
		.catch(function(error) {
			// Database connection error handling...
			//console.error("Error:", error);
		});

  var tagsPath = refPath + "/tags";
  $scope.tags = $firebaseObject(firebase.database().ref(tagsPath));


  $scope.showName = function() {
    var nameRef;

    nameRef = refPath + "/name";
		$scope.name = $firebaseObject(firebase.database().ref(nameRef));

		return $scope.param.name ;

	}

			// Fill in some initial values when the DB entry doesn't exist



}]);
