describe('Testing', function() {
    var config = {
        apiKey: "AIzaSyBeH4V9bsh-06W46RkiDd2eMlpN3c0IVj8",
        authDomain: "comp3111-bb108.firebaseapp.com",
        databaseURL: "https://comp3111-bb108.firebaseio.com",
        storageBucket: "comp3111-bb108.appspot.com",
        messagingSenderId: "554833059052"
    };
    firebase.initializeApp(config);

    beforeEach(function() {

        module("teamApp", "firebase");

        inject(function(_$controller_) {

            $controller = _$controller_;

        });
    });

    describe('submit() with not signed in', function() {

        it("should create event on firebase", function(done) {

            var $scope = {};
            $controller('eventSubmit', {
                $scope: $scope
            });
            // else part
            $scope.input.name = "pk";
            $scope.input.intro = "hihi";
            $scope.input.state = false;
            $scope.input.holder = "on99";
            $scope.submit();
            firebase.database().ref().once('value', function(snap) {
                expect($scope.successful).toEqual(1);
            });

            setTimeout(function() {
                done();
            }, 2000);
        });

    });
});
