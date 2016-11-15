var app = angular.module("mainApp", ["ngRoute", "firebase", "ngCookies"]);

//initalizeFirebase();

app.config(function($routeProvider){
     $routeProvider.when("/",{templateUrl:"MyProfile.html"})

     .when("/MyNotifications",{templateUrl:"MyNotifications.html"})

     .when("/MyEvents/:p",{templateUrl:"MyEvents.html", controller:"EventController"})
     .when("/MyConversation/:p",{templateUrl:"MyConversations.html", controller:"ConversationController"});

});



app.controller("EventController",function($scope,$routeParams){
        //   $scope.param = $routeParams.p;
            $scope.IsVisibleCOMP3111 = false;
            $scope.IsVisibleCOMP3511 = false;
            $scope.IsVisibleCOMP2012 = false;
  //          $scope.show=function(a){
        //       $scope.IsVisibleCOMP3111 = angular.equals($scope.param, a);
      //      }
          $scope.IsVisibleCOMP3111 = angular.equals($routeParams.p, 'COMP3111');
          $scope.IsVisibleCOMP3511 = angular.equals($routeParams.p, 'COMP3511');
          $scope.IsVisibleCOMP2012 = angular.equals($routeParams.p, 'COMP2012');


});
app.controller("ConversationController",function($scope,$routeParams){
        //   $scope.param = $routeParams.p;
            $scope.IsVisiblePeter = false;
            $scope.IsVisibleJason = false;
            $scope.IsVisibleKevin = false;
  //          $scope.show=function(a){
        //       $scope.IsVisibleCOMP3111 = angular.equals($scope.param, a);
      //      }
         $scope.IsVisiblePeter = angular.equals($routeParams.p, 'Peter');
          $scope.IsVisibleJason = angular.equals($routeParams.p, 'Jason');
          $scope.IsVisibleKevin = angular.equals($routeParams.p, 'Kevin');


});


app.controller("NotificationController", function($scope){
			$scope.userList=[
      				{ Name: "Peter", type: "Invitation", Info: ""},
      				{ Name: "Jason", type: "Application", Info: ""},
      				{ Name: "Kevin", type: "Information", Info: ""}
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
      		$scope.userList[i].Info="Someone left the team.";
      	}
      }

      $scope.whetherfromteam=function(user){
            if($scope.userList[user].type=="Information"){
              return false;
            }
            return true;
      }

      $scope.removeuser=function(user){
       			$scope.userList.splice(user,1);
      }



   /*   $scope.adduser=function(){

      }*/
  });

