$(document).ready(function(){
	
	$('#admin_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' ) {
		$('#text_event_name').text("Event name: " + eventName);
		
	}

});

angular.module('teamform-admin-app', ['firebase'])
.controller('AdminCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	// TODO: implementation of AdminCtrl
	
	// Initialize $scope.param as an empty JSON object
	$scope.param = {};
	$scope.UIDparam = {};		
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();
	var logged_in=getUID();
	//document.getElementById('uid').textContent = logged_in;
	var refPath, ref, eventName, current_uid;
	//current_uid=document.getElementById('uid').textContent;
	//current_uid=getUID();
	eventName = getURLParameter("q");
	refPath = "events/" + eventName + "/admin/param";	
	ref = firebase.database().ref(refPath);
	UIDrefPath = "events/" + eventName + "/admin/UIDparam";
	UIDref = firebase.database().ref(UIDrefPath);
	
	// Link and sync a firebase object
	
	$scope.param = $firebaseObject(ref);
	$scope.UIDparam = $firebaseObject(UIDref);
	
	$scope.param.$loaded()
		.then( function(data) {
			current_uid=document.getElementById('uid').textContent;

			events_adminPath = "users/"	+ current_uid +"/events_admin/";
			events_admin_ref = firebase.database().ref(events_adminPath);
	
			// Check if logged in user is the admin of the event
			if (!checkLoginstate()){
				//window.alert("You don't have permission to manage this event! Please login.");
				window.location.href= "redirect.html";
			}
			if (typeof $scope.param.maxTeamSize != "undefined"){
				if ($scope.UIDparam.adminUID != current_uid){
					//window.alert("You don't have permission to manage this event!");
					window.location.href= "redirect.html";
				}
			}
			// Fill in some initial values when the DB entry doesn't exist			
			if(typeof $scope.param.maxTeamSize == "undefined"){				
				$scope.param.maxTeamSize = 10;
			}			
			if(typeof $scope.param.minTeamSize == "undefined"){				
				$scope.param.minTeamSize = 1;
			}
			if(typeof $scope.UIDparam.adminUID == "undefined"){				
				$scope.UIDparam.adminUID = current_uid;
				events_admin_ref.once("value").then(function(snapshot){
              	var hasEvent = snapshot.hasChild(eventName);
              	if (!hasEvent)
                	var newUser = events_admin_ref.child(eventName).set(true);
            	});
				//$scope.events_admin_param.child("eventName") = true;
			}
			// Enable the UI when the data is successfully loaded and synchornized
			$('#admin_page_controller').show(); 				
		}) 
		.catch(function(error) {
			// Database connection error handling...
			//console.error("Error:", error);
		});
		
	
	refPath = "events/" + eventName + "/team";	
	$scope.team = [];
	$scope.team = $firebaseArray(firebase.database().ref(refPath));
	
	
	refPath = "events/" + eventName + "/member";
	$scope.member = [];
	$scope.member = $firebaseArray(firebase.database().ref(refPath));
	
	

	$scope.changeMinTeamSize = function(delta) {
		var newVal = $scope.param.minTeamSize + delta;
		if (newVal >=1 && newVal <= $scope.param.maxTeamSize ) {
			$scope.param.minTeamSize = newVal;
		} 
		
		$scope.param.$save();

		
	}

	$scope.changeMaxTeamSize = function(delta) {
		var newVal = $scope.param.maxTeamSize + delta;
		if (newVal >=1 && newVal >= $scope.param.minTeamSize ) {
			$scope.param.maxTeamSize = newVal;
		} 
		
		$scope.param.$save();
		
		
	}

	$scope.saveFunc = function() {

		$scope.param.$save();
		$scope.UIDparam.$save();
		//$scope.events_admin_param.$save();
		// Finally, go back to the front-end
		window.location.href= "index.html";
	}
	
		
}]);