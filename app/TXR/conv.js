app.controller("ConversationController",function($scope,$routeParams,$cookies,$firebaseObject,$firebaseArray,$window){
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

  $scope.thisuser = $cookies.get("username",{path:"/"});
  $scope.userList = $firebaseObject(firebase.database().ref("userList"));
  $scope.eventList = $firebaseObject(firebase.database().ref("eventList"));
  $scope.convList = $firebaseObject(firebase.database().ref("conversation"));
  var ref = firebase.database().ref("conversation");
  // ref.on("value",function(){
  //   $scope.logs=$scope.convList[$scope.convKey].log;
  //   $scope.$apply();
  //   console.log("new message");
  // });
  var storageRef = firebase.storage().ref();

  $scope.p = $routeParams.p;
  $scope.event = $routeParams.e;

  $scope.targetLeader = "";
  $scope.targetUser = "";
  $scope.convType = "";
  $scope.logs = [];
  $scope.isMaster = false;
  $scope.imgUrl = {};
  $scope.convKey = "";
  $scope.input = "";
  $scope.convList.$loaded(function(){
    angular.forEach($scope.convList,function(value,key){
      names = key.split("_");
      if ((names[0] == $scope.thisuser && names[1] == $scope.p || names[0] == $scope.p && names[1] == $scope.thisuser) && value.event == $scope.event) {
        $scope.convKey = key;
        $scope.targetUser = names[0];
        $scope.targetLeader = names[1];
        $scope.convType = value.type;
        $scope.logs = value.log;
        if (names[0] == $scope.thisuser && value.type == "request") {
          $scope.isMaster = false;
          $scope.action = "You applied to " + $scope.userList[$scope.p].name;
        }
        if (names[0] == $scope.thisuser && value.type == "invite") {
          $scope.isMaster = true;
          $scope.action = $scope.userList[$scope.p].name + " invited you";
        }
        if (names[1] == $scope.thisuser && value.type == "request") {
          $scope.isMaster = true;
          $scope.action = $scope.userList[$scope.p].name + " applied";
        }
        if (names[1] == $scope.thisuser && value.type == "invite") {
          $scope.isMaster = false;
          $scope.action = "You invited " + $scope.userList[$scope.p].name;
        }
      }
    });
    $scope.userList.$loaded(function(){
      var userImgRef = storageRef.child('user/'+$scope.userList[$scope.targetUser].img);
      userImgRef.getMetadata().then(function(metadata){ $scope.imgUrl[$scope.targetUser] = metadata.downloadURLs[0];$scope.$apply(); });
      var leaderImgRef = storageRef.child('user/'+$scope.userList[$scope.targetLeader].img);
      leaderImgRef.getMetadata().then(function(metadata){ $scope.imgUrl[$scope.targetLeader] = metadata.downloadURLs[0];$scope.$apply(); });
      $scope.team = $scope.userList[$scope.targetLeader]["Membership"][$scope.event].teamName;
    });
  });

  $scope.send = function() {
    if ($scope.input !== "") {
      $scope.convList[$scope.convKey].log.push({message:$scope.input,sender:$scope.thisuser});
      addnotification($scope.event,$scope.input,$scope.p,true);
      $scope.convList.$save();
      $scope.input = "";
    }
  };

  $scope.accept = function(){
    delete $scope.convList[$scope.convKey];
    addnotification($scope.event,$scope.thisuser+" accepted your "+$scope.convType,$scope.p,false);
    $scope.eventList[$scope.event].teamList[$scope.team].memberList.push($scope.targetUser);
    $scope.userList[$scope.targetUser].Membership[$scope.event].identity = 'member';
    $scope.userList[$scope.targetUser].Membership[$scope.event].teamName = $scope.team;
    $scope.userList.$save().then(function(){
      $scope.eventList.$save().then(function(){
        $scope.convList.$save().then(function(){
          gotoURL("/TXR/#/MyEvents/"+$scope.event,[],$window);
        });
      });
    });
  };
  $scope.reject = function(){
    delete $scope.convList[$scope.convKey];
    addnotification($scope.event,$scope.thisuser+" rejected your "+$scope.convType,$scope.p,false);
    $scope.userList.$save().then(function(){
      $scope.eventList.$save().then(function(){
        $scope.convList.$save().then(function(){
          gotoURL("/TXR/#",[], $window);
        });
      });
    });
  };

  var addnotification = function(evt,msg,receiver,others){
      if ($scope.userList[receiver]["notification"] == undefined) $scope.userList[receiver]["notification"] = {};
      // if ($scope.userList[receiver]["notification"][$scope.thisuser] !== undefined) delete $scope.userList[receiver]["notification"][$scope.thisuser];
      $scope.userList[receiver]["notification"][$scope.thisuser]={
        "others":others,
        "event":evt,
        "message":msg,
        "name":$scope.thisuser
      }
      $scope.userList.$save();
  }

});
