var app = angular.module("clickApp", ["firebase"]); 
	app.controller("clickCtrl", 
			
		function($scope, $firebaseObject, $firebaseArray) {
			// Implementation the todoCtrl 
			//alert("adsadsads");
			var ref = firebase.database().ref("users");
			$scope.new;
		
			$scope.users = $firebaseObject(ref); //before: $firebaseArray
			
			$scope.users.ikari1={"name":"ikari1","intro":"My hands stuck to my face again!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["cpp","java","sql"]};
			$scope.users.shinji={"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg","select":"glyphicon glyphicon-unchecked","tag":["angularjs","html","css","sql"]};
			$scope.users.ikari2={"name":"ikari2","intro":"someone make me my sandwich!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["firebase","css"]};
			$scope.users.van={"name":"van","intro":"ddf","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["html","sql"]};
			$scope.users.andyw={"name":"andy","intro":"boxing","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["javascript","sql"]};
			$scope.users.$save();
			
			var ref2 = firebase.database().ref("selected");
			
			$scope.selected = $firebaseObject(ref2);		// .selected[0]: selected
			
			//users filtered by the tags, initialized with $scope.users
			$scope.filtered = $scope.users;

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

				//add to filtered
				if ($scope.currentTag.length === 1){
					$scope.filtered = {};
				}


				var temp2 = $scope.tag[temp[index].$value].users;
				for(var i = 0;i < temp2.length; i++){
					var theuser = temp2[i];
					$scope.filtered[theuser] = $scope.users[theuser];
				}
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

				//remove from filtered. do not remove those satisfying other tags
				if ($scope.currentTag.length === 0){
					$scope.filtered = $scope.users;
				}
				else {
					var tag_name = temp[index].$value;
					var temp2 = $scope.tag[tag_name].users;
					for(var i = 0;i < temp2.length; i++){
						var theuser = temp2[i];
						var can_delete = true;
						if ($scope.users[theuser].tag.indexOf(tag_name) !== -1){
							// the deleted tag belongs to this theuser
							for (var j=0; j<$scope.users[theuser].tag.length; j++){
								if ($scope.resultTag.indexOf($scope.users[theuser].tag[j])!==-1){
									//another tag also exist in resultTag
									can_delete = false;
									break;
								}
							}
							if (can_delete) {
								delete $scope.filtered[theuser];
							}
						}

					}
				}
				
			};


			$scope.clickButton = function(event) {
				var username = event.target.id;
				//alert(event.target.id);
				if ($scope.users[username].select == "glyphicon glyphicon-check"){
					//alert(event.target.id+' before: check');
			      	
			      	$scope.users[username].select = "glyphicon glyphicon-unchecked";
			      	$scope.users.$save();

			      	delete $scope.selected[username];
			      	//alert("change to uncheck");			      	
				    $scope.selected.$save();
			    }
			    else if ($scope.users[username].select == "glyphicon glyphicon-unchecked"){
			      	//alert(event.target.id+' before: uncheck');
			      	$scope.users[username].select = "glyphicon glyphicon-check";
			      	$scope.users.$save();

			      	$scope.selected[username]=$scope.users[username];
			      	//alert("change to check");
				    $scope.selected.$save();
			    }
			    
		
			}; 
			
		}
	);
