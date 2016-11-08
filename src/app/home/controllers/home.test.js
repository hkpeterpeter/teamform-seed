describe('HomeController', function() {
    let $controller;
    beforeEach(() => {
        angular.mock.module('home');
        inject((_$controller_) => {
            $controller = _$controller_('HomeCtrl');
        });
    });
});
