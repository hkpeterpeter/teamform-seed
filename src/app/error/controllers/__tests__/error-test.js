import error from '../../';
describe('ErrorController', () => {
    let $controller, $spys = [];
    beforeEach(() => {
        angular.mock.module(error);
        inject((_$controller_) => {
            $controller = _$controller_('ErrorCtrl');
        });
    });

    afterEach(() => {
        for (let spy of $spys) {
            spy.and.callThrough();
        }
    });

    it('Error', () => {

    });

});
