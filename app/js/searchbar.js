"use strict";

// inject firebase service
var app = angular.module("search", ["firebase"]);

app.controller("searchCtrl",
    function ($scope, $firebaseArray, $sce) {
        $scope.trustAsHtml = $sce.trustAsHtml;

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAlt_yl9mLcadDyhjtT2h4Ct9DDCxjGL4M",
            authDomain: "comp3111-5fbe5.firebaseapp.com",
            databaseURL: "https://comp3111-5fbe5.firebaseio.com",
            storageBucket: "comp3111-5fbe5.appspot.com",
            messagingSenderId: "946291658553"
        };
        firebase.initializeApp(config);

        //get members' data
        var ref = firebase.database().ref("members");
        $scope.memberData = $firebaseArray(ref);

        //get teams' data
        ref = firebase.database().ref("teams");
        $scope.teamData = $firebaseArray(ref);

        //get search frequency
        ref = firebase.database().ref("searchFreq/frequency");
        $scope.searchFrequency = $firebaseArray(ref);
        ref = firebase.database().ref("searchFreq/keyword_groups");
        $scope.keywordGroups = $firebaseArray(ref);

        //for debugging
        $scope.debugMsg = "";
        $scope.debugMsg2 = "";

        //Data
        $scope.searchInput = "";
        $scope.result = [];
        $scope.suggestions = [];
        $scope.constraint = {
            tm: "0",
            t: [],
            m: ["-1", "-1", "-1", "-1", false],
            tDis: false,
            mDis: false,
            clearT: function () {
                for (var i = 0; i < this.t.length; i++)
                    this.t[i] = "-1";
            },
            clearM: function () {
                for (var i = 0; i < this.m.length; i++)
                    this.m[i] = "-1";
            },
            clear: function () {
                this.tm = "0";
                this.clearT();
                this.clearM();
                this.tDis = false;
                this.mDis = false;
            }
        };

        $scope.$watch("constraint.tm", function (newVal, oldVal) {
            if (newVal == "0") {
                $scope.constraint.mDis = false;
                $scope.constraint.tDis = false;
            }
            else if (newVal == "1") {
                $scope.constraint.mDis = true;
                $scope.constraint.tDis = false;
                $scope.constraint.clearM();
            }
            else if (newVal == "2") {
                $scope.constraint.mDis = false;
                $scope.constraint.tDis = true;
                $scope.constraint.clearT();
            }
        });

        //helper functions
        function addSearchHistory(keywords) {
            for (var i = 0; i < $scope.keywordGroups.length; i++) {
                var sc = getSimilarityScore($scope.keywordGroups[i], keywords.join(" "), "score",
                    { "score-e": 100, "score-s": function (p) { return 0; } });
                if (sc == 100) {
                    var x = parseInt($scope.searchFrequency[i].$value) + 1;
                    $scope.searchFrequency.$ref().child(i).set(x + "");
                    break;
                } else if (i == $scope.keywordGroups.length - 1) {
                    $scope.keywordGroups.$ref().child(i + 1).set(keywords);
                    $scope.searchFrequency.$ref().child(i + 1).set("1");
                }
            }
        }

        //listen to the search text field changes, and give suggestions
        $scope.$watch("searchInput", function (newVal, oldVal) {
            //clear the previos suggestions
            $scope.suggestions = [];

            if (typeof newVal != "string") {
                $("#searchSuggestion").hide();
                return;
            }

            //give suggestions if the input is meaningful
            if (normailizeText(newVal).length > 1 || normailizeText(newVal)[0] != "") {

                var freq = $scope.searchFrequency;
                var keywordGroups = $scope.keywordGroups;
                var suggestions = [];
                var scores = [];
                var keywords = normailizeText(newVal);

                //calculate the similary score
                for (var i = 0; i < keywordGroups.length; i++) {
                    var kg = keywordGroups[i].join(" ");
                    var score = getSimilarityScore(keywords, kg, "score", { "score-e": 100, "score-s": function (p) { return p * 100; } });
                    suggestions.push(kg);
                    scores.push(score * parseInt(freq[i].$value));
                }

                //sort by the similarity score
                sortTwoArrays(scores, suggestions);

                //screen suggestions
                for (var i = 0; i < scores.length; i++)
                    if (scores[i] > 0) {
                        $scope.suggestions.push({
                            "class": "suggestionElement",
                            "text": suggestions[i],
                            "action": function () {
                                $scope.searchInput = this.text;
                                disableCentralize();
                                $scope.search();
                            }
                        });
                    }
                    else
                        break;

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
            function resultElement(_id, _name, _description, _eid, _language, _country, _tags, _email) {
                this.name = _name;
                this.id = _id;
                this.description = _description;
                this.eid = _eid;
                this.language = _language;
                this.country = _country;
                this.tags = _tags;
                this.email = _email;
            }

            //clear the previos search results
            $scope.result = [];

            //split keywords, transform to lowercase and remove symbols
            var keywords = normailizeText($scope.searchInput);

            //when keywords contain only symbols or spaces, do nothing
            if (keywords.length == 1 && keywords[0] == "" || keywords.join("") == "")
                return;

            //Add Search History to Firebase
            addSearchHistory(keywords);

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
                    var e1 = hightlight(teams[i].name, keywords);
                    var e2 = hightlight(id, keywords);
                    var e3 = hightlight(teams[i].descriptions, keywords);
                    var e4 = hightlight(teams[i].language_for_communication, keywords);
                    var e5 = hightlight(teams[i].destination, keywords);
                    var e6 = hightlight(teams[i].tags.join(" * "), keywords).split(" * ");
                    teamsAndMembers.push(new resultElement("Team ID: " + e2, e1, e3, ("searchResultElement-" + i), e4, e5, e6, ""));
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
                    var e1 = hightlight(members[i].first_name + " " + members[i].last_name, keywords);
                    var e2 = hightlight(id, keywords);
                    var e3 = hightlight(members[i].descriptions, keywords);
                    var e4 = hightlight(members[i].language.join(" * "), keywords).split(" * ").join(", ");
                    var e5 = hightlight(members[i].from, keywords);
                    var e6 = hightlight(members[i].email, keywords);
                    teamsAndMembers.push(new resultElement(("Member ID: " + e2), e1, e3, "searchResultElement-" + (i + resultCount), e4, e5, "", e6));
                }
            }

            //sort the result by scores in descending order
            sortTwoArrays(scores, teamsAndMembers);

            //make the result accessable to the html
            $scope.result = teamsAndMembers;

            //if no results, show the no result message
            if ($scope.result.length == 0)
                $scope.result.push(false);

            //clear all the constraint and hide the constraint panel
            $scope.constraint.clear();
            $("#advancedSearchPanel").hide();
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

    //load the Json file to the html
    $.getJSON("https://gist.githubusercontent.com/timfb/551d3ed641435fd15c25b99ea9647922/raw/ce3b3d8459491d38fafe69020bd3535bfd11d334/countrylist.json", function (data) {
        var countrylist = data.country_list;
        for (var i = 0; i < countrylist.length; i++)
            $("select[ng-model='constraint.m[1]'], select[ng-model='constraint.m[2]']").append("<option value='" + i + "'>" + countrylist[i].name + " (" + countrylist[i].code + ")" + "</option>");
    });
    $.getJSON("https://gist.githubusercontent.com/timfb/0e802654c5b4bf6f8de1569554055f05/raw/c2fe6aa4dc3b7c578ac6c1c7c17915dd78a2d475/languagelist.json", function (data) {
        var languagelist = data.languages;
        languagelist = sortArray(languagelist, "English");
        for (var i = 0; i < languagelist.length; i++)
            $("select[ng-model='constraint.m[3]']").append("<option value='" + i + "'>" + languagelist[i] + "</option>");
    })

    // $("select [ng-model=constraint.m[1]]").append("<option value=")

    //layout changes
    $("#searchBtnContainer input[type='button']").click(function () {
        var keywords = normailizeText($("#searchTextField").val());
        if (keywords.length == 1 && keywords[0] == "" || keywords.join("") == "")
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

//layout changesfunction disableCentralize() {
function disableCentralize() {
    $("#searchModule").parent().removeClass("centralize").addClass("topPadding");
    $("#searchBtnContainer").hide();
    $("#smSearchBtnContainer").removeClass("hide");
    $("#searchTextField").parent().removeClass("col-xs-12 col-sm-12 col-md-12 col-lg-12").addClass("col-xs-11 col-sm-11 col-md-11  col-lg-11");
    var searchTextFieldPPHeight = $("#searchTextField").parent().parent().height();
    $("#searchTextField").parent().css("margin-top", Math.round((searchTextFieldPPHeight - $("#searchTextField").parent().height()) / 2) + "px");
}

//Compare two date
function compareDate (d1,d2){
    // if (new Date(d1).setUTCFullYear)
}

//remove symbols in text
function removeSymbols(text) {
    if (typeof text != "string")
        return text;

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

    return text;
}

//Normalize the text (remove all symbols and transform the text to lowercase), return an array
function normailizeText(text) {
    if (typeof text != "string")
        return null;

    //remove symbols
    text = removeSymbols(text);

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

//sort single array in ascending order
function sortArray(indepent, elementName = null) {
    if (elementName == null) {
        for (var k = 0; k < indepent.length - 1; k++) {
            var swapped = false;
            for (var l = indepent.length - 1; l >= 1; l--)
                if (indepent[l - 1] > indepent[l]) {
                    var temp = indepent[l - 1];
                    indepent[l - 1] = indepent[l];
                    indepent[l] = temp;
                    swapped = true;
                }
            if (!swapped)
                break;
        }
        return indepent;
    } else {
        var temp = [];
        for (var i = 0; i < indepent.length; i++)
            temp.push(indepent[i][elementName]);
        return sortArray(temp);
    }
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

//highlight keywords in search result
function hightlight(text, keywords) {
    if (typeof text != "string")
        return text;

    var text1 = text.split(" ");
    var result = [];
    for (var j = 0; j < text1.length; j++) {
        var highlighted = false;
        var highlighted2 = false;
        var pushed = false;
        for (var i = 0; i < keywords.length; i++) {
            if (normailizeText(text1[j]).join(" ") == keywords[i] && !highlighted) {
                if (pushed)
                    result.pop();
                result.push("<span class = \"highlightText\">" + text1[j] + "</span>");
                highlighted = true;
                pushed = true;
            }
            else if (normailizeText(text1[j]).join(" ").includes(keywords[i]) && !highlighted && !highlighted2) {
                if (pushed)
                    result.pop();
                result.push("<span class = \"highlightTextSub\">" + text1[j] + "</span>");
                highlighted2 = true;
                pushed = true;
            }
            else if (!pushed) {
                result.push(text1[j].trim());
                pushed = true;
            }
            if (highlighted)
                break;
        }
    }
    return result.join(" ");
}