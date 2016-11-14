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
	var eventName = getURLParameter("q");
	$scope.tags = [];
    $scope.tags = $firebaseArray(firebase.database().ref("newTags"));
	// TODO: implementation of MemberCtrl	
	$scope.param = {
		teamName : '',
		currentTeamSize : 0,
		teamMembers : [],
		tags : [],
		invitedBy: []
	};
	$scope.uid = "";
	$scope.currentUser = [];

	firebase.auth().onAuthStateChanged(function(firebaseUser) {
		if(firebaseUser) {
			var user = firebase.auth().currentUser;
			$scope.uid = user.uid;
			refPath = eventName + "/member/" + $scope.uid;
			$scope.currentUser = $firebaseObject(firebase.database().ref(refPath));	
			// if($scope.currentUser.$value != null) {
				$scope.loadFunc();
			// }
		}
	});

	refPath = eventName + "/admin";
	retrieveOnceFirebase(firebase, refPath, function(data) {
		if(data.child("param").val() != null) {
			$scope.range = data.child("param").val();
			$scope.param.currentTeamSize = parseInt(($scope.range.minTeamSize + $scope.range.maxTeamSize)/2);
			$scope.$apply(); // force to refresh
			$('#team_page_controller').show(); // show UI
		} 
	});
	
	refPath = eventName + "/member";
	$scope.member = [];
	$scope.member = $firebaseArray(firebase.database().ref(refPath));

	refPath = eventName + "/team";
	$scope.team = [];
	$scope.team = $firebaseArray(firebase.database().ref(refPath));	
	
	$scope.requests = [];

	$scope.users = [];
	$scope.member.$loaded(function(data) {
		angular.forEach(data, function(mem) {
			$scope.users.push($firebaseObject(getUserWithId(mem.$id)));
		});
	});
	
	$scope.retrieveNameFromID = function(id) {
		for(var tmpIdx = 0; tmpIdx < $scope.users.length; tmpIdx++) {
			if($scope.users[tmpIdx].$id === id) {
				return $scope.users[tmpIdx].name;
			}
		}
		return "null";
	};

	$scope.retrieveTagsFromID = function(id) {
		for(var tmpIdx = 0; tmpIdx < $scope.member.length; tmpIdx++) {
			if($scope.member[tmpIdx].$id === id) {
				return $scope.member[tmpIdx].tags;
			}
		}
		return "null";
	};

	$scope.retrieveNamesFromJSON = function(teamMembers) {
		var result = [];
		var length = (typeof teamMembers != 'undefined') ? teamMembers.length : 0;
		for(var idx = 0; idx < length; idx++) {
			for(var tmpIdx = 0; tmpIdx < $scope.users.length; tmpIdx++) {
				if($scope.users[tmpIdx].$id === teamMembers[idx]) {
					result.push($scope.users[tmpIdx].name);
					break;
				}
			}
		}
		return result;
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
		var refPath = getURLParameter("q") + "/team/" + teamID;
		var ref = firebase.database().ref(refPath);

		if(teamID !== '' && status === "Add") {
			$scope.param.teamMembers.push($scope.uid);			
			var rp = eventName + "/member/" + $scope.uid;
			firebase.database().ref(rp).set({
				'inTeam': teamID,
				'weight': 0
			});
		}
		var newData = {
			'size': $scope.param.currentTeamSize,
			'teamMembers': $scope.param.teamMembers,
			'tags': $scope.param.tags
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
		if ($scope.param.teamMembers.length !==0){
		ref.set(newData, function() {
			location.reload();
		});
	    }
		else{
			location.reload();
		}

	};
	
	$scope.loadFunc = function() {
		var teamID = "";
		$scope.currentUser.$bindTo($scope, "data").then(function() {
			if($scope.data.inTeam != null) {
				$("#add").html("Save");
				teamID = $scope.data.inTeam;
				$scope.param.teamName = $scope.data.inTeam;
				var eventName = getURLParameter("q");
				var refPath = eventName + "/team/" + teamID ;
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
					$scope.$apply();
				});
			}
			else {
				$("#add").html("Add");
			}
		});		
	};
	//tagsfunctions
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
	 	if(addOrNot){$scope.param.tags.push(tagval);}
	 	else{$scope.param.tags.splice(k,1);}
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
	
	$scope.removeMember = function(member) {
		var x;
		if ($scope.param.teamMembers.length > 1){
			x = confirm("Are you sure to remove this team member?");
		}
		else {
			x = confirm("Are you sure to remove the last team member? Doing this will remove the team.");
		}
		if (x){
		var index = $scope.param.teamMembers.indexOf(member);
		if(index > -1) {
			$scope.param.teamMembers.splice(index, 1); // remove that item
			var refPath = eventName + "/member/" + member;
			var ref = firebase.database().ref(refPath);
			ref.update({inTeam: null});
			if($scope.param.teamMembers.length == 0){
				var refPath1 = eventName + "/team/" + $scope.param.teamName;
				var ref1 = firebase.database().ref(refPath1);
				ref1.remove();
			}
		}
		$scope.saveFunc();
		}
	};
	

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
	}
		
	//invite function
	$scope.sendInvite = function(id){
		if (typeof $scope.param.teamName == 'undefined' || $scope.param.teamName == ""){
			window.alert("Enter a team name first!");
			return;
		}
		if ($scope.checkTeam() != true){
			window.alert("Team \"" + $scope.param.teamName + "\" does not exist!");
			return;
		}		
		//check if user in a team, if not invite user
		var refPath = getURLParameter("q") + "/member/" + id;
		$scope.memberInfo = $firebaseObject(firebase.database().ref(refPath));
		$scope.memberInfo.$loaded(function(data){
			console.log("Data: ", data);
			if(typeof data.inTeam != 'undefined'){
				window.alert("User is already in a team!");
			}else{
				$scope.inviteList = [];
				$scope.invitedBy = [];				
				$scope.inviteList = data.invitedBy;
				
				if (typeof $scope.inviteList != 'undefined'){
					for(var i=0; i< $scope.inviteList.length; i++){
						//check if team has send invitation to this user before.
						if ($scope.param.teamName == $scope.inviteList[i]){
							window.alert("Invitation sent before.");
							return;
						}
						//push
						else{
							$scope.invitedBy.push($scope.inviteList[i]);
						}
					}
				}
				$scope.invitedBy.push($scope.param.teamName);
				console.log("invitedBy: ", $scope.invitedBy);
				var refPath = getURLParameter("q") + "/member/" + id;
				var ref = firebase.database().ref(refPath);
				ref.update({
					invitedBy: $scope.invitedBy
				});
				window.alert("Invitation sent!");
			}
		});
	}

}]);