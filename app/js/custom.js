var app = angular.module('teamform', ['ui.bootstrap']);
app.controller('myCtrl', function($scope) {

    $scope.firstName = "John";
    $scope.lastName = "Doe";

    // toggle wrapper to show and hide the left sidebar
    $scope.toggleWrapper = function() {

        if ($scope.isToggled != "toggled") {

                $scope.isToggled = "toggled";

        } else {

            $scope.isToggled = "nottoggled";

        }

    }

});
