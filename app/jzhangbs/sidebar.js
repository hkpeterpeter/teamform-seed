app.controller("sidebarCtrl", function($scope, $firebaseObject, Search, $cookies, $window){
  if (checkLogin($cookies) == false){
    gotoURL("/jzhangbs/index.html",[],$window);
  }
  $scope.startSearch = Search;
});

app.controller("switchView",function($scope,Search){
  $scope.Search = Search;
});
