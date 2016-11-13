import password_reset from '../../';
describe('PasswordResetController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module(password_reset);
        inject((_$controller_) => {
            $controller = _$controller_('PasswordResetCtrl');
        });
    });

    afterEach(() => {
        for (let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve sendPasswordResetEmail', async(done) => {
        let $timeout;
        inject((_$timeout_, AuthService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'sendPasswordResetEmail').and.returnValue(Promise.resolve({uid: 1})));
        });
        await $controller.sendPasswordResetEmail();
        $timeout.flush();
        done();
    });

    it('should reject sendPasswordResetEmail', async(done) => {
        let $timeout;
        inject((_$timeout_, AuthService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'sendPasswordResetEmail').and.returnValue(Promise.reject(new Error('Failed to send email'))));
        });
        await $controller.sendPasswordResetEmail();
        $timeout.flush();
        expect($controller.error.message).toEqual('Failed to send email');
        done();
    });

});
