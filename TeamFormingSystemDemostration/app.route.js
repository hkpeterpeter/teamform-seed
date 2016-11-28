app.config(function($stateProvider, $urlRouterProvider) {
 
    $urlRouterProvider.otherwise('/main');
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================

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
        
         .state('createsubteam', {
            url: '/createsubteam',
            templateUrl: 'createsubteam.html',
            controller: 'teamSubmit'
        })


 .state('nearestpeople', {
            url: '/nearestpeople',
            templateUrl: 'nearestpeople1.html'
        })

.state('randomevent', {
            url: '/randomevent',
            templateUrl: 'randomEvent.html',
            controller: 'random_Event'
        })

        .state('randomteam', {
            url: '/randomteam',
            templateUrl: 'randomTeam.html',
            controller: 'random_Team'

        })

 .state('iqtest', {
            url: '/iqtest',
            templateUrl: 'IQtest1.html'
        })

        .state('profilo', {
            url: '/profilo',
            templateUrl: 'Profilo1.html'
        })

        .state('level', {
            url: '/level',
            templateUrl: 'level1.html'
            })

         .state('register', {
            url: '/register',
            templateUrl: 'register.html',
            controller: 'AuthCtrl'
        })

.state('main', {
            url: '/main',
            templateUrl: 'main2.html'
        })

 .state('personality', {
            url: '/personality',
            templateUrl: 'typequiz.html'
            })


    .state('404', {
            url: '/404',
            templateUrl: 'pages-error-404.html',
            })


           .state('jointeam', {
            url: '/jointeam',
            templateUrl: 'jointeam.html',
            controller: 'eventSearch'
            })

 .state('kickmember', {
            url: '/kickmember',
            templateUrl: 'kick.html',
            controller: 'kick'
            })


.state('eventjoin', {
            url: '/eventjoin',
            templateUrl: 'joinevent.html',
            controller: 'eventjoin'
            })

            .state('subteam', {
            url: '/subteam',
            templateUrl: 'SubTeam.html'
            })

        .state('subteaminfo', {
            url: '/subteaminfo',
            templateUrl: 'SubTeaminformation.html'
            })

         .state('personal', {
            url: '/personal',
            templateUrl: 'personal_page.html',
            controller: 'Personal',
            authRequired: true,
             })



      .state('event', {
            url: '/event',
            templateUrl: 'event.html',
            authRequired: true,
            controller: 'eventSubmit'
            })


            
             .state('search', {
            url: '/search',
            templateUrl: 'search.html',
            controller: 'eventSearch'
            })

            .state('teamsearch', {
            url: '/teamsearch',
            templateUrl: 'newsearch.html',
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
            controller: 'random_Team'
            })

        .state('TerminateEvent', {
            url: '/TerminateEvent',
            templateUrl: 'terminate_event.html',
            controller: 'eventterm'
            })


		.state('createTeam', {
            url: '/createTeam',
            templateUrl: 'createTeam.html',
            authRequired: true,
            controller: 'teamSubmit'
            })

    .state('editteaminfo', {
            url: '/editteaminfo',
            templateUrl: 'editteaminfo.html',
            controller: 'teamedit'
            })
  
             .state('privatepublic', {
            url: '/privatepublic',
            templateUrl: 'publicprivate.html',
            controller: 'openness'
            })

             .state('personal_information', {
            url: '/personal_information',
            templateUrl: 'personal_information.html',
            authRequired: true,
            controller: 'piCtrl'
            })
             
             .state('requests', {
            url: '/handleRequests',
            templateUrl: 'handleRequests.html',
            controller: 'handleRequests',
            })
			
			.state('randomEvent', {
            url: '/randomEvent',
            templateUrl: 'randomEvent.html',
            controller: 'random_Event',
            });
});

