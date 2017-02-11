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
            $scope.input.name = "";
            $scope.input.intro = "";
            $scope.input.state = false;
            $scope.input.holder = "on99";
            $scope.submit();
            //expect($scope.nameTouched).toEqual(false);
            //
            //form.newEventName.$touched.$setViewValue(true);
            //$scope.eventForm.newEventName.$touched = true;
            //$scope.nameErrorMessage();
            //expect($scope.nameTouched).toEqual(true);

            setTimeout(function() {
                done();
            }, 2000);
        });

    });
    
        describe('Errormessage', function() {
        
          //beforeEach(function(){
          //  form = $('<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script><body ng-app="events"><div ng-controller="eventSubmit"><form name="eventForm" ng-controller="eventSubmit"></body>');
          //  $(document.body).append(form);
          //});

        it("should create event on firebase", function(done) {

            var $scope = {};
            var $rootScope= {};
            $controller('eventSubmit', {
                $scope: $scope,
                $rootScope: $rootScope
            });
            var eventForm={
                newEventName:{$touched:false,$invalid:false},
                newEventIntro:{$touched:false,$invalid:false}           
            };
            var input={
                name:""
            };
            
            $scope.eventForm=eventForm;

            $scope.input = input;

            $scope.eventForm.newEventName.$touched = false;
            $scope.nameErrorMessage();
            $scope.eventForm.newEventName.$touched = true;
            $scope.nameErrorMessage();
            $scope.eventForm.newEventName.$invalid = true;
            expect($scope.nameErrorMessage()).toEqual("The event name is required!");
            $scope.input.name= "hi";
            $scope.eventForm.newEventName.$invalid = false;
            $scope.nameErrorMessage();
            $scope.input.name= "pk";
            $scope.eventForm.newEventName.$invalid = false;
            expect($scope.nameErrorMessage()).toEqual("The event name is existed!");


            $scope.eventForm.newEventName.$touched = true;
            $scope.nameErrorMessage();
            expect($scope.nameTouched).toEqual(true);
            $scope.introErrorMessage();
            $scope.eventForm.newEventIntro.$touched = true;
            $scope.eventForm.newEventIntro.$invalid = true;
            expect($scope.introErrorMessage()).toEqual("The event intro is required!");

            setTimeout(function() {
                done();
            }, 2000);
        });

    });
        
        
        

    
    
});
