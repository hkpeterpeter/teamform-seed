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

    it('should resolve confirmTeamPosition', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'confirmTeamPosition').and.returnValue(Promise.resolve({key: 1})));
        });
        await $controller.confirmTeamPosition(1);
        $timeout.flush();
        done();
    });

    it('should reject confirmTeamPosition', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'confirmTeamPosition').and.returnValue(Promise.reject(new Error('Fail to Confirm Team Position'))));
        });
        await $controller.confirmTeamPosition(1);
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Confirm Team Position');
        done();
    });

    it('should resolve rejectConfirmTeamPosition', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'rejectConfirmTeamPosition').and.returnValue(Promise.resolve({key: 1})));
        });
        await $controller.rejectConfirmTeamPosition(1);
        $timeout.flush();
        done();
    });

    it('should reject rejectConfirmTeamPosition', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'rejectConfirmTeamPosition').and.returnValue(Promise.reject(new Error('Fail to Reject Confirm Team Position'))));
        });
        await $controller.rejectConfirmTeamPosition(1);
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Reject Confirm Team Position');
        done();
    });

    it('should resolve acceptTeamPosition', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'acceptTeamPosition').and.returnValue(Promise.resolve({key: 1})));
        });
        await $controller.acceptTeamPosition(1);
        $timeout.flush();
        done();
    });

    it('should reject acceptTeamPosition', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'acceptTeamPosition').and.returnValue(Promise.reject(new Error('Fail to Accept Team Position'))));
        });
        await $controller.acceptTeamPosition(1);
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Accept Team Position');
        done();
    });

    it('should resolve rejectAcceptTeamPosition', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'rejectAcceptTeamPosition').and.returnValue(Promise.resolve({key: 1})));
        });
        await $controller.rejectAcceptTeamPosition(1);
        $timeout.flush();
        done();
    });

    it('should reject rejectAcceptTeamPosition', async (done) => {
        let $timeout;
        inject((_$timeout_, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(TeamService, 'rejectAcceptTeamPosition').and.returnValue(Promise.reject(new Error('Fail to Reject Accept Team Position'))));
        });
        await $controller.rejectAcceptTeamPosition(1);
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Reject Accept Team Position');
        done();
    });

    it('canManage', async (done) => {
        let $timeout;
        inject((_$timeout_, AuthService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'getUser').and.returnValue(Promise.resolve({uid: 1})));
        });
        $controller.team = {data: {createdBy: 1}};
        expect(await $controller.canManage()).toEqual(true);
        $controller.team = {data: {createdBy: 2}};
        expect(await $controller.canManage()).toEqual(false);
        $timeout.flush();
        done();
    });

    it('canAccept', async (done) => {
        let $timeout;
        inject((_$timeout_, AuthService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'getUser').and.returnValue(Promise.resolve({uid: 1})));
        });
        $controller.team = {data: {users: {0: 1}}};
        expect(await $controller.canAccept(0)).toEqual(true);
        $controller.team = {data: {users: {0: 2}}};
        expect(await $controller.canAccept(0)).toEqual(false);
        $timeout.flush();
        done();
    });

    it('filterJoined', () => {
        expect($controller.filterJoined({})).toEqual(false);
        expect($controller.filterJoined({id: 1})).toEqual(true);
    });

    it('filterAvailable', () => {
        expect($controller.filterAvailable({})).toEqual(true);
        expect($controller.filterAvailable({id: 1})).toEqual(false);
    });

    it('filterWaitingList', () => {
        expect($controller.filterWaitingList({})).toEqual(false);
        expect($controller.filterWaitingList({pending: true, confirmed: false})).toEqual(true);
        expect($controller.filterWaitingList({pending: true, accepted: false})).toEqual(true);
    });

});
