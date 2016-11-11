describe('UserDetailController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module('user');
        inject((_$controller_) => {
            $controller = _$controller_('UserDetailCtrl');
        });
    });

    afterEach(() => {
        for(let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve getUser', async (done) => {
        let $timeout;
        inject((_$timeout_, UserService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(UserService, 'getUser').and.returnValue(Promise.resolve({id: 1})));
        });
        $controller.$stateParams.userId = 1;
        await $controller.getUser();
        $timeout.flush();
        expect($controller.user.id).toEqual(1);
        done();
    });
    
    it('should reject getUser', async (done) => {
        let $timeout;
        inject((_$timeout_, UserService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(UserService, 'getUser').and.returnValue(Promise.reject(new Error('User not exist'))));
        });
        $controller.$stateParams.userId = 1;
        await $controller.getUser();
        $timeout.flush();
        expect($controller.error.message).toEqual('User not exist');
        done();
    });

});
