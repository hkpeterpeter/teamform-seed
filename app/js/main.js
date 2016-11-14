(function (angular) {
    'use strict';

    angular.module("teamform", ['ui.router', 'firebase']
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
            });

            var config = {
                apiKey: "AIzaSyDpflKeM1c07q-guKmbpJGjHosd9-PKjU8",
                authDomain: "teamharambe-10608.firebaseapp.com",
                databaseURL: "https://teamharambe-10608.firebaseio.com",
                storageBucket: "teamharambe-10608.appspot.com",
                messagingSenderId: "491929198847"
            };
            firebase.initializeApp(config);
    }]);
}(angular));