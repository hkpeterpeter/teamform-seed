describe('Test read.js', function() {
   
   // Testing Read
    beforeEach(function () {
        module("teamApp")
        inject(function ($rootScope, $controller, $firebaseObject) {
            scope = $rootScope.$new();

            $controller("teamSubmit", { //FirebaseController
                $scope: scope,
                $firebaseObject: $firebaseObject
            });

            firebaseRef = new Firebase("https://comp3111-bb108.firebaseio.com/Team");
        });
    });

    it("should read data from firebase", function () {
        //save some data that our controller will read
        var team = {
            //state = true,
            //holder = 1,
            name:"",
            intro:"",
            teamleader:"",
            openness:true	,
            member:"",
            numberOfmember:0
        };

        firebaseRef.set(team);
        firebase.flush();
        scope.$digest();

        expect(scope.obj).toBe(team);
    });
});