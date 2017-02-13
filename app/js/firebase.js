var app = angular.module("firebaseRestore", ["firebase"]);

app.controller("firebaseRestoreCtrl",
    function ($scope, $firebaseArray) {

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAlt_yl9mLcadDyhjtT2h4Ct9DDCxjGL4M",
            authDomain: "comp3111-5fbe5.firebaseapp.com",
            databaseURL: "https://comp3111-5fbe5.firebaseio.com",
            storageBucket: "comp3111-5fbe5.appspot.com",
            messagingSenderId: "946291658553"
        };
        firebase.initializeApp(config);

        var ref = firebase.database().ref();
        $scope.data = $firebaseArray(ref);

        var myData;
        $.getJSON("https://gist.githubusercontent.com/timfb/f1d1d3c173a63180a771422d5c5209ab/raw/c2cec0b8166d243ea1c60ad45a0f07e68438df68/comp3111_dummy_json",function(j){
                myData = j;
            });

        $scope.restore = function(){
            $scope.data.$ref().set(myData);
        }

        $scope.clear = function(){
            $scope.data.$ref().set(null);
        }
    });