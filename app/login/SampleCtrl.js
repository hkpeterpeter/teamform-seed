var app = angular.module("myApp", ["firebase"]); 

app.controller("MyAuthCtrl", ["$scope", "$firebaseAuth", "$firebaseArray",
    function($scope, $firebaseAuth, $firebaseArray) {

        $scope.authObj = $firebaseAuth();

        $scope.input = {
            email: "",
            password: "",
            displayname: "",
        }

        $scope.createUser = function() {

            $scope.authObj.$createUserWithEmailAndPassword($scope.input.email, $scope.input.password).then(function(firebaseUser) {
                console.log("User " + firebaseUser.uid + "created successfully!");   
                var ref = firebase.database().ref("User");
                ref.child(firebaseUser.uid).set($scope.input);

            }).catch(function(error) {
                console.error("Error: ", error);
            });
        }

        $scope.loginUser = function() {


            $scope.authObj.$signInWithEmailAndPassword($scope.input.email, $scope.input.password).then(function(firebaseUser) {
              console.log("Signed in as:", firebaseUser.uid);
              var ref = firebase.database().ref('User/' + firebaseUser.uid);
              ref.child("300").set($scope.input);
            }).catch(function(error) {
              console.error("Authentication failed:", error);
            });



        }





    }



]);