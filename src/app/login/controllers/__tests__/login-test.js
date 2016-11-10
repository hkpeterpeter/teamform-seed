describe('LoginController', () => {
    let $controller;
    beforeEach(() => {
        angular.mock.module('login');
        inject((_$controller_) => {
            $controller = _$controller_('LoginCtrl');
        });
    });

    it('should resolve login', async () => {
        inject((_$rootScope_, _$q_, AuthService) => {
            let deferred = _$q_.defer();
            spyOn(AuthService, 'auth').and.returnValue(deferred.promise);
            $controller.login();
            $controller.$state.params.toState = 'login';
            deferred.resolve();
            _$rootScope_.$digest();
            expect(AuthService.auth).toHaveBeenCalled();
        });
    });

    it('should reject login', async () => {
        inject((_$rootScope_, _$q_, _$timeout_, AuthService) => {
            let deferred = _$q_.defer();
            spyOn(AuthService, 'auth').and.returnValue(deferred.promise);
            $controller.login();
            deferred.reject(new Error('rejected'));
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(AuthService.auth).toHaveBeenCalled();
            expect($controller.error.message).toEqual('rejected');
        });
    });

    it('should resolve authenticate', async () => {
        inject((_$rootScope_, _$q_, _$auth_) => {
            let deferred = _$q_.defer();
            spyOn(_$auth_, 'authenticate').and.returnValue(deferred.promise);
            $controller.authenticate('ust');
            deferred.resolve({data: {token: 'test-token'}});
            _$rootScope_.$digest();
        });
    });

    it('should reject authenticate', async () => {
        inject((_$rootScope_, _$q_, _$timeout_, _$auth_) => {
            let deferred = _$q_.defer();
            spyOn(_$auth_, 'authenticate').and.returnValue(deferred.promise);
            $controller.authenticate('ust');
            deferred.reject(new Error('rejected'));
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect($controller.error.message).toEqual('rejected');
        });
    });

});
