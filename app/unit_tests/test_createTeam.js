describe('Testing', function() {
    // var config = {
    //     apiKey: "AIzaSyBeH4V9bsh-06W46RkiDd2eMlpN3c0IVj8",
    //     authDomain: "comp3111-bb108.firebaseapp.com",
    //     databaseURL: "https://comp3111-bb108.firebaseio.com",
    //     storageBucket: "comp3111-bb108.appspot.com",
    //     messagingSenderId: "554833059052"
    // };
    // firebase.initializeApp(config);

    var form;

    beforeEach(function() {

        module("teamApp", "firebase");

        inject(function(_$controller_) {

            $controller = _$controller_;

        });
    });

    describe('createTeam.js', function() {

        it("should create team", function(done) {

            var $scope = {};
            $controller('teamSubmit', {
                $scope: $scope
            });
            form = $scope.teamForm;
            // else part

             $scope.input.state=true;
             $scope.input.holder=1;

            $scope.submit();


            setTimeout(function() {
                done();
            }, 2000);
        });

    });
});
