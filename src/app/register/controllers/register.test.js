describe('RegisterController', () => {
    let $controller;
    beforeEach(() => {
        angular.mock.module('register');
        inject((_$controller_) => {
            $controller = _$controller_('RegisterCtrl');
        });
    });

    it('should resolve register', () => {
        inject((_$rootScope_, _$q_, UserService) => {
            let deferred = _$q_.defer();
            spyOn(UserService, 'register').and.returnValue(deferred.promise);
            $controller.register();
            $controller.$state.params.toState = 'register';
            deferred.resolve();
            _$rootScope_.$digest();
            expect(UserService.register).toHaveBeenCalled();
        });
    });

    it('should reject register', () => {
        inject((_$rootScope_, _$q_, _$timeout_, UserService) => {
            let deferred = _$q_.defer();
            spyOn(UserService, 'register').and.returnValue(deferred.promise);
            $controller.register();
            deferred.reject(new Error('rejected'));
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(UserService.register).toHaveBeenCalled();
            expect($controller.error.message).toEqual('rejected');
        });
    });

});
