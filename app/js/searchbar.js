// inject firebase service
var app = angular.module("search", ["firebase"]);

app.controller("searchCtrl",
    function ($scope, $firebaseArray) {
        // Initialize Firebase
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDBbzOIIjY0CQEAbIXyPeFt4lf7-pB5N1k",
            authDomain: "comp3111pj.firebaseapp.com",
            databaseURL: "https://comp3111pj.firebaseio.com",
            storageBucket: "comp3111pj.appspot.com",
            messagingSenderId: "164599846388"
        };
        firebase.initializeApp(config);

        //get members' data
        var ref = firebase.database().ref("members");
        $scope.memberData = $firebaseArray(ref);

        //get teams' data
        ref = firebase.database().ref("teams");
        $scope.teamData = $firebaseArray(ref);

        //for debugging
        $scope.debugMsg = "";

        //dummy data
        $scope.result = [];

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

        //listen to the search text field changes, and give suggestions
        $scope.$watch("searchInput", function (newVal, oldVal) {
            //TODO update suggestions
            if (newVal != "")
                $("#searchSuggestion").show();
            else
                $("#searchSuggestion").hide();
        });

        //Search function
        $scope.search = function () {
            //clear the previos search results
            $scope.result = [];

            //split keywords, transform to lowercase and remove symbols
            var keywords = normailizeText($("#searchTextField").val());

            //when keywords contain only symbols or spaces, do nothing
            if (keywords.length == 1 && keywords[0] == "")
                return;

            //calculate the similarity of each team data
            var teams = $scope.teamData;
            var scores = [];
            // -e means equal, -s means similar
            var scoreList = {
                "id-e": 100,
                "id-s": function (dummy) { return 0 },
                "name-e": 90,
                "name-s": function (percentage) { return 90 * percentage },
                "destination-e": 60,
                "destination-s": function (percentage) { return 60 * percentage },
                "language-e": 30,
                "language-s": function (dummy) { return 0 },
                "tag-e": 70,
                "tag-s": function (percentage) { return 70 * percentage },
                "description-e": 70,
                "description-s": function (percentage) { return 70 * percentage },
            };
            for (var i = 0; i < teams.length; i++) {
                var id = teams[i].id;
                var name = teams[i].name.toLowerCase();
                var destination = teams[i].destination.toLowerCase();
                var language = teams[i].language_for_communication.toLowerCase();
                var tag = teams[i].tags;
                for (var j = 0; j < tag.length; j++)
                    tag[j] = tag[j].toLowerCase();
                var description = teams[i].descriptions;

                var score = 0;
                //match id
                getSimilarityScore(keywords, id, "id", scoreList);

                //match name
                score += getSimilarityScore(keywords, name, "name", scoreList);

                //match destination
                score += getSimilarityScore(keywords, destination, "destination", scoreList);

                //match language
                score += getSimilarityScore(keywords, language, "language", scoreList);

                //match tag
                score += getSimilarityScore(keywords, tag.join(" "), "tag", scoreList);

                //match description
                score += getSimilarityScore(keywords, description, "description", scoreList);

                //update the score
                scores.push(score);
            }

            //sort the scoreList in descending order
            sortTwoArrays(scores, teams);

            //prepare for displaying results and assign IDs
            for (var p = 0; p < teams.length; p++)
                if (scores[p] != 0)
                    $scope.result.push({ "name": teams[p].name, "description": teams[p].descriptions, "id": teams[p].id, "eid": "searchResultElement" + p });
                else
                    break;
        };
        //Search function end
    }
);

//layout stuffs
$(document).ready(function () {
    //initialization
    $("#searchSuggestion").hide();
    $("#advancedSearchPanel").hide();

    //show and hide
    $("#advancedSearchBtn").click(function () {
        $("#advancedSearchPanel").toggle();
    });

    $("#advancedSearchCancelBtn").click(function () {
        $("#advancedSearchPanel").hide();
    });

    $("body").click(function () {
        $("#searchSuggestion").hide();
    });

    //layout changes
    $("#searchBtnContainer input[type='button']").click(function () {
        var keywords = normailizeText($("#searchTextField").val());
        if (keywords.length == 1 && keywords[0] == "")
            return;
        $("#searchModule").parent().removeClass("centralize").addClass("topPadding");
        $("#searchBtnContainer").hide();
        $("#smSearchBtnContainer").removeClass("hide");
        $("#searchTextField").parent().removeClass("col-xs-12 col-sm-12 col-md-12 col-lg-12").addClass("col-xs-11 col-sm-11 col-md-11  col-lg-11");

        var searchTextFieldPPHeight = $("#searchTextField").parent().parent().height();
        $("#searchTextField").parent().css("margin-top", Math.round((searchTextFieldPPHeight - $("#searchTextField").parent().height()) / 2) + "px");
    });

    //keydown handling
    $("#searchTextField").keydown(function (event) {
        //keycode 13 is "enter"
        //keycode 27 is "esc"
        switch (event.which) {
            case 13:
                $("#searchBtnContainer").find("input[type='button']").click();
                break;

            case 27:
                $("#searchSuggestion").hide();
                break;

            default:
                //Do Nothing
                break;
        }
    });
});

//some helper functions
function normailizeText(text) {
    var symbols = "";
    for (var i = 33; i <= 47; i++)
        symbols += String.fromCharCode(i);
    for (var i = 58; i <= 64; i++)
        symbols += String.fromCharCode(i);
    for (var i = 123; i <= 126; i++)
        symbols += String.fromCharCode(i);

    //scan through the texts and remove symbols
    for (var i = 0; i < symbols.length; i++)
        text = text.split(symbols.charAt(i)).join("");

    //to lowercase
    text = text.toLowerCase();

    return text.split(" ");
}

function getSimilarityScore(keywords, target, title, scoreList) {
    var score = 0;
    if (keywords.join(" ") == target)
        score += scoreList[title + "-e"];
    else {
        var count = 0;
        for (var j = 0; j < keywords.length; j++)
            if (target.includes(keywords[j]))
                count++;
        score += scoreList[title + "-s"](count / Math.max(keywords.length, target.split(" ").length));
    }
    return score;
}

function sortTwoArrays(indepent, dependent) {
    for (var k = 0; k < indepent.length - 1; k++) {
        var swapped = false;
        for (var l = indepent.length - 1; l >= 1; l--)
            if (indepent[l - 1] < indepent[l]) {
                var temp = indepent[l - 1];
                var temp2 = dependent[l - 1];
                indepent[l - 1] = indepent[l];
                dependent[l - 1] = dependent[l];
                indepent[l] = temp;
                dependent[l] = temp2;
                swapped = true;
            }
        if (!swapped)
            break;
    }
}