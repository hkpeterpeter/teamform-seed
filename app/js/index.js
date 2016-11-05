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
      for (var i in accounts) {
        if ($scope.inputEmail == accounts[i].username && $scope.inputPassword == accounts[i].password)
          loginUser = $scope.inputEmail;
      }
      if (loginUser !== undefined) {
        $cookies.put("username",loginUser);
        gotoURL("/profile.html", [{key:"username",value:$cookies.get("username")}], $window);
      }
    };

    $scope.rememberMe = false;

    $scope.reg = function() {
      if ($scope.inputEmailReg !== undefined && $scope.inputEmailReg !== "" &&
          $scope.inputPasswordReg !== undefined && $scope.inputPasswordReg !== "" &&
          $scope.inputConfirmPasswordReg !== undefined && $scope.inputConfirmPasswordReg !== "" &&
          $scope.inputConfirmPasswordReg == $scope.inputPasswordReg) {

        for (var i in accounts)
          if ($scope.inputEmailReg == accounts[i].username) return;
        newAcc = {username: $scope.inputEmailReg, password: $scope.inputPasswordReg};
        accounts.$add(newAcc);
      }
    };
  }
);
