$(document).ready(function(){
	$("#profile_page_controller").hide();
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
	
	firebase.auth().onAuthStateChanged(function(firebaseUser) {
		if(firebaseUser) {
			var user = firebase.auth().currentUser;
			$scope.myId = user.uid;
			
			$scope.lookForId = getURLParameter("q")? getURLParameter("q"): $scope.myId;
			$scope.loadCallback();
		} else {
			document.getElementById('login-form').style.display='block';
		}
	});
	
	$scope.inEventInfo = [];
	$scope.abilityInfo = [];
	$scope.userInfo = {};
	
	$scope.queue = [];
	$scope.loadCallback = function() {
		$scope.joinedEvent = $firebaseArray(firebase.database().ref("user/" + $scope.lookForId + "/joinedEvent"));
		$scope.joinedEvent.$loaded(function(eventList) {
			angular.forEach(eventList, function(event) {
				var info = {};
				info.eventId = event.$value;
				var memberInfo = $firebaseObject(firebase.database().ref(event.$value + "/member" + $scope.lookForId));
				memberInfo.$loaded().then(function() {
					console.log("Then2");
					info.inTeam = memberInfo.inTeam;
					info.invitedBy = memberInfo.invitedBy;
					$scope.inEventInfo.push(info);
				});
			});
		});
		
		var refPath = "user/" + $scope.lookForId + "/ability";
		$scope.abilityInfo = $firebaseArray(firebase.database().ref(refPath));
		
		refPath = "user/" + $scope.lookForId;
		$scope.userInfo = $firebaseObject(firebase.database().ref(refPath));
		$scope.userInfo.$loaded(function(data) {
			$scope.userEmail = data.email == null? "Unknown": data.email;
			$("#profile-photo").attr("src", data.photoUrl? data.photoUrl: "images/dp.jpg");
			$("#profile_page_controller").show();
		});
	}
	
	$scope.isMyPage = function() {
		return $scope.lookForId == $scope.myId;
	}
	
	$scope.changePhoto = function() {
		if(!$scope.toPhotoUrl) return;
		
		$scope.userInfo.photoUrl = $scope.toPhotoUrl;
		$("#profile-photo").attr("src", $scope.userInfo.photoUrl);
		$scope.userInfo.$save();
		$scope.toPhotoUrl = "";
	};
	
	$scope.saveDescription = function() {
		$scope.userInfo.$save();
	}
	
	$scope.getRetakeDate = function(takenAt) {
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