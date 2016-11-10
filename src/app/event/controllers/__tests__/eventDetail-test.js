describe('EventDetailController', () => {
    let $controller;
    beforeEach(() => {
        angular.mock.module('event');
        inject((_$controller_) => {
            $controller = _$controller_('EventDetailCtrl');
        });
    });

    it('should resolve getEvent', async () => {
        inject((_$rootScope_, _$q_, _$timeout_, EventService) => {
            let deferred = _$q_.defer();
            spyOn(EventService, 'getEvent').and.returnValue(deferred.promise);
            $controller.getEvent();
            deferred.resolve({$value: 0});
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(EventService.getEvent).toHaveBeenCalled();
        });
    });

    it('should reject getEvent', async () => {
        inject((_$rootScope_, _$q_, _$timeout_, EventService) => {
            let deferred = _$q_.defer();
            spyOn(EventService, 'getEvent').and.returnValue(deferred.promise);
            $controller.getEvent();
            deferred.reject(new Error('rejected'));
            _$rootScope_.$digest();
            _$timeout_.flush();
            expect(EventService.getEvent).toHaveBeenCalled();
            expect($controller.error.message).toEqual('rejected');
        });
    });

});
