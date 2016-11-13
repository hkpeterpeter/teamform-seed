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

		$scope.modelanswer = [];

			$scope.quiz.$loaded(function(list){
			var i = 0
			for (; i < $scope.quiz.length; i++){
				$scope.modelanswer.push($scope.quiz[i].answer)
			}

			$scope.submitFunc = function() {
				var correctness = 0
				var userID = $.trim($scope.uid);
				for (var j = 0; j < $scope.modelanswer.length; j++){
					if ($scope.modelanswer[j] == $scope.param.answer[j]){
						correctness += 1
						}
					}
				var mark = correctness / $scope.quiz.length * 100
				var refPath = getURLParameter("q") +"/member/" + userID + "/ability/Java";
				var ref = firebase.database().ref(refPath);
				ref.update({marks: mark})
				var url = "member.html?q=" + getURLParameter("q");
				window.location.href= url
			};
		})
}]);
