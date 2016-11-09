var app = angular.module("clickApp", ["firebase"]); 
	app.controller("clickCtrl", 
			
		function($scope, $firebaseArray) {

			// Implementation the todoCtrl 
			// sync with firebaseArray
			var ref = firebase.database().ref("users");
			$scope.users = $firebaseObject(ref); //before: $firebaseArray
			var ref2 = firebase.database().ref("selected");
			$scope.selected = $firebaseObject(ref2);		// .selected[0]: selected
			//initialize the users store in firebase once
			
			var storage = {
			"ikari1":{"name":"ikari1","intro":"My hands stuck to my face again!","img":"./img/ikari.jpg"},
			"shinji":{"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg"},
			"ikari2":{"name":"ikari2","intro":"someone make me my sandwich!","img":"./img/ikari.jpg"}
			};
			
			var key;
			for (key in storage) {
				storage[key]["select"]="glyphicon glyphicon-unchecked";
			}
			
			//$scope.users.$add($scope.storage);	//users[0]: all users
			//$scope.users = storage;
			$scope.users.$add(storage);



			$scope.clickButton = function(event) {
				alert(event.target.id);
				if ($scope.users[0][event.target.id].select == "glyphicon glyphicon-check"){
					alert('che');
			      	$scope.users[0][event.target.id].select = "glyphicon glyphicon-unchecked";
			      	delete $scope.selected[0][event.target.id];
			    }
			    else if ($scope.users[0][event.target.id].select == "glyphicon glyphicon-unchecked"){
			      	alert('uncheck');
			      	$scope.users[0][event.target.id].select = "glyphicon glyphicon-check";
			      	$scope.selected[0][event.target.id]=$scope.users[0][event.target.id];
			    }
			    $scope.users.$save(0);
			    $scope.selected.$save(0);
		
			}; 
			
		}
	);
