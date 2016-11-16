describe('Test ability.js', function() {
   
	var $scope, $rootScope, $controller;
	if(firebase.apps.length === 0) {
		initalizeFirebase();
	}
	
	beforeEach(function() {
		module('ability-test-app');
		console.log("Ability test");
		inject(function($rootScope, $controller) {
			$scope = $rootScope.$new();
			$controller('AbilityTestCtrl', {$scope: $scope});
		});
	});
	
	describe('addanswer', function() {
		it('add Answer', function() {
			$scope.param.answer = [1,2,3];
			
			$scope.addanswer(0);
			expect($scope.param.answer.length).toEqual(4);
			
			$scope.addanswer(2);
			expect($scope.param.answer.length).toEqual(5);
		});
	});
	
	describe('submitFunc', function() {
		it('3 correct out 5', function() {
			$scope.uid = "userId";
			$scope.modelAnswer = [
				"Correct1", "Correct2", "Correct3",
				"Correct4", "Correct5"];
			$scope.param.answer = [
				"Correct1", "Wrong2", "Correct3",
				"Wrong4", "Correct5"
			];
			$scope.quiz.length = $scope.modelAnswer.length;
			
			$scope.submitFunc();
			expect($scope.correctness).toEqual(3);
		});
	});
	
	describe('loadModelAnswer', function() {
		it('load all', function() {
			$scope.quiz = [
				{question: "Question1", answer: "Answer1"},
				{question: "Question3", answer: "Answer2"},
				{question: "Question3", answer: "Answer3"},
			];
			
			$scope.loadModelAnswer($scope.quiz);
			expect($scope.modelAnswer.length).toEqual(3);
			expect($scope.modelAnswer[2]).toEqual("Answer3");
		});
	});
	

});