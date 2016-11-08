var leaderApp = angular.module('leaderApp', []);

leaderApp.controller('eventCtrl', function($scope) {
  $scope.event = {
    name: 'Event Name',
    maxSize: 10,
    minSize: 5
  };
  $scope.preferredSize = 7;
  $scope.preferredSkills = ['JavaScript', 'Angularjs'];
});
