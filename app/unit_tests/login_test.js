'use restrict';

describe('LoginController', function () {
    beforeEach(module('login', 'firebase'));
    var ctrl, firebase, $scope;

    beforeEach(inject(function ($controller) {
        $scope = {};
        ctrl = $controller('LoginController', {
            $scope: $scope
        });
                $scope.testingLogin = true;
    }));

    it('loggingIn', function () {
        $scope.testingLogin = true;
        var username = "kk@kk.kk";
        var password = "kksamoop";
        $scope.email = username;
        $scope.password = password;

        $scope.submit();

        // expect($scope.loggedIn).toEqual(true);
    });

    it('loggingInTest', function () {
        $scope.testingLogin = true;

        $scope.loginUser();
        // expect($scope.loggedIn).toEqual(true);
    });

    it('loggingInTestFailed', function () {
        $scope.loginError({});
    });

    it('loggingInInvalid', function () {
        var username = "kk@kk.kkk";
        var password = "kksamooppp";
        $scope.email = username;
        $scope.password = password;

        $scope.submit();
    });

    it('loggingInWithInvalidUsername', function () {
        var username = "";
        var password = "";
        $scope.email = username;
        $scope.password = password;

        $scope.submit();
    });

    it('checkPwTypedInvalid', function () {
        var username = "";
        var password = "";
        $scope.email = username;
        $scope.password = password;

        $scope.checkPwTyped();
        expect($scope.pwText).toEqual("Invalid Input");
    });

    it('checkPwTypeValid', function () {
        var username = "";
        var password = "1234567890";
        $scope.email = username;
        $scope.password = password;

        $scope.checkPwTyped();
        expect($scope.pwText).toEqual("Okay");
    });

    it('checkEmailTypedInvalid', function () {
        var username = "";
        var password = "";
        $scope.email = username;
        $scope.password = password;

        $scope.checkEmailTyped();
        expect($scope.emailText).toEqual("Invalid Input");
    });

    it('checkEmailTypedInvalid', function () {
        var username = "kk@kk.kk";
        var password = "";
        $scope.email = username;
        $scope.password = password;

        $scope.checkEmailTyped();
        expect($scope.emailText).toEqual("Okay");
    });
});

