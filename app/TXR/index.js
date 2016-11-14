var app = angular.module("mainApp", ["ngRoute", "firebase", "ngCookies"]);

initalizeFirebase();

app.config(function($routeProvider){
     $routeProvider.when("/",{templateUrl:"MyProfile.html"})

     .when("/MyNotifications",{templateUrl:"MyNotifications.html"})

     .when("/MyEvents/:p",{templateUrl:"MyEvents.html", controller:"EventController"})
     .when("/MyConversation/:p",{templateUrl:"MyConversations.html", controller:"ConversationController"});

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

app.controller("clickCtrl", function($scope, $firebaseObject, $firebaseArray) {
      // Implementation the todoCtrl
      $scope.new;
      var list_users=["ikari1","ikari2","shinji","van","andyw"];

      $scope.users = $firebaseObject(firebase.database().ref("users")); //before: $firebaseArray

      $scope.selected = $firebaseObject(firebase.database().ref("selected"));   // .selected[0]: selected

      $scope.tag = $firebaseObject(firebase.database().ref("tag"));

      var ref_teamtag = firebase.database().ref("teamtags");
      $scope.currentTag = $firebaseArray(ref_teamtag);
      $scope.resultTag = [];
      //users filtered by the tags, initialized with $scope.users
      $scope.filtered = $firebaseObject(firebase.database().ref("filtered"));

      $scope.filtered.ikari1={"name":"ikari","intro":"My hands stuck to my face again!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["cpp","java","sql"]};
      $scope.filtered.shinji={"name":"shinji","intro":"I am not a pussy","img":"./img/shinji.jpg","select":"glyphicon glyphicon-unchecked","tag":["angularjs","html","css","sql"]};
      $scope.filtered.ikari2={"name":"ikari","intro":"someone make me my sandwich!","img":"./img/ikari.jpg","select":"glyphicon glyphicon-unchecked","tag":["firebase","css"]};
      $scope.filtered.van={"name":"van","intro":"ddf","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["html","sql"]};
      $scope.filtered.andyw={"name":"andy","intro":"boxing","img":"./img/na.jpg","select":"glyphicon glyphicon-unchecked","tag":["javascript","sql"]};
      $scope.filtered.$save();

      //add current tag to chosen tag
      $scope.reset = function(index){
        var key;
        $scope.resultTag.push($scope.currentTag[index]);
        var temp = $scope.currentTag;
        $scope.currentTag = [];
        for(var i = 0;i < temp.length;i++){
          if(i != index){
            $scope.currentTag.push(temp[i]);
          }
        }

        //filtered: if user does not have tag, remove the user
        angular.forEach($scope.filtered, function(value,key){
          if($scope.filtered[key].tag.indexOf(temp[index].$value) === -1){
            delete $scope.filtered[key];
          }
        });
        $scope.filtered.$save();
      };
      //delete from chosen tag and move to current tag
      $scope.delete = function(index){
        var temp = $scope.resultTag;

        $scope.resultTag = [];
        for(var i = 0;i < temp.length;i++){
          if(i != index){
            $scope.resultTag.push(temp[i]);
          }
          else{
            $scope.currentTag.push(temp[i]);
          }
        };

        //filtered: add all users, then filter with tags

        angular.forEach($scope.users, function(value,key){
          $scope.filtered[key] = $scope.users[key];
        });
        //filter the users
        for (var i=0; i<$scope.resultTag.length; i++){
          angular.forEach($scope.filtered, function(value,key){
            if($scope.filtered[key].tag.indexOf($scope.resultTag[i].$value) === -1){
              delete $scope.filtered[key];
            }
          });
        }
        $scope.filtered.$save();

      };


      $scope.clickButton = function(event) {
        var username = event.target.id;
        //alert(event.target.id);
        if ($scope.users[username].select == "glyphicon glyphicon-check"){
          //alert(event.target.id+' before: check');

              $scope.users[username].select = "glyphicon glyphicon-unchecked";
              $scope.users.$save();
              
              delete $scope.selected[username];
              //alert("change to uncheck");
            $scope.selected.$save();
            //put at last in case username not in filtered
            $scope.filtered[username].select = "glyphicon glyphicon-unchecked";
              $scope.filtered.$save();
          }
          else if ($scope.users[username].select == "glyphicon glyphicon-unchecked"){
              //alert(event.target.id+' before: uncheck');
              $scope.users[username].select = "glyphicon glyphicon-check";
              $scope.users.$save();
              

              $scope.selected[username]=$scope.users[username];
              //alert("change to check");
            $scope.selected.$save();

            //put at last in case username is not in filtered
          $scope.filtered[username].select = "glyphicon glyphicon-check";
            $scope.filtered.$save();  
            
          }


      };

  });

