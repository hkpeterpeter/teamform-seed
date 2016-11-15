// $(document).ready(function(){
//
// 	$('#admin_page_controller').hide();
// 	$('#text_event_name').text("Error: Invalid event name ");
// 	var eventName = getURLParameter("q");
// 	if (eventName != null && eventName !== '' ) {
// 		$('#text_event_name').text("Event name: " + eventName);
// 	}
//
// });

angular.module('teamform-member-app', ['firebase'])
.controller('createEventCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	var self = this;
	initalizeFirebase();
	// TODO: implementation of createEventCtrl
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
				$scope.event.maxTeamSize = 10;
			}
			if(typeof $scope.event.minTeamSize == "undefined"){
				$scope.event.minTeamSize = 1;
			}

			// Enable the UI when the data is successfully loaded and synchornized
			$('#admin_page_controller').show();
			//$scope.createEvent();
			//$scope.createTeam("6210");
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

    $scope.newTeam=[''];
    $scope.minTeam=0;
    $scope.maxTeam=10;

    $scope.createEvent=function(){
      $scope.page=0;
    };

    $scope.createTeam=function(evID){
      $scope.page=1;
      $scope.eventID=evID;
      var obj=$scope.event[evID];
			$scope.oldTeam=Object.getOwnPropertyNames(obj.teams);
      $scope.minTeam=obj.param.minTeamSize;
      $scope.maxTeam=obj.param.maxTeamSize;
			console.log("oldTeam: "+JSON.stringify($scope.event[evID])+"\n");
			if($scope.maxTeam==$scope.oldTeam.length)
				alert("Number of existing teams reachs the maximum, createTeam is forbidden.");
    };

    $scope.submit=function(){
        if(this.ceForm.$invalid)
          return alert("Please fulfill requirements before submit the request.");

				//Page: createEvent
        if(!$scope.page){
          for(var i=0;i<Object.size($scope.event);i++){
            //console.log("The "+i+"-th property is "+Object.keys($scope.event)[i]+"\n");
            if(Object.keys($scope.event)[i]==$scope.eventID)
              return alert("The event name is existed, please rename it.");
          }
        }

				if($scope.page){
					console.log("checking exist name: "+$scope.newTeam[0]+"\n");
					for(var i=0;i<$scope.oldTeam.length;i++){
						console.log("oldteam name: "+$scope.oldTeam[i]+"\n");
						if($scope.newTeam[0]==$scope.oldTeam[i])
							return alert("The team name is existed, please rename it.");
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

				if(!$scope.page)
        	obj.teams={"_":""};
        else{
					delete obj["_"];
          obj.teams=$scope.event[$scope.eventID].teams;
          obj.teams[$scope.newTeam[0]]={members:[''],requests:['']};
        }

        console.log("Final Save: "+JSON.stringify(obj)+"\n");
        ref.child($scope.eventID).update(obj);
				if($scope.page)
					self.createTeam($scope.eventID);
    };
}]);
