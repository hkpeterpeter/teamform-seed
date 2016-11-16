describe('profile.js', function() {
  // Example: A test case of createEventCtrl
  describe('profileCtrl',function(){
    var firebaseRef, scope;

    beforeEach(module("teamform-admin-app"));
    beforeEach(inject(function ($rootScope, $controller, $firebaseObject) {
      scope = $rootScope.$new();

      $controller("createEventCtrl", {
        $scope: scope,
        $firebaseObject: $firebaseObject
      });

      firebaseRef = new Firebase("https://myurl.firebaseio.com/somechild");
    }));

    describe('Create Event, Page: 0',function(){
      it('Test createEvent function',function(){
        expect($scope.page).toEqual(0);
      });
    });

  });
});
