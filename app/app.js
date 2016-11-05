var app = angular.module("teamApp", ["ui.router","firebase"]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
          var ref = firebase.database().ref();
    return $firebaseAuth();
  }
]);

app.run(["$rootScope", "$state", "Auth", function($rootScope, $state, Auth) {

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

 if ((toState.authRequired)&& (firebase.auth().currentUser.uid!= $rootScope.id)){ 
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
            $rootScope.id=authData.uid;
            $state.go('login')
        }).catch(function(error) {
            console.error("Error: ", error);
        });
    };
	
	$scope.signIn = function() {
        Auth.$signInWithEmailAndPassword($scope.lInput.email, $scope.lInput.password)
		.then(function(authData) {
			$scope.LoginMessage = "Logged in as:" + authData.uid;
            $rootScope.id=authData.uid;
		}).catch(function(error) {
			LoginMessage = "Authentication failed:" + error;
		});
    };
}]);



app.controller("Personal", ["currentAuth", function(currentAuth) {

}]);