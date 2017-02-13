var app = angular.module('teamform', ['ui.bootstrap', 'firebase']);
app.controller('myCtrl', function($scope, $firebaseArray) {

    $scope.firstName = "John";
    $scope.lastName = "Doe";

    // toggle wrapper to show and hide the left sidebar
    $scope.toggleWrapper = function() {

        if ($scope.isToggled != "toggled") {

                $scope.isToggled = "toggled";

        } else {

            $scope.isToggled = "nottoggled";

        }

    }

    var ref = firebase.database().ref().child("event");
    // create a synchronized array
    // click on `index.html` above to see it used in the DOM!
    $scope.events = $firebaseArray(ref);

});
