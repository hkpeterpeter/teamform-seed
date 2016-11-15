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

    describe('submit()', function() {

        it("should create event on firebase", function(done) {

            var $scope = {};
            $controller('eventSubmit', {
                $scope: $scope
            });
            form = $scope.eventForm;
            // else part
            $scope.input.name = "pk";
            $scope.input.intro = "hihi";
            $scope.input.state = false;
            $scope.input.holder = "on99";
            $scope.submit();
            expect($scope.nameTouched).toEqual(false);

            form.newEventName.$touched.$setViewValue(true);
            $scope.eventForm.newEventName.$touched = true;
            $scope.nameErrorMessage();
            expect($scope.nameTouched).toEqual(true);

            setTimeout(function() {
                done();
            }, 2000);
        });

    });
});
