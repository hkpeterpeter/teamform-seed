import event from '../../';
describe('EventEditController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module(event);
        inject((_$controller_) => {
            $controller = _$controller_('EventEditCtrl');
        });
    });

    afterEach(() => {
        for(let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve edit', async (done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'editEvent').and.returnValue(Promise.resolve({key: 1})));
        });
        $controller.event = {data: {id: 1, eventDate: new Date()}};
        await $controller.edit();
        $timeout.flush();
        expect($controller.$state.current.name).toEqual('event.detail');
        expect($controller.$stateParams.eventId).toEqual('1');
        done();
    });

    it('should reject edit', async (done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'editEvent').and.returnValue(Promise.reject(new Error('Event not exist'))));
        });
        $controller.event = {data: {id: 1, eventDate: new Date()}};
        await $controller.edit();
        $timeout.flush();
        expect($controller.error.message).toEqual('Event not exist');
        done();
    });

    it('test setTeamMin', () => {
        $controller.event = {data: {teamMin: 3, teamMax: 5}};
        $controller.setTeamMin(-1);
        expect($controller.event.data.teamMin).toEqual(3);
        $controller.setTeamMin(10);
        expect($controller.event.data.teamMin).toEqual(3);
        $controller.setTeamMin(5);
        expect($controller.event.data.teamMin).toEqual(5);
        $controller.setTeamMin(4);
        expect($controller.event.data.teamMin).toEqual(4);
    });

    it('test setTeamMax', () => {
        $controller.event = {data: {teamMin: 3, teamMax: 5}};
        $controller.setTeamMax(-1);
        expect($controller.event.data.teamMax).toEqual(5);
        $controller.setTeamMax(2);
        expect($controller.event.data.teamMax).toEqual(5);
        $controller.setTeamMax(3);
        expect($controller.event.data.teamMax).toEqual(3);
        $controller.setTeamMax(20);
        expect($controller.event.data.teamMax).toEqual(20);
    });
});
