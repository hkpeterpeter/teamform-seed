(function (angular) {
    'use strict';

    /*
     * A template for member cards to be used throughout the website.
     */
    angular.module('teamform').directive('memberCard', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '=data'
            },
            templateUrl: 'app/directives/templates/member-card.html'
        };
    });
}(angular));