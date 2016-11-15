describe("TeamApp module", function() {

    beforeEach(function() {

        module("teamApp", "firebase", "ui.router");

        inject(function(_$controller_, $firebaseAuth) {

            $controller = _$controller_;
            ref = firebase.database().ref();
            auth = $firebaseAuth(firebase.auth());
        });
    });

    describe('Login function', function() {

        it("After login, $rootScope.id should be defined", function(done) {

            var $scope = {};

            $controller('eventjoin', {
                $scope: $scope
            });

            auth.$signInWithEmailAndPassword("fish1@fish.com", "123123");
            $scope.joinit($scope.event[0]);

            setTimeout(function() {
                done();
            }, 2000);
        });

    });
});
