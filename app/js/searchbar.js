// inject firebase service
var app = angular.module("search", ["firebase"]);

app.controller("searchCtrl",
    function ($scope, $firebaseArray) {
        var ref = firebase.database().ref("teams");
        $scope.dataset = $firebaseArray(ref);

        //dummy data
        $scope.result = "--result--";

        $scope.suggestions = [{
            "id": "suggestionID-1",
            "text": "--suggestion1--"
        }, {
            "id": "suggestionID-2",
            "text": "--suggestion2--"
        }, {
            "id": "suggestionID-3",
            "text": "--suggestion3--"
        }];

        $scope.$watch("searchInput", function(newVal, oldVal){
            //TODO update suggestions
        });

        $scope.search = function () {
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
        };
    }
);


//layout stuffs
$(document).ready(function () {
    //initialization
    $("#searchSuggestion").hide();
    $("#advancedSearchPanel").hide();

    //show suggestions
    $("#searchTextField").focus(function () {
        $("#searchSuggestion").toggle();
    }).blur(function () {
        $("#searchSuggestion").toggle();
    });

    $("#advancedSearchBtn").click(function(){
        $("#advancedSearchPanel").toggle();
    });

    $("#advancedSearchCancelBtn").click(function(){
        $("#advancedSearchPanel").toggle();
    });
});