import team from '../../';
describe('TeamCreateController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module(team);
        inject((_$controller_, _$timeout_) => {
            $controller = _$controller_('TeamCreateCtrl');
        });
    });

    afterEach(() => {
        for(let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('trigger setLeader', async (done) => {
        let $timeout;
        inject((_$timeout_, AuthService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'getUser').and.returnValue({uid: 1}));
        });
        $controller.team = {users: []};
        await $controller.setLeader();
        $timeout.flush();
        expect($controller.team.users[0].id).toEqual(1);
        expect($controller.team.users[0].role).toEqual('Leader');
        done();
    });

    it('should resolve getEvents', async (done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'getEvents').and.returnValue(Promise.resolve([{$id: 1}, {$id: 2}])));
        });
        $controller.$stateParams.eventId = 1;
        await $controller.getEvents();;
        $timeout.flush();
        expect($controller.events[0].$id).toEqual(1);
        done();
    });

    it('should reject getEvents', async (done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'getEvents').and.returnValue(Promise.reject(new Error('Failed to get events'))));
        });
        await $controller.getEvents();
        $timeout.flush();
        expect($controller.error.message).toEqual('Failed to get events');
        done();
    });

    it('should resolve createTeam', async (done) => {
        let $timeout;
        inject((_$timeout_, AuthService, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'getUser').and.returnValue({uid: 1}));
            $spys.push(spyOn(TeamService, 'createTeam').and.returnValue(Promise.resolve({key: 1})));
        });
        await $controller.createTeam();
        $timeout.flush();
        expect($controller.$state.current.name).toEqual('team.detail');
        expect($controller.$stateParams.teamId).toEqual('1');
        done();
    });

    it('should reject createTeam', async (done) => {
        let $timeout;
        inject((_$timeout_, AuthService, TeamService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(AuthService, 'getUser').and.returnValue({uid: 1}));
            $spys.push(spyOn(TeamService, 'createTeam').and.returnValue(Promise.reject(new Error('Failed to create team'))));
        });
        $controller.team.users = [{id: 1}, {id: 2}];
        await $controller.createTeam();
        $timeout.flush();
        expect($controller.error.message).toEqual('Failed to create team');
        done();
    });

    it('trigger onEventChange', async (done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'getEvent').and.returnValue(Promise.resolve({$id: 1, users:[{id:1, role: 'Leader'}], teamMin: 1, teamMax: 5})));
        });
        await $controller.onEventChange({$id: 1});
        expect($controller.selectedEvent.$id).toEqual(1);
        $controller.updateTeamUsers();
        $timeout.flush();
        expect($controller.team.users.length).toEqual($controller.selectedEvent.teamMax);
        $controller.team.users = [{id: 1, role: 'Leader'}];
        $controller.updateAvailableUsers();
        $timeout.flush();
        expect($controller.availablieUsers.length).toEqual(0);
        done();
    });

    it('trigger onTeamUserChange', async (done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'getEvent').and.returnValue(Promise.resolve({$id: 1, users:[{id:1, role: 'Leader'}], teamMin: 1, teamMax: 5})));
        });
        $controller.onTeamUserChange();
        done();
    });

});
