var app = angular.module("myApp", ["firebase"]); 

app.controller("LoginCtrl", ["$scope","$rootScope", "$firebaseAuth", "$firebaseArray", "$firebaseObject",
    function($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject) {
         $scope.signInput = {
            description: "",
        }
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
                $scope.currentUid = firebaseUser.uid;

                var ref = firebase.database().ref('currentUid');             
                ref.set($scope.currentUid).then(function(){
                    window.location = '../Real PJ/index.html'
                });
                
            }).catch(function(error) {
                alert(error.message);
            });
        }

        $scope.loginUser = function() {   
            $scope.authObj.$signInWithEmailAndPassword($scope.input.email + "@connect.ust.hk", $scope.input.password).then(function(firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
                $scope.currentUid = firebaseUser.uid;
                var ref = firebase.database().ref('currentUid');             
                ref.set($scope.currentUid).then(function(){
                    window.location = '../Real PJ/index.html'
                });
            }).catch(function(error) {
                alert(error.message);
            });
        }
    }
]);