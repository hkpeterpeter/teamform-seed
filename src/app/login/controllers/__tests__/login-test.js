describe('LoginController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module('home');
        angular.mock.module('login');
        inject((_$controller_) => {
            $controller = _$controller_('LoginCtrl');
        });
    });

    it('should resolve login', async(done) => {
        let $timeout;
        inject((_$timeout_, AuthService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'auth').and.returnValue(Promise.resolve()));
        });
        $controller.$state.params = {toState: 'home', toParams: {}};
        await $controller.login();
        $timeout.flush();
        expect($controller.$state.current.name).toEqual('home');
        done();
    });

    it('should reject login', async(done) => {
        let $timeout;
        inject((_$timeout_, AuthService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'auth').and.returnValue(Promise.reject(new Error('Fail to Login'))));
        });
        await $controller.login();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Login');
        done();
    });

    it('should resolve authenticate', async(done) => {
        inject((_$auth_) => {
            $spys.push(spyOn(_$auth_, 'authenticate').and.returnValue(Promise.resolve({data:{token:'TOKEN'}})));
        });
        await $controller.authenticate('ust');
        done();
    });

    it('should reject authenticate', async(done) => {
        let $timeout;
        inject((_$timeout_, _$auth_) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(_$auth_, 'authenticate').and.returnValue(Promise.reject(new Error('Fail to Authenticate'))));
        });
        await $controller.authenticate('ust');
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Authenticate');
        done();
    });

});
