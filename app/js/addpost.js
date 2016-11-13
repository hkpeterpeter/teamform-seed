'use strict';


angular.module("adboard", ["firebase"])
    .controller("adboardCtrl", function ($scope, $firebaseArray) {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAlt_yl9mLcadDyhjtT2h4Ct9DDCxjGL4M",
            authDomain: "comp3111-5fbe5.firebaseapp.com",
            databaseURL: "https://comp3111-5fbe5.firebaseio.com",
            storageBucket: "comp3111-5fbe5.appspot.com",
            messagingSenderId: "946291658553"
        };
        firebase.initializeApp(config);

        var ref = firebase.database().ref("advertisement");
        $scope.ads = $firebaseArray(ref);


        $scope.add = function(){
            $scope.ads.$ref().child($scope.ads.length).set({
                "title": $scope.titletxt ,
                "content": $scope.contenttxt ,
                "person": $scope.persontxt



            });
        };
    });
    