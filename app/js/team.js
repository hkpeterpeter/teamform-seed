angular.module('teamform')
.controller('TeamCtrl', ['$scope', '$firebaseObject', '$firebaseArray',  '$stateParams', '$state',
    function($scope, $firebaseObject, $firebaseArray, $stateParams, $state) {

	var refPath = "";
	var eventName = $stateParams.event;
	$scope.event = eventName;

	// TODO: implementation of MemberCtrl	
	$scope.param = {
		"teamName" : '',
		"currentTeamSize" : 0,
		"teamMembers" : []
	};

	refPath =  eventName + "/admin";
	$scope.retrieveOnceFirebase(firebase, refPath, function(data) {

		if ( data.child("param").val() != null ) {
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
	$scope.refreshViewRequestsReceived = function() {
		
		//$scope.test = "";		
		$scope.requests = [];
		var teamID = $.trim( $scope.param.teamName );	
				
		$.each($scope.member, function(i,obj) {			
			//$scope.test += i + " " + val;
			//$scope.test += obj.$id + " " ;
			
			var userID = obj.$id;
			if ( typeof obj.selection != "undefined"  && obj.selection.indexOf(teamID) > -1 ) {
				//$scope.test += userID + " " ;
				
				$scope.requests.push(userID);
			}
		});
		$scope.$apply();
	};

	$scope.changeCurrentTeamSize = function(delta) {
		var newVal = $scope.param.currentTeamSize + delta;
		if (newVal >= $scope.range.minTeamSize && newVal <= $scope.range.maxTeamSize ) {
			$scope.param.currentTeamSize = newVal;
		} 
	};

	$scope.saveFunc = function() {
		var teamID = $.trim( $scope.param.teamName );
		
		if ( teamID !== '' ) {
			var newData = {				
				'size': $scope.param.currentTeamSize,
				'teamMembers': $scope.param.teamMembers
			};		
			
			var refPath = eventName + "/team/" + teamID;
			var ref = firebase.database().ref(refPath);
			// for each team members, clear the selection in /[eventName]/team/
			
			$.each($scope.param.teamMembers, function(i,obj){
				//$scope.test += obj;
				var rec = $scope.member.$getRecord(obj);
				rec.selection = [];
				$scope.member.$save(rec);
			});

			ref.set(newData, function(){			

				// console.log("Success..");
				
				// Finally, go back to the front-end
				// window.location.href= "index.html";
			});
		}
	};
	
	$scope.loadFunc = function() {
		
		var teamID = $.trim( $scope.param.teamName );		
		var eventName = $scope.event;
		var refPath = eventName + "/team/" + teamID;

		$scope.retrieveOnceFirebase(firebase, refPath, function(data) {	

			if ( data.child("size").val() != null ) {
				
				$scope.param.currentTeamSize = data.child("size").val();
				
				$scope.refreshViewRequestsReceived();
								
				
			} 
			
			if ( data.child("teamMembers").val() != null ) {
				
				$scope.param.teamMembers = data.child("teamMembers").val();
				
			}
			
			$scope.$apply(); // force to refresh
		});
	};

	//Delete Team Functionality**
	$scope.deleteFunc = function() {
	    if (confirm("Are you sure you want to delete this team from the event?\nCurrent team members will not be deleted.\n \nWARNING- this cannot be undone!")){
		//remove the event from firebase, including all child nodes
		var teamID = $.trim( $scope.param.teamName );		
		var refPath = eventName + "/team/" + teamID ;
		ref = firebase.database().ref(refPath);
		ref.remove();
        }
	};
	
	$scope.processRequest = function(r) {
		//$scope.test = "processRequest: " + r;
		
		if ( 
		    $scope.param.teamMembers.indexOf(r) < 0 && 
			$scope.param.teamMembers.length < $scope.param.currentTeamSize  ) {
				
			// Not exists, and the current number of team member is less than the preferred team size
			$scope.param.teamMembers.push(r);
			
			$scope.saveFunc();
		}
	};
	
	$scope.removeMember = function(member) {
		
		var index = $scope.param.teamMembers.indexOf(member);
		if ( index > -1 ) {
			$scope.param.teamMembers.splice(index, 1); // remove that item
			
			$scope.saveFunc();
		}
		
	};
}]);
