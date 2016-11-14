import app from '../../';
describe('AppDirective', () => {
    let $compile,
        $rootScope;

    beforeEach(() => {
        angular.mock.module(app);
        inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    it('App', () => {
        let element = $compile('<App></App>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBeNull();
    });
});
