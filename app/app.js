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