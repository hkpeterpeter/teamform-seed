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

    it('test change min size method', function () {
        var controller = createController();
        // increase min size
        $rootScope.param.minTeamSize = 2;
        $rootScope.changeMinTeamSize(3)
        expect($rootScope.param.minTeamSize).toBe(5);

        // increase min size beyond maxTeamSize
        $rootScope.param.maxTeamSize = 4;
        $rootScope.param.minTeamSize = 2;
        $rootScope.changeMinTeamSize(3)
        expect($rootScope.param.minTeamSize).toBe(2);

        // decrease min size (invalid case)
        $rootScope.param.minTeamSize = 2;
        $rootScope.changeMinTeamSize(-1)
        expect($rootScope.param.minTeamSize).toBe(1);

        // decrease min size beyond 1 (invalid case)
        $rootScope.param.minTeamSize = 1;
        $rootScope.changeMinTeamSize(-1)
        expect($rootScope.param.minTeamSize).toBe(1);
    });

    it('test change max size method', function () {
        var controller = createController();
        // increase max size
        $rootScope.param.maxTeamSize = 2;
        $rootScope.changeMaxTeamSize(3)
        expect($rootScope.param.maxTeamSize).toBe(5);

        // decrease max size
        $rootScope.param.maxTeamSize = 2;
        $rootScope.changeMaxTeamSize(-1)
        expect($rootScope.param.maxTeamSize).toBe(1);

        // decrease max size beyond 1 (invalid case)
        $rootScope.param.maxTeamSize = 1;
        $rootScope.changeMaxTeamSize(-1)
        expect($rootScope.param.maxTeamSize).toBe(1);

        // decrease max size beyond teamMinSize (invalid case)
        $rootScope.param.minTeamSize = 5;
        $rootScope.param.maxTeamSize = 6;
        $rootScope.changeMaxTeamSize(-3)
        expect($rootScope.param.maxTeamSize).toBe(6);
    });

});