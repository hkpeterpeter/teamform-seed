import team from '../../';
describe('TeamDetailController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module(team);
        inject((_$controller_) => {
            $controller = _$controller_('TeamDetailCtrl');
        });
    });

    afterEach(() => {
        for(let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve getTeam', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'getTeam').and.returnValue(Promise.resolve({id: 1})));
        });
        await $controller.getTeam();
        $timeout.flush();
        expect($controller.team.id).toEqual(1);
        done();
    });

    it('should reject getTeam', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'getTeam').and.returnValue(Promise.reject(new Error('Team not exist'))));
        });
        await $controller.getTeam();
        $timeout.flush();
        expect($controller.error.message).toEqual('Team not exist');
        done();
    });

    it('should resolve joinTeam', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'joinTeam').and.returnValue(Promise.resolve({id: 1})));
        });
        $controller.$stateParams.teamId = '1';
        await $controller.joinTeam();
        $timeout.flush();
        done();
    });

    it('should reject joinTeam', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'joinTeam').and.returnValue(Promise.reject(new Error('Fail to Join Team'))));
        });
        $controller.$stateParams.teamId = '1';
        await $controller.joinTeam();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Join Team');
        done();
    });
});
