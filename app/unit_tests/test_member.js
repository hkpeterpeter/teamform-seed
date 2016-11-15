var firebase = {
    database: function () {
        return new window.MockFirebase("");
    }
};

describe('Test member.js', function () {
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
            return $controller('MemberCtrl', {
                '$scope': $rootScope,
                '$firebaseObject': $firebaseObject,
                '$firebaseArray': $firebaseArray,
                '$stateParams': {},
                '$state': $state
            });
        };
    }));

    it('test initial value of userID', function () {
        var controller = createController();
        expect($rootScope.userID).toBe('');
    });
    it('test initial value of userName', function () {
        var controller = createController();
        expect($rootScope.userName).toBe('');
    });
    it('test initial value of teams', function () {
        var controller = createController();
        expect($rootScope.teams.length).toBe($firebaseArray().length);
    });
});