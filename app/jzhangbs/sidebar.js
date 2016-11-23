app.controller("sidebarCtrl", function($scope, $firebaseObject, Search){
  $scope.startSearch = Search;
});

app.controller("switchView",function($scope,Search){
  $scope.Search = Search;
});
