$(document).ready(function(){

    $("#btn_event").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "event.html?q=" + val;
			var event_name = $('#input_text').val();
    		window.location.href = url ;
    		return false;
    	}
    });

});






angular.module('teamform-admin-app', ['firebase'])
.controller('AdminCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	// TODO: implementation of AdminCtrl
	
	// Initialize $scope.param as an empty JSON object
	$scope.param = {};
			
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();
	$scope.input_text;
	var refPath, ref, eventName;
	
	eventName = getURLParameter("q");
	refPath = eventName + "/admin/param";	
	ref = firebase.database().ref(refPath);
		
	// Link and sync a firebase object
	
	$scope.param = $firebaseObject(ref);
	$scope.param.$loaded()
		.then( function(data) {
			
			// Fill in some initial values when the DB entry doesn't exist			
			if(typeof $scope.param.maxTeamSize == "undefined"){				
				$scope.param.maxTeamSize = 10;
			}			
			if(typeof $scope.param.minTeamSize == "undefined"){				
				$scope.param.minTeamSize = 1;
			}
			
			// Enable the UI when the data is successfully loaded and synchornized
			$('#admin_page_controller').show(); 				
		}) 
		.catch(function(error) {
			// Database connection error handling...
			//console.error("Error:", error);
		});
		
	
	
		
}]);