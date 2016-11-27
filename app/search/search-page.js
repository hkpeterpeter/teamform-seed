

var tag = ["javascript","angularjs","html","css","java","cpp","sql"];


		function setColor(obj,color){
			obj.style.color = color;
		}
		
		function borderColor(obj,color){
			obj.style.boxShadow = "10px 10px 5px " + color;
		}
		
		//central angular app
		//var app = angular.module("profile",[]);

		app.factory('Search',function(){
			return {search:true,text:""};
		});

		app.factory('Naruto',function(){
			return {
				Itachi:0,
				Sasuke:"",
				Sakura:"Search Team",
				setSearchE: function(){},
				setSearchP: function(){},
				setSearchT: function(){},
				searchName: function(){},
				clear: function(){}
			};
		});
		
		

		//controll search page
		app.controller("searchPage",function($scope,Naruto,$cookies,$window,$firebaseObject,$firebaseArray){

			
			//data lists got from firebase
			var tag = [];
			var users = [];
			var teams = [];
			var userid = [];
			var tagini = {};
			$scope.teamini;
			//get the user id of login user
			var thisUser = $cookies.get("username");
			//initialize data lists
			var ref = firebase.database().ref("eventList");
			var event_list = $firebaseObject(ref);
			$scope.userList = $firebaseObject(firebase.database().ref("userList"));
			
			//get tags,teams and users from tag list in firebase
			/*
			$scope.userList.$loaded(function(){
				if($scope.userList[thisUser].notification != undefined){
					angular.forEach($scope.userList[thisUser].notification,function(value,key){
						Naruto.Itachi ++ ;
					});
				}
			});
			*/
			
			
			
			$scope.loadData = function(){
				$scope.hehe = "";
				$scope.currentTag = [];
				$scope.resultTag = [];
				$scope.filterResult = [];
				Naruto.Saskue = "";
				
				tag = [];
				teams = [];
				users = [];
				userid = [];
				tagini = {};

				$scope.teamini = event_list[Naruto.Luffy]["teamList"];
				
				angular.forEach($scope.teamini,function(value,key){
					teams.push(key);
					
					for(var i = 0;i < $scope.teamini[key].skills.length;i++){
						if(tagini[$scope.teamini[key].skills[i]] == undefined){
							tagini[$scope.teamini[key].skills[i]] = {};
							tagini[$scope.teamini[key].skills[i]].teams = [];
							tagini[$scope.teamini[key].skills[i]].users = [];
							tagini[$scope.teamini[key].skills[i]].teams.push(key);
						}
						else{
							tagini[$scope.teamini[key].skills[i]].teams.push(key);
						}
						
					}
				});

				angular.forEach($scope.userList,function(value,key){
					//only get the user that belongs to current event
					if($scope.userList[key].Membership !== undefined && $scope.userList[key].Membership[Naruto.Luffy] !== undefined){
						users.push($scope.userList[key].name);
						userid.push(key);
						
					}
				});
				
				
					var k = 0;
					for(var i = 0;i < userid.length;i++){
						for(var j = 0;j < $scope.userList[userid[i]]["skills"].length;j++){
						
							if(tagini[$scope.userList[userid[i]].skills[j]] !== undefined){
								tagini[$scope.userList[userid[i]].skills[j]].users.push(userid[i]);
							}else{
								tagini[$scope.userList[userid[i]].skills[j]] = {}
								tagini[$scope.userList[userid[i]].skills[j]].users = [];
								tagini[$scope.userList[userid[i]].skills[j]].teams = [];
								tagini[$scope.userList[userid[i]].skills[j]].users.push(userid[i]);
						}
						
					}
					
					
				}
					angular.forEach(tagini, function(value,key){
						tag.push(key);
					
					});
				
			}
			
			/*
			$scope.userList.$loaded(function(){
				event_list.$loaded(function(){
					tagini = event_list[Naruto.luffy]["skills"];

					$scope.teamini = event_list[Naruto.luffy]["teamList"];
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
			*/
			$scope.teamyeah = false;
			$scope.useryeah = true;
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
			var navbarClear = function(){
				$scope.searchResult = [];
				Naruto.Sasuke = "";
				$scope.clear();
			}
			Naruto.clear = navbarClear;
			
			var currentEvent;
			$scope.autocomplete = function(){
				
				if(currentEvent != Naruto.Luffy){
					currentEvent = Naruto.Luffy;
					$scope.loadData();
					
				}
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
								if(tag[i].toLowerCase().charAt(k) == reg.toLowerCase().charAt(j)){
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
				var templist = [];
				if(Naruto.Sakura.length != 0){
					for(var i = 0;i < $scope.searchResult.length;i++){
						templist.push($scope.searchResult[i]);
					}
				}	
				
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
					if($scope.resultTag.length != 0){
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
				//conbine filter and search name function
				if(templist.length != 0){
					if($scope.filterResult.length != 0){
						for(var i = 0;i < templist.length;i++){
							var bingo = false;
						
							for(var j = 0;j <$scope.filterResult.length;j++){
								if($scope.userList[$scope.filterResult[j]].name == templist[i]){
									bingo = true;
									break;
								}
							}
							if(!bingo){
								templist[i] = "@";
							}
						}

					}
					
					$scope.filterResult = [];
					for(var k = 0;k < templist.length;k++){
						
						if(templist[k] != "@"){
							
							for(var m = 0;m < userid.length; m++){
								
								if($scope.userList[userid[m]].name == templist[k]){
									$scope.filterResult.push(userid[m]);
								}
								
							}
						}
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
				else{
					alert("unknown error occur");
				}//event list is not yet defined
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
							if(Naruto.Sasuke.toLowerCase().charAt(x-1) == list[i].toLowerCase().charAt(y-1)){
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
				if(currentEvent != Naruto.Luffy){
					currentEvent = Naruto.Luffy;
					$scope.loadData();
					
				}
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
					if(Naruto.Sakura == "Search Team"){
						findResult('team');
						for(var i = 0;i < $scope.filterResult.length;i++){
							var bingo = false;
							for(var j = 0;j < $scope.searchResult.length;j++){
								if($scope.searchResult[j] == $scope.filterResult[i]){
									bingo = true;
								}
							}
							if(!bingo){
								$scope.filterResult[i] = "@";
							}
						}
							var temp = [];
							for(var k = 0;k <　$scope.filterResult.length;k++){
								if($scope.filterResult[k] != "@"){
									temp.push($scope.filterResult[k]);
								}
							}
							$scope.filterResult = temp;
					
					}else{
						
						findResult('user');
						
						for(var i = 0;i < $scope.filterResult.length;i++){
							var bingo = false;
							for(var j = 0;j < $scope.searchResult.length;j++){
								if($scope.searchResult[j] == $scope.userList[$scope.filterResult[i]].name){
									bingo = true;
									
									break;
								}
							}
							if(!bingo){
								$scope.filterResult[i] = "@";
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
			Naruto.searchName = searchName;
			
			//team profile
			$scope.labels = [];
			$scope.data = [];
			$scope.type = 'polarArea';
			$scope.currentTeam = "";
			$scope.passTeam = function(index){
				$scope.currentTeam = $scope.filterResult[index];
				
				var member = $scope.teamini[$scope.currentTeam].memberList
				for(var i = 0;i < $scope.teamini[$scope.currentTeam].skills.length;i++){
					
					$scope.labels.push($scope.teamini[$scope.currentTeam].skills[i]);
					var number = 0;
					for(var j = 0;j < member.length;j ++){
						for(var k = 0;k < $scope.userList[member[j]].skills.length;k++){
							if($scope.userList[member[j]].skills[k] == $scope.teamini[$scope.currentTeam].skills[i]){
								number++;
								break;
							}
						}
						
					}
					$scope.data.push(number);
					
				}
				
			}
			
			$scope.toggle = function () {
				$scope.type = $scope.type === 'polarArea' ? 'pie' : 'polarArea';
			};
			
			//user profile
			$scope.currentUser = "";
			$scope.passUser = function(index){
				$scope.currentUser = $scope.filterResult[index];
			}
			
		});



		//controll navigation bar
		app.controller("navbar",function($scope,Naruto,Search,$firebaseObject,$cookies,$firebaseArray,Notification){
			// $scope.searchKey = "";
			// $scope.searchType = Naruto.Sakura;
			// Naruto.Sasuke = $scope.searchKey;
			var ref = firebase.database().ref("eventList");
			$scope.event_list = $firebaseObject(ref);
			$scope.Naruto = Naruto;
			$scope.notes = 0;
			var thisUser = $cookies.get("username");
			var ref = firebase.database().ref("userList/" + thisUser + "/notification");
			$scope.notification = $firebaseArray(ref);
			$scope.notification.$loaded(function(){
				$scope.notes = $scope.notification.length;
			});
			
			var initial = 0;
			ref.on('value',function(snapshot){
				var length = 0;
				for(key in snapshot.val()){
					length ++;
				}
				initial ++;
				if(initial != 1&&(length > $scope.notes )){
				  Notification('New notification');
				}
				$scope.notes = length;
				
				
			});
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
			$scope.haha = function(){
				Search.search = true;
			}
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
