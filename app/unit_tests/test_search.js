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
        $scope.constraint.hasTeamConstraints();
        $scope.constraint.hasMemberConstraints();

        $scope.constraint.tm = "1";
        $scope.constraint.t = ["-1", "-1", "-1", false, false];
        $scope.constraint.m = ["-1", "-1", "-1", "-1", false];
        $scope.constraint.hasConstraints();

        $scope.constraint.tm = "0";
        $scope.constraint.t = ["1", "1", "1", true, true];
        $scope.constraint.m = ["-1", "-1", "-1", "-1", false];
        $scope.constraint.hasConstraints();

        $scope.constraint.tm = "0";
        $scope.constraint.t = ["-1", "-1", "-1", false, false];
        $scope.constraint.m = ["1", "1", "1", "1", true];
        $scope.constraint.hasConstraints();

        $scope.constraint.t = ["1", "1", "1", true, true];
        $scope.constraint.m = ["1", "1", "1", "1", true];
        $scope.constraint.hasTeamConstraints();
        $scope.constraint.hasMemberConstraints();

        $scope.constraint.clearT();
        $scope.constraint.clearM();
        $scope.constraint.clear();

        $scope.$digest();

        $scope.$apply(function() {
            $scope.constraint.tm = 1;
        });

        $scope.$apply(function() {
            $scope.constraint.tm = 2;
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