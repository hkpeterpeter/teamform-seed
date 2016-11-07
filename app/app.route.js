app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'main.html',
            resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return Auth.$waitForSignIn();
      }]
    }
        })
        
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'AuthCtrl',
            resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return Auth.$waitForSignIn();
      }]
    }
        })
        
         .state('register', {
            url: '/register',
            templateUrl: 'register.html',
            controller: 'AuthCtrl'
        })

         .state('personal', {
            url: '/personal',
            templateUrl: 'personal_page.html',
            controller: 'Personal',
            authRequired: true,
             resolve: {
      "currentAuth": ["Auth", function(Auth) {

        return Auth.$requireSignIn();
      }]
      }})

      .state('event', {
            url: '/event',
            templateUrl: 'event.html',
            controller: 'eventSubmit'
            })
            
             .state('search', {
            url: '/search',
            templateUrl: 'search.html',
            controller: 'eventSearch'
            })
        
       .state('Teaminformation', {
            url: '/Teaminformation',
            templateUrl: 'Teaminformation.html',
            controller: 'teaminfo'
            })
			
	   .state('randomTeam', {
            url: '/randomTeam',
            templateUrl: 'randomTeam.html',
            controller: 'randomTeam'
            })

        .state('TerminateEvent', {
            url: '/TerminateEvent',
            templateUrl: 'terminate_event.html',
            controller: 'eventterm'
            });


});

