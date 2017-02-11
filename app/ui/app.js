var app = angular.module("teamApp", ["ui.router","firebase"]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
          var ref = firebase.database().ref();
    return $firebaseAuth();
  }
]);

app.directive('quiz', function(quizFactory,$state) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.typeid=1;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
					scope.typeid=1;
				} else {
					scope.quizOver = true;
				}
			};


			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
					scope.typeid=1;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

scope.check = function() {
				console.log("haha");
			};

scope.exit = function() {
				$state.go('teamsearch');
			};

			scope.nextQuestion = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}
				scope.id++;
				scope.typeid=1;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "I love to take care of people and I'm good at it?",
			options: ["No", "Partial", "Yes"],
			answer: 2
		},
		{
			question: "I tend to trust most people.",
			options: ["No", "Partial", "Yes"],
			answer: 1
		},
		{
			question: "I am too strict with myself and others.",
			options: ["No", "Partial", "Yes"],
			answer: 1
		},
		{
			question: "I am more sensitive than most people; sometimes the world just seems too harsh.",
			options: ["No", "Partial", "Yes"],
			answer: 2
		},
		{	
			question: "Success, prestige and recognition really matter to me.",
			options: ["No", "Partial", "Yes"],
			answer: 1
		},
		{	
			question: "I am always aware of what needs to be corrected.",
			options: ["No", "Partial", "Yes"],
			answer: 2
		},
		{	
			question: "I am uncomfortable when people want an emotional response from me.",
			options: ["No", "Partial", "Yes"],
			answer: 0
		},
		{	
			question: "I am more organized than most.",
			options: ["No", "Partial", "Yes"],
			answer: 1
		},
		{	
			question: "Personal relationships are by far the most important thing in my life.",
			options: ["No", "Partial", "Yes"],
			answer: 1
		},
		{	
			question: "I get bored more easily than most people; I am always looking for new experiences.",
			options: ["No", "Partial", "Yes"],
			answer: 0
		},
		{	
			question: "I am more formal than most people.",
			options: ["No", "Partial", "Yes"],
			answer: 1
		},
		{	
			question: "I am highly individualistic.",
			options: ["No", "Partial", "Yes"],
			answer: 2
		},
		{	
			question: "Sometimes I have overextended myself in trying to help people.",
			options: ["No", "Partial", "Yes"],
			answer: 1
		},
		{	
			question: "I tend to avoid conflict.",
			options: ["No", "Partial", "Yes"],
			answer: 2
		},
		{	
			question: "I almost never lose control of myself.",
			options: ["No", "Partial", "Yes"],
			answer: 2
		},
		{	
			question: "I am good at getting things done.",
			options: ["No", "Partial", "Yes"],
			answer: 2
		},
		{	
			question: "It's hard to stay passionate and focused.",
			options: ["No", "Partial", "Yes"],
			answer: 0
		},
		{	
			question: "I'm good at motivating people.",
			options: ["No", "Partial", "Yes"],
			answer: 2
		}

	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});

// Controller
$scope.isLast = function(check) {
    var cssClass = check ? 'last' : null;
    return cssClass;
};









app.controller("levelCtrl",  

	// Implementation the todoCtrl 
	function($scope, $firebaseArray,$window,$timeout) {
        $scope.current = 0;
        $scope.total = 100;
        value = '0%';
		var ref=firebase.database().ref("pi");
    	ref.orderByChild("Name").equalTo("Kit").once("child_added", function(dataRef) {
            $scope.$apply(function() {
            $scope.level = dataRef.child("level").val();
            $scope.current = dataRef.child("current").val();
            $scope.total = dataRef.child("total").val();
            $scope.value = $scope.current/$scope.total*100 + "%";
            knobfunction($scope.value);
           });
        });
        
        $scope.add = function (){
			$scope.current=0;
            $scope.total = 150;
            $scope.level = 6;
            $scope.value = ($scope.current)/$scope.total*100 +"%";
            knobfunction($scope.value);
            //window.alert("Congratulation! Level Up!");
        };

    }
);

function compile(element){
  var el = angular.element(element);    
  $scope = el.scope();
    $injector = el.injector();
    $injector.invoke(function($compile){
       $compile(el)($scope)
    })     
}