$(document).ready(function(){
});

angular.module('teamform-profile-app', ['firebase'])
.directive('login', function() {
    return {
        restrict: 'A',
        templateUrl: 'login.html'
    };
})
.controller('ProfileCtrl', ['$scope', '$firebaseObject', '$firebaseArray', 
	function($scope, $firebaseObject, $firebaseArray) {
	
	$scope.userEmail = "Unknown";
	
	firebase.auth().onAuthStateChanged(function(firebaseUser) {
		if(firebaseUser) {
			var user = firebase.auth().currentUser;
			console.log(user);
			$scope.userId = user.uid;
			$scope.userName = user.displayName;
			$scope.userEmail = user.email;
			if(user.photoURL) {
				$("#profile-photo").attr("src", user.photoURL); 
			}
			$scope.loadCallback();
		} else {
			window.location.href = "index.html";
		}
	});
	
	$scope.category = $firebaseArray(firebase.database().ref("newTags"));

	
	$scope.inEventInfo = [];
	$scope.inEventMemberInfo = [];
	
	$scope.loadCallback = function() {
		$scope.joinedEvent = $firebaseArray(firebase.database().ref("user/" + $scope.userId + "/joinedEvent"));
		$scope.joinedEvent.$loaded(function(eventList) {
			for(var idx = 0; idx < eventList.length; idx++) {
				var info = {
					eventId: "",
					inTeam: "",
					invitedBy: []
				};
				info.eventId = $scope.joinedEvent[idx].$value;
				$firebaseObject(firebase.database().ref(eventList[idx].$value + "/member/" + $scope.userId))
					.$loaded(function(memberInfo) {
						info.inTeam = memberInfo.inTeam;
						info.invitedBy = memberInfo.invitedBy;
						console.log("InvitedBy", info);
						$scope.inEventInfo.push(info);
				});
			}
		});
		
		var refPath = "user/" + $scope.userId + "/ability";
		$scope.abilityInfo = $firebaseArray(firebase.database().ref(refPath));
	}
	
	$scope.abilityInfo = [];
	
	$scope.getRetakeDate = function(takenAt) {
		console.log("Time: ", new Date().getTime() / 100, takenAt);
		var diff = takenAt - (new Date().getTime() / 1000) + (30 * 86400);
		if(diff <= 0) return "now";
		return "after " + Math.round(diff / 86400) + " days";
	}
	
	$scope.hasInvitation = function(eventInfos) {
		if(eventInfos === undefined || eventInfos.length < 1) return false;
		for(var idx = 0; idx < eventInfos.length; idx++) {
			if(eventInfos[idx].invitedBy !== undefined) return true;
		}
		return false;
	}
	
	
}]);