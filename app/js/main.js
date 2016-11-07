// inject firebase service
initalizeFirebase();


var app = angular.module("tfApp", ["firebase", "ui.router", 'ngDialog']);


app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise('/');

    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: '/templates/login.html',
            controller: 'loginController'

        })
        .state('signup', {
            url: '/signup',
            templateUrl: '/templates/sign_up.html',
            controller: 'signupCtrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/templates/dashboard.html',
            controller: 'dashboardCtrl'
        })
        .state('dashboard.home', {
            url: '/home',
            templateUrl: '/templates/home.html',
            controller: 'homeCtrl'
        })
        .state('dashboard.event', {
            url: '/event',
            templateUrl: '/templates/event.html',
            controller: 'eventCtrl'
        })
        .state('dashboard.eventDetail', {
            url: '/event/:eid',
            templateUrl: '/templates/eventD.html',
            controller: 'eventDCtrl'
        })
        .state('dashboard.team', {
            url: '/event/:eid/team/:tid',
            templateUrl: '/templates/team.html',
            controller: 'teamCtrl'
        })
        .state('dashboard.notif', {
            url: '/notification',
            templateUrl: '/templates/notification.html',
            controller: 'notificationCtrl'
        })
        .state('dashboard.request', {
            url: '/request',
            templateUrl: '/templates/request.html',
            controller: 'requestCtrl'
        })
        .state('dashboard.profile', {
            url: '/profile/:uid',
            templateUrl: '/templates/profile.html',
            controller: 'profileCtrl'
        })

});



// app.controller("mainController",
// 	function($scope, Auth, $firebaseArray, $firebaseObject, $window){
// 		Auth.$onAuthStateChanged(function(authData){
// 			$scope.authData = authData;

// 			if (authData) {
// 				console.log(authData);
// 			}
// 			else console.log("signed out");
// 		});

// 	});
