// $(document).ready(function(){
//
// 	$('#admin_page_controller').hide();
// 	$('#text_event_name').text("Error: Invalid event name ");
// 	var eventName = getURLParameter("q");
// 	if (eventName != null && eventName !== '' ) {
// 		$('#text_event_name').text("Event name: " + eventName);
// 	}
//
// });

angular.module('teamform-admin-app', ['firebase'])
.controller('profileCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	var self = this;
	initializeFirebase();
	// TODO: implementation of createEventCtrl
	var id = "";
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    user.providerData.forEach(function (profile) {

		id = firebase.auth().currentUser.uid;
  });
	}
 else {
    // No user is signed in.
  }
  });
	// Initialize $scope.param as an empty JSON object

	$scope.param = {};

	// Call Firebase initialization code defined in site.js


	var userID, refPath, ref;

  userID = "0zHAK5g7jqhtLOFrqgH5gzvYo9r1";
	refPath = "users/" + userID;
	ref = firebase.database().ref(refPath);

	$scope.param = $firebaseObject(ref);
	$scope.param.$loaded();

	var tagsPath = refPath + "/tags";
  $scope.tags = $firebaseObject(firebase.database().ref(tagsPath));
	$scope.displayDesc = true;
	$scope.newDesc = {text:""};


  $scope.showName = function() {

		return $scope.param.name ;

	}

	$scope.showDesc = function() {
		 return $scope.param.desc ;
	}

	$scope.hideDesc = function() {

		$scope.displayDesc = !$scope.displayDesc;

	}

	$scope.saveDesc = function() {

		$scope.param.desc = $scope.newDesc.text;
		$scope.param.$save();

	}
}]);
