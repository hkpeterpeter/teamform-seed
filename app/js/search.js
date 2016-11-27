// inject firebase service
var app = angular.module("search", ["firebase"]);

app.controller("eventSearch", ["$scope", "$firebaseArray",

    function($scope, $firebaseArray) {

        var ref = firebase.database().ref("events");
        $scope.event = $firebaseArray(ref);
    }
]);
