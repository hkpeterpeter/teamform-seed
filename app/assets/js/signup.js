angular.module('teamform-signup-app', ['firebase'])
.controller('SignupCtrl', ['$scope', '$firebaseObject', '$firebaseArray', "$firebaseAuth",'$window',function($scope, $firebaseObject, $firebaseArray,$firebaseAuth,$window) {
         
    // Call Firebase initialization code defined in site.js
    initalizeFirebase();

$scope.SignUp = function() {
    if (!$scope.regForm.$invalid) {
        var email = $scope.user.email;
        var password = $scope.user.password;
        var username = $scope.user.name;
        var position = $scope.user.position;
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
                        position: position,
                        createdate: new Date().toString()
                         })

            firebase.auth().signInWithEmailAndPassword(email,password)
            .then(function(user) {
            //Success callback
            console.log('Authentication successful');
            $window.alert("You Login as " + username);
            window.location.href= "index.html";
            }, function(error) {
                //Failure callback
                console.log('Authentication failure');
             });
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