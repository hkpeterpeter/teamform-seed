describe('profile.js', function() {
  // Example: A test case of createEventCtrl
  /*
   * Unit tests for lib/calculator.js
   */

  describe('profileCtrl', function() {

    var $rootScope;
    var $controller;
    beforeEach(module('teamform-admin-app'));
    beforeEach(inject(function($injector) {

        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        $scope = $rootScope.$new();

    }));
    beforeEach(inject(function($controller) {
        YourControllerHere = $controller("profileCtrl");

    }));

    // inject the HTML fixture for the tests

    // remove the html fixture from the DOM
    afterEach(function() {
    });

    // call the init function of calculator to register DOM elements

    it('shoud be displayed data in textarea', function() {
      expect(showName()).toBeDefined();
    });

    it("should run the save function",function (){

      expect(showDesc().toBeDefined());

    });




  });
});
