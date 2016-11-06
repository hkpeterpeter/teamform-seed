
var ti = angular.module("Teaminformation", ["firebase"])
    
ti.controller('TiCtrl', function($scope) {
	
		$scope.loadFunc = function() {
		var teamID = $.trim( $scope.Team.teamName );		
		var refPath =  "Team/" + teamID ;
		retrieveOnceFirebase(firebase, refPath, function(data) {	
			
			$scope.$apply(); // force to refresh
		});
    }
});