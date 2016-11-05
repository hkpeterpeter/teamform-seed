// inject firebase service
var app = angular.module("search", ["firebase"]);

app.controller("searchCtrl",
    function ($scope, $firebaseArray) {
        var ref = firebase.database().ref("teams");
        $scope.dataset = $firebaseArray(ref);

        $scope.result = "--result--";

        $scope.test = function () {
            var keywords = $("#searchTextField").val().split(" ");
            var teams = $scope.dataset;

            var relevant = [];
            var result = "";

            for (var i = 0; i < keywords.length; i++)
                for (var j = 0; j < teams.length; j++) {
                    if (teams[j].name.includes(keywords[i]))
                        relevant.push(j);
                }

            for (var i = 0; i < relevant.length; i++)
                result += teams[relevant[i]].name + "\n";
            $scope.result = result;
            // alert();
        };
    }
);