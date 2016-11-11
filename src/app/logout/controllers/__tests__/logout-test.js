describe('LogoutController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module('home');
        angular.mock.module('logout');
        inject((_$controller_) => {
            $controller = _$controller_('LogoutCtrl');
        });
    });

    afterEach(() => {
        for (let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve signOut', async(done) => {
        let $timeout;
        inject((_$timeout_, AuthService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'signOut').and.returnValue(Promise.resolve()));
        });
        $controller.$state.params = {fromState: 'home', fromParams: {}};
        await $controller.logout();
        $timeout.flush();
        expect($controller.$state.current.name).toEqual('home');
        done();
    });

    it('should reject signOut', async(done) => {
        let $timeout;
        inject((_$timeout_, AuthService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'signOut').and.returnValue(Promise.reject(new Error('Fail to Logout'))));
        });
        await $controller.logout();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Logout');
        done();
    });

});
