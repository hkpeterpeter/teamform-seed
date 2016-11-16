var app = angular.module("myApp", ["firebase"]); 

app.controller("AdminAuthCtrl", ["$scope", "$firebaseAuth", "$firebaseArray",
    function($scope, $firebaseAuth, $firebaseArray) {

        $scope.authObj = $firebaseAuth();

        $scope.input = {
            email: "",
            password: "",
        }

        $scope.course = {
            courseName: "",
            max: 5,
            min: 2,
        }




        $scope.createAdmin = function() {
            $scope.authObj.$createUserWithEmailAndPassword($scope.input.email, $scope.input.password).then(function(firebaseUser) {
                console.log("User " + firebaseUser.uid + "created successfully!");   
                var ref = firebase.database().ref("Admin");
                ref.child(firebaseUser.uid).set($scope.input);
                $scope.currentUid = firebaseUser.uid;

            }).catch(function(error) {
                console.error("Error: ", error);
            });
        }

        $scope.loginAdmin = function() {
            $scope.authObj.$signInWithEmailAndPassword($scope.input.email, $scope.input.password).then(function(firebaseUser) {
              console.log("Signed in as:", firebaseUser.uid);
              $scope.currentUid = firebaseUser.uid;
            }).catch(function(error) {
              console.error("Authentication failed:", error);
            });
        }

        $scope.CreateCourse = function() {
            var ref = firebase.database().ref('Course');
            var course = $firebaseArray(ref);

            course.$add($scope.course);            
        }

    }
]);