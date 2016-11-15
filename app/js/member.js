angular.module('teamform')
.controller('MemberCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$stateParams', '$state',
	function($scope, $firebaseObject, $firebaseArray, $stateParams, $state) {

    var eventName = $stateParams.event;
    $scope.event = eventName;
	$scope.userID = "";
	$scope.userName = "";	
	$scope.teams = {};

	$scope.loadFunc = function() {
		var userID = $scope.userID;
		if ( userID !== '' ) {
			
			var refPath = eventName + "/member/" + userID;
			$scope.retrieveOnceFirebase(firebase, refPath, function(data) {
								
				if ( data.child("memberName").val() != null ) {
					$scope.userName = data.child("memberName").val();
				} else {
					$scope.userName = "";
				}
				
				if (data.child("selection").val() != null ) {
					$scope.selection = data.child("selection").val();
				}
				else {
					$scope.selection = [];
				}
				$scope.$apply();
			});
		}
	};
	
	$scope.saveFunc = function() {		
		var userID = $.trim( $scope.userID );
		var userName = $.trim( $scope.userName );
		
		if ( userID !== '' && userName !== '' ) {	
			var newData = {				
				'memberName': userName,
				'selection': $scope.selection
			};
			
			var refPath = eventName + "/member/" + userID;
			var ref = firebase.database().ref(refPath);
			
			ref.set(newData, function(){
				// complete call back
				//alert("data pushed...");
				
				// Finally, go back to the front-end
				$state.go('landing');
			});
		}
	};
	
	$scope.refreshTeams = function() {
		var refPath = eventName + "/team";
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
		};
	
		$scope.teams = $firebaseArray(ref);
		/*$scope.teams.$loaded()
			.then( function(data) {
			}) 
			.catch(function(error) {
				// Database connection error handling...
				//console.error("Error:", error);
			});*/
	};
        
	$scope.refreshTeams(); // call to refresh teams...
}]);