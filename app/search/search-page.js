

var tag = ["javascript","angularjs","html","css","java","cpp","sql"];


		function setColor(obj,color){
			obj.style.color = color;
		}

		//central angular app
		//var app = angular.module("profile",[]);

		//shared data among controllers,toggle sidebar and search page
		app.service('divToggle', function() {
			// private variable
			var _dataObj = {search:true,sidebar:false};

			// public API
			this.dataObj = _dataObj;
		});

		//controll navigation bar and search page
		app.controller("searchPage",function($scope,divToggle){
			$scope.currentTag = ["java"];
			$scope.resultTag = [];
			//$scope.new;
			$scope.startSearch = divToggle.dataObj.search;
			$scope.sidebar = divToggle.dataObj.sidebar;
			/*for(key in tag){
				$scope.currentTag.push(key);
			};*/
			$scope.start = function(){
				$scope.startSearch = false;
				$scope.sidebar = true;
			};
			$scope.searchType = "Search Team";
			$scope.setSearchT = function(){
				$scope.searchType = "Search Team";
			};
			$scope.setSearchP = function(){
				$scope.searchType = "Search Person";
			};
			$scope.setSearchE = function(){
				$scope.searchType = "Search Event";
			};
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

			};

			$scope.clear = function(){
				$scope.new = "";
				$scope.currentTag = [];
				$scope.resultTag = [];
			};

			$scope.autocomplete = function(newx){
				var iChars = "~`!@#$%^&*+=-[]\\\';,/{}|\":<>?";
				for (var i = 0; i < newx.length; i++){
					if (iChars.indexOf(newx.charAt(i)) != -1){
						alert ("File name has special characters ~`!@#$%^&*+=-[]\\\';,/{}|\":<>? \nThese are not allowed\n");
						$scope.newx = "";
						break;
					}

				}
				$scope.currentTag = [];
				var reg = newx;
				reg.replace(' ','');
				if(reg !== ""){
					for(i = 0;i < tag.length;i++){
						var k = 0;
						var valid = true;
						for(var j = 0;j < reg.length;j++){

							while(k < tag[i].length){
								if(tag[i].charAt(k)==reg.charAt(j)){
									k++;
									break;
								}else{
									k++;
								}

							}
							if(k >= tag[i].length && j+1 < reg.length){
								valid = false;
								break;
							}
						}
						if(valid){
							$scope.currentTag.push(tag[i]);
						}
					}
				}else{
					$scope.resultTag = [];
				}
			};

			$scope.test = function(){
				$scope.currentTag.push("java");
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
