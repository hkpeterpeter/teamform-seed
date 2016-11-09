teamapp.controller('fishCtrl', ['$scope', "$rootScope", function($scope,$rootScope) {}]);


teamapp.directive("fishNavi", function() {
    return {
        restrict: "E",
        templateUrl: "fish/fish-navi.html",
    };
});