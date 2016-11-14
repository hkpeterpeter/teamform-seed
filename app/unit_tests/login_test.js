'use restrict';

describe('LoginController', function() {

    beforeEach(module('login', 'firebase'));
    var ctrl, firebase, $scope;

    beforeEach(inject(function($controller, $firebase, $firebaseArray) {
        $scope = {};
        ctrl = $controller('LoginController', {
            $scope: $scope
        })
    }));

    it('loggingIn', function() {
        var username = "kk@kk.kk";
        var password = "kksamoop";
        $scope.email = username;
        $scope.password = password;

        $scope.submit();
    });

    it('loggingInInvalid', function() {
        var username = "kk@kk.kkk";
        var password = "kksamooppp";
        $scope.email = username;
        $scope.password = password;

        $scope.submit();
    });

    it('loggingInWithInvalidUsername', function() {
        var username = "";
        var password = "";
        $scope.email = username;
        $scope.password = password;

        $scope.submit();
    });

    it('checkPwTypedInvalid', function() {
        var username = "";
        var password = "";
        $scope.email = username;
        $scope.password = password;

        $scope.checkPwTyped();
        expect($scope.pwText).toEqual("Invalid Input");

    });

    it('checkPwTypeValid', function() {
        var username = "";
        var password = "1234567890";
        $scope.email = username;
        $scope.password = password;

        $scope.checkPwTyped();
        expect($scope.pwText).toEqual("Okay");

    });

    it('checkEmailTypedInvalid', function() {
        var username = "";
        var password = "";
        $scope.email = username;
        $scope.password = password;

        $scope.checkEmailTyped();
        expect($scope.emailText).toEqual("Invalid Input");

    });

    it('checkEmailTypedInvalid', function() {
        var username = "kk@kk.kk";
        var password = "";
        $scope.email = username;
        $scope.password = password;

        $scope.checkEmailTyped();
        expect($scope.emailText).toEqual("Okay");
    });
});