describe("TeamApp module", function() {

    var config = {
        apiKey: "AIzaSyARcBw16Z-m5cPGOuNRx5tICKK0RiJ8kms",
        authDomain: "testingdb-af83e.firebaseapp.com",
        databaseURL: "https://testingdb-af83e.firebaseio.com",
        storageBucket: "testingdb-af83e.appspot.com",
        messagingSenderId: "2571210567"
    };
    firebase.initializeApp(config);

    beforeEach(function() {

        module("teamApp", "firebase", "ui.router");

        inject(function(_$controller_) {

            $controller = _$controller_;

        });
    });

    describe('Login function', function() {

        it("After login, $rootScope.id should be defined", function(done) {

            var $scope = {};
            var $rootScope = {};

            $controller('AuthCtrl', {
                $scope: $scope,
                $rootScope : $rootScope
            });

            $scope.lInput.email = "fish7@fish.com";
            $scope.lInput.password = "123123";

            $scope.signIn();

            expect($rootScope.id).toBeDefined();
            setTimeout(function() {
                done();
            }, 2000);

        });

    });
});
