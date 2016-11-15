describe("TeamApp module", function() {

    beforeEach(function () {
        
       module("teamApp","firebase");
        
        inject(function (_$controller_) {
            
        $controller = _$controller_;
    
        });
    });

    describe('Team function',function(){

        it("After create team, $scope.team should be defined", function (done){
            var $scope= {};
            $controller('teamSubmit', { $scope: $scope });
                $scope.input.state=true;
                        $scope.input.holder=1;
                        $scope.team = {
                            name:"",
                            intro:"",
                            teamleader:"",
                            openness:true	,
                            member:"",
                            numberOfmember:0
            }, 2000);
    });
    });
});
