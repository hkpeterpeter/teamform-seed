describe('UserEditController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module('user');
        inject((_$controller_) => {
            $controller = _$controller_('UserEditCtrl');
        });
    });

    afterEach(() => {
        for(let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve edit', async (done) => {
        let $timeout;
        inject((_$timeout_, UserService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(UserService, 'editUser').and.returnValue(Promise.resolve({key: 1})));
        });
        $controller.user = {id: 1};
        await $controller.edit();
        $timeout.flush();
        expect($controller.$state.current.name).toEqual('user.detail');
        expect($controller.$stateParams.userId).toEqual('1');
        $controller.$state.params = {toState: 'user.detail', toParams: {userId: 2}};
        await $controller.edit();
        $timeout.flush();
        expect($controller.$state.current.name).toEqual('user.detail');
        expect($controller.$stateParams.userId).toEqual('2');
        done();
    });

    it('should reject edit', async (done) => {
        let $timeout;
        inject((_$timeout_, UserService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(UserService, 'editUser').and.returnValue(Promise.reject(new Error('User not exist'))));
        });
        $controller.user = {id: 1};
        await $controller.edit();
        $timeout.flush();
        expect($controller.error.message).toEqual('User not exist');
        done();
    });
});
