$(document).ready(function(){

	$('#abilitytest_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var testName = getURLParameter("u");
	$('#ability_test_name').text("Ability Test: " + testName);
	$('#abilitytest_page_controller').show();
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

  	$scope.finished = false;
	$scope.param = {
		"answer" : []
	};

	$scope.addanswer = function(option){
		console.log("Addanswer: ", option);
		$scope.param.answer.push(option);
	};

	$scope.modelAnswer = [];

	$scope.quiz.$loaded(function(list) {
		$scope.loadModelAnswer(list);
	});

	$scope.loadModelAnswer = function(quizList) {
		for (var i = 0; i < $scope.quiz.length; i++){
			$scope.modelAnswer.push(
				{questionId: $scope.quiz[i].$id,
					answer: $scope.quiz[i].answer
				});
		}
		console.log("Model ans: ", $scope.modelAnswer);
	};

	$scope.correctForQuestion = [];
	
	$scope.isCorrect = function(qid) {
		for(var idx = 0; idx < $scope.correctForQuestion.length; idx++) {
			if($scope.correctForQuestion[idx] == qid) return true;
		}
		return false;
	}
	
	$scope.submitFunc = function() {
		$scope.finished = true;
		$scope.correctness = 0
		for (var i = 0; i < $scope.param.answer.length; i++) {
			for(var j = 0; j < $scope.modelAnswer.length; j++) {
				if ($scope.param.answer[i].questionId == $scope.modelAnswer[j].questionId
					&& $scope.param.answer[i].answer == $scope.modelAnswer[j].answer){
					$scope.correctness += 1
					$scope.correctForQuestion.push($scope.modelAnswer[j].questionId);
					break;
				}
			}
		}
		var mark = $scope.correctness / $scope.quiz.length * 100
		
		var userID = $.trim($scope.uid);
		var refPath = "user/" + userID + "/ability/" + getURLParameter("u");
		var ref = firebase.database().ref(refPath);
		ref.update({marks: mark, takenAt: Math.floor(new Date().getTime()/1000)})
	};

}]);
