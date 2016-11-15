describe('Testing', function() {

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
