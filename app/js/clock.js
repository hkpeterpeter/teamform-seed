angular.module("clock", []).controller("clockCtrl", function ($scope, $timeout) {
    //clock
    $scope.clock = new Date().toUTCString();
    clock();

    //Update Universal Time
    function clock() {
        $scope.clock = new Date().toUTCString();
        $timeout(clock, 1000);
    }
});