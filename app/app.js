var app = angular.module("teamApp", ["ui.router","firebase"]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);



app.run(["$rootScope", "$state", "Auth", function($rootScope, $state, Auth) {

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
 if (toState.authRequired && !Auth.isAuthenticated()){ 
        $state.transitionTo("login");
        event.preventDefault(); 
      }
    });
}]);


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
            controller: 'AuthCtrl',
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
      }});
        
});






app.controller("AuthCtrl", ["$scope", "Auth","$rootScope", '$state', function($scope, Auth, $rootScope, $state) {
    var ref = firebase.database().ref();
	
    $scope.signUp = function() {
        Auth.$createUserWithEmailAndPassword($scope.rInput.email,$scope.rInput.password)
        .then(function(userData) {
            $scope.regMessage = "User " + userData.uid + " created successfully!";

            return Auth.$signInWithEmailAndPassword($scope.rInput.email, $scope.rInput.password);
        }).then(function(authData) {
            console.log("Logged in as:", authData.uid);
            $state.go('login')
        }).catch(function(error) {
            console.error("Error: ", error);
        });
    };
	
	$scope.signIn = function() {
        Auth.$signInWithEmailAndPassword($scope.lInput.email, $scope.lInput.password)
		.then(function(authData) {
			$scope.LoginMessage = "Logged in as:" + authData.uid;
		}).catch(function(error) {
			LoginMessage = "Authentication failed:" + error;
		});
    };
}]);



app.controller("Personal", ["currentAuth", function(currentAuth) {

}]);