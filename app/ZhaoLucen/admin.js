var adminApp = angular.module('adminApp', []);

adminApp.controller('titleCtrl', function($scope) {
  $scope.event = {
  	name: 'newEvent',
  	admins: ['admin1', 'admin2', 'admin3']
	};
});