(function (angular) {
    'use strict';

    angular.module("teamform", ['ui.router', 'firebase']
    ).run(['$rootScope', function ($rootScope) {

        $rootScope.retrieveOnceFirebase = function(firebase, refPath, callbackFunc) {
            firebase.database().ref(refPath).once("value").then(callbackFunc);
        };

    }]).config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider){

            $urlRouterProvider.otherwise('/');

            $stateProvider.state('landing', {
                url: '/',
                templateUrl: 'app/partials/landing.html'
            }).state('about_us', {
                url: '/about_us',
                templateUrl: 'app/partials/about_us.html'
            }).state('login', {
                url: '/login',
                templateUrl: 'app/partials/login.html',
                controller: 'LoginCtrl'
            }).state('admin', {
                url: '/admin/:event',
                templateUrl: 'app/partials/admin.html',
                controller: 'AdminCtrl'
            }).state('member', {
                url: '/member/:event',
                templateUrl: 'app/partials/member.html',
                controller: 'MemberCtrl'
            }).state('team', {
                url: '/team/:event',
                templateUrl: 'app/partials/team.html',
                controller: 'TeamCtrl'
            }).state('admin_creation', {
                url: '/admin_creation',
                templateUrl: 'app/partials/admin_creation.html',
                controller: 'AdminCreationCtrl'
            }).state('member_creation', {
                url: '/member_creation',
                templateUrl: 'app/partials/member_creation.html',
                controller: 'MemberCreationCtrl'
            }).state('team_creation', {
                url: '/team_creation',
                templateUrl: 'app/partials/team_creation.html',
                controller: 'TeamCreationCtrl'
            });
    }]);
}(angular));