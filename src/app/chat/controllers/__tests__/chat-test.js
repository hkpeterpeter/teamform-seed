describe('ChatController', function() {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module('chat');
        inject((_$controller_) => {
            $controller = _$controller_('ChatCtrl');
        });
    });

    afterEach(() => {
        for (let spy of $spys) {
            spy.and.callThrough();
        }
    });
    it('Chat', () => {
        
    });
});
