import footer from '../../';
describe('FooterDirective', () => {
    let $compile,
        $rootScope;

    beforeEach(() => {
        angular.mock.module(footer);
        inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    it('Footer', () => {
        let element = $compile('<ui-footer></ui-footer>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBeNull();
    });
});
