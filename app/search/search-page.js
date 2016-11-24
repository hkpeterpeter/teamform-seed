

var tag = ["javascript","angularjs","html","css","java","cpp","sql"];


		function setColor(obj,color){
			obj.style.color = color;
		}

		//central angular app
		//var app = angular.module("profile",[]);

		app.factory('Search',function(){
			return {search:true,text:""};
		});

		app.factory('Naruto',function(){
			return {
				Sasuke:"",
				Sakura:"Search Team",
				setSearchE: function(){},
				setSearchP: function(){},
				setSearchT: function(){}
			};
		});

		//controll search page
		app.controller("searchPage",function($scope,Naruto,$cookies,$window,$firebaseObject){


			//data lists got from firebase
			var tag = [];
			var users = [];
			var teams = [];

			var tagini;
			$scope.teamini;

			//initialize data lists
			var ref = firebase.database().ref("eventList");
			var event_list = $firebaseObject(ref);
			$scope.userList = $firebaseObject(firebase.database().ref("userList"));
			//get tags,teams and users from tag list in firebase
			$scope.userList.$loaded(function(){
				event_list.$loaded(function(){
					tagini = event_list["comp3111"]["skills"];

					$scope.teamini = event_list["comp3111"]["teamList"];
					angular.forEach(tagini, function(value,key){
						tag.push(key);
					});
					angular.forEach($scope.teamini,function(value,key){
						teams.push(key);
					});

					angular.forEach($scope.userList,function(value,key){
						//only get the user that belongs to current event
						if($scope.userList[key].Membership !== undefined &&
								$scope.userList[key].Membership["comp3111"] !== undefined){
							users.push($scope.userList[key].name);

						}

					});

				});
			});

			$scope.teamyeah = false;
			$scope.useryeah = true;
			searchKey = Naruto.Sasuke;
			$scope.currentTag = [];
			$scope.resultTag = [];
			$scope.searchResult = [];
			$scope.filterResult = [];
			$scope.hehe = "";
			// $scope.startSearch = Search;
			/*for(key in tag){
				$scope.currentTag.push(key);
			};*/

			$scope.Naruto = Naruto;
			$scope.searchType = Naruto.Sakura;
			var setSearchT = function(){
				Naruto.Sakura = "Search Team";
				$scope.teamyeah = false;
				$scope.useryeah = true;
				$scope.clear();
			};
			var setSearchP = function(){
				Naruto.Sakura = "Search Person";
				$scope.useryeah = false;
				$scope.teamyeah = true;
				$scope.clear();
			};
			$scope.setSearchE = function(){
				$scope.searchType = "Search Event";
			};
			// Naruto.setSearchE = $scope.setSearchE;
			Naruto.setSearchP = setSearchP;
			Naruto.setSearchT = setSearchT;

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
				filterFunction();
			};

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
				}
				filterFunction();

			};

			$scope.clear = function(){
				$scope.hehe = "";
				$scope.currentTag = [];
				$scope.resultTag = [];
				$scope.filterResult = [];
			};

			$scope.autocomplete = function(){
				var iChars = "~`!@#$%^&*+=-[]\\\';,/{}|\":<>?";
				for (var i = 0; i < $scope.hehe.length; i++){
					if (iChars.indexOf($scope.hehe.charAt(i)) != -1){
						alert ("File name has special characters ~`!@#$%^&*+=-[]\\\';,/{}|\":<>? \nThese are not allowed\n");
						$scope.hehe = "";
						break;
					}

				}
				$scope.currentTag = [];
				var reg = $scope.hehe;
				reg.replace(' ','');
				if(reg !== ""){
					for(var i = 0;i < tag.length;i++){
						var k = 0;
						var valid = false;
						for(var j = 0;j < reg.length;j++){

							while(k < tag[i].length){
								if(tag[i].charAt(k) == reg.charAt(j)){
									k++;
									if(j == reg.length-1){
										valid = true;
									}
									break;
								}else{
									k++;
								}

							}
						}
						if(valid){
							$scope.currentTag.push(tag[i]);
						}

					}
				}
			};

			var filterFunction = function(){
				$scope.filterResult = [];
				if(Naruto.Sakura == "Search Team"){
					for(var i = 0;i < tagini[$scope.resultTag[0]].teams.length;i++){
						$scope.filterResult.push(tagini[$scope.resultTag[0]].teams[i]);
					}
					for(var i = 1;i < $scope.resultTag.length;i++){
						//get the team list related to current result tag
						var list = tagini[$scope.resultTag[i]].teams;
						for(var k = 0;k < $scope.filterResult.length;k++){
							var bingo = false;
							for(var j = 0;j < list.length;j++){
								if(list[j] == $scope.filterResult[k]){
									bingo = true;
									break;
								}
							}
							if(!bingo){
								$scope.filterResult[k] = "@";
							}
						}
						var temp = [];
						for(var k = 0;k <　$scope.filterResult.length;k++){
							if($scope.filterResult[k] != "@"){
								temp.push($scope.filterResult[k]);
							}
						}
						$scope.filterResult = temp;
					}
				}else{
					for(var i = 0;i < tagini[$scope.resultTag[0]].users.length;i++){
						$scope.filterResult.push(tagini[$scope.resultTag[0]].users[i]);
					}
					for(var i = 1;i < $scope.resultTag.length;i++){
						//get the team list related to current result tag
						var list = tagini[$scope.resultTag[i]].users;
						for(var k = 0;k < $scope.filterResult.length;k++){
							var bingo = false;
							for(var j = 0;j < list.length;j++){
								if(list[j] == $scope.filterResult[k]){
									bingo = true;
									break;
								}
							}
							if(!bingo){
								$scope.filterResult[k] = "@";
							}
						}
						var temp = [];
						for(var k = 0;k <　$scope.filterResult.length;k++){
							if($scope.filterResult[k] != "@"){
								temp.push($scope.filterResult[k]);
							}
						}
						$scope.filterResult = temp;
					}
				}
			}

			//private search method
			var findResult = function(type){
				var list = [];
				if(type == "team"){
					list = teams;
				}
				else if(type == "user"){
					list = users;
				}
				else{}//event list is not yet defined
				var m = Naruto.Sasuke.length;

				//retrive every tags in tagList
				for(var i = 0;i < list.length;i++){
					var n = list[i].length;

					//create a new 2D array,initialize with all 0
					var arr = []
					for (var row = 0; row < m+1; row++) {
						arr[row] = [];
						for(var column = 0; column < n+1; column++){
							arr[row].push(0);
						}
					}


					//record the maximum number of matched subsequence in two strings
					var max = 0;

					//start to fill the 2D array
					for(var x = 1;x <= m; x++){
						for(var y = 1;y <= n;y++){
							if(Naruto.Sasuke.charAt(x-1) == list[i].charAt(y-1)){
								arr[x][y] = arr[x-1][y-1] + 1;
								if(arr[x][y] > max){
									max = arr[x][y];
								}
							}
							else if(arr[x-1][y] > arr[x][y-1]){
								arr[x][y] = arr[x-1][y];
							}
							else{
								arr[x][y] = arr[x][y-1];
							}
						}
					}
					var match = arr[m][n]/Naruto.Sasuke.length
					if(match>= 0.6){
						$scope.searchResult.push(list[i]);
					}
				}

				// tag = $scope.searchResult;
			}

			var searchName = function(){
				$scope.searchResult = [];
				if($scope.resultTag.length == 0){
					if(Naruto.Sakura == "Search Team"){
						findResult('team');

						$scope.filterResult = $scope.searchResult;
					}
					else{
						findResult('user');
						var idList = [];
						for(var i = 0;i < $scope.searchResult.length;i++){
							angular.forEach($scope.userList,function(value,key){
								//only get the user that belongs to current event
								if($scope.userList[key].name == $scope.searchResult[i]){
									idList.push(key);
								}
							});
						}
						$scope.filterResult = idList;
					}
				}
				else{

				}
			}
			Naruto.searchName = searchName;
		});



		//controll navigation bar
		app.controller("navbar",function($scope,Naruto,Search){
			// $scope.searchKey = "";
			// $scope.searchType = Naruto.Sakura;
			// Naruto.Sasuke = $scope.searchKey;
			$scope.Naruto = Naruto;

			// $scope.setThisSearchP = function(){
			// 	Naruto.setSearchP();
			// };
			// $scope.setThisSearchT = function(){
			// 	Naruto.setSearchT();
			// }
			// $scope.searchThisName = function(){
			// 	Naruto.searchName();
			// };
			$scope.start = function(){
				Search.search = false;

			};
		});


		/*
		function addTag(obj){
			var filterTags = document.getElementById("searchTag");
			var key = obj.innerHTML;
			tag[key] = false;
			filterTags.appendChild(obj);
			obj.removeAttribute("onclick")
			var span = document.createElement("span")
			var text = document.createTextNode(String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(160));
			span.appendChild(text);
			obj.appendChild(span);

			var close = document.createElement("span");
			close.setAttribute("style","font-weight:bold");

			text = document.createTextNode(String.fromCharCode(215));
			close.appendChild(text);
			obj.appendChild(close);
			close.setAttribute("ng-click","reset()")
			close.addEventListener("mouseover", setRed);
			close.addEventListener("mouseleave", setBlack);
			close.addEventListener("click", deleteTag);

		}

		function deleteTag(){
			var currentTag = this.parentNode;

			document.getElementById("predefineTag").appendChild(currentTag);
			currentTag.removeChild(this);
			currentTag.removeChild(currentTag.lastChild);
			var tag = currentTag.innerHTML;
			tag[key] = true;
		}
		*/
