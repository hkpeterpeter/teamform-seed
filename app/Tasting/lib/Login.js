var app = angular.module("myApp", ["firebase"]); 

app.controller("LoginCtrl", ["$scope", "$firebaseAuth", "$firebaseArray",
    function($scope, $firebaseAuth, $firebaseArray) {

        $scope.authObj = $firebaseAuth();

        $scope.input = {
            email: "",
            password: "",
        }

        $scope.signInput = {
            email: "",
            password: "",
        }

        $scope.createUser = function() {
            console.log("Hello");   
            $scope.authObj.$createUserWithEmailAndPassword($scope.signInput.email + "@connect.ust.hk", $scope.signInput.password).then(function(firebaseUser) {
                console.log("User " + firebaseUser.uid + "created successfully!");   
                var ref = firebase.database().ref("User");
                ref.child(firebaseUser.uid).set($scope.input);

            }).catch(function(error) {
                console.error("Error: ", error);
            });
        }

        $scope.loginUser = function() {
            console.log("hello");    
            $scope.authObj.$signInWithEmailAndPassword($scope.input.email + "@connect.ust.hk", $scope.input.password).then(function(firebaseUser) {
              console.log("Signed in as:", firebaseUser.uid);
            }).catch(function(error) {
              console.error("Authentication failed:", error);
            });



        }





    }



]);