describe("TeamApp module", function() {

    beforeEach(function () {
        
       module("teamApp","firebase");
        
        inject(function (_$controller_) {
            
        $controller = _$controller_;
    
        });
    });

    describe('Login function',function(){

        it("After login, $rootScope.id should be defined", function (done){
        
            var $scope= {};
            $controller('AuthCtrl', { $scope: $scope });
            
            var email = "fish7@fish.com";
            var password = 123123;
            $scope.signIn($scope.email, $scope.password);
            expect($rootScope.id).toBeDefined();
          setTimeout(function() {
            done();
            }, 2000);
    });

    });
});