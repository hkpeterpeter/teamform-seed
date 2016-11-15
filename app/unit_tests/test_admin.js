var firebase = {
    database: function () {
        return {
            ref: function (item1) {
                return {
                    once: function (item2) {
                        return {
                            then: function (func) {
                                func();
                            }
                        }
                    }
                }
            }
        }
    }
};

describe('Test admin.js', function () {
    var firebaseParam = {
        $loaded: function () {
            return {
                then: function(func) {
                    return {
                        catch: function (func) {
                            return [];
                        }
                    }
                }
            };
        }
    };

    var $firebaseObject = function() {
        return firebaseParam;
    };

    var $firebaseArray = function() {
        return [];
    };

    var $rootScope, $state, $controller;

    // beforeEach(module('$firebaseObject', '$firebaseArray', function($provide) {
    //     $provide.value('$firebaseObject', null);
    //     $provide.value('$firebaseArray', null);
    // }));
    beforeEach(module('teamform'));

    beforeEach(inject(function (_$rootScope_, _$state_, _$controller_) {
        $state = _$state_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;

        createController = function() {
            return $controller('AdminCtrl', {
                '$scope': $rootScope,
                '$firebaseObject' : $firebaseObject,
                '$firebaseArray' : $firebaseArray,
                '$stateParams': {},
                '$state': $state
            });
        };
    }));

    // beforeEach(function () {
    //     module('teamform');
    //
    //     inject(function (_$rootScope_, _$state_, _$controller_) {
    //         $rootScope = _$rootScope_;
    //         $state = _$state_;
    //         $controller = _$controller_($rootScope, $firebaseObject, $firebaseArray, {}, $state);
    //     })
    // });

    // /**
    //  * This is from https://github.com/firebase/angularFire-seed/blob/master/test/unit/servicesSpec.js
    //  */
    // function firebaseStub() {
    //     // firebase is invoked using new Firebase, but we need a static ref
    //     // to the functions before it is instantiated, so we cheat here by
    //     // attaching the functions as Firebase.fns, and ignore new (we don't use `this` or `prototype`)
    //     var fns = stub('set');
    //     customSpy(fns, 'child', function() { return fns; });
    //
    //     var Firebase = function() {
    //         angular.extend(this, fns);
    //         return fns;
    //     };
    //     Firebase.fns = fns;
    //
    //     return Firebase;
    // }
    //
    // /**
    //  * This is from https://github.com/firebase/angularFire-seed/blob/master/test/unit/servicesSpec.js
    //  */
    // function customSpy(obj, m, fn) {
    //     obj[m] = fn;
    //     spyOn(obj, m).andCallThrough();
    // }
    //
    // /**
    //  * This is from https://github.com/firebase/angularFire-seed/blob/master/test/unit/servicesSpec.js
    //  */
    // function stub() {
    //     var out = {};
    //     angular.forEach(arguments, function(m) {
    //         out[m] = jasmine.createSpy();
    //     });
    //     return out;
    // }

    it('test initial values', function () {
        var controller = createController();
        expect(controller.team).toBe([]);
    });
});