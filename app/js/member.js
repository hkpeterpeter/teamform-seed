$(document).ready(function(){

	$('#member_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if(eventName != null && eventName !== '') {
		$('#text_event_name').text("Event name: " + eventName);
		$('#member_page_controller').show();
	}

	firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if(firebaseUser) {
        var user = firebase.auth().currentUser;
        $("#inputUserID").val(user.uid);
      	$("#inputUserName").val(user.displayName);
      }
      else {
      	$("#inputUserID").val("");
      	$("#inputUserName").val("");
      	$(".checkbox label input").prop("checked", false);
      }
    });

});

angular.module('teamform-member-app', ['firebase'])
.controller('MemberCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	// TODO: implementation of MemberCtrl	
	
	// Call Firebase initialization code defined in site.js
	$scope.userID = "";
	$scope.userName = "";	
	$scope.teams = {};
	$scope.userInfo = "";

	firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if(firebaseUser) {
        var user = firebase.auth().currentUser;
        $scope.userName = user.displayName;
        $scope.userID = user.uid;
        $scope.loadFunc();
        $scope.refreshTeams();
      }
      else {
      	$scope.userID = "";
		$scope.userName = "";
      }
    });

	$scope.loadFunc = function() {
		var userID = $scope.userID;
		if(userID !== '') {
			var refPath = getURLParameter("q") + "/member/" + userID;
			$scope.userInfo = $firebaseObject(firebase.database().ref(refPath));
			$scope.userInfo.$bindTo($scope, "data").then(function() {
				console.log($scope.data.selection);
				if($scope.data.name != null) {
					$scope.userName = $scope.data.name;
				} else {
					$scope.userName = "";
				}
				if($scope.data.selection != null) {
					$scope.selection = $scope.data.selection;
				} else {
					$scope.selection = [];
				}
			});
		}
	};
	
	$scope.saveFunc = function() {
		var userID = $.trim($scope.userID);
		var userName = $.trim($scope.userName);
		
		if(userID !== '' && userName !== '') {
			var newData = {
				'name': userName,
				'selection': $scope.selection
			};
			console.log(newData);
			var refPath = getURLParameter("q") + "/member/" + userID;
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