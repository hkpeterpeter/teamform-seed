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
		
	};
	
	$scope.categorys = $firebaseArray(firebase.database().ref("newTags"));
	$scope.categorys.$loaded(function(data) {
		console.log($scope.categorys);
	});
	
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