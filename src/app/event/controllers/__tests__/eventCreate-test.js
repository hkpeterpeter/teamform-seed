describe('EventCreateController', () => {
    let $controller;
    beforeEach(() => {
        angular.mock.module('event');
        inject((_$controller_) => {
            $controller = _$controller_('EventCreateCtrl');
        });
    });

    it('should resolve createEvent', async () => {
        inject((_$rootScope_, _$q_, _$timeout_, EventService) => {
            let deferred = _$q_.defer();
            spyOn(EventService, 'createEvent').and.returnValue(deferred.promise);
            $controller.createEvent();
            deferred.resolve({key: 0});
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(EventService.createEvent).toHaveBeenCalled();
            expect($controller.error).toEqual(null);
        });
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
    });

});
