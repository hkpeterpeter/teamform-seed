describe('BodyDirective', () => {
    let $compile,
        $rootScope;

    beforeEach(() => {
        angular.mock.module('common.body');
        inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    it('Body', () => {
        let element = $compile('<ui-body></ui-body>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).not.toBeNull();
    });
});
