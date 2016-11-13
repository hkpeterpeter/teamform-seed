// $(function () {
//   $('#myTab li:eq(1) a').tab('show');
// });

var app = angular.module("indexApp", ["firebase", "ngCookies"]);

app.controller("indexCtrl",
  function($scope, $firebaseArray, $timeout, $cookies, $window) {

    if (checkLogin($cookies))
      gotoURL("/profile.html", [{key:"username",value:$cookies.get("username")}], $window);

    initalizeFirebase();
    var ref = firebase.database().ref("accounts");
    accounts = $firebaseArray(ref);

    $scope.login = function() {
      var loginUser;
      for (i = 0; i < accounts.length; i++) {
        if ($scope.inputEmail == accounts[i].username && $scope.inputPassword == accounts[i].password)
          loginUser = $scope.inputEmail;
      }
      if (loginUser !== undefined) {
        $cookies.put("username",loginUser);
        gotoURL("../TXR/index.html", [], $window);
      }
    };

    $scope.rememberMe = false;

    var addUser = function(user) {
      for (i = 0; i < accounts.length; i++)
        if (user.username == accounts[i].username) return;
      accounts.$add(user);
    };

    $scope.reg = function() {
      if ($scope.inputEmailReg !== undefined && $scope.inputEmailReg !== "" &&
          $scope.inputPasswordReg !== undefined && $scope.inputPasswordReg !== "" &&
          $scope.inputConfirmPasswordReg !== undefined && $scope.inputConfirmPasswordReg !== "" &&
          $scope.inputConfirmPasswordReg == $scope.inputPasswordReg) {

        newAcc = {username: $scope.inputEmailReg, password: $scope.inputPasswordReg};
        addUser(newAcc);
      }
    };

    $scope.loginFB = function() {
      FB.getLoginStatus(function(response) {
        if (response.status == "connected") {
          addUser({username:response.authResponse.userID, password:"facebook"});
          $cookies.put("username", response.authResponse.userID);
          gotoURL("/profile.html", [{key:"username",value:response.authResponse.userID}], $window);
        }
        else FB.login(function(response){
          if (response.status == "connected") {
            addUser({username:response.authResponse.userID, password:"facebook"});
            $cookies.put("username", response.authResponse.userID);
            gotoURL("/profile.html", [{key:"username",value:response.authResponse.userID}], $window);
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
