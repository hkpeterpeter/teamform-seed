var app1 = angular.module("clickApp", ["firebase"]);
app1.controller("clickCtrl",
		function($scope, $firebaseObject, $firebaseArray) {
			// Implementation the todoCtrl
			var user_list = $firebaseObject(firebase.database().ref("userList"));
			var event_list = $firebaseObject(firebase.database().ref("eventList"));
			//don't put the reference on the $scope until $loaded is done.
			//initialize the variables and scope
			var user_event1;
			$scope.users = {};
			$scope.filtered = {};
			$scope.selected = {};
			$scope.currentTag = [];
			$scope.resultTag = [];
			$scope.tag={};
			user_list.$loaded(function() {
				event_list.$loaded(function(){
					$scope.users = user_list;
					//alert($scope.users["iamauthur"]["name"]);
					user_event1 = event_list["comp3111"]["inEventUser"];
					$scope.event1 = event_list["comp3111"];
					//alert($scope.event1["skills"]["angular"]);
					for (var i=0; i<user_event1.length; i++) {
						var user_name = user_event1[i];
						$scope.users[user_name] = user_list[user_name];
						$scope.users[user_name]["select"] = "glyphicon glyphicon-unchecked";
						$scope.filtered[user_name] = user_list[user_name];
						$scope.filtered[user_name]["select"] = "glyphicon glyphicon-unchecked";
					}		
					//alert(event_list["event1"]);
					$scope.tag = event_list["comp3111"]["skills"];
					angular.forEach($scope.tag, function(value,key){
						$scope.currentTag.push(key);
					});
				});
			});
					

			//add current tag to chosen tag
			$scope.reset = function(index){
				var key;
				$scope.resultTag.push($scope.currentTag[index]);
				var temp = $scope.currentTag;
				$scope.currentTag = [];
				for(var i = 0;i < temp.length;i++){
					if(i != index){
						$scope.currentTag.push(temp[i]);
					}
				}
				//filtered: if user does not have tag, remove the user
				angular.forEach($scope.filtered, function(value,key){
					if($scope.filtered[key].skills.indexOf(temp[index]) === -1){
						delete $scope.filtered[key];
					}
				});
			};
			//delete from chosen tag and move to current tag
			$scope.delete = function(index){
				var temp = $scope.resultTag;
				$scope.resultTag = [];
				for(var i = 0;i < temp.length;i++){
					if(i != index){
						$scope.resultTag.push(temp[i]);
					}
					else{
						$scope.currentTag.push(temp[i]);
					}
				};
				//filtered: add all users, then filter with tags
				angular.forEach($scope.users, function(value,key){
					$scope.filtered[key] = $scope.users[key];
				});
				//filter the users
				for (var i=0; i<$scope.resultTag.length; i++){
					angular.forEach($scope.filtered, function(value,key){
						if($scope.filtered[key].skills.indexOf($scope.resultTag[i]) === -1){
							delete $scope.filtered[key];
						}
					});
				}
			};


			$scope.clickButton = function(event) {
				var username = event.target.id;
				//alert(event.target.id);
				if ($scope.users[username].select == "glyphicon glyphicon-check"){
					//alert(event.target.id+' before: check');
			      	$scope.users[username].select = "glyphicon glyphicon-unchecked";	      	
			      	delete $scope.selected[username];
				    //put at last in case username not in filtered
				    $scope.filtered[username].select = "glyphicon glyphicon-unchecked";
			    }
			    else if ($scope.users[username].select == "glyphicon glyphicon-unchecked"){
			      	//alert(event.target.id+' before: uncheck');
			      	$scope.users[username].select = "glyphicon glyphicon-check";
			      	$scope.selected[username]=$scope.users[username];
				    //put at last in case username is not in filtered
					$scope.filtered[username].select = "glyphicon glyphicon-check";				    
			    }
			};

			var this_user = "iamauthur";
			
		}
);
