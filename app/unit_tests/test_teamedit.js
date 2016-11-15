describe('Testing', function() {

    beforeEach(function() {

        module("teamApp", "firebase");

        inject(function(_$controller_) {

            $controller = _$controller_;

        });
    });

describe('teamedit function',function(){
      
        it("team info is changed or not", function (){
        
            var $scope = {};
            var $firebaseArray = {};
            var $rootScope = {};
            var Auth = {};

            $controller('teamedit',{
                $scope: $scope,
                Auth: Auth,
                $rootScope: $rootScope
            });
            
            var eId = "Team333";
            var tId = "bbbbb";
            var tIntro = "Fish1";
            
            $scope.teamedit(eId, tId, tIntro);

            expect(eId.intro).toEqual(tIntro);

            setTimeout(function() {
            done();
            }, 2000);
         });
    });
});