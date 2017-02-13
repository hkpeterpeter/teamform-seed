// $(function () {
//   $('#myTab li:eq(1) a').tab('show');
// });

var testData = {
  "abcd": {password: "1"},
  "1856889751213495": {password: "facebook"},
  "$save": function(){return true;}
};
var onFBChkLogFin = function(){};
var isTest = false;

var app = angular.module("indexApp", ["firebase", "ngCookies"]);

app.controller("indexCtrl",
  function($scope, $firebaseArray, $firebaseObject, $cookies, $window) {

    if (checkLogin($cookies))
      gotoURL("/TXR/index.html", [], $window);

    var accounts;
    if (isTest == false) {
      initalizeFirebase();
      var ref = firebase.database().ref("userList");
      accounts = $firebaseObject(ref);
    }
    else {
      accounts = testData;
    }

    $scope.scopeUser = accounts;

    $scope.login = function() {
      var loginUser;
      if ( accounts[$scope.inputUsername] !== undefined && accounts[$scope.inputUsername].password == $scope.inputPassword )
        loginUser = $scope.inputUsername;
      if (loginUser !== undefined) {
        $cookies.put("username",loginUser,{path:"/"});
        gotoURL("/TXR/index.html", [], $window);
      }
    };

    //$scope.rememberMe = false;

    var addUser = function(user) {
      if (accounts[user.username] === undefined){
        var userTemplate = {
          password: "",
          personalWebsite: "N/A",
          email: "N/A",
          introduction: "no introduction",
          img: "https://firebasestorage.googleapis.com/v0/b/teamform-ad42e.appspot.com/o/user%2Ftext.jpg?alt=media&token=d621a6d7-9f5d-4bdb-b758-c67407460e2a",
          skills: [],
          Membership: {},
          notification: [],
          name: user.username
        };
        userTemplate.password = user.password;
        accounts[user.username] = userTemplate;
        accounts.$save();
      }
    };

    $scope.reg = function() {
      if ($scope.inputUsernameReg !== undefined && $scope.inputUsernameReg !== "" &&
          $scope.inputPasswordReg !== undefined && $scope.inputPasswordReg !== "" &&
          $scope.inputConfirmPasswordReg !== undefined && $scope.inputConfirmPasswordReg !== "" &&
          $scope.inputConfirmPasswordReg == $scope.inputPasswordReg) {

        newAcc = {username: $scope.inputUsernameReg, password: $scope.inputPasswordReg};
        addUser(newAcc);
      }
    };

    $scope.loginFB = function() {
      FB.getLoginStatus(function(response) {
        if (response.status == "connected") {
          onFBChkLogFin();
          addUser({username:response.authResponse.userID, password:"facebook"});
          $cookies.put("username", response.authResponse.userID,{path:"/"});
          gotoURL("/TXR/index.html", [], $window);
        }
        else {
          FB.login(function(response){
            if (response.status == "connected") {
              addUser({username:response.authResponse.userID, password:"facebook"});
              $cookies.put("username", response.authResponse.userID,{path:"/"});
              gotoURL("/TXR/#",[], $window);
            }
          });
          onFBChkLogFin();
        }
      });
    };
  }
);

var onFBInitFin = function(){};
window.fbAsyncInit = function() {
    FB.init({
      appId      : '639941769518491',
      xfbml      : true,
      version    : 'v2.8'
    });

    onFBInitFin();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
