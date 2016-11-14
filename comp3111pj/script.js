(function(angular) {
  'use strict';
angular.module('equals', []).controller('ctrl', ['$scope', function($scope) {
  $scope.user1 = {};
  $scope.user2 = {};
  $scope.compare = function() {
    $scope.result = angular.equals($scope.user1, $scope.user2);
  };
}]);
})(window.angular);
