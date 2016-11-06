angular.module("Teaminformation", ["firebase"])
    .controller('TiCtrl', function($scope,$firebaseArray) {
	
		var ref = firebase.database().ref("Team");
		
		$scope.Teaminformation = $firebase(ref).$asArray();

    });