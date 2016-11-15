describe('createEv.js', function() {
   // Example: A test case of AdminCtrl
   describe('AdminCtrl',function(){
     var firebaseRef, scope;

   beforeEach(module("teamform-member-app"));
   beforeEach(inject(function ($rootScope, $controller, $firebaseObject) {
           scope = $rootScope.$new();

           $controller("AdminCtrl", {
               $scope: scope,
               $firebaseObject: $firebaseObject
           });

           firebaseRef = new Firebase("https://myurl.firebaseio.com/somechild");
        }));

    describe('Create Event, Page: 0',function(){
        beforeEach(function(){
          createEvent();
        });
        it('Test createEvent function',function(){
          expect($scope.page).toEqual(0);
        });
    })

  });
});
