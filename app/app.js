var app = angular.module("teamApp", ["ui.router","firebase"]);

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
            controller: 'AuthCtrl'
        })
        
         .state('register', {
            url: '/register',
            templateUrl: 'register.html',
            controller: 'AuthCtrl'
        });
        
});


app.controller("AuthCtrl", ["$scope", '$firebaseAuth', function($scope, $firebaseAuth) {
    var ref = firebase.database().ref();
    var auth = $firebaseAuth(firebase.auth());
	
    $scope.signUp = function() {
        auth.$createUserWithEmailAndPassword($scope.rInput.email,$scope.rInput.password)
        .then(function(userData) {
            $scope.regMessage = "User " + userData.uid + " created successfully!";

            return auth.$signInWithEmailAndPassword($scope.rInput.email, $scope.rInput.password);
        }).then(function(authData) {
            console.log("Logged in as:", authData.uid);
        }).catch(function(error) {
            console.error("Error: ", error);
        });
    };
	
	$scope.signIn = function() {
        auth.$signInWithEmailAndPassword($scope.lInput.email, $scope.lInput.password)
		.then(function(authData) {
			$scope.LoginMessage = "Logged in as:" + authData.uid;
		}).catch(function(error) {
			LoginMessage = "Authentication failed:" + error;
		});
    };
}]);




app.controller("Signin", ["$scope", '$firebaseAuth', function($scope, $firebaseAuth) {
   
   $scope.testVar = 'abccc'
   var provider = new firebase.auth.FacebookAuthProvider();

   $scope.login = function() {

    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    $scope.regMessage = "User!!";
    });
     
     };
   
   
   
}]);