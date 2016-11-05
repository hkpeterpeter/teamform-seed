describe('PasswordResetController', () => {
    let $controller;
    beforeEach(() => {
        angular.mock.module('password-reset');
        inject((_$controller_) => {
            $controller = _$controller_('PasswordResetCtrl');
        });
    });

    it('should resolve sendPasswordResetEmail', () => {
        inject((_$rootScope_, _$q_, _$timeout_, AuthService) => {
            let deferred = _$q_.defer();
            spyOn(AuthService, 'sendPasswordResetEmail').and.returnValue(deferred.promise);
            $controller.sendPasswordResetEmail();
            deferred.resolve();
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(AuthService.sendPasswordResetEmail).toHaveBeenCalled();
        });
    });

    it('should reject sendPasswordResetEmail', () => {
        inject((_$rootScope_, _$q_, _$timeout_, AuthService) => {
            let deferred = _$q_.defer();
            spyOn(AuthService, 'sendPasswordResetEmail').and.returnValue(deferred.promise);
            $controller.sendPasswordResetEmail();
            deferred.reject(new Error('rejected'));
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(AuthService.sendPasswordResetEmail).toHaveBeenCalled();
            expect($controller.error.message).toEqual('rejected');
        });
    });

});
