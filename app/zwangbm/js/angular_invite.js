var app_nginvite = angular.module("angular_invite_app",[]);
app_nginvite.controller("angular_invite_ctrl",

		function($scope) {
			// Implementation the todoCtrl
			//alert("adsadsads");
			//$scope.new;
			//var list_users=["ikari1","ikari2","shinji","van","andyw"];

			$scope.users = {
			"ikari1":{"name":"ikari","intro":"My hands stuck to my face again!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["cpp","java","sql"]},
			"shinji":{"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg","select":"glyphicon glyphicon-unchecked","tag":["angularjs","html","css","sql"]},
			"ikari2":{"name":"ikari","intro":"someone make me my sandwich!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["firebase","css"]},
			"van":{"name":"van","intro":"ddf","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["html","sql"]},
			"andyw":{"name":"andy","intro":"boxing","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["javascript","sql"]}
			};

			$scope.selected = {};		// .selected[0]: selected

			//var medium=$scope.users;
			//$scope.filtered = medium;

			//tag: users/teams
			$scope.tag = {
			"javascript":  {"users":["andyw"], "teams":[]},
			"angularjs":  {"users":["shinji"], "teams":[]},
			"html":  {"users":["shinji","van"], "teams":[]},
			"css":  {"users":["shinji","ikari2"], "teams":[]},
			"java":  {"users":["ikari1"], "teams":[]},
			"cpp":  {"users":["ikari1"], "teams":[]},
			"sql": {"users":["ikari1","shinji","van","andyw"], "teams":[]}
			};

			$scope.currentTag = ["javascript","angularjs","html","css","java","cpp","sql"];

			$scope.resultTag = [];


			//users filtered by the tags, initialized with $scope.users
			$scope.filtered = {
			"ikari1":{"name":"ikari","intro":"My hands stuck to my face again!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["cpp","java","sql"]},
			"shinji":{"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg","select":"glyphicon glyphicon-unchecked","tag":["angularjs","html","css","sql"]},
			"ikari2":{"name":"ikari","intro":"someone make me my sandwich!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["firebase","css"]},
			"van":  {"name":"van","intro":"ddf","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["html","sql"]},
			"andyw":{"name":"andy","intro":"boxing","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["javascript","sql"]}
			};


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

			};


			$scope.clickButton = function(event) {
				var username = event.target.id;
				//alert(event.target.id);
				if ($scope.users[username].select == "glyphicon glyphicon-check"){
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
		}
	);
