describe('RegisterController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module('register');
        inject((_$controller_) => {
            $controller = _$controller_('RegisterCtrl');
        });
    });

    afterEach(() => {
        for (let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve register', async(done) => {
        let $timeout;
        inject((_$timeout_, AuthService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'register').and.returnValue(Promise.resolve({uid: 1})));
        });
        await $controller.register();
        $timeout.flush();
        expect($controller.$state.current.name).toEqual('user.detail.edit');
        done();
    });

    it('should reject register', async(done) => {
        let $timeout;
        inject((_$timeout_, AuthService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'register').and.returnValue(Promise.reject(new Error('Fail to Register'))));
        });
        await $controller.register();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Register');
        done();
    });

});
