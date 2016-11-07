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
	
	// Call Firebase initialization code defined in site.js
	$scope.userID = "";
	$scope.userName = "";	
	$scope.teams = {};
	$scope.userInfo = "";
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
		$scope.userInfo = $firebaseObject(firebase.database().ref(refPath));
		$scope.userInfo.$bindTo($scope, "data").then(function() {
			if($scope.data.userid != null) {
				$scope.userID = $scope.data.userid;
			}
			else {
				$scope.userID = $scope.uid;
			}
			if($scope.data.name != null) {
				$scope.userName = $scope.data.name;
			} else {
				$scope.userName = $scope.name;
			}
			if($scope.data.selection != null) {
				$scope.selection = $scope.data.selection;
			} else {
				$scope.selection = [];
			}
			if($scope.data.inTeam != null) {
				$("#teamStatus").html("You have joined team " + $scope.data.inTeam);
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
				'userid': userID,
				'name': userName,
				'selection': $scope.selection,
				'weight': 0 
			};
			console.log(newData);
			var refPath = getURLParameter("q") + "/member/" + $scope.uid;
			var ref = firebase.database().ref(refPath);
			ref.set(newData, function() {
				window.location.href= "index.html";
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