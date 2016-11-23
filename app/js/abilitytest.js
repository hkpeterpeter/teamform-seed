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

	var quizPath = "quiz/" + getURLParameter("u");
    $scope.quiz = [];
  	$scope.quiz = $firebaseArray(firebase.database().ref(quizPath));

	$scope.param = {
		"answer" : []
	};

	$scope.addanswer = function(option){
		$scope.param.answer.push(option);
	};

	$scope.modelAnswer = [];

	$scope.quiz.$loaded(function(list) {
		$scope.loadModelAnswer(list);
	});

	$scope.loadModelAnswer = function(quizList) {
		for (var i = 0; i < $scope.quiz.length; i++){
			$scope.modelAnswer.push($scope.quiz[i].answer)
		}
	};

	$scope.submitFunc = function() {
		$scope.correctness = 0
		var userID = $.trim($scope.uid);
		for (var j = 0; j < $scope.modelAnswer.length; j++){
			if ($scope.modelAnswer[j] == $scope.param.answer[j]){
				$scope.correctness += 1
			}
		}
		var mark = $scope.correctness / $scope.quiz.length * 100
		var refPath = getURLParameter("q") +"/member/" + userID + "/ability/" + getURLParameter("u");
		var ref = firebase.database().ref(refPath);
		ref.update({marks: mark})
		if (mark >= 50){
				window.alert("You pass the ability test, your marks is " + mark)
		}
		else{
				window.alert("You fail the ability test, your marks is " + mark)
		}
		var url = "member.html?q=" + getURLParameter("q");
		window.location.href= url
	};

}]);
