app.controller("ConversationController",function($scope,$routeParams,$cookies,$firebaseObject,$firebaseArray){
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
        if ($scope.convType == "invite") $scope.action = "invites you";
        if ($scope.convType == "request") $scope.action = "applies";
        $scope.logs = value.log;
        if (names[0] == $scope.thisuser && value.type == "request") {
          $scope.isMaster = false;
        }
        if (names[0] == $scope.thisuser && value.type == "invite") {
          $scope.isMaster = true;
        }
        if (names[1] == $scope.thisuser && value.type == "request") {
          $scope.isMaster = true;
        }
        if (names[1] == $scope.thisuser && value.type == "invite") {
          $scope.isMaster = false;
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
      $scope.input = "";
      $scope.convList.$save();
    }
  };

  $scope.accept = function(){

  };
  $scope.reject = function(){

  };

});
