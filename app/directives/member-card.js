(function (angular) {
    'use strict';

    console.log("running");

    /*
     * A template for member cards to be used throughout the website.
     */
    angular.module('teamform-member-app', []).directive('memberCard', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '=data'
            },
            templateUrl: 'directives/templates/member-card.html'
        };
    });
}(angular));