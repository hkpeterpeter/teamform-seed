describe("tfApp", function() {
  beforeEach(function(){
    //angular.module("firebase",[]);
    //angular.module("ui.router",[]);
    //angular.module("ngDialog",[]);
    module("tfApp");
    module(function($provide){
        // $provide.factory('$stateParams', function(){
        //     // this.isNumber = jasmine.createSpy('isNumber').andCallFake(function(num){
        //     //     //a fake implementation
        //     // });
        //     // this.isDate = jasmine.createSpy('isDate').andCallFake(function(date){
        //     //     //a fake implementation
        //     // });
        //     return {
        //       eid: "testEid"
        //     }
        // });
      });
  });

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('eventDCtrl', function() {
    var $scope, controller;

     beforeEach(function() {
      $scope = {};
      controller = $controller('eventDCtrl', { $scope: $scope });
    });

    it('$scope.isManaging should be false at first', function() {
      expect($scope.isManaging).toEqual(false);
    });

    it('$scope.selectTeam should be false at first', function() {
      expect($scope.selectTeam).toEqual(false);
    });

  });
});