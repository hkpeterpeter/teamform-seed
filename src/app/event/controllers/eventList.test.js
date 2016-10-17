describe('EventListController', () => {
    let $controller;
    beforeEach(() => {
        angular.mock.module('event');
        inject((_$controller_) => {
            $controller = _$controller_('EventListCtrl');
        });
    });

    it('should resolve getEvents', () => {
        inject((_$rootScope_, _$q_, _$timeout_, EventService) => {
            var deferred = _$q_.defer();
            spyOn(EventService, 'getEvents').and.returnValue(deferred.promise);
            $controller.getEvents();
            deferred.resolve();
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(EventService.getEvents).toHaveBeenCalled();
        });
    });

    it('should reject getEvents', () => {
        inject((_$rootScope_, _$q_, _$timeout_, EventService) => {
            var deferred = _$q_.defer();
            spyOn(EventService, 'getEvents').and.returnValue(deferred.promise);
            $controller.getEvents();
            deferred.reject(new Error('rejected'));
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(EventService.getEvents).toHaveBeenCalled();
            expect($controller.error.message).toEqual('rejected');
        });
    });

});
