describe('Testing', function() {

    beforeEach(function() {

        module("teamApp", "firebase");

        inject(function(_$controller_) {

            $controller = _$controller_;

        });
    });

describe('RandomTeam function',function(){

            it("an random number should be generated", function (){
        
            var $scope= {};
            var $firebaseArray= {};
            var $rootScope= {};
            var Auth= {};

            $controller('random_Team',{
                $scope: $scope,
                Auth: Auth,
                $rootScope: $rootScope
            });

            var testID = "Test333";
            $scope.setEvent(testID);

            var truthy = true;         
            
            if ($scope.random() > -0.5 && $scope.random() < 0.5)
            {
                truthy = true;
            }
            else
            {
                truthy = false;
            }

            expect(truthy).toEqual(true);
            setTimeout(function() {
            done();
            }, 2000);
         });
    });
});