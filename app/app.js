var app = angular.module("myApp", ["firebase"]);

// and use it in our controller
app.controller("RegCtrl", ["$scope", '$firebaseAuth', function($scope, $firebaseAuth) {
    var ref = new Firebase("https://comp3111-bb108.firebaseio.com/");
    $scope.authObj = $firebaseAuth();
    $scope.signUp = function() {
        $scope.authObj.$createUser({
            email: $scope.input.email,
            password: $scope.input.password
        }).then(function(userData) {
            console.log("User " + userData.uid + " created successfully!");

            return $scope.authObj.$authWithPassword({
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
