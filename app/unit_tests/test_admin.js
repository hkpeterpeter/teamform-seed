var firebase = {
    database: function () {
        return new window.MockFirebase("");
    }
};

describe('Test admin.js', function () {
    var firebaseParam = {
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
        }
    };

    var $firebaseObject = function () {
        return firebaseParam;
    };

    var $firebaseArray = function () {
        return [];
    };

    var $rootScope, $state, $controller;

    beforeEach(module('teamform'));

    beforeEach(inject(function (_$rootScope_, _$state_, _$controller_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;

        createController = function () {
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
        var controller = createController();
        expect($rootScope.team.length).toBe(0);
    });
});