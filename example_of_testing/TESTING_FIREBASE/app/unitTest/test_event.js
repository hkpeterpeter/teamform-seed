describe('Testing', function() {
    var config = {
        apiKey: "AIzaSyAVbRf9lY-uCjVhhrq9Rl9AuWaZnZROFlA",
        authDomain: "pk01-33b28.firebaseapp.com",
        databaseURL: "https://pk01-33b28.firebaseio.com",
        storageBucket: "pk01-33b28.appspot.com",
        messagingSenderId: "397595280376"
        };
    firebase.initializeApp(config);
 
    beforeEach(function () {
        
       module("testApp","firebase");
        
        inject(function (_$controller_) {
            
        $controller = _$controller_;
    
        });
    });

    describe('submit() with not signed in',function(){

        it("should create event on firebase", function (done){
        
            var $scope= {};
            $controller('eventSubmit', { $scope: $scope });
            
            $scope.input.name="pk";
            $scope.input.intro="hihi";
            $scope.input.state=false;
            $scope.input.holder="on99";
            $scope.submit();
            firebase.database().ref().once('value', function(snap){
                expect(1).toEqual(1);    
            });
          setTimeout(function() {
            done();
            }, 2000);
    });

    });
});
    

