app.controller("siteCtrl", ["$scope", "$firebaseObject", "$firebaseArray",
	function($scope, $firebaseObject, $firebaseArray) {
		$scope.changeSite1 = function() {
			$scope.pageChange = "home";
		}

		$scope.changeSite2 = function() {
			$scope.pageChange = "teams";
		}

		$scope.changeSite3 = function() {
			$scope.pageChange = "profile";
		}

		$scope.changeSite4 = function() {
			$scope.pageChange = "aboutus";
		}


		$scope.hideHTML = function() {
			$scope.hidehtml = true;
			$scope.skillChange = "default";
			console.log($scope.hidehtml);
			$("#skillModal").modal("hide")
		}

		$scope.hideJAVA = function() {
			$scope.hidejava = true;
			$scope.skillChange = "default";	
			console.log($scope.hidejava);
			$("#skillModal").modal("hide")
		}
                            
                            $scope.changeteam = function() {
                            $scope.teamDetailChange = "teamLeaderDetail";
                            }
                           
                            


	}
]);