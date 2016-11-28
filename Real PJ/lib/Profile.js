app.controller("profileCtrl", ["$scope", "$firebaseObject", "$firebaseArray",
  function($scope, $firebaseObject, $firebaseArray) {
  		$scope.EditProfile = function() {
  			ref = firebase.database().ref('User/' + $scope.id);
  			ref.update($scope.editProfile);
  			
			$("#editProfileModal").modal("hide")
		};
  }
]);
