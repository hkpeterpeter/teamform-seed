describe('TeamCreateController', () => {
    let $controller;
    beforeEach(() => {
        angular.mock.module('team');
        inject((_$controller_) => {
            $controller = _$controller_('TeamCreateCtrl');
        });
    });

    it('should resolve getEvents', async () => {
        inject((_$rootScope_, _$q_, EventService) => {
            let deferred = _$q_.defer();
            spyOn(EventService, 'getEvents').and.returnValue(deferred.promise);
            $controller.getEvents();
            deferred.resolve();
            _$rootScope_.$digest();
            expect(EventService.getEvents).toHaveBeenCalled();
        });
    });

    it('should reject getEvents', async () => {
        inject((_$rootScope_, _$q_, _$timeout_, EventService) => {
            let deferred = _$q_.defer();
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
