var app = angular.module("mainApp", ["ngRoute", "firebase", "ngCookies"]);

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

app.controller("NotificationController", function($scope){
			$scope.userList=[
      				{ Name: "O(n^3) is not that slow", type: "Invitation", Info: ""},
      				{ Name: "Andy", type: "Application", Info: ""}, 
      				{ Name: "Your team", type: "Information", Info: ""}
       ];
      var i;
      for(i=0; i<$scope.userList.length; ++i){
      	if($scope.userList[i].type=="Invitation"){
      		$scope.userList[i].Info="He invites you into the team.";
      	}
      	else if($scope.userList[i].type=="Application"){
      		$scope.userList[i].Info="He wants to join your team.";
      	}
      	else if($scope.userList[i].type=="Information"){
      		$scope.userList[i].Info="He left the team.";
      	}
      }
      
      $scope.removeuser=function(user){
       			$scope.userList.splice(user,1);
      }
  });
   

