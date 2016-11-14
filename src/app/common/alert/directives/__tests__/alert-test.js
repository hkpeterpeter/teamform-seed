import alert from '../..';
describe('AlertDirective', () => {
    let $compile,
        $rootScope;

    beforeEach(() => {
        angular.mock.module(alert);
        inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    it('Alert', () => {
        let element = $compile('<ui-alert message="error"></ui-alert >')($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain('error');
    });
});
