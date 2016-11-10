$(document).ready(function(){

	$('#member_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if(eventName != null && eventName !== '') {
		$('#text_event_name').text("Event name: " + eventName);
		$('#member_page_controller').show();
	}

});

angular.module('teamform-member-app', ['firebase'])
.controller('MemberCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	// TODO: implementation of MemberCtrl	

	$scope.userID = "";
	$scope.userName = "";	
	$scope.teams = {};
	$scope.userInfo = "";
	$scope.memberInfo = "";
	$scope.uid = "";
	$scope.name = "";
	$scope.teamStatus = "";

	firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if(firebaseUser) {
      	var user = firebase.auth().currentUser;
        $scope.uid = user.uid;
        $scope.name = user.displayName;
        $scope.loadFunc();
      }
      else {
      	$scope.userID = "";
      	$scope.userName = "";
      	$scope.uid = "";
      	$scope.name = "";
      	$scope.selection = [];
      	$("input").prop("disabled", true);
      }
    });

	$scope.loadFunc = function() {
		var refPath = getURLParameter("q") + "/member/" + $scope.uid;
		$scope.userInfo = $firebaseObject(getUserWithId($scope.uid));
		$scope.userInfo.$loaded().then(function() {
			$scope.userID = $scope.userInfo.$id;
			if($scope.userInfo.name != null) {
				$scope.userName = $scope.userInfo.name;
			} else {
				$scope.userName = $scope.name;
			}
			if($scope.userInfo.selection != null) {
				$scope.selection = $scope.userInfo.selection;
			} else {
				$scope.selection = [];
			}
		});
		$scope.memberInfo = $firebaseObject(firebase.database().ref(refPath));
		$scope.memberInfo.$loaded().then(function() {			
			if($scope.memberInfo.inTeam != null) {
				$("#teamStatus").html("You have joined team " + $scope.memberInfo.inTeam);
			}
			else {
				$("#teamStatus").html("You haven't joined any team. Check the box below to request to join\
				 the team or <a href=\"team.html?q=" + getURLParameter("q") + "\">Click here</a> to create\
				  a team.");
			}
		});
	};
	
	$scope.saveFunc = function() {
		var userID = $.trim($scope.userID);
		var userName = $.trim($scope.userName);
		
		if(userID !== '' && userName !== '') {
			var newData = {
				'selection': $scope.selection,
				'weight': 0 
			};
			var refPath = getURLParameter("q") + "/member/" + userID;
			var ref = firebase.database().ref(refPath);
			ref.update(newData);
			refPath = "user/" + userID;
			ref = firebase.database().ref(refPath);
			ref.update({ name: userName }, function() {
				window.location.href = "index.html";
			});
		}
	};
	
	$scope.refreshTeams = function() {
		var refPath = getURLParameter("q") + "/team";
		var ref = firebase.database().ref(refPath);
		
		// Link and sync a firebase object
		$scope.selection = [];
		$scope.toggleSelection = function (item) {
			var idx = $scope.selection.indexOf(item);
			if(idx > -1) {
				$scope.selection.splice(idx, 1);
			}
			else {
				$scope.selection.push(item);
			}
		}
		$scope.teams = $firebaseArray(ref);
		$scope.teams.$loaded()
			.then(function(data) {}) 
			.catch(function(error) {});
	};

	$scope.refreshTeams(); // call to refresh teams...
}]);