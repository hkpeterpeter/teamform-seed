describe("tfApp", function() {
  beforeEach(module("tfApp"));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('profileCtrl', function() {
    var $scope, controller;

     beforeEach(function() {
      $scope = {};
      controller = $controller('profileCtrl', { $scope: $scope });
    });
    //
    // it('$scope.button_name should be EDIT', function() {
    // //   $scope.password = 'longerthaneightchars';
    // //   $scope.grade();
    //   expect($scope.button_name).toEqual('EDIT');
    // });
    //
    // it('$scope.button_name should be SAVE after executing edit()', function() {
    // //   $scope.password = 'longerthaneightchars';
    //   $scope.edit();
    //   expect($scope.button_name).toEqual('SAVE');
    // });

    // it('sets the strength to "weak" if the password length <3 chars', function() {
    //   $scope.password = 'a';
    //   $scope.grade();
    //   expect($scope.strength).toEqual('weak');
    // });
  });
});
