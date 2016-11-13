$(document).ready(function(){
	$('#team_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");



	var eventid = getURLParameter("eventid");
		 console.log(eventid);
	if (eventid != null && eventid !== '' ) {
		$('#text_event_name').text("Event id: " + eventid);
		
	}


});

angular.module('teamform-team-app', ['firebase'])
.controller('TeamCtrl', ['$scope', '$firebaseObject', '$firebaseArray', 
    function($scope, $firebaseObject, $firebaseArray) {
		
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();


	var teamid = getURLParameter("teamid");
	var teamRef = firebase.database().ref('events/'+eventid+'/teams/'+teamid);
	var teamObject = $firebaseObject(teamRef);

	var eventid = getURLParameter("eventid");
	var eventRef = firebase.database().ref('events/'+eventid+'/admin/param');
	var eventObject = $firebaseObject(eventRef);


	// TODO: implementation of MemberCtrl	
	$scope.param = {
		"teamName" : '',
		"currentTeamSize" : 0,
		"teamMembers" : []
	};
		
	

	refPath =  "events/"+ eventid + "/admin";
	retrieveOnceFirebase(firebase, refPath, function(data) {	
		console.log(data.child("param").val());
		if ( data.child("param").val() != null ) {
			$scope.range = data.child("param").val();
			$scope.param.currentTeamSize = parseInt(($scope.range.minTeamSize + $scope.range.maxTeamSize)/2);
			$scope.$apply(); // force to refresh
			$('#team_page_controller').show(); // show UI
			
		} 
	});
	
	
	refPath = "events/"+ eventid + "/teams/"+ teamid +"teamMembers";	
	$scope.member = [];
	$scope.member = $firebaseArray(firebase.database().ref(refPath));
	
	
	refPath = "events/"+ eventid + "/teams";	
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
		
	}
	
	$scope.changeCurrentTeamSize = function(delta) {
		var newVal = $scope.param.currentTeamSize + delta;
		if (newVal >= $scope.range.minTeamSize && newVal <= $scope.range.maxTeamSize ) {
			$scope.param.currentTeamSize = newVal;
		} 
	}

	$scope.saveFunc = function() {
		
		
		var teamID = $.trim( $scope.param.teamName );
		
		if ( teamID !== '' ) {
			
			var newData = {				
				'size': $scope.param.currentTeamSize,
				'teamMembers': $scope.param.teamMembers
			};		
			
			var refPath = getURLParameter("q") + "/team/" + teamID;	
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
		
		
	}
	
	$scope.loadFunc = function() {
		
		var teamID = $.trim( $scope.param.teamName );		
		var eventid = getURLParameter("q");
		var refPath = eventid + "/team/" + teamID ;
		retrieveOnceFirebase(firebase, refPath, function(data) {	

			if ( data.child("size").val() != null ) {
				
				$scope.param.currentTeamSize = data.child("size").val();
				
				$scope.refreshViewRequestsReceived();
								
				
			} 
			
			if ( data.child("teamMembers").val() != null ) {
				
				$scope.param.teamMembers = data.child("teamMembers").val();
				
			}
			
			$scope.$apply(); // force to refresh
		});

	}
	
	$scope.processRequest = function(r) {
		//$scope.test = "processRequest: " + r;
		
		if ( 
		    $scope.param.teamMembers.indexOf(r) < 0 && 
			$scope.param.teamMembers.length < $scope.param.currentTeamSize  ) {
				
			// Not exists, and the current number of team member is less than the preferred team size
			$scope.param.teamMembers.push(r);
			
			$scope.saveFunc();
		}
	}
	
	$scope.removeMember = function(member) {
		
		var index = $scope.param.teamMembers.indexOf(member);
		if ( index > -1 ) {
			$scope.param.teamMembers.splice(index, 1); // remove that item
			
			$scope.saveFunc();
		}
		
	}
	
	
	
	//logout function
	$scope.logout = function(){
		firebase.auth().signOut();
	}

	//monitor if the user is logged in or not
	firebase.auth().onAuthStateChanged(user => {
		if(user){
			console.log('logged in');
            var database = firebase.database();
            var usersRef = database.ref('users/'+user.uid);
            var currentUserData = $firebaseObject(usersRef);
            currentUserData.$loaded()
                .then(function(data){
                    $scope.username = currentUserData.name;
                })
                .catch(function(error){
                    console.error("Error: "+error);
                });
            $scope.loggedIn = true;
			$scope.uid = user.uid;
			eventid = getURLParameter("q");
			refPath = "events/"+ eventid + "/admin/param";
			ref = firebase.database().ref(refPath);	
			$scope.param = $firebaseObject(ref);
			$scope.param.$loaded().then(function(data){
				// if($scope.param.admin != user.uid){//check if user is admin of this event
				// 	console.log('admin: '+$scope.param.admin+', user: '+user.uid);
				// 	console.log('not admin');
				// 	$window.alert("Permission Denied. \n You are not admin of this event")
				// 	$window.location.href = '/index.html';
				// }
			})

        }else{
			console.log('not log in');
            $window.location.href = '/index.html';
		}
	})
	
	
	
		
}]);