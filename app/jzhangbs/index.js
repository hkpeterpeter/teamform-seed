// $(function () {
//   $('#myTab li:eq(1) a').tab('show');
// });

var app = angular.module("indexApp", ["firebase", "ngCookies"]);

app.controller("indexCtrl",
  function($scope, $firebaseArray, $firebaseObject, $cookies, $window) {

    if (checkLogin($cookies))
      gotoURL("/TXR/index.html", [], $window);

    initalizeFirebase();
    var ref = firebase.database().ref("usersx");
    accounts = $firebaseObject(ref);

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
          intro: "",
          img: "",
          tags: "",
          member: {},
          notif: []
        };
        userTemplate.password = user.password;
        accounts[user.username] = userTemplate;
        accounts.$save().then(function(ref){},function(e){console.log(e);});
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
          addUser({username:response.authResponse.userID, password:"facebook"});
          $cookies.put("username", response.authResponse.userID,{path:"/"});
          gotoURL("/TXR/index.html", [], $window);
        }
        else FB.login(function(response){
          if (response.status == "connected") {
            addUser({username:response.authResponse.userID, password:"facebook"});
            $cookies.put("username", response.authResponse.userID,{path:"/"});
            gotoURL("/TXR/index.html",[], $window);
          }
        });
      });
    };
  }
);

window.fbAsyncInit = function() {
    FB.init({
      appId      : '639941769518491',
      xfbml      : true,
      version    : 'v2.8'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
