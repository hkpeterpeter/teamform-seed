describe("TeamApp module", function() {

    beforeEach(function () {
        
       module("teamApp","firebase");
        
        inject(function (_$controller_) {
            
        $controller = _$controller_;
    
        });
    });

    describe('Team function',function(){

        it("After create team, teamname should be defined", function (done){
            var $scope= {};
            $controller('AuthCtrl', { $scope: $scope });
            
            }, 2000);
    });

    });
});
