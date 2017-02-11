describe('Testing', function() {

    beforeEach(function() {

        module("teamApp", "firebase");

        inject(function(_$controller_) {

            $controller = _$controller_;

        });
    });
   
describe('random_Event function',function(){

        it("an random number should be generated", function (){
        
            var $scope= {};
            var $rootScope= {};
            var $firebaseArray= {};
            var Auth= {};

            $controller('random_Event',{
                $scope: $scope,
                Auth: Auth,
                $rootScope: $rootScope
            });

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