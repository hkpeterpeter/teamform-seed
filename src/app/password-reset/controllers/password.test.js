describe('PasswordResetController', () => {
    let $controller;
    beforeEach(() => {
        angular.mock.module('password-reset');
        inject((_$controller_) => {
            $controller = _$controller_('PasswordResetCtrl');
        });
    });

    it('should resolve sendPasswordResetEmail', () => {
        inject((_$rootScope_, _$q_, _$timeout_, UserService) => {
            let deferred = _$q_.defer();
            spyOn(UserService, 'sendPasswordResetEmail').and.returnValue(deferred.promise);
            $controller.sendPasswordResetEmail();
            deferred.resolve();
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(UserService.sendPasswordResetEmail).toHaveBeenCalled();
        });
    });

    it('should reject sendPasswordResetEmail', () => {
        inject((_$rootScope_, _$q_, _$timeout_, UserService) => {
            let deferred = _$q_.defer();
            spyOn(UserService, 'sendPasswordResetEmail').and.returnValue(deferred.promise);
            $controller.sendPasswordResetEmail();
            deferred.reject(new Error('rejected'));
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(UserService.sendPasswordResetEmail).toHaveBeenCalled();
            expect($controller.error.message).toEqual('rejected');
        });
    });

});
