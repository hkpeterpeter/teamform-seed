var app = angular.module("mainApp", ["ngRoute"]);

app.config(function($routeProvider){
     $routeProvider.when("/",{templateUrl:"MyProfile.html"})

     .when("/MyNotifications",{templateUrl:"MyNotifications.html"})

     .when("/MyEvents/:p",{templateUrl:"MyEvents.html", controller:"paramCtrl"})
     .when("/MyConversation/:p",{templateUrl:"MyConversations.html", controller:"paramCtrl"});

});

app.controller("searchController",function($scope){
 $scope.searchType = "Search Team";
 $scope.setSearchT = function(){
   $scope.searchType = "Search Team";
 };
 $scope.setSearchP = function(){
   $scope.searchType = "Search Person";
 };
 $scope.setSearchE = function(){
   $scope.searchType = "Search Event";
 };
});

app.controller("paramCtrl", function($scope, $routeParams){
$scope.param = $routeParams.p;
});
