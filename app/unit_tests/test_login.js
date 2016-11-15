//describe("TeamApp module", function() {
//
//    beforeEach(function () {
//        
//       module("teamApp","firebase");
//        
//        inject(function (_$controller_) {
//            
//        $controller = _$controller_;
//    
//        });
//    });
//
//    describe('Login function',function(){
//
//        it("After login, $rootScope.id should be defined", function (done){
//        
//            var $scope= {};
//            $controller('AuthCtrl', { $scope: $scope });
//            
//            var email = "fish7@fish.com";
//            var password = 123123;
//            $scope.signIn($scope.email, $scope.password);
//            expect($rootScope.id).toBeDefined();
//          setTimeout(function() {
//            done();
//            }, 2000);
//    });
//
//    });
//});

describe("TeamApp module", function() {
<<<<<<< HEAD
   
   //var config = {
   //     apiKey: "AIzaSyAVbRf9lY-uCjVhhrq9Rl9AuWaZnZROFlA",
   //     authDomain: "pk01-33b28.firebaseapp.com",
   //     databaseURL: "https://pk01-33b28.firebaseio.com",
   //     storageBucket: "pk01-33b28.appspot.com",
   //     messagingSenderId: "397595280376"
   //     };
     var config = {
         apiKey: "AIzaSyBeH4V9bsh-06W46RkiDd2eMlpN3c0IVj8",
         authDomain: "comp3111-bb108.firebaseapp.com",
         databaseURL: "https://comp3111-bb108.firebaseio.com",
         storageBucket: "comp3111-bb108.appspot.com",
         messagingSenderId: "554833059052"
     };
     firebase.initializeApp(config);
   
   beforeEach(function () {
        
      module("teamApp","firebase","ui.router");
        
      inject(function (_$controller_) {
            
      $controller = _$controller_;
    
      });
   });

   describe('Login function',function(){

      it("After login, $rootScope.id should be defined", function (done){
        
         var $scope= {};

         $controller('eventSubmit', { $scope: $scope });

         
         $controller('AuthCtrl', { $scope: $scope });
         
         $scope.lInput.email = "fish7@fish.com";
         $scope.lInput.password = "123123";
         
         $scope.signIn();
        
         expect($rootScope.id).toBeDefined();
         setTimeout(function() {
            done();
            }, 2000);
=======

    var config = {
        apiKey: "AIzaSyARcBw16Z-m5cPGOuNRx5tICKK0RiJ8kms",
        authDomain: "testingdb-af83e.firebaseapp.com",
        databaseURL: "https://testingdb-af83e.firebaseio.com",
        storageBucket: "testingdb-af83e.appspot.com",
        messagingSenderId: "2571210567"
    };
    firebase.initializeApp(config);

    var rootScope;

    beforeEach(function() {

        module("teamApp", "firebase", "ui.router");

        inject(function(_$controller_, $rootScope) {

            $controller = _$controller_;
            rootScope = $rootScope;

        });
>>>>>>> 13ea2f1233c6e568e8ecb27fe006890a4c2dd1f7
    });

    describe('Login function', function() {

        it("After login, $rootScope.id should be defined", function(done) {

            var $scope = {};

            $controller('eventSubmit', {
                $scope: $scope
            });


            $controller('AuthCtrl', {
                $scope: $scope
            });

            $scope.lInput.email = "fish7@fish.com";
            $scope.lInput.password = "123123";

            $scope.signIn();

            expect(rootScope.id).toBeDefined();
            setTimeout(function() {
                done();
            }, 2000);
        });

    });
});
