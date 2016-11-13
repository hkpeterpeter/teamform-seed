import event from '../../';
describe('EventListController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module(event);
        inject((_$controller_) => {
            $controller = _$controller_('EventListCtrl');
        });
    });

    afterEach(() => {
        for(let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('should resolve getEvents', async (done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'getEvents').and.returnValue(Promise.resolve([{id: 1}])));
        });
        await $controller.getEvents();
        $timeout.flush();
        expect($controller.events[0].id).toEqual(1);
        done();
    });

    it('should reject getEvents', async (done) => {
        let $timeout;
        inject((_$timeout_, EventService) => {
            $timeout = _$timeout_;
            $spys.push(spyOn(EventService, 'getEvents').and.returnValue(Promise.reject(new Error('Fail to Get Events'))));
        });
        await $controller.getEvents();
        $timeout.flush();
        expect($controller.error.message).toEqual('Fail to Get Events');
        done();
    });

});
