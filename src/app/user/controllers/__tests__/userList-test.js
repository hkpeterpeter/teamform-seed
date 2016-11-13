import user from '../../';
describe('UserListController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module(user);
        inject((_$controller_) => {
            $controller = _$controller_('UserListCtrl');
        });
    });

    afterEach(() => {
        for(let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve getUsers', async (done) => {
        let $timeout;
        inject((_$timeout_, UserService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(UserService, 'getUsers').and.returnValue(Promise.resolve([{id: 1}])));
        });
        await $controller.getUsers();
        $timeout.flush();
        expect($controller.users[0].id).toEqual(1);
        done();
    });

    it('should reject getUsers', async (done) => {
        let $timeout;
        inject((_$timeout_, UserService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(UserService, 'getUsers').and.returnValue(Promise.reject(new Error('Fail to Get Users'))));
        });
        await $controller.getUsers();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Get Users');
        done();
    });

});
