
teamapp.controller('admin_ctrl', function($scope, $rootScope, $firebaseObject) {
  var event = $firebaseObject($rootScope.event_ref.child('0'));
  event.$loaded().then(function(){
  	console.log(event.adminID);
  	$rootScope.eventTeams = event.allTeams;
  	$rootScope.eventUsers = event.waitingUsers;
  	$scope.minSize = event.minSize;
  	$scope.maxSize = event.maxSize;
  	$scope.size = $scope.maxSize - $scope.minSize + 1;
  	console.log($scope.size);
  	var admin = $firebaseObject($rootScope.user_ref.child('0'));
  	admin.$loaded().then(function(){
  		$scope.event = {
  			name: event.eventName,
  			admin: admin.name
  		};
  	});
  	console.log($rootScope.eventTeams);
  });

  $scope.getNumber = function(num) {
    return new Array(num);   
	}

	console.log($rootScope.eventTeams);
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