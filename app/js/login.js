angular.module('teamform')
        .controller(
        'LoginCtrl',
        ['$scope', '$firebaseObject', '$firebaseArray', '$state',
            function($scope, $firebaseObject, $firebaseArray, $state) {
                $scope.goToAdmin = function() {
                    $state.go("admin", {event: $scope.event});
                };

                $scope.goToLeader = function() {
                    $state.go("leader", {event: $scope.event});
                };

                $scope.goToMember = function() {
                    $state.go("member", {event: $scope.event});
                };

            }
        ]
);