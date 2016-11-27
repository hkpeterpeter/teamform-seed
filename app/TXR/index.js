var app = angular.module("mainApp", ["ngRoute", "firebase", "ngCookies","chart.js",'ui-notification']);

//initalizeFirebase();

app.config(function($routeProvider,NotificationProvider){
     $routeProvider.when("/",{templateUrl:"MyProfile.html", controller:"profileController"})

     .when("/MyNotifications",{templateUrl:"MyNotifications.html"})

     .when("/MyEvents/:p",{templateUrl:"MyEvents.html", controller:"EventController"})
     .when("/MyConversation/:p",{templateUrl:"MyConversations.html", controller:"ConversationController"});
	 NotificationProvider.setOptions({
            delay: 5000,
            startTop: 60,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top',
			closeOnClick:true
        });
});



    app.controller("sidebarController",function($scope, $firebaseArray,$firebaseObject,Search,$cookies){
  var thisuser=$cookies.get("username",{path:"/"});
  // var thisuser="kimsung";
  var userlist = $firebaseObject(firebase.database().ref("userList"));
  var conversationList = $firebaseObject(firebase.database().ref("conversation"));
  $scope.convList = [];
  $scope.linkList = [];
  userlist.$loaded(function() {
    conversationList.$loaded(function(){
      $scope.eventlist=userlist[thisuser]["Membership"];
      angular.forEach(conversationList,function(value,key){
        names = key.split("_");
        if (names[0] == thisuser) {
          $scope.convList.push(names[1]);
          $scope.linkList.push(key);
        }
        if (names[1] == thisuser) {
          $scope.convList.push(names[0]);
          $scope.linkList.push(key);
        }
      });
    });
  });









});

