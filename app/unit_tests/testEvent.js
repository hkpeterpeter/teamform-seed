describe("tfApp", function() {
    beforeEach(function(){
        //angular.module("firebase",[]);
        //angular.module("ui.router",[]);
        //angular.module("ngDialog",[]);
        module("tfApp");
        module(function($provide){
            $provide.factory('Auth', function(){
                $onAuthStateChanged=function(callback){
                    callback({uid:"testUid"});
                    callback(null);
                    // console.log("fffffffffffffffffff")
                }
                return {
                    $onAuthStateChanged:$onAuthStateChanged
                }
            });
            $provide.service('ngDialog', function(){
                this.open=function(dummyPara){
                    dialog = {}
                    dialog.close = function(){

                    }
return dialog;
                }
            });

            $provide.factory('dialog', function(){
                close=function(){
                }
                return {
                    close:close
                }
            });


            // $provide.factory('$firebaseObject', function(){
            //     return function(ref){
            //       return {

            //       }
            //     }
            // });
        });

        // initalizeFirebase();

    });

    var $controller, auth;

    beforeEach(inject(function(_$controller_, Auth){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        auth = Auth;
    }));

    describe('eventCtrl', function() {
        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('eventCtrl', { $scope: $scope});

        });

        it('$scope.createEventDialog() should return a dialog', function() {
            var dialog;
            $scope.createEventDialog();
            expect(dialog).toEqual(undefined);
              });


        it('$scope.submit()', function() {
            $scope.createEventDialog();
            var event = {};
            $scope.submit();
        });


        it('', function() {
            // auth.$signInWithEmailAndPassword(
            //               "test@test.com",
            //               "123456"
            // ).then(function(authData) {
            //     console.log("Logged in as:", authData);
            // }).catch(function(error) {
            //     console.log("Authentication failed:", error);
            //     // $window.alert(error);
            // });
            // setTimeout(function(){console.log('hhh')},3000);
            // expect($scope.selectTeam).toEqual(false);
        });

    });
});