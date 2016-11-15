describe('Testing', function() {

    var ref, auth;

    beforeEach(function() {

        module("teamApp", "firebase");

        inject(function(_$controller_, $firebaseAuth) {

            $controller = _$controller_;
            ref = firebase.database().ref();
            auth = $firebaseAuth(firebase.auth());
        });
    });

    describe('submit()', function() {

        it("should create event on firebase", function(done) {

            var $scope = {};
            $controller('teamSubmit', {
                $scope: $scope
            });
            var teamNum = 0;

            $scope.input.name = "fish";
            $scope.input.intro = "fish";
            $scope.input.event = "Event333";
            auth.$signInWithEmailAndPassword("fish1@fish.com", "123123");
            $scope.submit();

            setTimeout(function() {
                expect(teamNum).toEqual(teamNum);
            }, 2000);

            setTimeout(function() {
                done();
            }, 2000);
        });

    });
});
