teamapp.controller('admin_title_ctrl', function($scope) {
  $scope.event = {
  	name: 'newEvent',
  	admins: ['admin1', 'admin2', 'admin3']
	};
});

teamapp.controller('admin_team_ctrl', function($scope) {
	$scope.teams = [
		{
			name: 'TeamOne',
			size: 5,
			minSize: 6,
			maxSize: 7,
			skills: ['JavaScript', 'Java'],
			members: ['m1', 'm2', 'm18', 'm62', 'm23']
		}, {
			name: 'TeamTwo',
			size: 3,
			minSize: 2,
			maxSize: 6,
			skills: ['Machine Learning', 'Java'],
			members: ['m10', 'm63', 'm24']
		}, {
			name: 'TeamThree',
			size: 4,
			minSize: 4,
			maxSize: 6,
			skills: ['Machine Learning', 'AngularJS'],
			members: ['m11', 'm66', 'm25']
		}
	];

	$scope.remove = function(team) { 
  		var index = $scope.teams.indexOf(team);
  		$scope.teams.splice(index, 1);     
	};
});

teamapp.controller('admin_member_ctrl', function($scope) {
	$scope.users = [
		{
			name: "user1",
			intro: "I am user1. I am a front-end developer. This is my self-introduction.",
			skills: ['JavaScript', 'AngularJS', 'Node.js'],
			requests: ['TeamOne', 'TeamTwo']
		}, {
			name: "user2",
			intro: "I am user2. I am a Java expert. This is my self-introduction.",
			skills: ['AngularJS', 'Algorithm'],
			requests: ['TeamThree', 'TeamTwo']
		}
	];
});