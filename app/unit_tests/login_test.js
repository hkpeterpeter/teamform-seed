describe("TestLogin", function(){

  var $scope, $rootScope, $controller, $cookies, $firebaseObject, $firebaseArray, $window, $timeout;

  beforeEach(function(){
    module('indexApp');
    inject(
      function(_$rootScope_, _$controller_, _$cookies_, _$firebaseArray_, _$firebaseObject_, _$window_, _$timeout_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $cookies = _$cookies_;
        $firebaseArray = _$firebaseArray_;
        $firebaseObject = _$firebaseObject_;
        $window = _$window_;
        $timeout = _$timeout_;
    });
    $scope = $rootScope.$new();
    $controller("indexCtrl", {
      $scope: $scope,
      $firebaseArray: $firebaseArray,
      $firebaseObject: $firebaseObject,
      $cookies: $cookies,
      $window: $window
    });
    // $scope.scopeUser.$loaded()
    //   .then(function(data){done();})
    //   .catch(function(e){done.fail(e);});
  });

  it('get firebase data', function(){
    expect($scope.scopeUser["abcd"].password).toEqual("1");
  });

  it('login', function(){
    $scope.inputUsername = "abcd";
    $scope.inputPassword = "1";
    $scope.login();
    expect($cookies.get("username",{path:"/"})).toEqual("abcd");
    expect($window.location.path).toEqual("/TXR/index.html");
  });

  afterEach(function(done){
    firebase.app().delete().then(function(){done();});
  });

});
