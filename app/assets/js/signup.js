angular.module('teamform-signup-app', ['firebase'])
.controller('SignupCtrl', ['$scope', '$firebaseObject', '$firebaseArray', "$firebaseAuth",'$window',function($scope, $firebaseObject, $firebaseArray,$firebaseAuth,$window) {
         
    // Call Firebase initialization code defined in site.js
    initalizeFirebase();

$scope.SignUp = function() {
    if (!$scope.regForm.$invalid) {
        var email = $scope.user.email;
        var password = $scope.user.password;
        var username = $scope.user.name;
        if (email && password) {
           firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function() {
                    console.log('User creation success');

                    var user = firebase.auth().currentUser;

                    var refPath = "user/" + user.uid;
             
                    var ref = firebase.database().ref(refPath);
                    ref.set({
                        name: username,
                        email: email ,
                        createdate: new Date().toString()
            })





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