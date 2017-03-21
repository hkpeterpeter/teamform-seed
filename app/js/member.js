$(document).ready(function(){

	$('#member_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if(eventName != null && eventName !== '') {
		$('#text_event_name').text("Event name: " + eventName);
		$('#member_page_controller').show();
	}

});
/*
$("#btn_chat").click(function() {
    	var val = getURLParameter("q");
    	if(val !== '') {
    		var url = "chatRoom.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });
*/
angular.module('teamform-member-app', ['firebase'])
.directive('login', function() {
    return {
        restrict: 'A',
        templateUrl: 'login.html'
    };
})
.controller('MemberCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

	// TODO: implementation of MemberCtrl

	$scope.teams = {};
	$scope.memberInfo = "";
	$scope.uid = "";
	$scope.tag = "";
	$scope.tags =[];
	$scope.eventName = getURLParameter("q");
	$scope.ntags = [];
    $scope.ntags = $firebaseArray(firebase.database().ref("newTags"));
	$scope.errMsg = "";

	$scope.showingChatroom = false;
	
	firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if(firebaseUser) {
      	var user = firebase.auth().currentUser;
        $scope.uid = user.uid;
        $scope.loadFunc();
      }
      else {
      	$scope.uid = "";
      	$scope.selection = [];
		$scope.tags = [];
      	$("input").prop("disabled", true);
      }
    });

	$scope.loadFuncTest = "";
    $scope.loadFuncCallback = function() {
    	if(typeof $scope.memberInfo.selection != 'undefined') {
			$scope.selection = $scope.memberInfo.selection;
		} else {
			$scope.selection = [];
		}
		if(typeof $scope.memberInfo.tags != 'undefined') {
			$scope.tags = $scope.memberInfo.tags;
		} else {
			$scope.tags = [];
		}
		if(typeof $scope.memberInfo.ability != 'undefined') {
			$scope.ability = $scope.memberInfo.ability;
		} else {
			$scope.ability = [];
		}

		// check quiz
		if($scope.ability.java.marks >= 50) {$scope.addTag2("Java");}
		if($scope.ability.cpp.marks >= 50) {$scope.addTag2("C++");}
		if($scope.ability.python.marks >= 50) {$scope.addTag2("Python");}
		if($scope.ability.html.marks >= 50) {$scope.addTag2("HTML");}
    };

	$scope.loadFunc = function() {
		var refPath = $scope.eventName + "/member/" + $scope.uid;
		$scope.memberInfo = $firebaseObject(firebase.database().ref(refPath));
		$scope.memberInfo.$loaded().then($scope.loadFuncCallback);
	};

	$scope.addTag = function() {
		 var tag = $.trim($scope.tag);

		if(tag !== '' && $scope.tags.indexOf(tag) === -1 && $scope.checkTag(tag)) {
			$scope.tags.push(tag);
		}
		$scope.tag = "";
	};

	$scope.addTag2 = function(tag) {
		if(tag !== '' && $scope.tags.indexOf(tag) === -1) {
			$scope.tags.push(tag);
		}
	};

	$scope.checkTag = function(tag) {
		if (tag == "C++" || tag == "Java" || tag == "HTML" || tag == "Python") {
			return false;
		}
		return true;
	}
	//tagFiltering
	$scope.searchTags = [];
	$scope.openCategory = function(dVal){
		document.getElementById(dVal).classList.toggle("show");
	};	
	$scope.filterByTag =function(teamTag){
		if ($scope.searchTags.length == 0){return true;}
		var length = (typeof teamTag != "undefined")? teamTag.length: 0;
		var slength = (typeof $scope.searchTags != "undefined")? $scope.searchTags.length: 0;
		for (var i=0;i<slength;i++){
			for (var j=0; j<length;j++){
				if(teamTag[j] == $scope.searchTags[i]){
					return true;
				}
			}
		}
		return false;
	}
	$scope.addSearchTags = function(tagval){
		var addOrNot = true;
		var k = 0;
		var length = (typeof $scope.searchTags != "undefined")? $scope.searchTags.length: 0;
		for(; k < length; k++){
			if(tagval == $scope.searchTags[k]){
				addOrNot = false;
				break;
			}
		}
		if(addOrNot){
			$scope.searchTags.push(tagval);
		}
		else{
			$scope.searchTags.splice(k,1);
		}

	};
	//tagFiltering ends
	$scope.leaveTeam = function() {
		if($scope.memberInfo.inTeam === undefined) return;
		var refPath = $scope.eventName + "/member/" + $scope.uid + "/inTeam";
		var teamRefPath = $scope.eventName + "/team/" + $scope.memberInfo.inTeam;
		var ref = firebase.database().ref(refPath);
		ref.remove();

		ref = firebase.database().ref(teamRefPath);
		var team = $firebaseObject(ref);
		team.$loaded(function(data) {
			var idx = data.teamMembers.indexOf($scope.uid);
			data.teamMembers.splice(idx, 1);
			ref.update({teamMembers: data.teamMembers});
		});
	};
	
	$scope.askForConfirm = function(confirmCallback, param) {
		document.getElementById('confirm').style.display='block';
		$('#confirm').one('click', '#delete', function (e) {
				confirmCallback(param);
				console.log("Confirmed ");
				document.getElementById('confirm').style.display='none';
			}).one('click', '#cancel', function(e) {
				console.log("Cancel");
				document.getElementById('confirm').style.display='none';
			});
	}

	$scope.saveFunc = function() {
		$scope.userInfo = $firebaseObject(firebase.database().ref().child("user").child($scope.uid));
		$scope.userInfo.$loaded().then(function() {
			if(typeof $scope.userInfo.joinedEvent != "undefined") {
				$scope.joinedEvent = $scope.userInfo.joinedEvent;
				if($scope.joinedEvent.indexOf(eventName) == -1) {
					$scope.joinedEvent.push(eventName);
				}
			}
			else {
				$scope.joinedEvent = [];
				$scope.joinedEvent.push(eventName);
			}
			firebase.database().ref().child("user").child($scope.uid).update({joinedEvent: $scope.joinedEvent});
		});
		var newData = {
			'tags' : $scope.tags,
			'selection': $scope.selection,
			'weight': 0
		};
		var refPath = $scope.eventName + "/member/" + $scope.uid;
		var ref = firebase.database().ref(refPath);
		ref.update(newData, function() {
			window.location.href = "index.html";
		});
	};

	$scope.refreshTeams = function() {
		var refPath = $scope.eventName + "/team";
		var ref = firebase.database().ref(refPath);

		// Link and sync a firebase object
		$scope.selection = [];
		$scope.toggleSelection = function (item) {
			var idx = $scope.selection.indexOf(item);
			if(idx > -1) {
				$scope.selection.splice(idx, 1);
			}
			else {
				$scope.selection.push(item);
			}
		}
		$scope.teams = $firebaseArray(ref);
	};

	$scope.token = "";
	$scope.acceptInv = function(teamName){
		//Get the index of teamName in team
		var index;
		console.log("teams: ", $scope.teams);
		for(var i=0; i<$scope.teams.length; i++){
			if(teamName === $scope.teams[i].$id){
				index = i;
				break;
			}
		}
		console.log("index: ", index);
		/*
		var x;
		x = confirm("Are you sure?");
		if (x){
			//check if the team is full, if yes, tell the user
			if($scope.teams[index].teamMembers.length >= $scope.teams[index].size){
				window.alert("Team " + teamName + " is full!");
				$scope.token = "TeamFull";
				return;
			}
			//if no, add the user to the team
			else {
				$scope.token = "TeamAvailable";
				var refPath = $scope.eventName + "/team/" + teamName;
				$scope.teamMember = $firebaseObject(firebase.database().ref(refPath));
				$scope.teamMember.$loaded(function(data){
					$scope.acceptInvCallback(data);
				});
			}
		}
		*/
		//check if the team is full, if yes, tell the user
		if($scope.teams[index].teamMembers.length >= $scope.teams[index].size){
			window.alert("Team " + teamName + " is full!");
			$scope.token = "TeamFull";
			return;
		}
		//if no, add the user to the team
		else {
			$scope.token = "TeamAvailable";
			var refPath = $scope.eventName + "/team/" + teamName;
			$scope.teamMember = $firebaseObject(firebase.database().ref(refPath));
			$scope.teamMember.$loaded(function(data){
				$scope.acceptInvCallback(data);
			});
		}
		
	};

	$scope.acceptInvCallback = function(data) {
		console.log("data: ",data);

		$scope.newMemberList = [];
		$scope.team = data;
		console.log("$scope.team ",$scope.team);
		if(typeof $scope.team != 'undefined'){
			for(var i=0; i< $scope.team.teamMembers.length; i++){
				//push
				console.log(i);
				$scope.newMemberList.push($scope.team.teamMembers[i]);
			}
		}
		$scope.newMemberList.push($scope.uid);
		console.log("$scope.newMemberList: ",$scope.newMemberList);
		var refPath = $scope.eventName + "/team/" + $scope.team.$id;
		var ref = firebase.database().ref(refPath);
		ref.update({
			teamMembers: $scope.newMemberList
		});
		//remove invitedBy list
		var refPath1 = $scope.eventName + "/member/" + $scope.uid + "/invitedBy";
		var ref1 = firebase.database().ref(refPath1);
		ref1.remove();
		//window.alert("Invitation accepted!");
		$scope.token = "TeamJoined";
		// update inTeam
		var refPath2 = $scope.eventName + "/member/" + $scope.uid;
		var ref2 = firebase.database().ref(refPath2);
		ref2.update({
			invitedBy: [],
			inTeam: $scope.team.$id
		});
	};

	$scope.declineInv = function(teamName){
		/*
		var x;
		x = confirm("Are you sure?");
		if (x){
			var index = $scope.memberInfo.invitedBy.indexOf(teamName)
			if(index>-1){
				$scope.memberInfo.invitedBy.splice(index,1);
				var refPath = $scope.eventName + "/member/" + $scope.memberInfo.$id;
				var ref = firebase.database().ref(refPath);
				ref.update({
					invitedBy: $scope.memberInfo.invitedBy
				});
		}}
		*/
		var index = $scope.memberInfo.invitedBy.indexOf(teamName)
		if(index>-1) {
			$scope.memberInfo.invitedBy.splice(index,1);
			var refPath = $scope.eventName + "/member/" + $scope.memberInfo.$id;
			var ref = firebase.database().ref(refPath);
			ref.update({
				invitedBy: $scope.memberInfo.invitedBy
			});
		}
	};
	$scope.refreshTeams(); // call to refresh teams...
}])
.controller("chatRoomCtrl", 

		function($scope, $firebaseArray) {
			$scope.input = {
				message: "",
				date: "",
				userName: ""
			};
			var eventName = getURLParameter("q");
			var ref = firebase.database().ref("chatRoom" + eventName);
			$scope.chatList = $firebaseArray(ref);

			$scope.msgAlt = function(name) {
				if(name === firebase.auth().currentUser.displayName) {
					return "message-alt";
				}
				return null;
			};

			$scope.bubbleAlt = function(name) {
				if(name === firebase.auth().currentUser.displayName) {
					return "bubble-alt";
				}
				return null;
			};

			$scope.ownMsg = function(name) {
				if(name === firebase.auth().currentUser.displayName) {
					return  true;
				}
				return false;
			};

			$scope.addMessage = function() {
				// update the date
				if($scope.input.message !== "" ) {
					firebase.auth().onAuthStateChanged(function(firebaseUser) {
						if(firebaseUser) {
							var user = firebase.auth().currentUser;
							$scope.input.userName = user.displayName;
							$scope.input.date = new Date().toString();
							$scope.chatList.$add($scope.input);
						}
					});
				}
			};
			$scope.timeSince = function(date) {
			    var seconds = Math.floor((new Date() - new Date(date)) / 1000);
			    var interval = Math.floor(seconds / 31536000);
			    if(interval >= 1) {
			        return interval + " years ago";
			    }
			    interval = Math.floor(seconds / 2592000);
			    if(interval >= 1) {
			        return interval + " months ago";
			    }
			    interval = Math.floor(seconds / 86400);
			    if(interval >= 1) {
			        return interval + " days ago";
			    }
			    interval = Math.floor(seconds / 3600);
			    if(interval >= 1) {
			         return interval + " hours ago";
			    }
			    interval = Math.floor(seconds / 60);
			    if(interval >= 1) {
			        return interval + " minutes ago";
			    }
			    return Math.floor(seconds) + " seconds ago";
			};
		}
)
;
