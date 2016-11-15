describe('Test admin.js', function () {

    var $rootScope, $state, $controller;

    beforeEach(module('teamform'));

    beforeEach(inject(function (_$rootScope_, _$state_, _$controller_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;

        createController = function () {
            return $controller('AdminCreationCtrl', {
                '$scope': $rootScope,
                '$stateParams': {},
                '$state': $state
            });
    };
    }));

    it('test initial values for min and max team size', function () {
        var controller = createController();
        expect($rootScope.param.minTeamSize).toBeGreaterThanOrEqual(1);
        expect($rootScope.param.maxTeamSize).toBeGreaterThanOrEqual(1)
    });

});