describe('AppDirective', function() {
    let $compile,
        $rootScope;

    beforeEach(() => {
        angular.mock.module('common.app');
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
