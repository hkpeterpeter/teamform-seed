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
            });
    }]);
}(angular));