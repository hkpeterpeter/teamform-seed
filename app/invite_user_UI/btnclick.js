var app = angular.module("todoApp", []); 
	app.controller("todoCtrl", 
			
		function($scope) {

			// Implementation the todoCtrl 
				
			$scope.todos = [
			{"name":"Tom","intro":"I like giant robot","img":"selfie.jpg"},
			{"name":"shinji","intro":"I am not a pussy","img":"selfie,jpg"},
			{"name":"ikarli","intro":"someone make me my sandwich!","img":"selfie.jpg"}];

			$scope.addNew = function(newTodo) {
			    $scope.todos.push({"text": newTodo, "done": false})
						    };
				
			$scope.findValue = function(item) {   
				$scope.results = [];
				var i=0, len=$scope.todos.length;
			    for (; i<len; i++) {
			      if ($scope.todos[i].text == item) {
			        $scope.results.push($scope.todos[i]);
			      }
			    }
			    
			    return $scope.results;
			};	
		}
	);