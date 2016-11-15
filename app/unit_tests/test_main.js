describe('Test main.js', function () {

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

    var $rootScope, $state, $injector;
    beforeEach(function () {

        module('teamform');

        inject(function (_$rootScope_, _$state_, _$injector_) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;
        })
    });


    it('test module run', function () {
        var obj = {
            callback: function () {
            }
        };
        spyOn(obj, "callback");
        $rootScope.retrieveOnceFirebase(firebase, "", obj.callback);
        expect(obj.callback).toHaveBeenCalled();
    });
});