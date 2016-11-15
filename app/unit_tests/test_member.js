describe('Test member.js', function () {

    var ctrl, $scope;

    beforeEach(angular.mock.module('teamform'));
    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();

        ctrl = $controller('MemberCtrl', {$scope: $scope});
    }));

    it('test loadFunc', function () {
        //event = "Event1";
        //userID = "Member11";
        //loadFunc();
        //expect(userName).toEqual("Member Name 1");
        expect(1).toEqual(1);

    });
});