describe('RegController', function () {
    beforeEach(module('login', 'firebase'));
    var ctrl, firebase, $scope;

    beforeEach(inject(function ($controller, $firebaseArray) {
        $scope = {};
        ctrl = $controller('RegController', {
            $scope: $scope,
            $firebase: $firebaseArray
        })
    }));

    it('checkEmailTypeddInvalid', function () {
        $scope.emailReg = "kkkk";
        $scope.checkEmailTypedd();
    });

    it('checkEmailTypeddValid', function () {
        $scope.emailReg = "kk@kk.kk";
        $scope.checkEmailTypedd();
    });

    it('try to submit directly', function () {
        $scope.submit();
    });

    it('try to submit with values, but pw not same', function () {
        $scope.emailReg = "kk@kk.com";
        $scope.namee = "1234";
        $scope.nameee = "5678";
        $scope.passwordAgainReg = "pwpw";
        $scope.passwordReg = "pwpa";
        $scope.date = "2016-09-01";
        $scope.submit();
    });

    it('try to submit with values, but pw contains spaces', function () {
        $scope.emailReg = "kk@kk.com";
        $scope.namee = "1234";
        $scope.nameee = "5678";
        $scope.passwordAgainReg = "1  ";
        $scope.passwordReg = "1  ";
        $scope.date = "2016-09-01";
        $scope.submit();
    });

    it('try to submit with values, but pw contains spaces 2', function () {
        $scope.emailReg = "kk@kk.com";
        $scope.namee = "1234";
        $scope.nameee = "5678";
        $scope.passwordAgainReg = "1  ";
        $scope.passwordReg = "1  ";
        $scope.date = "2016-09-01";
        $scope.nofile = false;
        $scope.testingFile = false;
        
        $scope.submit();
    });

    it('try to submit with values, but miss inputs', function () {
        $scope.passwordAgainReg = "samkksamkksamkk";
        $scope.passwordReg = "samkksamkksamkk";
        $scope.nofile = false;
        $scope.testingFile = false;
        
        $scope.submit();
    });

    it('try to submit with values, but miss inputs 2', function () {
        $scope.emailReg = "kk@kk.com";
        $scope.namee = "1234";
        $scope.nameee = "5678";
        $scope.passwordAgainReg = "samkksamkksamkk";
        $scope.passwordReg = "samkksamkksamkk";

        $scope.nofile = false;
        $scope.testingFile = false;
        $scope.submit();
    });

    it('try to submit with values, pass', function () {
        $scope.emailReg = "kk@kk.com";
        $scope.namee = "1234";
        $scope.nameee = "5678";
        $scope.passwordAgainReg = "samkksamkksamkk";
        $scope.passwordReg = "samkksamkksamkk";
        $scope.date = "2016-09-01";
        $scope.submit();
    });

    it('try to submit with values, password not consistent', function () {
        $scope.emailReg = "kk@kk.com";
        $scope.namee = "1234";
        $scope.nameee = "5678";
        $scope.passwordAgainReg = "samkksamkksamkk";
        $scope.passwordReg = "samkksamkksamkkk";
        $scope.date = "2016-09-01";
        $scope.nofile = false;
        $scope.testingFile = false;
        
        $scope.submit();
    });

    it('create user', function () {
        $scope.emailReg = "kk@kk.com";
        $scope.namee = "1234";
        $scope.nameee = "5678";
        $scope.passwordAgainReg = "samkksamkksamkk";
        $scope.passwordReg = "samkksamkksamkk";
        $scope.date = "2016-09-01";
        $scope.nofile = true;
        $scope.createUser({});
    });

    it('create error', function () {
        $scope.emailReg = "kk@kk.com";
        $scope.namee = "1234";
        $scope.nameee = "5678";
        $scope.passwordAgainReg = "samkksamkksamkk";
        $scope.passwordReg = "samkksamkksamkk";
        $scope.date = "2016-09-01";
        $scope.nofile = true;

        $scope.createUserError({});
    });

    it('create error 2', function () {
        $scope.emailReg = "kk@kk.com";
        $scope.namee = "1234";
        $scope.nameee = "5678";
        $scope.passwordAgainReg = "samkksamkksamkk";
        $scope.passwordReg = "samkksamkksamkk";
        $scope.date = "2016-09-01";
        $scope.nofile = true;

        $scope.createUserError({ code: "auth/email-already-in-use" });
    });

    it('create error 3', function () {
        $scope.emailReg = "kk@kk.com";
        $scope.namee = "1234";
        $scope.nameee = "5678";
        $scope.passwordAgainReg = "samkksamkksamkk";
        $scope.passwordReg = "samkksamkksamkk";
        $scope.date = "2016-09-01";
        $scope.nofile = true;

        $scope.createUserError({ code: "auth/invalid-email" });
    });
});

describe('Global Funcs', function () {
    it('Check cur user', function () {
        checkCurUser();
    });

    it('popup fb login', function () {
        popupLogin();
    });

    it('preview image', function () {
        previewMethod({files: ["image"]});
    });

    it('change preview image', function () {
        changeImg();
    });

    it('want to register when logged in', function () {
        isLoggedIn = true;
        reger();
    });

    it('want to register when NOT logged in', function () {
        isLoggedIn = false;
        reger();
    });

    it('want to login with pw and email when logged in', function () {
        isLoggedIn = true;
        loginByEmailAndPw();
    });  

    it('want to login with pw and email when NOT logged in', function () {
        isLoggedIn = false;
        loginByEmailAndPw();
    });

    it('want to login with fb when logged in', function () {
        isLoggedIn = true;
        loginByFbCall();
    });  

    it('want to login with fb when NOT logged in', function () {
        isLoggedIn = false;
        loginByFbCall();
    });

    it('want to log out', function () {
        tester = "login";
        tester2 = "logout";
        logoutFunc();
    });

    it('want to log out while not in login state', function () {
        tester2 = "logoutt";
        logoutFunc();
    });

    it('normal sign out', function () {
        logoter();
    });

    it('Error sign not', function () {
        logoterError();
    });

    it('auth changes logged in', function () {
        stateChange({});
    });

    it('auth changes not logged in', function () {
        stateChange(null);
    });

    it('fb api error', function () {
        fbAPIError({});
    });

    it('fb api error with msg', function () {
        fbAPIError({code: "auth/popup-closed-by-user"});
    });

    it('test snap', function () {
        snap({numChildren() { return 0; } });
    });
});