app.controller("eventjoin", ["$scope", "$firebaseArray", "Auth", "$rootScope", "$state",

    function($scope, $firebaseArray, Auth, $rootscope, $state) {

        $scope.input = {
            uid: ""
        };

        var ref = firebase.database().ref("events");
        $scope.event = $firebaseArray(ref);

        $scope.joinit = function(o) {
                window.alert($scope.event);
                $scope.input.uid = firebase.auth().currentUser.uid;
                var path = "events" + "/" + o.$id + "/member";
                var itemRef = firebase.database().ref(path);
                $scope.join = $firebaseArray(itemRef);
                $scope.join.$add($scope.input);

        };
    }

]);
