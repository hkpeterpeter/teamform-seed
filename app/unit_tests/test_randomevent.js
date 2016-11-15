describe("TeamApp module", function() {

    beforeEach(function () {
        
       module("teamApp","firebase");
        
        inject(function (_$controller_) {
            
        $controller = _$controller_;
    
        });
    });

    describe('random_Event function',function(){

        it("an random number should be generated", function (done){
        
            var $scope= {};
            $controller('AuthCtrl', { $scope: $scope });
            
            expect($scope.random).toBeLessThan(0.5);
          setTimeout(function() {
            done();
            }, 2000);
    });

    });
});