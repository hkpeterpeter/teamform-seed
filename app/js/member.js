/*$(document).ready(function(){

	$('#member_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' ) {
		$('#text_event_name').text("Event name: " + eventName);
		$('#member_page_controller').show();
	}

});*/

angular.module('teamform-member-app', ['firebase'])
.controller('MemberCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	// TODO: implementation of MemberCtrl
  
    var ref = firebase.database().ref("members");
	$scope.members = $firebaseArray(ref);
	
	
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();
	
	$scope.first_name = "";
	//$scope.userName = "";	
	//$scope.teams = {};
	
	
	
	$scope.loadFunc = function() {
		var first_name = $scope.first_name;
		if ( first_name !== '' ) {
			
			var refPath = getURLParameter("q") + "/members/" + first_name;
			retrieveOnceFirebase(firebase, refPath, function(data) {
								
				if ( data.child("first_name").val() != null ) {
					$scope.first_name = data.child("first_name").val();
				} else {
					$scope.first_name = "";
				}
				
				/*
				if (data.child("selection").val() != null ) {
					$scope.selection = data.child("selection").val();
				}
				else {
					$scope.selection = [];
				}*/
				$scope.$apply();
			});
		}
	}
	/*
	$scope.saveFunc = function() {
		
		
		var userID = $.trim( $scope.userID );
		var userName = $.trim( $scope.userName );
		
		if ( userID !== '' && userName !== '' ) {
									
			var newData = {				
				'name': userName,
				'selection': $scope.selection
			};
			
			var refPath = getURLParameter("q") + "/member/" + userID;	
			var ref = firebase.database().ref(refPath);
			
			ref.set(newData, function(){
				// complete call back
				//alert("data pushed...");
				
				// Finally, go back to the front-end
				window.location.href= "index.html";
			});
			
			
		
					
		}
	}
	
	$scope.refreshTeams = function() {
		var refPath = getURLParameter("q") + "/team";	
		var ref = firebase.database().ref(refPath);
		
		// Link and sync a firebase object
		$scope.selection = [];		
		$scope.toggleSelection = function (item) {
			var idx = $scope.selection.indexOf(item);    
			if (idx > -1) {
				$scope.selection.splice(idx, 1);
			}
			else {
				$scope.selection.push(item);
			}
		}
	
	
		$scope.teams = $firebaseArray(ref);
		$scope.teams.$loaded()
			.then( function(data) {
								
							
							
			}) 
			.catch(function(error) {
				// Database connection error handling...
				//console.error("Error:", error);
			});
			
		
	}*/
	
	
	$scope.refreshTeams(); // call to refresh teams...
		
}]);