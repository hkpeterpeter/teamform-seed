app.controller("profileCtrl", ["$scope", "$firebaseObject", "$firebaseArray",
  function($scope, $firebaseObject, $firebaseArray) {
  		$scope.changeModel = function() {
  			console.log("Signed in as:");
			$("#editProfileModal").modal("hide")
		};
  }
]);
