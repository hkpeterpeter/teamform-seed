(function (angular) {
    'use strict';

    angular.module("teamform", ['ui.router']
    ).run(['$rootScope', function ($rootScope) {
    }]).config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider){

            $urlRouterProvider.otherwise('/');

            $stateProvider.state('landing', {
                url: '/',
                templateUrl: 'app/partials/landing.html'
            }).state('about_us', {
                url: '/about_us',
                templateUrl: 'app/partials/about_us.html'
            });
    }]);
}(angular));