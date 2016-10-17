describe('LogoutController', () => {
    let $controller;
    beforeEach(() => {
        angular.mock.module('logout');
        inject((_$controller_) => {
            $controller = _$controller_('LogoutCtrl');
        });
    });

    it('should resolve signOut', () => {
        inject((_$rootScope_, _$q_, _$timeout_, UserService) => {
            var deferred = _$q_.defer();
            spyOn(UserService, 'signOut').and.returnValue(deferred.promise);
            $controller.logout();
            $controller.$state.params.fromState = 'logout';
            deferred.resolve();
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(UserService.signOut).toHaveBeenCalled();
        });
    });

    it('should reject signOut', () => {
        inject((_$rootScope_, _$q_, _$timeout_, UserService) => {
            var deferred = _$q_.defer();
            spyOn(UserService, 'signOut').and.returnValue(deferred.promise);
            $controller.logout();
            deferred.reject(new Error('rejected'));
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(UserService.signOut).toHaveBeenCalled();
            expect($controller.error.message).toEqual('rejected');
        });
    });

});
