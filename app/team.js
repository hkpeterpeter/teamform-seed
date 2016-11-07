app.controller('CTCtrl', function($scope, $firebaseArray) {
		$scope.team = {
			teamName: "",
			openness: "",
			developer: false,
			devNum: 0,
			designer: false,
			desNum: 0,
			desc: ""
		};
		
		var ref = firebase.database().ref("Team");
		$scope.newTeam = $firebaseArray(ref);
		
		$scope.createTeam = function() {
			if ($scope.team.teamName != "" && $scope.team.openness != "") {
				$scope.newTeam.$add($scope.team);
			}
		}
    });