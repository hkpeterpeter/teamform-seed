describe('Testing joinTeam-', function() {
 
    beforeEach(function () {
        
       module("teamApp","firebase");
        
        inject(function (_$controller_) {
            
        $controller = _$controller_;
    
        });
    });

    describe('submit() with not signed in',function(){

        it("should join team in person", function (done){
        
            var $scope= {};
            $controller('joinTeam', { $scope: $scope });
            $scope.firebase=firebase;
            $scope.joinTeamInPerson("UNITTEST",'UNITTEST_TEAM1');
            $scope.firebase.auth().signInWithEmailAndPassword('dontdel9me21@gmail.com', 'howehowe').then(
                        function(){
                        setTimeout(function() {
                           done();
                        }, 4000);
                        $scope.joinTeamInPerson("UNITTEST",'UNITTEST_TEAM1');
                        $scope.firebase.auth().signOut();
                        }
                        );

            
            //$scope.joinTeamInPerson();
            
            setTimeout(function() {
            done();
            }, 8000);
    });
        it("should send join team request", function (done){
        
            var $scope= {};
            $controller('joinTeam', { $scope: $scope });
            $scope.firebase=firebase;
            $scope.reqMessage="";
            jasmine.DEFAULT_TIMEOUT_INTERVAL=30000;
            //no yet sign in
            $scope.reqJoinTeamInPerson("UNITTEST",'UNITTEST_TEAM1');
            
            
            $scope.firebase.auth().signInWithEmailAndPassword('dontdel9me22@gmail.com', 'howehowe').then(
                        function(){
                        setTimeout(function() {
                           done();
                        }, 4000);
                        $scope.reqJoinTeamInPerson("UNITTEST",'UNITTEST_TEAM1');
                        $scope.firebase.auth().signOut();
                        }
                        );


            
            //$scope.joinTeamInPerson();
            
            setTimeout(function() {
            done();
            }, 15000);
    });
    });
});
    

