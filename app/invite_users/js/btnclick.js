var app = angular.module("clickApp", ["firebase"]); 
	app.controller("clickCtrl", 
			
		function($scope, $firebaseArray) {

			// Implementation the todoCtrl 
			// sync with firebaseArray
			var ref = firebase.database().ref("clickApp");
			$scope.users = $firebaseArray(ref);
			
			/*initialize the users store in firebase once
			$scope.storage = [
			{"name":"ikari1","intro":"My hands stuck to my face again!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked"},
			{"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg","select":"glyphicon glyphicon-unchecked"},
			{"name":"ikari2","intro":"someone make me my sandwich!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked"}];
			
			$scope.users.$add($scope.storage[0]);
			$scope.users.$add($scope.storage[1]);
			$scope.users.$add($scope.storage[2]);
			
			for (var i=0; i<$scope.users.length; i++) {
				$scope.users[i].select ="glyphicon glyphicon-unchecked";
			}
			*/

			var ref2 = firebase.database().ref("clickApp2");
			$scope.selected = $firebaseArray(ref2);


			$scope.clickButton = function(event) {
			    var i=0, len=$scope.users.length;
			    
				for (; i<len; i++) {
			      if ($scope.users[i].name == event.target.id) {
			      	
			      	if ($scope.users[i].select == "glyphicon glyphicon-check"){
			      		$scope.users[i].select = "glyphicon glyphicon-unchecked";
			      		$scope.users.$save(i).then(function(ref){
			      			ref.key() == $scope.users[i].$id; //true
			      		})
			      		for (var j=0; j<$scope.selected.length;j++){
			      			if ($scope.selected[j].name == event.target.id){
			      				$scope.selected.$remove($scope.selected[j]);
			      				//$scope.selected.splice(j,1);
			      			}
			      		}
			      		//alert("unselected")
			      	}
			      	else if ($scope.users[i].select == "glyphicon glyphicon-unchecked"){
			      		$scope.users[i].select = "glyphicon glyphicon-check";
			      		$scope.users.$save(i).then(function(ref){
			      			ref.key() == $scope.users[i].$id; //true
			      		})
			      		$scope.selected.$add($scope.users[i])
			      		//alert("selected");
			      	}
			        break;
			      }
			      
			    }
				
			}; 
			
		}
	);
