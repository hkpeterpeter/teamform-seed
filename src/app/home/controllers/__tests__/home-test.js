describe('HomeController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module('home');
        inject((_$controller_) => {
            $controller = _$controller_('HomeCtrl');
        });
    });

    afterEach(() => {
        for (let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('Home', () => {

    });
});
