app.controller("piCtrl", ["$scope", "$firebaseArray", "$rootScope", 
	function($scope, $firebaseArray, $rootScope) {
	
	var ref=firebase.database().ref("memberWithNoTeam"+"/"+$rootScope.id);
    $scope.data = $firebaseArray(ref);
}]);
