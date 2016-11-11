describe('EventCreateController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module('event');
        inject((_$controller_) => {
            $controller = _$controller_('EventCreateCtrl');
        });
    });

    afterEach(() => {
        for (let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve createEvent', async(done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'createEvent').and.returnValue(Promise.resolve({key: 1})));
        });

        await $controller.createEvent();
        $timeout.flush();
        expect($controller.$state.current.name).toEqual('event.detail');
        expect($controller.$stateParams.eventId).toEqual('1');
        done();
    });

    it('should reject createEvent', async () => {
        inject((_$rootScope_, _$q_, _$timeout_, EventService) => {
            let deferred = _$q_.defer();
            spyOn(EventService, 'createEvent').and.returnValue(deferred.promise);
            $controller.createEvent();
            deferred.reject(new Error('Failed to Create Event'));
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(EventService.createEvent).toHaveBeenCalled();
            expect($controller.error.message).toEqual('Failed to Create Event');
        });
        await $controller.createEvent();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Create Event');
        done();
    });

    it('test setTeamMin', () => {
        $controller.event = {teamMin: 3, teamMax: 5};
        $controller.setTeamMin(-1);
        expect($controller.event.teamMin).toEqual(3);
        $controller.setTeamMin(10);
        expect($controller.event.teamMin).toEqual(3);
        $controller.setTeamMin(5);
        expect($controller.event.teamMin).toEqual(5);
        $controller.setTeamMin(4);
        expect($controller.event.teamMin).toEqual(4);
    });

    it('test setTeamMax', () => {
        $controller.event = {teamMin: 3, teamMax: 5};
        $controller.setTeamMax(-1);
        expect($controller.event.teamMax).toEqual(5);
        $controller.setTeamMax(2);
        expect($controller.event.teamMax).toEqual(5);
        $controller.setTeamMax(3);
        expect($controller.event.teamMax).toEqual(3);
        $controller.setTeamMax(20);
        expect($controller.event.teamMax).toEqual(20);
    });

    it('trigger toggleEventDatePopup', () => {
        $controller.eventDatePopupOpened = false;
        $controller.toggleEventDatePopup();
        expect($controller.eventDatePopupOpened).toEqual(true);
    });

});
