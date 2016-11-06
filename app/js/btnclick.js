var app = angular.module("clickApp", ["firebase"]); 
	app.controller("clickCtrl", 
			
		function($scope, $firebaseArray) {

			// Implementation the todoCtrl 
				
			$scope.users = [
			{"name":"Tom","intro":"I like giant robot","img":"./img/selfie.jpg"},
			{"name":"shinji","intro":"I am not a pussy","img":"./img/selfie.jpg"},
			{"name":"ikarli","intro":"someone make me my sandwich!","img":"./img/selfie.jpg"}];
			

			for (var i=0; i<$scope.users.length; i++) {
				$scope.users[i].select ="glyphicon glyphicon-unchecked";
			}

			$scope.selected = [$scope.users[0]];


			$scope.clickButton = function(event) {
			    var i=0, len=$scope.users.length;
			    
				for (; i<len; i++) {
			      if ($scope.users[i].name == event.target.id) {
			      	
			      	if ($scope.users[i].select == "glyphicon glyphicon-check"){
			      		$scope.users[i].select = "glyphicon glyphicon-unchecked";
			      		for (var j=0; j<$scope.selected.length;j++){
			      			if ($scope.selected[j].name == event.target.id){
			      				$scope.selected.splice($scope.selected[j],1);
			      			}
			      		}
			      	}
			      	else if ($scope.users[i].select == "glyphicon glyphicon-unchecked"){
			      		$scope.users[i].select = "glyphicon glyphicon-check";
			      		$scope.selected.push($scope.users[i])
			      		//alert($scope.selected);
			      	}
			        break;
			      }
			      
			    }
				
			}; 
			
		}
	);