app.controller("EventController",function($scope,$routeParams,$firebaseObject, $firebaseArray, $cookies){

      $scope.eventname = $routeParams.p;
      $scope.photolist = [];
      var x;
      var y;
      var team;
       var thisuser = $cookies.get("username",{path:"/"});
       var userlist = $firebaseObject(firebase.database().ref("userList"));
       var eventlist = $firebaseObject(firebase.database().ref("eventList"));
       userlist.$loaded(function() {
       $scope.identity = userlist[thisuser]["Membership"][$scope.eventname]["identity"];
       $scope.leader = angular.equals($scope.identity, 'leader');
       $scope.member = angular.equals($scope.identity, 'member');
       $scope.user = angular.equals($scope.identity, 'user');
       $scope.teamname = userlist[thisuser]["Membership"][$scope.eventname]["teamName"];

     //  team="L1";
       })

      eventlist.$loaded(function(){
       $scope.event = eventlist[$scope.eventname];
       $scope.team = eventlist[$scope.eventname]["teamList"][$scope.teamname];
       $scope.teamskills = eventlist[$scope.eventname]["teamList"][$scope.teamname]["skills"];
       $scope.memberlist = eventlist[$scope.eventname]["teamList"][$scope.teamname]["memberList"];
       $scope.Leader = eventlist[$scope.eventname]["teamList"][$scope.teamname]["leader"];

      })

      $scope.deletemember = function(i){


            var membertodelete=eventlist[$scope.eventname]["teamList"][$scope.teamname]["memberList"][i];
            eventlist[$scope.eventname]["teamList"][$scope.teamname]["memberList"].splice(i,1);
            eventlist.$save();
            userlist[membertodelete]["Membership"][$scope.eventname]["identity"]="user";
            userlist[membertodelete]["Membership"][$scope.eventname]["teamName"]="Null";
            userlist.$save();



      }

      $scope.deleteteam = function(){



            delete eventlist[$scope.eventname]["teamList"][$scope.teamname];
            eventlist.$save();
            userlist[thisuser]["Membership"][$scope.eventname]["identity"] = "user";
            userlist[thisuser]["Membership"][$scope.eventname]["teamName"] = "Null";
            userlist.$save();
      }

    $scope.quitevent = function(){
       delete userlist[thisuser]["Membership"][$scope.eventname];
       userlist.$save();
        for (x=0;x<eventlist[$scope.eventname]["inEventUser"].length;x++){
          if (eventlist[$scope.eventname]["inEventUser"][x]==thisuser){
            eventlist[$scope.eventname]["inEventUser"].splice(x,1);
       }
   }
        eventlist.$save();
     }

     $scope.quitteam = function(){
            userlist[thisuser]["Membership"][$scope.eventname]["identity"]="user";
            userlist[thisuser]["Membership"][$scope.eventname]["teamName"]="Null";
            userlist.$save();
            for (y=0;y<eventlist[$scope.eventname]["teamList"][$scope.teamname]["memberList"].length;y++){
              if (eventlist[$scope.eventname]["teamList"][$scope.teamname]["memberList"][y]==thisuser){
                 eventlist[$scope.eventname]["teamList"][$scope.teamname]["memberList"].splice(y,1);}
          }
          eventlist.$save();
     }
     $scope.deletetag = function(i){
       delete eventlist[$scope.eventname]["teamList"][$scope.teamname]["skills"][i];
       eventlist.$save();
     }



          $scope.createteam = function(newteamname,introduction,teamWebsite){

      //    var alert_content = "Your team has been created";

            //if (!(teamname in eventlist[$scope.eventname]["teamList"])) {

              eventlist[$scope.eventname]["teamList"][newteamname]={
                     "leader": thisuser,
                     "introduction": introduction,
                     "teamWebsite": teamWebsite,
                     "memberList":[thisuser]
              };

              eventlist.$save();

            userlist[thisuser]["Membership"][$scope.eventname]["identity"] = "leader";
            userlist[thisuser]["Membership"][$scope.eventname]["teamName"] = newteamname;
            userlist.$save();
           //}
        //    else{
          //      alert_content = "This name has been used in this event. Please change to another one"
            //};

        // alert(alert_content);
          }

    $scope.editteaminfo = function(teamWebsite){
      eventlist[$scope.eventname]["teamList"][$scope.teamname]["teamWebsite"] = teamWebsite;
      eventlist.$save();
    }

    $scope.editteamintro = function(introduction){
      eventlist[$scope.eventname]["teamList"][$scope.teamname]["introduction"] = introduction;
      eventlist.$save();
    }
    $scope.editteamskills = function(teamskills){

      eventlist[$scope.eventname]["teamList"][$scope.teamname]["skills"]=teamskills.split(",");
       eventlist.$save();

    }


      var storageRef = firebase.storage().ref()
      eventlist.$loaded(function(){

        var avaFilenameevent = eventlist[$scope.eventname]["img"];

        var eventavaRef = storageRef.child('event/'+avaFilenameevent);

        eventavaRef.getMetadata().then(function(metadata){
          $scope.eventavaUrl = metadata.downloadURLs[0];

					$scope.$apply();
        });

      });

      eventlist.$loaded(function(){


        var avaFilenameteam = eventlist[$scope.eventname]["teamList"][$scope.teamname]["img"];

        var teamavaRef = storageRef.child('team/'+$scope.eventname+'/'+avaFilenameteam);

       teamavaRef.getMetadata().then(function(metadata){
          $scope.teamavaUrl = metadata.downloadURLs[0];

				$scope.$apply();
       });
      });

      //  userlist.$loaded().then(function(){

      //   var avaFilenamemember = userlist[$scope.memberlist[0]]["img"];

      //   var memberavaRef = storageRef.child('user/'+avaFilenamemember);

      //   memberavaRef.getMetadata().then(function(metadata){
      //     $scope.memberavaUrl = metadata.downloadURLs[0];

			// 		$scope.$apply();
      //   });

      // });

   //   $scope.kkk=new Array(5);
      var memberavaUrl;
      userlist.$loaded(function(){
         eventlist.$loaded(function(){
           $scope.memberphoto = {};
           var loadedCount = 0;
           for (z=0;z<$scope.memberlist.length;z++){
            var kk=eventlist[$scope.eventname]["teamList"][$scope.teamname]["memberList"][z];
            var avaFilenamemember = userlist[kk]["img"];

            var memberavaRef = storageRef.child('user/'+avaFilenamemember);
         memberavaRef.getMetadata().then(function(metadata){
           loadedCount ++;
          memberavaUrl = metadata.downloadURLs[0];
          $scope.memberphoto[metadata.customMetadata.user]=memberavaUrl;
				   if( loadedCount == $scope.memberlist.length) $scope.$apply();
        });

           }

          })
      });







});

