var app = angular.module("RouteApp", ["ui.router","firebase"]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'main.html'
        })
        
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'Signin'
        })
        
         .state('register', {
            url: '/register',
            templateUrl: 'register.html',
            controller: 'RegCtrl'
        });
        
});



