
var ti = angular.module("Teaminformation", ["firebase"])
    
ti.controller('TiCtrl', function($scope) {
	
	
		// Get a database reference to our posts
		var db = firebase.database();
		var ref = db.ref("Team");

		// Attach an asynchronous callback to read the data at our posts reference
		ref.on("teamName", function(snapshot) {
		  console.log(snapshot.val());
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});

		// $scope.loadFunc = function() {
		// var teamID = $.trim( $scope.Team.teamName );		
		// var refPath =  "Team/" + teamID ;
		// retrieveOnceFirebase(firebase, refPath, function(data) {	
			
		// 	$scope.$apply(); // force to refresh
		// });
  //   }
});