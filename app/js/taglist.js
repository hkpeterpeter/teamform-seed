$(document).ready(function(){
});

angular.module('teamform-taglist-app', ['firebase'])
.directive('login', function() {
    return {
        restrict: 'A',
        templateUrl: 'login.html'
    };
})
.controller('TagListCtrl', ['$scope', '$firebaseObject', '$firebaseArray', 
	function($scope, $firebaseObject, $firebaseArray) {
	
	firebase.auth().onAuthStateChanged(function(firebaseUser) {
		if(firebaseUser) {
			$scope.userId = firebase.auth().currentUser.uid;
			$scope.loadCallback();
		} else {
    		window.location.href= "index.html" ;
		}
	});
	
	$scope.alreadyTaken = [];
	
	$scope.loadCallback = function() {
		$scope.memberInfo = $firebaseObject(firebase.database().ref("user/" + $scope.userId));
		$scope.memberInfo.$loaded(function(data) {
			if(data.ability === undefined || data.ability.length < 1) return;
			angular.forEach(data.ability, function(ability, abilityName) {
				var info = {};
				info.abilityName = abilityName;
				info.takenAt = ability.takenAt;
				$scope.alreadyTaken.push(info);
			});
		});
	};
	
	$scope.canTake = function(quizName) {
		// no this quiz
		if($scope.getCorrespondQuizLink(quizName) === undefined) return false;
		
		// check whether the user has already taken this quiz within 30 days
		for(var idx = 0; idx < $scope.alreadyTaken.length; idx++) {
			console.log("Enter2", $scope.alreadyTaken[idx]);
			if($scope.alreadyTaken[idx].abilityName.toLowerCase() == quizName.toLowerCase()) {
				console.log("Enter");
				return $scope.alreadyTaken[idx].takenAt + 86400 * 30 < new Date().getTime()/1000;
			}
		}
		return true;
	};
	
	$scope.categorys = $firebaseArray(firebase.database().ref("newTags"));
	$scope.quizList = $firebaseArray(firebase.database().ref("quiz"));
	
	
	$scope.removeSpace = function(raw) {
		return raw.replace(/\s/g, '');
	};
	
	$scope.getCorrespondQuizLink = function(tagName) {
		tagName = tagName.toLowerCase();
		for(var idx = 0; idx < $scope.quizList.length; idx++) {
			if($scope.quizList[idx].$id.toLowerCase() == tagName) {
				return $scope.quizList[idx].$id;
			}
		}
	}
}]);