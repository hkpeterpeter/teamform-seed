describe('searchCtrl', function () {
    beforeEach(module('search', 'firebase'));

    var $controller;

    beforeEach(inject(function ($rootScope, _$controller_, $firebaseArray, $sce) {
        $scope = $rootScope.$new();
        $controller = _$controller_;
        $controller = $controller('searchCtrl', { $scope: $scope, $firebaseArray: $firebaseArray, $sce: $sce });
    }));

    it("search_test", function () {
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

        $scope.$apply(function () {
            $scope.constraint.tm = 1;
        });

        $scope.$apply(function () {
            $scope.constraint.tm = 2;
        });

        $scope.$apply(function () {
            $scope.searchInput = false;
        });

        $scope.$apply(function () {
            $scope.searchInput = "donald trump";
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

        compareDate(new Date().toUTCString(), new Date().toUTCString());
        removeSymbols("asdsa!sa");
        removeSymbols(false);
        normailizeText(false);
        getSimilarityScore([], "", "", {});
        getSimilarityScore(["a", "b"], "abc", "a", { "a-s": function (s) { return 10; } });
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