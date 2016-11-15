describe('Unit testing member card', function() {
    var $compile,
        $rootScope,
        element;

    beforeEach(module('teamform'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;

        element = $compile("<member-card data='{}'></member-card>")($rootScope);
        angular.element(document.body).append(element);
    }));

    it('Replaces the element with the member card content', function() {
        expect(element.html()).toBe("");
    });
});