app.controller("NotificationController", function($scope, $firebaseObject, $firebaseArray, $cookies){

    $scope.user=$cookies.get("username",{path:"/"});
    $scope.photolist = {};
    var userlist = $firebaseObject(firebase.database().ref("userList"));
    userlist.$loaded(function(){
        $scope.notification = userlist[$scope.user]["notification"];
    })


    $scope.deletenotification = function(sendername){
         delete userlist[$scope.user]["notification"][sendername];
         userlist.$save();
    }

    $scope.addnotification = function(sender,msg){
        for(var i=0; i<$scope.notification.length(); i++){
          if($scope.notification[i].name==sender){
            $scope.deletenotification(sender);
          }
        }
        userlist[$scope.user]["notification"][sender]={
          "message":msg,
          "name":sender
        }
        userlist.$save();
    }

      var loadedCount = 0;
      var i;
      var storageRef = firebase.storage().ref();
      var notificationNum = 0;
      userlist.$loaded(function(){
        angular.forEach($scope.notification,function(){notificationNum++;});
        angular.forEach($scope.notification,function(value, key){
        //var nameOfSender = $scope.notification[key]["name"];
        var nameOfPhoto = userlist[key]["img"];
        var fullName = storageRef.child('user/'+ nameOfPhoto);
        fullName.getMetadata().then(function(metadata){
              loadedCount ++;
              var photoUrl = metadata.downloadURLs[0];
              $scope.photolist[key] = photoUrl;
              //var newIn = { $scope.notification[i]["name"]: photoUrl};
              //photo.push(newIn);
             if( loadedCount == notificationNum) $scope.$apply();  
        //});
        })
      });

      });
      


    





			// $scope.userList=[
   //    				{ Name: "Peter", type: "Invitation", Info: ""},
   //    				{ Name: "Jason", type: "Application", Info: ""},
   //    				{ Name: "Kevin", type: "Information", Info: ""}
   //     ];
   //    var i;
   //    for(i=0; i<$scope.userList.length; ++i){
   //    	if($scope.userList[i].type=="Invitation"){
   //    		$scope.userList[i].Info="He invites you into the team.";
   //    	}
   //    	else if($scope.userList[i].type=="Application"){
   //    		$scope.userList[i].Info="He wants to join your team.";
   //    	}
   //    	else $scope.userList[i].Info="Someone left the team.";

   //    }

   //    $scope.whetherfromteam=function(user){
   //          if($scope.userList[user].type=="Information"){
   //            return false;
   //          }
   //          return true;
   //    }

   //    $scope.removeuser=function(user){
   //     			$scope.userList.splice(user,1);
   //    }



   /*   $scope.adduser=function(){
      }*/
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

app.controller("clickCtrl",
    function($scope, $firebaseObject, $firebaseArray, $cookies, $routeParams) {
      // Implementation the todoCtrl
      var event_name = $routeParams.p;// .toLowerCase(); "comp3111"
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
      $scope.leader = false;
      $scope.member = false;
      $scope.user = false;

      //$scope.tag={};
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
            for(var i=0; i< event_list[event_name]["inEventUser"].length; i++){
              var temp_username = event_list[event_name]["inEventUser"][i];
              for (var j=0;  j < user_list[temp_username]["skills"].length; j++){
                var temp_tag = user_list[temp_username]["skills"][j];
                if ($scope.currentTag.indexOf(temp_tag) == -1){
                  $scope.currentTag.push(temp_tag);
                }
              }

            };

            var user_identity = user_list[this_user]["Membership"][event_name]["identity"];
            $scope.leader = angular.equals(user_identity, 'leader');
            $scope.member = angular.equals(user_identity, 'member');
            $scope.user = angular.equals(user_identity, 'user');
            //suggested users for leaders
            $scope.suggested = [];
            var suggested_users = {};
            $scope.suggested_teams=[];
            var suggested_teams = {};
            //alert("I am a "+user_identity+" in event: "+event_name);
            if (user_identity === "leader"){
              //1. users in this event, not in teams, not the user himself/herself => $scope.users
              //user_list.$loaded(function() {});
              var team_name = user_list[this_user]["Membership"][event_name]["teamName"];
              var team_skills = event_list[event_name]["teamList"][team_name]["skills"];
              //2. count the number of requirements the users fulfilled
              angular.forEach($scope.users, function(value,key){
                var fulfill = $scope.users[key]["skills"].length;
                for (var i = 0; i<team_skills.length; i++) {
                    //alert("requirement[i]= "+requirements[i]+" skills= "+$scope.users[key]["skills"]);
                  if ($scope.users[key]["skills"].indexOf(team_skills[i]) != -1){
                    fulfill -= 1;
                  }
                }

                // $scope.suggested["2"] = [{userobject},{userobject}...]
                if (!(fulfill.toString() in suggested_users)){
                  suggested_users[fulfill.toString()]=[];
                }
                //alert("fulfill= "+fulfill+" user= "+key);
                suggested_users[fulfill.toString()].push($scope.users[key]);
                suggested_users[fulfill.toString()][suggested_users[fulfill.toString()].length-1]["username"] = key;
              });
              //alert(suggested_users["1"].length);
              var storageRef = firebase.storage().ref();
              $scope.imgUrl = {};
              var loadedCount = 0;
              for (var i = team_skills.length; i>0 ;i--) {
                var str_i = i.toString();
                if (str_i in suggested_users){
                  $scope.suggested.push.apply($scope.suggested, suggested_users[str_i]);
                  /*for (var j=0; j < suggested_users[str_i].length; j++){
                    //extend the users to $scope.suggested
                    $scope.suggested.push(suggested_users[str_i][j]);
                  }*/
                }
              }
              for (i = 0; i < $scope.suggested.length; i++) {
                var thisImg = storageRef.child("user/"+$scope.suggested[i].img);
                thisImg.getMetadata().then(function(metadata){
                  loadedCount++;
                  $scope.imgUrl[metadata.customMetadata.user]=metadata.downloadURLs[0];
                  if (loadedCount == $scope.suggested.length) $scope.$apply();
                });
              }
            }
            //if the user is a user in this event
            else if (user_identity === "user"){
              //suggested teams for users
              var team_list = event_list[event_name]["teamList"];
              var user_skills = user_list[this_user]["skills"];
              angular.forEach(team_list, function(value,key){
                var fulfill = user_skills.length;
                var team_skills = team_list[key]["skills"];
                for (var i = 0; i<team_skills.length; i++) {
                    //alert("requirement[i]= "+requirements[i]+" skills= "+$scope.users[key]["skills"]);
                  if (user_skills.indexOf(team_skills[i]) != -1){
                    fulfill -= 1;
                  }
                }
                //alert("fulfill= "+fulfill);
                // $scope.suggested["2"] = [{userobject},{userobject}...]
                if (!(fulfill.toString() in suggested_teams)){
                  suggested_teams[fulfill.toString()]=[];
                }
                //alert("fulfill= "+fulfill+" user= "+key);
                suggested_teams[fulfill.toString()].push(team_list[key]);
                //add the teamname as an attribute of the object
                suggested_teams[fulfill.toString()][suggested_teams[fulfill.toString()].length-1]["teamname"]=key;
              });
              //alert(suggested_teams["2"].length);
              for (var i = user_skills.length; i>0 ;i--) {
                var str_i = i.toString();
                if (str_i in suggested_teams){
                  $scope.suggested_teams.push.apply($scope.suggested_teams, suggested_teams[str_i]);
                }
              }
              //alert($scope.suggested_teams.length);
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
            one_noti["name"] = this_user;
            one_noti["message"] = message;
            if (!("notification" in user_list[key])) {
              user_list[key]["notification"]={};
            }

            user_list[key]["notification"][this_user] = one_noti;
            user_list.$save();
         }
        });
        alert(alert_content);

      };


      $scope.sendMessage = function(message, type, selected_id){
        //for each user selected
        var keep_going = true;
        var leader_id = this_user;
        var alert_content = "Invitation(s) have been sent";
        var receiver = selected_id;
        var conversation_name = selected_id + "_" + leader_id; //selected_id = username of invited user
        if (type === "request"){
          alert_content = "Request(s) have been sent";
          //selected_id = team name
          leader_id = event_list[event_name]["teamList"][selected_id]["memberList"][0];
          conversation_name = this_user + "_" + leader_id;
          receiver = leader_id;
        }

            //1. conversation
            //if conversation does not exist, create a new one

            if (!(conversation_name in conversation)) {
              conversation[conversation_name]={
                "event":"",
                "log":[],
                "type":"invite"
              };
            };
            if (type === "request"){
              conversation[conversation_name]["type"] = "request";
            }


            if ( conversation[conversation_name]["type"] !== type) {
              //change alert_content
              alert_content="Please check the previous message with "+receiver+ " first. This action will not be taken";
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
            one_noti["name"] = this_user;
            one_noti["message"] = message;
            if (!("notification" in user_list[receiver])) {
              user_list[receiver]["notification"]={};
            }
            user_list[receiver]["notification"][this_user] = one_noti;
            user_list.$save();
         }

        alert(alert_content);

      };

    }
);

