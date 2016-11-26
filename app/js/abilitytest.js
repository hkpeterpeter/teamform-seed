$(document).ready(function(){

	$('#abilitytest_page_controller').hide();
	var testName = getURLParameter("u");
	$('#ability_test_name').text("Ability Test: " + testName);
});

angular.module('ability-test-app', ['firebase'])
.controller('AbilityTestCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$timeout',
	function($scope, $firebaseObject, $firebaseArray,$timeout) {

	firebase.auth().onAuthStateChanged(function(firebaseUser) {
		if(firebaseUser) {
			var user = firebase.auth().currentUser;
			$scope.uid = user.uid;
		}
	});

  	$scope.finished = false;
	$scope.param = {
		"answer" : []
	};

	$scope.modelAnswer = [];
	$scope.correctForQuestion = [];
	$scope.counter = 100;
	$scope.textCounter = "";

	var quizPath = "quiz/" + getURLParameter("u");
    $scope.quiz = [];
  	$scope.quiz = $firebaseArray(firebase.database().ref(quizPath));

	$scope.quiz.$loaded(function(list) {
		$scope.loadModelAnswer(list);
		$scope.counter = list.length * 60;
		$('#abilitytest_page_controller').show();
		$timeout($scope.onTimeout, 1000);
	});

	$scope.addanswer = function(option){
		for(var idx = 0; idx < $scope.param.answer.length; idx++) {
			if($scope.param.answer[idx].questionId == option.questionId) {
				$scope.param.answer[idx] = option;
				return;
			}
		}
		$scope.param.answer.push(option);
	};

	$scope.loadModelAnswer = function(quizList) {
		for (var i = 0; i < $scope.quiz.length; i++){
			$scope.modelAnswer.push(
				{questionId: $scope.quiz[i].$id,
					answer: $scope.quiz[i].answer
				});
		}
		console.log("Model ans: ", $scope.modelAnswer);
	};
	
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
	
	$scope.onTimeout = function(){
		$scope.counter--;
		$scope.textCounter = Math.floor($scope.counter / 60) + ":" + ($scope.counter % 60);
		if($scope.counter == 0) {
			$scope.submitFunc();
			return;
		}
		$timeout($scope.onTimeout, 1000);
	}

}]);
