var app = angular.module("clickApp", ["firebase"]); 
	app.controller("clickCtrl", 
			
		function($scope, $firebaseObject, $firebaseArray) {
			// Implementation the todoCtrl 
			//alert("adsadsads");
			var ref = firebase.database().ref("users");
			
			$scope.users = $firebaseObject(ref); //before: $firebaseArray
			/*
			$scope.users.ikari1={"name":"ikari1","intro":"My hands stuck to my face again!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["c++","java"]};
			$scope.users.shinji={"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg","select":"glyphicon glyphicon-unchecked","tag":["angular"]};
			$scope.users.ikari2={"name":"ikari2","intro":"someone make me my sandwich!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["firebase","sql"]};
			$scope.users.$save();
			*/
			var ref2 = firebase.database().ref("selected");
			
			$scope.selected = $firebaseObject(ref2);		// .selected[0]: selected
			
			var ref3 = firebase.database().ref("filtered");
			//initialize $scope.filtered
			$scope.filtered = $firebaseObject(ref3);
			//$scope.filtered.aa = {};
			//$scope.filtered.$save();
			/*
			forEach($scope.users, function(value, key){
				alert(key);
				//$scope.filtered[key] = $scope.users[key]; // .key => ["key"]  !=  [key] 
			});
			*/
			

			$scope.filterUser = function(tag) {   
				var result = {};
				for (key in $scope.users) {
				    if (tag in $scope.users[key].tag) {
				       result.key = $scope.users.key;
				    }
				}
				    
				return $scope.results;
			};	


			$scope.clickButton = function(event) {
				var username = event.target.id;
				//alert(event.target.id);
				if ($scope.users[username].select == "glyphicon glyphicon-check"){
					//alert(event.target.id+' before: check');
			      	
			      	$scope.users[username].select = "glyphicon glyphicon-unchecked";
			      	$scope.users.$save();

			      	delete $scope.selected[username];
			      	alert("change to uncheck");			      	
				    $scope.selected.$save();
			    }
			    else if ($scope.users[username].select == "glyphicon glyphicon-unchecked"){
			      	//alert(event.target.id+' before: uncheck');
			      	$scope.users[username].select = "glyphicon glyphicon-check";
			      	$scope.users.$save();

			      	$scope.selected[username]=$scope.users[username];
			      	alert("change to check");
				    $scope.selected.$save();
			    }
			    
		
			}; 
			
		}
	);
