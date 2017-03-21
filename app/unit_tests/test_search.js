describe('searchCtrl', function() {
    beforeEach(module('search', 'firebase'));

    var $controller;

    beforeEach(inject(function($rootScope, _$controller_, $firebaseArray, $sce) {
        $scope = $rootScope.$new();
        $controller = _$controller_;
        $controller = $controller('searchCtrl', { $scope: $scope, $firebaseArray: $firebaseArray, $sce: $sce });
    }));

    it("search_test", function() {
        $scope.constraint.tm = "0";
        $scope.constraint.t = ["-1", "-1", "-1", false, false];
        $scope.constraint.m = ["-1", "-1", "-1", "-1", false];
        $scope.constraint.hasConstraints();
        expect($scope.constraint.hasConstraints()).toEqual(false);

        $scope.constraint.hasTeamConstraints();
        expect($scope.constraint.hasTeamConstraints()).toEqual(false);

        $scope.constraint.hasMemberConstraints();
        expect($scope.constraint.hasMemberConstraints()).toEqual(false);

        $scope.constraint.tm = "1";
        $scope.constraint.t = ["-1", "-1", "-1", false, false];
        $scope.constraint.m = ["-1", "-1", "-1", "-1", false];
        $scope.constraint.hasConstraints();
        expect($scope.constraint.hasConstraints()).toEqual(true);

        $scope.constraint.tm = "0";
        $scope.constraint.t = ["1", "1", "1", true, true];
        $scope.constraint.m = ["-1", "-1", "-1", "-1", false];
        $scope.constraint.hasConstraints();
        expect($scope.constraint.hasConstraints()).toEqual(true);
        expect($scope.constraint.hasTeamConstraints()).toEqual(true);

        $scope.constraint.tm = "0";
        $scope.constraint.t = ["-1", "-1", "-1", false, false];
        $scope.constraint.m = ["1", "1", "1", "1", true];
        $scope.constraint.hasConstraints();
        expect($scope.constraint.hasConstraints()).toEqual(true);
        expect($scope.constraint.hasMemberConstraints()).toEqual(true);

        $scope.constraint.t = ["1", "1", "1", true, true];
        $scope.constraint.m = ["1", "1", "1", "1", true];
        $scope.constraint.hasTeamConstraints();
        $scope.constraint.hasMemberConstraints();
        expect($scope.constraint.hasConstraints()).toEqual(true);
        expect($scope.constraint.hasTeamConstraints()).toEqual(true);
        expect($scope.constraint.hasMemberConstraints()).toEqual(true);

        $scope.constraint.clearT();
        $scope.constraint.clearM();
        $scope.constraint.clear();
        expect($scope.constraint.hasConstraints()).toEqual(false);
        expect(parseInt($scope.constraint.tm)).toEqual(0);
        expect($scope.constraint.t[0]).toEqual("-1");
        expect($scope.constraint.hasTeamConstraints()).toEqual(false);
        expect($scope.constraint.hasMemberConstraints()).toEqual(false);

        $scope.$digest();

        $scope.$apply(function() {
            $scope.constraint.tm = 1;
        });

        $scope.$apply(function() {
            $scope.constraint.tm = 2;
        });

        $scope.$apply(function() {
            $scope.constraint.tm = 4;
        });

        $scope.$apply(function() {
            $scope.searchInput = false;
        });

        $scope.$apply(function() {
            $scope.searchInput = "donald trump";
        });

        $scope.$apply(function() {
            $scope.keywordGroups = {
                "0": ["I", "have", "a", "pen"], "1": ["I", "have", "an", "apple"], "$ref": function() {
                    return {
                        "child": function(i) {
                            return {
                                "set": function(k) { }
                            };
                        }
                    };
                }, "length": 2
            };
            $scope.searchInput = "apple";
            $scope.searchFrequency = {
                "0": { "$value": "1" }, "1": { "$value": "1" }, "$ref": function() {
                    return {
                        "child": function(i) {
                            return {
                                "set": function(k) { }
                            };
                        }
                    };
                }, "length": 2
            };
        });

        $scope.constraint.clear();
        $scope.constraint.m = ["0", "-1", "-1", "-1", false];
        $scope.search("");

        $scope.constraint.clear();
        $scope.constraint.m = ["-1", "0", "-1", "-1", false];
        $scope.search("");

        $scope.constraint.clear();
        $scope.constraint.m = ["-1", "-1", "0", "-1", false];
        $scope.search("");

        $scope.constraint.clear();
        $scope.constraint.m = ["-1", "-1", "-1", "0", false];
        $scope.search("");

        $scope.constraint.clear();
        $scope.constraint.m = ["-1", "-1", "-1", "-1", true];
        $scope.search("");

        $scope.searchInput = "!";
        $scope.constraint.clear();
        $scope.search("");

        $scope.searchInput = "donald trump";
        $scope.keywordGroups = {
            "0": ["donald", "trump"], "1": ["I", "have", "an", "apple"], "$ref": function() {
                return {
                    "child": function(i) {
                        return {
                            "set": function(k) { }
                        };
                    }
                };
            }, "length": 2
        };
        $scope.constraint.clear();
        $scope.search("");

        $scope.resultElement();

        $scope.teamScoreList["id-s"](0.5);
        $scope.teamScoreList["name-s"](0.5);
        $scope.teamScoreList["destination-s"](0.5);
        $scope.teamScoreList["language-s"](0.5);
        $scope.teamScoreList["tag-s"](0.5);
        $scope.teamScoreList["description-s"](0.5);
        $scope.teamScoreList["preference-s"](0.5);

        $scope.memberScoreList["id-s"](0.5);
        $scope.memberScoreList["name-s"](0.5);
        $scope.memberScoreList["description-s"](0.5);
        $scope.memberScoreList["email-s"](0.5);
        $scope.memberScoreList["from-s"](0.5);
        $scope.memberScoreList["language-s"](0.5);
        $scope.memberScoreList["gender-s"](0.5);
        $scope.memberScoreList["desire-s"](0.5);

        $scope.constraint.tm = 1;
        $scope.searchInput = "! !";
        $scope.teamData = [{
            "departure_date": "2017-1-1",
            "descriptions": "We are doing comp3111 project, and we do not have leisure time to travel. :0)",
            "destination": "South Africa",
            "estimated_budget_per_person": "USD3100",
            "id": "g0001",
            "language_for_communication": "English",
            "max": "7",
            "members": [
                "0001",
                "0002",
                "0003",
                "0004",
                "0005"
            ],
            "name": "team one one one",
            "preference": "Male",
            "return_date": "2017-2-1",
            "tags": [
                "long trip",
                "leisure",
                "backpack",
                "boy",
                "Africa",
                "trip",
                "busy"
            ]
        }];
        $scope.teamData.push($scope.teamData[0]);
        $scope.search();

        $scope.constraint.clear();
        $scope.constraint.m = ["-1", "-1", "-1", "-1", true];
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.constraint.t[4] = true;
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        countrylist = [{ "name": "china" }];
        $scope.constraint.t[0] = "0";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.teamData[0].destination = "China";
        countrylist = [{ "name": "china" }];
        $scope.constraint.t[0] = "0";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.teamData[0].language_for_communication = "Chinese";
        languagelist = ["chinese"];
        $scope.constraint.t[1] = "0";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.teamData[0].language_for_communication = "English";
        languagelist = ["chinese"];
        $scope.constraint.t[1] = "0";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.teamData[0].preference = "Male";
        $scope.constraint.t[2] = "0";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.teamData[0].preference = "Male";
        $scope.constraint.t[2] = "1";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.t[2] = "2";
        $scope.search();

        $scope.constraint.clear();
        $scope.teamData[0].members = ["g0001"];
        $scope.teamData[0].max = 1;
        $scope.constraint.t[3] = true;
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.teamData[0].members = ["g0001"];
        $scope.teamData[0].max = 3;
        $scope.constraint.t[3] = true;
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.teamData[0].departure_date = new Date();
        $scope.teamData[0].departure_date.setUTCFullYear(2015);
        $scope.constraint.t[4] = true;
        $scope.searchInput = "! !";
        $scope.search();

        $scope.memberData = [{
            "available_for_traveling": "true",
            "birthday": "1980-9-9",
            "descriptions": "I will be the president of United States.",
            "email": "ghi@abc.com",
            "first_name": "Donald",
            "from": "United States",
            "gender": "Male",
            "has_been": [
                "United Kingdom"
            ],
            "id": "0003",
            "language": [
                "English"
            ],
            "last_name": "Trump",
            "profile_pic": "http://www.alternet.org/files/story_images/donald_trump_august_19_2015_cropped.jpg",
            "want_to_travel": [
                "China"
            ]
        }];
        $scope.memberData.push($scope.memberData[0]);

        $scope.constraint.clear();
        $scope.constraint.tm = "2";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.constraint.t[0] = "0";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.constraint.m[0] = "0";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.constraint.m[0] = "1";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.constraint.m[1] = "0";
        $scope.searchInput = "! !";
        $scope.search();

        countrylist = [{ "name": "United States" }, { "name": "china" }];
        $scope.constraint.clear();
        $scope.constraint.m[1] = "0";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.constraint.m[2] = "1";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.constraint.m[2] = "0";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.constraint.clear();
        $scope.constraint.m[3] = "0";
        $scope.searchInput = "! !";
        $scope.search();

        languagelist = ["english", "chinese"];
        $scope.constraint.clear();
        $scope.constraint.m[3] = "0";
        $scope.searchInput = "! !";
        $scope.search();

        $scope.memberData[0].available_for_traveling = false;
        $scope.constraint.clear();
        $scope.constraint.m[4] = true;
        $scope.searchInput = "! !";
        $scope.search();

        $scope.suggestionElement(["a"], 0);
        new $scope.suggestionElement(["a"], 0).action();

        jQueryDocReady();
        toggleAdvancedSearchPanel();
        hideAdvancedSearchCancelBtn();
        hideSearchSuggestion();
        var event = $.Event("keydown");
        event.which = 13;
        keyDownEvent(event);
        event.which = 27;
        keyDownEvent(event);
        event.which = 28;
        keyDownEvent(event);
        readCountryJson({ "country_list": ["United States"] });
        readLanguageJson({ "languages": ["English"] });
        compareDate(new Date().toUTCString(), new Date().toUTCString());
        removeSymbols("asdsa!sa");
        removeSymbols(false);
        normailizeText(false);
        getSimilarityScore([], "", "", {});
        getSimilarityScore(["a", "b"], "abc", "a", { "a-s": function(s) { return 10; } });
        sortArray([1, -1, 2, -2, -3]);
        sortArray([{ "a": 1, "b": 2 }], "a");
        sortTwoArrays([1, -1, 2, -2, -3], [1, -1, 2, -2, -3]);
        simpleHighlight("a");
        hightlight(null, "a");
        hightlight("a", "a");
        hightlight("ab", ["a", "c"]);
        hightlight("ab", ["a", "ab", "c"]);
        hightlight("ab", ["d", "a", "c"]);
        countrylist = ["1"];
        getCountryListItem(0);
        languagelist = ["1"];
        getLanguageListItem(0);
    });
});