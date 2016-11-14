describe("Test Login", function(){

  var $scope, $rootScope, $controller, $cookies, $firebaseObject, $firebaseArray, $window;

  beforeEach(module("indexApp", "ngCookies", "firebase"));
  beforeEach(inject(
    function(_$rootScope_, _$controller_, _$cookies_, _$firebaseArray_, _$firebaseObject_, _$window_){
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $cookies = _$cookies_;
      $firebaseArray = _$firebaseArray_;
      $firebaseObject = _$firebaseObject_;
      $window = _$window_;
  }));
  beforeEach(function(){
    $scope = $rootScope.$new();
    $controller("indexCtrl", {
      $scope: $scope,
      $firebaseArray: $firebaseArray,
      $firebaseObject: $firebaseObject,
      $cookies: $cookies,
      $window: $window
    });
  });

  it('test Karma', function(){
    expect("1").toEqual("1");
  });

});
