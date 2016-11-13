var app = angular.module("clickApp", ["firebase"]); 
	app.controller("clickCtrl", 
			
		function($scope, $firebaseObject, $firebaseArray) {
			// Implementation the todoCtrl 
			//alert("adsadsads");
			$scope.new;
			var list_users=["ikari1","ikari2","shinji","van","andyw"];
		
			$scope.users = $firebaseObject(firebase.database().ref("users")); //before: $firebaseArray
			
			/*
			$scope.users.ikari1={"name":"ikari","intro":"My hands stuck to my face again!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["cpp","java","sql"]};
			$scope.users.shinji={"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg","select":"glyphicon glyphicon-unchecked","tag":["angularjs","html","css","sql"]};
			$scope.users.ikari2={"name":"ikari","intro":"someone make me my sandwich!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["firebase","css"]};
			$scope.users.van={"name":"van","intro":"ddf","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["html","sql"]};
			$scope.users.andyw={"name":"andy","intro":"boxing","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["javascript","sql"]};
			$scope.users.$save();
			*/

			$scope.selected = $firebaseObject(firebase.database().ref("selected"));		// .selected[0]: selected
			
			//var medium=$scope.users;
			//$scope.filtered = medium;
			
			//tag: users/teams
			$scope.tag = $firebaseObject(firebase.database().ref("tag"));

			/*
			$scope.tag.javascript = {"users":["andyw"], "teams":[]};
			$scope.tag.angularjs = {"users":["shinji"], "teams":[]};
			$scope.tag.html = {"users":["shinji","van"], "teams":[]};
			$scope.tag.css = {"users":["shinji","ikari2"], "teams":[]};
			$scope.tag.java = {"users":["ikari1"], "teams":[]};
			$scope.tag.cpp = {"users":["ikari1"], "teams":[]};
			$scope.tag.sql = {"users":["ikari1","shinji","van","andyw"], "teams":[]};
			$scope.tag.$save();
			*/
			var ref_teamtag = firebase.database().ref("teamtags");
			$scope.currentTag = $firebaseArray(ref_teamtag);
			/*
			var tags = ["javascript","angularjs","html","css","java","cpp","sql"];
			for (var i=0; i<tags.length; i++){
				$scope.currentTag.$add(tags[i]);	
			}
			*/

						
			$scope.resultTag = [];


			//users filtered by the tags, initialized with $scope.users
			$scope.filtered = $firebaseObject(firebase.database().ref("filtered"));
			
			/*for (var i=0; i<list_users.length; i++){
				$scope.filtered[list_users[i]] = $scope.users[list_users[i]];
				alert($scope.users.abcd.name);
				$scope.filtered.$save();
			}*/
			$scope.filtered.ikari1={"name":"ikari","intro":"My hands stuck to my face again!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["cpp","java","sql"]};
			$scope.filtered.shinji={"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg","select":"glyphicon glyphicon-unchecked","tag":["angularjs","html","css","sql"]};
			$scope.filtered.ikari2={"name":"ikari","intro":"someone make me my sandwich!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["firebase","css"]};
			$scope.filtered.van={"name":"van","intro":"ddf","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["html","sql"]};
			$scope.filtered.andyw={"name":"andy","intro":"boxing","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["javascript","sql"]};
			$scope.filtered.$save();
			


			



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
					if($scope.filtered[key].tag.indexOf(temp[index].$value) === -1){
						delete $scope.filtered[key];
					}
				});
				$scope.filtered.$save();
				/*
				if ($scope.currentTag.length === 1){
					$scope.filtered = {};
				}


				var temp2 = $scope.tag[temp[index].$value].users;
				for(var i = 0;i < temp2.length; i++){
					var theuser = temp2[i];
					$scope.filtered[theuser] = $scope.users[theuser];
				}*/
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
						if($scope.filtered[key].tag.indexOf($scope.resultTag[i].$value) === -1){
							delete $scope.filtered[key];
						}
					});
				}
				$scope.filtered.$save();
				
			};


			$scope.clickButton = function(event) {
				var username = event.target.id;
				//alert(event.target.id);
				if ($scope.users[username].select == "glyphicon glyphicon-check"){
					//alert(event.target.id+' before: check');
			      	
			      	$scope.users[username].select = "glyphicon glyphicon-unchecked";
			      	$scope.users.$save();
			      	$scope.filtered[username].select = "glyphicon glyphicon-unchecked";
			      	$scope.filtered.$save();
			      	delete $scope.selected[username];
			      	//alert("change to uncheck");			      	
				    $scope.selected.$save();
			    }
			    else if ($scope.users[username].select == "glyphicon glyphicon-unchecked"){
			      	//alert(event.target.id+' before: uncheck');
			      	$scope.users[username].select = "glyphicon glyphicon-check";
			      	$scope.users.$save();
			      	$scope.filtered[username].select = "glyphicon glyphicon-check";
			      	$scope.filtered.$save();

			      	$scope.selected[username]=$scope.users[username];
			      	//alert("change to check");
				    $scope.selected.$save();
			    }
			    
		
			}; 
			
		}
	);
