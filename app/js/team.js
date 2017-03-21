$(document).ready(function(){

	$('#team_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if(eventName != null && eventName !== '') {
		$('#text_event_name').text("Event name: " + eventName);
	}

});

angular.module('teamform-team-app', ['firebase'])
.directive('login', function() {
	return {
		restrict: 'A',
		templateUrl: 'login.html'
	};
})
.controller('TeamCtrl', ['$scope', '$firebaseObject', '$firebaseArray', 
	function($scope, $firebaseObject, $firebaseArray) {

	var refPath = "";
	$scope.eventName = getURLParameter("q");
	$scope.tags = [];
	$scope.tags = $firebaseArray(firebase.database().ref("newTags"));
	// TODO: implementation of MemberCtrl	
	$scope.param = {
		teamName : '',
		currentTeamSize : 0,
		teamMembers : [],
		tags : [],
		weight : [],
		invitedBy: []
	};
	$scope.uid = "";
	$scope.currentUser = [];
	$scope.debug = [];
	

	firebase.auth().onAuthStateChanged(function(firebaseUser) {
		if(firebaseUser) {
			var user = firebase.auth().currentUser;
			$scope.uid = user.uid;
			$scope.userInfo = $firebaseObject(firebase.database().ref().child("user").child($scope.uid));
			$scope.userInfo.$loaded().then(function() {
				if(typeof $scope.userInfo.joinedEvent != "undefined") {
					$scope.joinedEvent = $scope.userInfo.joinedEvent;
					if($scope.joinedEvent.indexOf($scope.eventName) == -1) {
						$scope.joinedEvent.push($scope.eventName);
					}
				}
				else {
					$scope.joinedEvent = [];
					$scope.joinedEvent.push($scope.eventName);
				}
				firebase.database().ref().child("user").child($scope.uid).update({joinedEvent: $scope.joinedEvent});
			});
			refPath = $scope.eventName + "/member/" + $scope.uid;
			$scope.currentUser = $firebaseObject(firebase.database().ref(refPath));	
			$scope.loadFunc();
		}
	});
	

	refPath = $scope.eventName + "/admin";
	retrieveOnceFirebase(firebase, refPath, function(data) {
		if(data.child("param").val() != null) {
			$scope.range = data.child("param").val();
			$scope.param.currentTeamSize = parseInt(($scope.range.minTeamSize + $scope.range.maxTeamSize)/2);
			$scope.$apply(); // force to refresh
			$('#team_page_controller').show(); // show UI
		} 
	});
		
	refPath = $scope.eventName + "/member";
	$scope.member = [];
	$scope.member = $firebaseArray(firebase.database().ref(refPath));

	refPath = $scope.eventName + "/team";
	$scope.team = [];
	$scope.team = $firebaseArray(firebase.database().ref(refPath));	
	
	$scope.scores = [];
	$scope.requests = [];

	$scope.users = [];
	$scope.member.$loaded(function(data) {
		angular.forEach(data, function(mem) {
			$scope.users.push($firebaseObject(getUserWithId(mem.$id)));
		});
	});
	
	$scope.retrieveNameFromID = function(id) {
		return getUserName(id, $scope.users);
	};

	$scope.retrieveTagsFromID = function(id) {
		var tags = [];
		for(var tmpIdx = 0; tmpIdx < $scope.users.length; tmpIdx++) {
			if($scope.users[tmpIdx].$id === id) {
				if(typeof $scope.users[tmpIdx].ability == "undefined") return null;
				if(typeof $scope.users[tmpIdx].ability.java != "undefined") {tags.push("Java");}
				if(typeof $scope.users[tmpIdx].ability.cpp != "undefined") {tags.push("C++");}
				if(typeof $scope.users[tmpIdx].ability.python != "undefined") {tags.push("Python");}
				if(typeof $scope.users[tmpIdx].ability.html != "undefined") {tags.push("HTML");}
				if(typeof $scope.users[tmpIdx].ability.chinese != "undefined") {tags.push('Chinese');}
				return tags;
			}
		}
		return null;
	};
	
	$scope.retrieveMarksFromID = function(id,subj) {
		var marks =0;
		if	(
				subj != "Java" 
			&&	subj != "C++" 
			&&	subj != "Python" 
			&&	subj != "HTML"
			&&	subj != "Chinese"
			) return 100;
		for(var tmpIdx = 0; tmpIdx < $scope.users.length; tmpIdx++) {
			if($scope.users[tmpIdx].$id === id) {
				if(typeof $scope.users[tmpIdx].ability == "undefined") return 0;		
				if(subj == "Java" && typeof $scope.users[tmpIdx].ability.java != "undefined") {marks =$scope.users[tmpIdx].ability.java.marks;}
				if(subj == "C++" && typeof $scope.users[tmpIdx].ability.cpp != "undefined") {marks =$scope.users[tmpIdx].ability.cpp.marks;}
				if(subj == "Python" && typeof $scope.users[tmpIdx].ability.python != "undefined") {marks =$scope.users[tmpIdx].ability.python.marks;}
				if(subj == "HTML" && typeof $scope.users[tmpIdx].ability.html != "undefined") {marks =$scope.users[tmpIdx].ability.html.marks;}
				if(subj == "Chinese" && typeof $scope.users[tmpIdx].ability.chinese != "undefined") {marks =$scope.users[tmpIdx].ability.chinese.marks;}
				break;
			}
		}	
		
		return marks;
	};
	
	$scope.retrieveScoreFromTags = function(id,mtags) {
		
		if(mtags === null) {return 0 ;}
		var score =0;
		var found = -1;
		for(var i =0; i < mtags.length; i++) {
			found = $scope.param.tags.indexOf(mtags[i]);
			if(found  !== -1) {
				score += $scope.param.weight[found] * $scope.retrieveMarksFromID(id,mtags[i])/100;
			}
		}
		return score;
	};

	$scope.retrieveNamesFromJSON = function(teamMembers) {
		return getTeamMembersName(teamMembers, $scope.users);
	};
	
	$scope.smartAdd = function() {
		 var scores = [];
		 var req = $scope.requests;
		 for(var i = 0; i < req.length; i++ ) {
			 var item = {
				sid : "",
				score : ""
			 }
		 	scores.push(item);
			scores[i].sid = req[i];
			scores[i].score = $scope.retrieveScoreFromTags(req[i],$scope.retrieveTagsFromID(req[i]));
		 }
		 for(var i =0; i < scores.length; i) {
			  var maxid = $scope.returnMaxidx(scores);
			  //$scope.processRequest(scores[maxid].sid);
			  $scope.param.teamMembers.push(req[i]);
			  scores.splice(maxid,1);			  
		 }
		 
	};
	$scope.returnMaxidx = function(arr) {
		if (arr.length === 0) {
	        return -1;
	    }
	
	    var max = arr[0].score;
	    var maxIndex = 0;
	
	    for (var i = 1; i < arr.length; i++) {
	        if (arr[i].score > max) {
	            maxIndex = i;
	            max = arr[i].score;
	        }
	    }
	    return maxIndex;		
	};

	$scope.refreshViewRequestsReceived = function() {
		$scope.requests = [];
		var teamID = $.trim( $scope.param.teamName );

		$.each($scope.member, function(i,obj) {
			var userID = obj.$id;
			if(typeof obj.selection != "undefined"  && obj.selection.indexOf(teamID) > -1) {
				$scope.requests.push(userID);
			}
		});
		$scope.$apply();
	};
	
	$scope.changeCurrentTeamSize = function(delta) {
		var newVal = $scope.param.currentTeamSize + delta;
		if(newVal >= $scope.range.minTeamSize && newVal <= $scope.range.maxTeamSize) {
			$scope.param.currentTeamSize = newVal;
		}
	};

	$scope.saveFunc = function() {
		var teamID = $.trim( $scope.param.teamName );
		var status = $("#add").text();
		var refPath = $scope.eventName + "/team/" + teamID;
		var memberRef = $scope.eventName + "/member/" + $scope.uid;
		var currentTeamName = $scope.currentUser.inTeam;
		var ref = firebase.database().ref(refPath);

		if(teamID !== '' && status === "Add") {
			$scope.param.teamMembers.push($scope.uid);
			firebase.database().ref(memberRef).set({
				'inTeam': teamID,
				'weight': 0
			});
		}
		var newData = {
			'size': $scope.param.currentTeamSize,
			'teamMembers': $scope.param.teamMembers,
			'tags': $scope.param.tags,
			'weight' : $scope.param.weight,
			'description': (typeof $scope.param.teamDescription !== "undefined" ? $scope.param.teamDescription: "")
		};
		$.each($scope.param.teamMembers, function(i, obj) {
			var rec = $scope.member.$getRecord(obj);
			if(rec != null) {
				rec.selection = [];
				rec.invitedBy = [];
				rec.inTeam = teamID;
				$scope.member.$save(rec);	
			}
		});
		if ($scope.param.teamMembers.length !== 0) {
			if(status === "Add") {
				ref.set(newData);
			}
			else if(teamID === currentTeamName) {
				ref.update(newData);
			}
			else {
				ref.update(newData);
				firebase.database().ref($scope.eventName + "/team/" + currentTeamName).remove();
			}
		}
		location.reload();
	};
	
	$scope.loadFunc = function() {
		var teamID = "";
		$scope.currentUser.$loaded().then(function() {
			if($scope.currentUser.inTeam != null) {
				$("#add").html("Save");
				teamID = $scope.currentUser.inTeam;
				$scope.param.teamName = $scope.currentUser.inTeam;
				var refPath = $scope.eventName + "/team/" + teamID ;
				retrieveOnceFirebase(firebase, refPath, function(data) {
					if(data.child("size").val() != null) {
						$scope.param.currentTeamSize = data.child("size").val();
						$scope.refreshViewRequestsReceived();
					}
					if(data.child("teamMembers").val() != null) {
						$scope.param.teamMembers = data.child("teamMembers").val();
					}
					if(data.child("tags").val() != null) {
						$scope.param.tags = data.child("tags").val();
					}
					if(data.child("weight").val() != null) {
						$scope.param.weight = data.child("weight").val();
					}
					if(data.child("description").val() != null) {
						$scope.param.teamDescription = data.child("description").val();
					}
					$scope.$apply();
				});
			}
			else {
				$("#add").html("Add");
			}
		});		
	};
	//tagsfunctions
	$scope.searchTags = [];
	$scope.filterByTag =function(memTag){
		if ($scope.searchTags.length == 0){return true;}
		var length = (typeof memTag != "undefined")? memTag.length: 0;
		var slength = (typeof $scope.searchTags != "undefined")? $scope.searchTags.length: 0;
		for (var i=0;i<slength;i++){
			for (var j=0; j<length;j++){
				if(memTag[j] == $scope.searchTags[i]){
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
			var div = document.getElementById("filterMember");
		}
		else{
			$scope.searchTags.splice(k,1);
		}

	};
	$scope.tagChecked = function(tagval){
		var length = (typeof $scope.param.tags != "undefined")? $scope.param.tags.length: 0;
		for(var j =0; j < length; j++){
			if(tagval == $scope.param.tags[j]) {
				return true;
			}
		}
		return false;
	};
	$scope.addTags = function(tagval){
		var addOrNot = true;
		var k = 0;
		var length = (typeof $scope.param.tags != "undefined")? $scope.param.tags.length: 0;
		for(; k < length; k++){
			if(tagval == $scope.param.tags[k]){
				addOrNot = false;
				break;
			}
		}
		if(addOrNot){
			$scope.param.tags.push(tagval);
			$scope.param.weight.push(1);
		}
		else{
			$scope.param.tags.splice(k,1);
			$scope.param.weight.splice(k,1);
		}
	};

	$scope.openCategory = function(dVal){
		document.getElementById(dVal).classList.toggle("show");
	};	
	//tagsfunctionendshere

	$scope.processRequest = function(r) {
		//$scope.test = "processRequest: " + r;		
		if($scope.param.teamMembers.indexOf(r) < 0 && 
			$scope.param.teamMembers.length < $scope.param.currentTeamSize) {
			// Not exists, and the current number of team member is less than the preferred team size
			$scope.param.teamMembers.push(r);
			$scope.saveFunc();
		}
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

	$scope.removeMember = function(member) {
		/*
		var x;
		if ($scope.param.teamMembers.length > 1){
			x = confirm("Are you sure to remove this team member?");
		}
		else {
			x = confirm("Are you sure to remove the last team member? Doing this will remove the team.");
		}
		if(x) {
			var index = $scope.param.teamMembers.indexOf(member);
			if(index > -1) {
				$scope.param.teamMembers.splice(index, 1); // remove that item
				var refPath = $scope.eventName + "/member/" + member;
				var ref = firebase.database().ref(refPath);
				ref.update({inTeam: null});
				if($scope.param.teamMembers.length == 0){
					var refPath1 = $scope.eventName + "/team/" + $scope.param.teamName;
					var ref1 = firebase.database().ref(refPath1);
					ref1.remove();
				}
			}
			$scope.saveFunc();
		}
		*/
		var index = $scope.param.teamMembers.indexOf(member);
		if(index > -1) {
			$scope.param.teamMembers.splice(index, 1); // remove that item
			var refPath = $scope.eventName + "/member/" + member;
			var ref = firebase.database().ref(refPath);
			ref.update({inTeam: null});
			if($scope.param.teamMembers.length == 0){
				var refPath1 = $scope.eventName + "/team/" + $scope.param.teamName;
				var ref1 = firebase.database().ref(refPath1);
				ref1.remove();
			}
		}
		$scope.saveFunc();
	};	
	/*
	$scope.checkTeam = function(){
		//check if teamName exist
		$scope.teamList = [];
		$scope.teamList = $scope.team;
		console.log("$scope.team ", $scope.team);
		if (typeof $scope.teamList != 'undefined'){
			for(var i=0; i< $scope.teamList.length; i++){
				if ($scope.param.teamName ==$scope.teamList[i].$id){
					return true;
				}
			}
		}
		return false;
	};
	*/
	
	$scope.canInvite = function(memberId) {
		if($scope.param.teamName === undefined || $scope.param.teamName == "") return false;
		
		// already full
		if($scope.param.teamMembers.length == $scope.param.currentTeamSize) return false;
		
		var memberInfo;
		for(var idx = 0; idx < $scope.member.length; idx++) {
			if($scope.member[idx].$id == memberId) {
				memberInfo = $scope.member[idx];
				break;
			}
		}
		if(memberInfo === undefined 
			|| memberInfo.inTeam !== undefined
			|| memberInfo.invitedBy.indexOf($scope.param.teamName) != -1) return false;
		return true;
	};
	
	//invite function
	$scope.sendInvite = function(id) {
		/*
		if (typeof $scope.param.teamName == 'undefined' || $scope.param.teamName == "") {
			window.alert("Enter a team name first!");
			return;
		}
		if ($scope.checkTeam() != true) {
			window.alert("Team \"" + $scope.param.teamName + "\" does not exist!");
			return;
		}	
		*/	
		//check if user in a team, if not invite user
		var data;
		for(var idx = 0; idx < $scope.member.length; idx++) {
			if($scope.member[idx].$id == id) {
				data = $scope.member[idx];
				break;
			}
		}
		
		if(typeof data.inTeam != 'undefined') {
			window.alert("User is already in a team!");
		} else {
			$scope.invitedBy = typeof data.invitedBy == 'undefined'? []: data.invitedBy;
			if($scope.invitedBy.indexOf($scope.param.teamName) == -1)
				$scope.invitedBy.push($scope.param.teamName);
			console.log("invitedBy: ", $scope.invitedBy);
			var refPath = getURLParameter("q") + "/member/" + id;
			var ref = firebase.database().ref(refPath);
			ref.update({
				invitedBy: $scope.invitedBy
			});
			data.invitedBy = $scope.invitedBy;
			window.alert("Invitation sent!");
		}
	};

}]);