app.controller("profileController",function($scope,$firebaseArray,$firebaseObject,$cookies,$window){

       var userlist = $firebaseObject(firebase.database().ref("userList"));
       var eventlist = $firebaseObject(firebase.database().ref("eventList"));
       var storageRef = firebase.storage().ref();
        $scope.thisuser = $cookies.get("username",{path:"/"});
       userlist.$loaded(function() {
       $scope.email = userlist[$scope.thisuser]["email"];
       $scope.personalWebsite = userlist[$scope.thisuser]["personalWebsite"];
      $scope.introduction = userlist[$scope.thisuser]["introduction"];
      $scope.skills = userlist[$scope.thisuser]["skills"];
 $scope.oooo= userlist[$scope.thisuser]["Membership"];


     //  team="L1";
       })
       $scope.editprofileinfo = function(Website,email){
       if (Website !== undefined) userlist[$scope.thisuser]["personalWebsite"] = Website;
       if (email !== undefined) userlist[$scope.thisuser]["email"] = email;
       uploadFile = document.getElementById("uploadFile").files[0];
       if (uploadFile !== undefined) {
         s = uploadFile.name.split(".");
         fileType = "." + s[s.length - 1];
         userlist[$scope.thisuser].img = $scope.thisuser+fileType;
         userlist.$save();
         storageRef.child("user/"+$scope.thisuser + fileType).put(uploadFile,{customMetadata:{user:$scope.thisuser}}).then(function(snapshot){
           $window.location.reload(true);
         });
       }
       else {
         userlist.$save();
         $window.location.reload(true);
       }
       }
      $scope.editprofileintro = function(introduction){
       userlist[$scope.thisuser]["introduction"] = introduction;

      userlist.$save();
       }

    $scope.editprofileskills = function(skills){

      userlist[$scope.thisuser]["skills"]=skills.split(",");
      userlist.$save();

    }
    $scope.joinevent = function(event){
      $scope.newevent = {
          "identity": "user",
          "teamName": "Null"
        }

      userlist[$scope.thisuser]["Membership"][event]=$scope.newevent;
      userlist.$save();
      eventlist.$loaded(function() {
        $scope.length=eventlist[event]["inEventUser"].length;
            eventlist[event]["inEventUser"][$scope.length]=$scope.thisuser;
      eventlist.$save();
      })


    
    }


    
      var storageRef = firebase.storage().ref()
      userlist.$loaded().then(function(){

        var avaFilename = userlist[$scope.thisuser]["img"];
        var avaRef = storageRef.child('user/'+avaFilename);
        avaRef.getMetadata().then(function(metadata){
          $scope.avaUrl = metadata.downloadURLs[0];
					// console.log($scope.avaUrl);
					$scope.$apply();
        });
      });

}
);
