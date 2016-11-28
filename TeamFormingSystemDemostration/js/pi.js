var app = angular.module("pi", ["firebase"]); 

app.controller("info", 

	// Implementation the todoCtrl 
	function($scope, $firebaseArray) {

		var ref=firebase.database().ref("pi");
    	ref.orderByChild("Name").equalTo("Kit").once("child_added", function(dataRef) {
            $scope.$apply(function() {
            $scope.level = dataRef.child("level").val();
        	});
            console.log($scope.level);
        });

	}
);