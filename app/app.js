var app = angular.module("myApp", ["firebase"]);

// and use it in our controller
app.controller("RegCtrl", ["$scope", '$firebaseAuth', function($scope, $firebaseAuth) {
    var ref = firebase.database().ref();
    var auth = $firebaseAuth(firebase.auth());
    $scope.signUp = function() {
        auth.$createUserWithEmailAndPassword($scope.input.email,$scope.input.password)
        .then(function(userData) {
            console.log("User " + userData.uid + " created successfully!");

            return auth.$signInWithEmailAndPassword({
                email: $scope.input.email,
                password: $scope.input.password
            });
        }).then(function(authData) {
            console.log("Logged in as:", authData.uid);
        }).catch(function(error) {
            console.error("Error: ", error);
        });
    };
}]);
