
angular.module("teaminfo", ["firebase"])
    .controller("teaminfoCtrl", function ($scope, $firebaseArray) {
        // Initialize Firebase


        var config = {
            apiKey: "AIzaSyAlt_yl9mLcadDyhjtT2h4Ct9DDCxjGL4M",
            authDomain: "comp3111-5fbe5.firebaseapp.com",
            databaseURL: "https://comp3111-5fbe5.firebaseio.com",
            storageBucket: "comp3111-5fbe5.appspot.com",
            messagingSenderId: "946291658553"
        };
        firebase.initializeApp(config);

        

        //get teams info
        var ref = firebase.database().ref("teams");
        $scope.teams = $firebaseArray(ref);
    });