var app = angular.module("myApp", ["firebase"]); 

app.controller("LoginCtrl", ["$scope", "$firebaseAuth", "$firebaseArray",
    function($scope, $firebaseAuth, $firebaseArray) {

        $scope.authObj = $firebaseAuth();

        $scope.createUser = function() {
            if($scope.signInput.password != $scope.rePassword){
                alert("Different password, Please enter the correct password and Retype pasword")
                return 0;    
            }
            $scope.authObj.$createUserWithEmailAndPassword($scope.signInput.email + "@connect.ust.hk", $scope.signInput.password).then(function(firebaseUser) {
                console.log("User " + firebaseUser.uid + "created successfully!");   
                var ref = firebase.database().ref("User");
                $scope.signInput.email = $scope.signInput.email + "@connect.ust.hk";
                ref.child(firebaseUser.uid).set($scope.signInput);
                $scope.signInput = null;
                $scope.rePassword = null;
            }).catch(function(error) {
                alert(error.message);
            });
        }

        $scope.loginUser = function() {   
            $scope.authObj.$signInWithEmailAndPassword($scope.input.email + "@connect.ust.hk", $scope.input.password).then(function(firebaseUser) {
              console.log("Signed in as:", firebaseUser.uid);
              window.location = "http://www.google.com"
            }).catch(function(error) {
              alert(error.message);
            });
        }
        
    }
]);