describe('RegisterController', () => {
    let $controller;
    beforeEach(() => {
        angular.mock.module('register');
        inject((_$controller_) => {
            $controller = _$controller_('RegisterCtrl');
        });
    });

    it('should resolve register', async () => {
        inject((_$rootScope_, _$q_, AuthService) => {
            let deferred = _$q_.defer();
            spyOn(AuthService, 'register').and.returnValue(deferred.promise);
            $controller.register();
            $controller.$state.params.toState = 'register';
            deferred.resolve();
            _$rootScope_.$digest();
            expect(AuthService.register).toHaveBeenCalled();
        });
    });

    it('should reject register', async () => {
        inject((_$rootScope_, _$q_, _$timeout_, AuthService) => {
            let deferred = _$q_.defer();
            spyOn(AuthService, 'register').and.returnValue(deferred.promise);
            $controller.register();
            deferred.reject(new Error('rejected'));
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(AuthService.register).toHaveBeenCalled();
            expect($controller.error.message).toEqual('rejected');
        });
    });

});
