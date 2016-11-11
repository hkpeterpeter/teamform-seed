$(document).ready(function(){

	$('#member_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if(eventName != null && eventName !== '') {
		$('#text_event_name').text("Event name: " + eventName);
		$('#member_page_controller').show();
	}

});

angular.module('ability-test-app', ['firebase'])
.controller('AbilityTestCtrl', ['$scope', '$firebaseObject', '$firebaseArray',
	function($scope, $firebaseObject, $firebaseArray) {
	
	firebase.auth().onAuthStateChanged(function(firebaseUser) {
		if(firebaseUser) {
			var user = firebase.auth().currentUser;
	        	$scope.uid = user.uid;
		}
	});
	
	$scope.quiz = [];
  	$scope.quiz = $firebaseArray(firebase.database().ref("quiz/java"));
		
	$scope.param = {
		"answer" : []
	};
		
	$scope.addanswer = function(option){
		$scope.param.answer.push(option);
	};

	$scope.submitFunc = function() {
		var userID = $.trim($scope.uid);
		var newData = {
			'answers': $scope.param.answers
		};
		var refPath = getURLParameter("q") +"/member/" + userID;
		var ref = firebase.database().ref(refPath);
		ref.update({answer: $scope.param.answer})
		window.location.href = "index.html";
	};
		
	
}]);
