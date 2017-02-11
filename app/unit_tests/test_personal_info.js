describe("TeamApp module", function() {

    beforeEach(function() {

        module("teamApp", "firebase", "ui.router");

        inject(function(_$controller_) {

            $controller = _$controller_;

        });
    });

    describe('Login function', function() {

        it("After login, $rootScope.id should be defined", function(done) {

            var $scope = {};

            $controller('piCtrl', {
                $scope: $scope
            });

            expect($scope.data).toBeDefined();

            setTimeout(function() {
                done();
            }, 2000);
        });

    });
});
