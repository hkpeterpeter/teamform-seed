import team from '../../';
describe('TeamEditController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module(team);
        inject((_$controller_, _$timeout_) => {
            $controller = _$controller_('TeamEditCtrl');
        });
    });

    afterEach(() => {
        for(let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve edit', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'editTeam').and.returnValue(Promise.resolve({key: 1})));
        });
        $controller.team = {id: 1};
        await $controller.edit();
        $timeout.flush();
        expect($controller.$state.current.name).toEqual('team.detail');
        expect($controller.$stateParams.teamId).toEqual('1');
        done();
    });

    it('should reject edit', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'editTeam').and.returnValue(Promise.reject(new Error('Team not exist'))));
        });
        $controller.team = {id: 1};
        await $controller.edit();
        $timeout.flush();
        expect($controller.error.message).toEqual('Team not exist');
        done();
    });
});
