$(document).ready(function(){

	$('#admin_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' ) {
		$('#text_event_name').text("Event name: " + eventName);
	}

});

angular.module('teamform-member-app', ['firebase'])
.controller('AdminCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

	initalizeFirebase();
	// TODO: implementation of AdminCtrl
	var id = "";
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    user.providerData.forEach(function (profile) {

		id = firebase.auth().currentUser.uid;
  });
	}
 else {
    // No user is signed in.
  }
  });
	// Initialize $scope.param as an empty JSON object
	$scope.param = {};

	// Call Firebase initialization code defined in site.js


	var refPath, ref, eventName;

	eventName = getURLParameter("q");
	refPath = "/events" ;
	ref = firebase.database().ref(refPath);

  //0: create event 1: create team
  $scope.page=0;

	// Link and sync a firebase object
	$scope.event = $firebaseObject(ref);
	$scope.event.$loaded()
		.then( function(data) {

			// Fill in some initial values when the DB entry doesn't exist
			if(typeof $scope.event.maxTeamSize == "undefined"){
				$scope.param.maxTeamSize = 10;
			}
			if(typeof $scope.event.minTeamSize == "undefined"){
				$scope.param.minTeamSize = 1;
			}

			// Enable the UI when the data is successfully loaded and synchornized
			$('#admin_page_controller').show();
		})
		.catch(function(error) {
			// Database connection error handling...
			//console.error("Error:", error);
		});


  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

    $scope.newTeam=[];
    $scope.minTeam=0;
    $scope.maxTeam=10;
    //$scope.obj={haha:{},obj:{}}
    //console.log("function size: "+Object.size($scope.event)+"\n");
    //console.log("size: "+Object.keys($scope.event).length);

    $scope.createEvenet=function(){
      $scope.page=0;
    };

    $scope.createTeam=function(evID){
      $scope.page=1;
      $scope.eventID=evID;
      var obj=$scope.event[evID];
      $scope.minTeam=obj.param.minTeamSize;
      $scope.maxTeam=obj.param.maxTeamSize;
      $scope.oldTeam=obj.teams;
      $scope.otLength=Object.size(obj.teams);
    };

    $scope.addTeam=function(){
      //console.log($scope.newTeam.length+" "+$scope.maxTeam+"\n");
      if(!$scope.page){
        if($scope.newTeam.length<$scope.maxTeam)
          $scope.newTeam.push('');
      }
      else{
        var temp=$scope.maxTeam-$scope.otLength;
        if($scope.newTeam.length<temp)
          $scope.newTeam.push('');
      }
    };

    $scope.rmvTeam=function(){
      if(!$scope.page){
        if($scope.newTeam.length>$scope.minTeam)
          $scope.newTeam.pop();
      }
      else{

      }
    };

    $scope.fillTeam=function(){
      var temp=$scope.minTeam-$scope.newTeam.length;
      if(temp>0)
        for(var i=0;i<temp;i++)
          $scope.newTeam.push('');
    };

    $scope.fullTeam=function(){
        var temp=$scope.newTeam.length-$scope.maxTeam;
        if($scope.page)
          temp+=$scope.otLength;
        if(temp>0)
          for(var i=0;i<temp;i++)
            $scope.newTeam.pop();
    };

    $scope.submit=function(){
        if(this.ceForm.$invalid)
          return alert("Please fulfill requirements before submit the request.");
        //console.log("function size: "+Object.size($scope.event)+"\n");
        if(!$scope.page){
          for(var i=0;i<Object.size($scope.event);i++){
            //console.log("The "+i+"-th property is "+Object.keys($scope.event)[i]+"\n");
            if(Object.keys($scope.event)[i]==$scope.eventID)
              return alert("The event name has been registered, please submit a new one.");
          }
        }
        for(var i=0;i<$scope.newTeam.length;i++){
          for(var j=i+1;j<$scope.newTeam.length;j++){
            console.log($scope.newTeam[i]+" "+$scope.newTeam[j]+"\n");
            if($scope.newTeam[i]==$scope.newTeam[j])
              return alert("Team names are duplicate, please submit a new name list.");
          }
        }

        var obj={};
        obj.param={
          defaultPermissions: [
            "joinTeam",
            "createTeam",
            "owner"
          ],
          maxTeamSize: $scope.maxTeam,
          minTeamSize: $scope.minTeam
        };
        obj.teams={};
        if($scope.page)
          obj.teams=$scope.oldTeam;
        for(var i=0;i<$scope.newTeam.length;i++){
          //console.log("newTeam[i]: "+$scope.newTeam[i]+"\n");
          obj.teams[$scope.newTeam[i]]={members:[''],requests:['']};
        }

        console.log("Final Save: "+JSON.stringify(obj)+"\n");
        ref.child($scope.eventID).update(obj);
    };
}]);
