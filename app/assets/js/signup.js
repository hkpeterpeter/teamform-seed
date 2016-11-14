angular.module('teamform-signup-app', ['firebase'])
.controller('SignupCtrl', ['$scope', '$firebaseObject', '$firebaseArray', "$firebaseAuth",'$window',function($scope, $firebaseObject, $firebaseArray,$firebaseAuth,$window) {
         
    // Call Firebase initialization code defined in site.js
    initalizeFirebase();

$scope.SignUp = function() {
    if (!$scope.regForm.$invalid) {
        var email = $scope.user.email;
        var password = $scope.user.password;
        if (email && password) {
           firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function() {
                    // do things if success
                    console.log('User creation success');
                }, function(error) {
                    // do things if failure
                    console.log(error);
                    $scope.regError = true;
                    $scope.regErrorMessage = error.message;
                });
        }
    }
};
     
    // Auth Logic will be here
}]);