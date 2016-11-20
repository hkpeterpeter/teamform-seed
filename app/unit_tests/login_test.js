isTest = true;

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

    spyOn(window, 'gotoURL');
    spyOn(testData, '$save');

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
  });

  it('already login jump', function(){
    expect(window.gotoURL).toHaveBeenCalled();
    $cookies.remove("username",{path:"/"});
  });

  it('reg', function(){
    $scope.inputUsernameReg = "test";
    $scope.inputPasswordReg = "test";
    $scope.inputConfirmPasswordReg = "test";
    $scope.reg();
    expect($scope.scopeUser["test"].password).toEqual("test");
  });

  it('FB login', function(done){
    onFBInitFin = function(){
      spyOn(FB, "login");
      $scope.loginFB();
      onFBChkLogFin = function(){
        expect(FB.login).toHaveBeenCalled();
        done();
      };
    };
  });

  it('login invalid input', function(){
    $scope.inputUsername = "abcd";
    $scope.inputPassword = "2";
    $scope.login();
    expect(window.gotoURL).not.toHaveBeenCalled();
  });

  it('reg invalid input', function(){
    $scope.inputUsernameReg = "";
    $scope.reg();
    expect(testData.$save).not.toHaveBeenCalled();
  });

  it('reg with exist user', function(){
    $scope.inputUsernameReg = "abcd";
    $scope.inputPasswordReg = "1";
    $scope.inputConfirmPasswordReg = "1";
    $scope.reg();
    expect(testData.$save).not.toHaveBeenCalled();
  });

  afterEach(function(){

  });

});
