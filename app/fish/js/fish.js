teamapp.controller('fishCtrl', ['$scope', "$rootScope", function($rootScope, $scope) {}]);
teamapp.controller('eventCtrl', ['$scope', "$rootScope", function($rootScope, $scope) {}]);

teamapp.directive("fishNavi", function() {
    return {
        restrict: "E",
        templateUrl: "fish/fish-navi.html",
        // replace: true
    };
});