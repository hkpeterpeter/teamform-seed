var leaderApp = angular.module('leaderApp', []);

leaderApp.controller('eventCtrl', function($scope) {
  $scope.event = {
  	name: 'newEvent',
  	maxSize: 10,
    minSize: 5
	};
  $scope.preferredSize = 7;
});
