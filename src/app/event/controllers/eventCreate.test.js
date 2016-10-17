describe('EventCreateController', () => {
    let $controller;
    beforeEach(() => {
        angular.mock.module('event');
        inject((_$controller_) => {
            $controller = _$controller_('EventCreateCtrl');
        });
    });

    it('should resolve createEvent', () => {
        inject((_$rootScope_, _$q_, _$timeout_, EventService) => {
            var deferred = _$q_.defer();
            spyOn(EventService, 'createEvent').and.returnValue(deferred.promise);
            $controller.createEvent();
            deferred.resolve({key: 0});
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(EventService.createEvent).toHaveBeenCalled();
        });
    });

    it('should reject createEvent', () => {
        inject((_$rootScope_, _$q_, _$timeout_, EventService) => {
            var deferred = _$q_.defer();
            spyOn(EventService, 'createEvent').and.returnValue(deferred.promise);
            $controller.createEvent();
            deferred.reject(new Error('rejected'));
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(EventService.createEvent).toHaveBeenCalled();
            expect($controller.error.message).toEqual('rejected');
        });
    });

});
