var firebase = {
    database: function () {
        return new window.MockFirebase("");
    }
};

describe('Test admin.js', function () {
    var paramFunction, catchFunction;

    var firebaseParam1 = {
        $loaded: function () {
            return {
                then: function (func) {
                    return {
                        catch: function (func) {
                            return [];
                        }
                    }
                }
            };
        },
        $save: jasmine.createSpy()
    };

    var firebaseParam2 = {
        $loaded: function () {
            return {
                then: function (func) {
                    paramFunction = func;

                    return {
                        catch: function (func) {
                            catchFunction = func;
                            return [];
                        }
                    }
                }
            };
        }
    };

    var $firebaseObject1 = function () {
        return firebaseParam1;
    };

    var $firebaseObject2 = function () {
        return firebaseParam2;
    };

    var $firebaseArray = function () {
        return [];
    };

    var $rootScope, $state, $controller, $save;

    beforeEach(module('teamform'));

    beforeEach(inject(function (_$rootScope_, _$state_, _$controller_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;

        spyOn($state, 'go');

        createController = function ($firebaseObject, $firebaseArray) {
            return $controller('AdminCtrl', {
                '$scope': $rootScope,
                '$firebaseObject': $firebaseObject,
                '$firebaseArray': $firebaseArray,
                '$stateParams': {},
                '$state': $state
            });
        };
    }));

    it('test initial values', function () {
        createController($firebaseObject1, $firebaseArray);
        expect($rootScope.team.length).toBe(0);
    });

    it('test successfully loaded param data with team sizes undefined', function () {
        createController($firebaseObject2, $firebaseArray);
        paramFunction(null);
        expect($rootScope.param.maxTeamSize).toBe(10);
        expect($rootScope.param.minTeamSize).toBe(1);
    });

    it('test successfully loaded param data with team sizes defined', function () {
        createController($firebaseObject2, $firebaseArray);
        $rootScope.param.maxTeamSize = 5;
        $rootScope.param.minTeamSize = 0;
        paramFunction(null);
        catchFunction(null);
        expect($rootScope.param.maxTeamSize).toBe(5);
        expect($rootScope.param.minTeamSize).toBe(0);
    });

    it('test changeMinTeamSize with changes saved', function () {
        createController($firebaseObject1, $firebaseArray);
        $rootScope.param.maxTeamSize = 5;
        $rootScope.param.minTeamSize = 0;
        $rootScope.changeMinTeamSize(2);
        expect($rootScope.param.minTeamSize).toBe(2);
    });

    it('test changeMinTeamSize with changes not saved', function () {
        createController($firebaseObject1, $firebaseArray);
        $rootScope.param.maxTeamSize = 5;
        $rootScope.param.minTeamSize = 0;
        $rootScope.changeMinTeamSize(7);
        expect($rootScope.param.minTeamSize).toBe(0);
    });

    it('test changeMaxTeamSize with changes saved', function () {
        createController($firebaseObject1, $firebaseArray);
        $rootScope.param.maxTeamSize = 5;
        $rootScope.param.minTeamSize = 0;
        $rootScope.changeMaxTeamSize(2);
        expect($rootScope.param.maxTeamSize).toBe(7);
    });

    it('test changeMaxTeamSize with changes not saved', function () {
        createController($firebaseObject1, $firebaseArray);
        $rootScope.param.maxTeamSize = -2;
        $rootScope.param.minTeamSize = 7;
        $rootScope.changeMaxTeamSize(7);
        expect($rootScope.param.maxTeamSize).toBe(-2);
    });

    it('test saveFunc', function () {
        createController($firebaseObject1, $firebaseArray);
        $rootScope.saveFunc();
        expect($rootScope.param.$save).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalled();
    });

    it('test deleteFunc with confirmation', function () {
        createController($firebaseObject1, $firebaseArray);
        spyOn(window, 'confirm').and.returnValue(true);
        $rootScope.deleteFunc();
        expect($state.go).toHaveBeenCalled();
    });

    it('test deleteFunc with no confirmation', function () {
        createController($firebaseObject1, $firebaseArray);
        spyOn(window, 'confirm').and.returnValue(false);
        $rootScope.deleteFunc();
        expect($state.go).not.toHaveBeenCalled();
    });
});