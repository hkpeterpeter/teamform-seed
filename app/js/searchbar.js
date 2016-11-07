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
            //give suggestions if the input is meaningful
            if (normailizeText(newVal).length > 1 || normailizeText(newVal)[0] != "") {

                //TODO

                $("#searchSuggestion").show();
            }
            else    //do nothing if the input is not meaningful
                $("#searchSuggestion").hide();
        });

        //Search function
        $scope.search = function () {
            //create a local array to store result
            var teamsAndMembers = [];

            //local helper function for creating result elements
            function resultElement(_name, _id, _description, _eid) {
                this.name = _name;
                this.id = _id;
                this.description = _description;
                this.eid = _eid;
            }

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

            //loop through the team list
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
                score += getSimilarityScore(keywords, id, "id", scoreList);

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

                //update the result if score > 0
                if (score > 0) {
                    scores.push(score);
                    teamsAndMembers.push(new resultElement(teams[i].name, ("Team ID: " + id), teams[i].descriptions, ("searchResultElement-" + i)));
                }
            }

            //do the same thing on member data
            //calculate the similarity of each member data
            var members = $scope.memberData;
            //clear the scores used in searching teams

            //create similarity score list for members
            scoreList = {
                "id-e": 100,
                "id-s": function (dummy) { return 0 },
                "name-e": 90,
                "name-s": function (percentage) { return percentage * 90 },
                "description-e": 60,
                "description-s": function (percentage) { return percentage * 60 },
                "email-e": 80,
                "email-s": function (percentage) { return percentage * 60 },
                "from-e": 60,
                "from-s": function (percentage) { return percentage * 60 },
                "language-e": 30,
                "language-s": function (percentage) { return percentage * 30 }
            }

            //save the count value in order to make the element id number correct
            var resultCount = teamsAndMembers.length;

            //loop through the whole member list
            for (var i = 0; i < members.length; i++) {
                id = members[i].id;
                name = (members[i].first_name + " " + members[i].last_name).toLowerCase();
                description = members[i].descriptions.toLowerCase();
                var email = members[i].email.toLowerCase();
                var from = members[i].from.toLowerCase();
                language = members[i].language.join(" ").toLowerCase();

                score = 0;
                //match id
                score += getSimilarityScore(keywords, id, "id", scoreList);

                //match name
                score += getSimilarityScore(keywords, name, "name", scoreList);

                //match description
                score += getSimilarityScore(keywords, description, "description", scoreList);

                //match email
                score += getSimilarityScore(keywords, email, "email", scoreList);

                //match the host country
                score += getSimilarityScore(keywords, from, "from", scoreList);

                //match language
                score += getSimilarityScore(keywords, language, "language", scoreList);

                //update the result if score > 0
                if (score > 0) {
                    scores.push(score);
                    teamsAndMembers.push(new resultElement(members[i].first_name + " " + members[i].last_name, ("Member ID: " + id), members[i].descriptions, "searchResultElement-" + (i + resultCount)));
                }
            }

            //sort the result by scores in descending order
            sortTwoArrays(scores, teamsAndMembers);

            //make the result accessable to the html
            $scope.result = teamsAndMembers;

            //if no results, show the no result message
            if ($scope.result.length == 0)
                $scope.result.push({ "name": "No results", "description": "There are no matched results.", "eid": "NO_SEARCH_RESULT" });
        }
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

//===some helper functions===

//Normalize the text (remove all symbols and transform the text to lowercase), return an array
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

//calculate the score of similarity according to the given score list
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

//sort the both arrays in descending order according to the indepent array
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