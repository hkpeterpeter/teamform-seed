var app = angular.module("teamApp", ["ui.router","firebase"]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
          var ref = firebase.database().ref();
    return $firebaseAuth();
  }
]);