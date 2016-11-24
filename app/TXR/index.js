var app = angular.module("mainApp", ["ngRoute", "firebase", "ngCookies"]);

//initalizeFirebase();

app.config(function($routeProvider){
     $routeProvider.when("/",{templateUrl:"MyProfile.html", controller:"profileController"})

     .when("/MyNotifications",{templateUrl:"MyNotifications.html"})

     .when("/MyEvents/:p",{templateUrl:"MyEvents.html", controller:"EventController"})
     .when("/MyConversation/:p",{templateUrl:"MyConversations.html", controller:"ConversationController"});

});



    app.controller("sidebarController",function($scope, $firebaseArray,$firebaseObject,$cookies){
  //var thisuser=$cookies.get("username",{path:"/"});
  var thisuser="kimsung";
  var userlist = $firebaseObject(firebase.database().ref("userList"));
  userlist.$loaded(function() {
     $scope.eventlist=userlist[thisuser]["Membership"];
  })
  

 
 





});

app.controller("EventController",function($scope,$routeParams,$firebaseObject, $firebaseArray){

      $scope.eventname = $routeParams.p;
      $scope.photolist = [];
      var i;
       var thisuser = "kimsung";
       var userlist = $firebaseObject(firebase.database().ref("userList"));
       var eventlist = $firebaseObject(firebase.database().ref("eventList"));
      userlist.$loaded(function() {
       $scope.identity = userlist[thisuser]["Membership"][$scope.eventname]["identity"];
       $scope.leader = angular.equals($scope.identity, 'leader');
       $scope.member = angular.equals($scope.identity, 'member');
       $scope.user = angular.equals($scope.identity, 'user');
       $scope.teamname = userlist[thisuser]["Membership"][$scope.eventname]["team"];
       })
     
      eventlist.$loaded(function(){
       $scope.event = eventlist[$scope.eventname];
       $scope.team = eventlist[$scope.eventname]["TeamList"][$scope.teamname];
       $scope.teamskills = eventlist[$scope.eventname]["TeamList"][$scope.teamname]["Skills"];
       $scope.memberlist = eventlist[$scope.eventname]["TeamList"][$scope.teamname]["MemberList"];

      })

      $scope.deletemember = function(i){
        
          
            
            eventlist[$scope.eventname]["TeamList"][$scope.teamname]["MemberList"].splice(i,1);
            eventlist.$save();
         
        
     
      }

   

      // $scope.getimg=function(num,member){
      //   var photo;
      //   userlist.$loaded(function() {
      //     photo=userlist[member]["Img"];
      //  })
      //       return photo;
      // }

      




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
      	else $scope.userList[i].Info="Someone left the team.";

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

app.controller("clickCtrl",
    function($scope, $firebaseObject, $firebaseArray, $cookies) {
      // Implementation the todoCtrl
      var event_name = "comp3111";
      var this_user = $cookies.get("username",{path:"/"});//"iamauthur";
      var user_list = $firebaseObject(firebase.database().ref("userList"));
      var event_list = $firebaseObject(firebase.database().ref("eventList"));
      var conversation = $firebaseObject(firebase.database().ref("conversation"));
      //don't put the reference on the $scope until $loaded is done.
      //initialize the variables and scope
      var user_event1;
      $scope.hideMember = "glyphicon glyphicon-unchecked";
      $scope.users = {};
      $scope.filtered = {};
      $scope.selected = {};
      $scope.currentTag = [];
      $scope.resultTag = [];
      $scope.tag={};
      user_list.$loaded(function() {
        event_list.$loaded(function(){
          conversation.$loaded(function(){
            //alert($scope.users["iamauthur"]["name"]);
            user_event1 = event_list[event_name]["inEventUser"];
            $scope.event1 = event_list[event_name];
            //alert($scope.event1["skills"]["angular"]);
            for (var i=0; i<user_event1.length; i++) {
              var user_name = user_event1[i];
              //only show users not in a team, also hide the user himself/herself
              if(user_list[user_name]["Membership"][event_name]["identity"] === "user" &&
                user_name !== this_user){
                $scope.users[user_name] = user_list[user_name];
                $scope.users[user_name]["select"] = "glyphicon glyphicon-unchecked";
                $scope.filtered[user_name] = user_list[user_name];
                $scope.filtered[user_name]["select"] = "glyphicon glyphicon-unchecked";
              }
            }
            //alert(event_list["event1"]);
            $scope.tag = event_list[event_name]["skills"];
            angular.forEach($scope.tag, function(value,key){
              $scope.currentTag.push(key);
            });
            
            
            //suggested users for leaders
            $scope.suggested = [];
            var suggested_users = {};
            //1. users in this event, not in teams, not the user himself/herself => $scope.users
            //user_list.$loaded(function() {});
            var team_name = user_list[this_user]["Membership"][event_name]["teamName"];
            //alert(team_name);
            var requirements = event_list[event_name]["teamList"][team_name]["requirement"];
            //2. count the number of requirements the users fulfilled 
            angular.forEach($scope.users, function(value,key){
              var fulfill = 0;
              for (var i = 0; i<requirements.length; i++) {
                  //alert("requirement[i]= "+requirements[i]+" skills= "+$scope.users[key]["skills"]);
                if ($scope.users[key]["skills"].indexOf(requirements[i]) != -1){
                  fulfill += 1;
                } 
              }
              // $scope.suggested["2"] = [{userobject},{userobject}...]
              if (!(fulfill.toString() in suggested_users)){
                suggested_users[fulfill.toString()]=[];
              }
              //alert("fulfill= "+fulfill+" user= "+key);
              suggested_users[fulfill.toString()].push($scope.users[key]);
            });
            //alert(suggested_users["1"].length);
            for (var i = requirements.length; i>0 ;i--) {
              var str_i = i.toString();
              if (str_i in suggested_users){
                for (var j=0; j < suggested_users[str_i].length; j++){
                  //extend the users to $scope.suggested
                  $scope.suggested.push(suggested_users[str_i][j]);
                }
              }
            }
            
            
          });
        });
      });


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
          if($scope.filtered[key].skills.indexOf(temp[index]) === -1){
            delete $scope.filtered[key];
          }
        });
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
            if($scope.filtered[key].skills.indexOf($scope.resultTag[i]) === -1){
              delete $scope.filtered[key];
            }
          });
        }
      };


      $scope.clickButton = function(event) {
        var username = event.target.id;
        //alert(event.target.id);
        if ($scope.users[username].select == "glyphicon glyphicon-check"){
          //alert(event.target.id+' before: check');
              $scope.users[username].select = "glyphicon glyphicon-unchecked";
              delete $scope.selected[username];
            //put at last in case username not in filtered
            $scope.filtered[username].select = "glyphicon glyphicon-unchecked";
          }
          //must use else if. only use if: both cases might be run
          else if ($scope.users[username].select == "glyphicon glyphicon-unchecked"){
              //alert(event.target.id+' before: uncheck');
              $scope.users[username].select = "glyphicon glyphicon-check";
              $scope.selected[username]=$scope.users[username];
            //put at last in case username is not in filtered
          $scope.filtered[username].select = "glyphicon glyphicon-check";
          }
      };

      $scope.sendInvitation = function(message){
        //for each user selected
        var keep_going = true;
        var alert_content = "Invitation(s) have been sent";
        angular.forEach($scope.selected, function(value,key){

            //1. conversation
            //if conversation does not exist, create a new one
            var conversation_name = key + "_" + this_user;
            if (!(conversation_name in conversation)) {
              conversation[conversation_name]={
                "event":"",
                "log":[],
                "type":"invite"
              };
            };

            if ( conversation[conversation_name]["type"] !== "invite") {
              //change alert_content
              alert_content="You have already got a request from user: "+user_list[key]["name"]+", please check the request first. This invitation will not be sent unless you deal with the request.";
              keep_going = false;
           };

          if(keep_going){
            conversation[conversation_name]["event"]=event_name;
            var one_log = {};
            one_log["message"] = message;
            one_log["sender"] = this_user;
            conversation[conversation_name]["log"].push(one_log);
            conversation.$save();
            //2. notification in userList
            var one_noti = {};
            one_noti["isRead"] = false;
            one_noti["link"] = "some_link";
            one_noti["message"] = message;
            if (!("notification" in user_list[key])) {
              user_list[key]["notification"]=[];
            }
            user_list[key]["notification"].push(one_noti);
            user_list.$save();
         }
        });
        alert(alert_content);

      };

    }
);

app.controller("profileController",function($scope,$routeParams,$firebaseObject){
	  var event_name = $routeParams.p;
      var this_user = "iamauthur";
      $scope.user_list = $firebaseObject(firebase.database().ref("userList"));
      $scope.event_list = $firebaseObject(firebase.database().ref("eventList"));
      var conversation = $firebaseObject(firebase.database().ref("conversation"));
}
);