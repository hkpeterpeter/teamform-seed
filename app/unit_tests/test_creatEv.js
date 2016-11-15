describe('createEv.js', function() {
  // Example: A test case of createEventCtrl
  describe('createEventCtrl',function(){
    var firebaseRef, scope;

    beforeEach(module("teamform-member-app"));
    beforeEach(inject(function ($rootScope, $controller, $firebaseObject) {
      scope = $rootScope.$new();

      $controller("createEventCtrl", {
        $scope: scope,
        $firebaseObject: $firebaseObject
      });

      firebaseRef = new Firebase("https://myurl.firebaseio.com/somechild");
    }));

    describe('Create Event, Page: 0',function(){
      createEvent();
      it('Test createEvent function',function(){
        expect($scope.page).toEqual(0);
      });
    });

  });
});
