$(document).ready(function(){

	$('#member_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' ) {
		$('#text_event_name').text("Event name: " + eventName);
		$('#member_page_controller').show();
	}

});

angular.module('teamform-member-app', ['firebase'])
.controller('MemberCtrl', ['$scope', '$firebaseObject', '$firebaseArray', "$firebaseAuth","orderByFilter", function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, orderBy) {
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();
		// TODO: implementation of MemberCtrl
	$scope.auth=$firebaseAuth();
	$scope.auth.$onAuthStateChanged(function(firebaseUser) {
	if (firebaseUser) {
		$scope.uid = firebaseUser.uid;
	} else {
		console.log("Signed out");
	}
});

	$scope.userID = "";
	$scope.userName = "";
	$scope.teams = [];

	$scope.loadFunc = function() {
		var userID = $scope.userID;
		if ( userID !== '' ) {

			var refPath = getURLParameter("q") + "/member/" + userID;
			retrieveOnceFirebase(firebase, refPath, function(data) {

				if ( data.child("name").val() != null ) {
					$scope.userName = data.child("name").val();
				} else {
					$scope.userName = "";
				}


				if (data.child("selection").val() != null ) {
					$scope.selection = data.child("selection").val();
				}
				else {
					$scope.selection = [];
				}
				$scope.$apply();
			});
		}
	}



	$scope.saveFunc = function() {
		var userID = $.trim( $scope.userID );
		var userName = $.trim( $scope.userName );

		if ( userID !== '' && userName !== ''  ) {
			var newData = {
				'name': userName,
				'selection': $scope.selection
			};

			var refPath = getURLParameter("q") + "/member/" + userID;
			var ref = firebase.database().ref(refPath);

			ref.set(newData, function(){
				window.location.href= "index.html";
			});
		}
	}

	$scope.refreshAds = function() {
		var refPath = getURLParameter("q") + "/advertisement";
		var ref = firebase.database().ref(refPath);

		$scope.advertisements = $firebaseArray(ref);
		$scope.advertisements.$loaded()
			.then( function(data) {

			})
			.catch(function(error) {
				// Database connection error handling...
				//console.error("Error:", error);
			});


	}

	$scope.refreshAds();


	$scope.selectall = function(){


		$scope.selection=[];
		$scope.team=[];
		var refPath = getURLParameter("q") + "/team/";
		$scope.team = $firebaseArray(firebase.database().ref(refPath));
		$scope.team.$loaded().then( function(data){

			console.log($scope.team);
			for(var team in $scope.team){
				console.log($scope.team[team].$id);
				if(typeof $scope.team[team].$id != "undefined"){
				$scope.selection.push($scope.team[team].$id);
				}
			}

			var userID = $.trim( $scope.userID );
			var userName = $.trim( $scope.userName );
			if ( userID !== '' && userName !== ''  ) {
				var newData = {
					'name': userName,
					'selection': $scope.selection
				};

				var refPath = getURLParameter("q") + "/member/" + userID;
				var ref = firebase.database().ref(refPath);

				ref.set(newData, function(){
				})
			}
		})

	}

	$scope.refreshTeams = function() {
		var refPath = getURLParameter("q") + "/team";
		var ref = firebase.database().ref(refPath);

		// Link and sync a firebase object
		$scope.selection = [];
		$scope.toggleSelection = function (item) {
			var idx = $scope.selection.indexOf(item);
			if (idx > -1) {
				$scope.selection.splice(idx, 1);
			}
			else {
				$scope.selection.push(item);
			}
		}
		$scope.teams = $firebaseArray(ref);
		$scope.teams.$loaded()
			.then( function(data) {
			})
			.catch(function(error) {
				// Database connection error handling...
				//console.error("Error:", error);
			});
	}
	$scope.refreshTeams(); // call to refresh teams...

//.controller('matchCtrl', ["$scope", "$firebaseAuth"],
 // function($scope, $firebaseAuth) {

  $scope.auth=$firebaseAuth();
	$scope.auth.$onAuthStateChanged(function(firebaseUser) {
  		if (firebaseUser) {
    		$scope.uid = firebaseUser.uid;
  		}
  		else {
    		console.log("Signed out");
  		}
    });

// skills match


	$scope.skillsmatch = function() {
/*	$scope.teams = [
	{ "name": "team1", "personality": "sad", "skills":["skill1", "skill2"], "star":"dllm", "score":0},
	{ "name": "team2", "personality": "happy", "skills":["skill3"], "star":"on9", "score":0}
	];
	$scope.profile ={ "personality": "sad", "skills": ["skill3","skill4"], "star":"on9"};
  */  if ($scope.profile.skills != ""){
      var refPath = getURLParameter("q")+"/team/";
      var ref = firebase.database().ref(refPath);
      $scope.teams = $firebaseArray(ref);

 		for (teamindex=0; teamindex<$scope.teams.length; teamindex++)
 		{
      		console.log("team copied");
 			var team = new Array();
 			team[teamindex] = $scope.teams[teamindex];
 			team[teamindex].score = 0;
 //
 			for (skillsindex=0; skillsindex< $scope.profile.skills.length; skillsindex++) {

        	if (team[teamindex].skills){
        		console.log("skills exists");
        	if(team[teamindex].skills.indexOf($scope.profile.skills[skillsindex]) > -1) {
        		console.log("if they are the same");
        		team[teamindex].score++;}
        	}
        }
        	 console.log("team:",team);
  	  	}
      	$scope.teams = orderBy($scope.teams,'score',true);
      	console.log("skillsmatch output",$scope.teams);
      	/*  for(var team in $scope.teams){
		var team.score =0;
     	console.log("ran");
     	for(var skill in $scope.profile.skills){
     	if(team.skills.indexOf(skill) > -1) {
       		console.log("ran");
     		team.score++;}
		}
		console.log("team:",team);
      	var searchteam = orderBy($scope.teams,'score',true);
      	console.log("skillsmatch output",searchteam);
      	return $scope.searchteam;
*///  	}

      // for(index = 0; index < $scope.profile.skills.length; index++){
      //     skillsCollection.$ref().orderByKey("skills").equalTo($scope.profile.skills[index]).once("value", function(dataSnapshot){
      //     var teamfound = dataSnapshot.val();
      //     if(dataSnapshot.exists()){
      //       console.log("Found", teamfound);
      //     }
      //     else {
      //       console.warn("Not found.");
      //     }
      //   });
      // }
    }
  };

// personality match

  $scope.personalitymatch = function() {
 /* 	$scope.teams = [
	{ "name": "team1", "personality": "sad", "skills":["skill1", "skill2"], "star":"dllm", "score":0},
	{ "name": "team2", "personality": "happy", "skills":["skill3"], "star":"on9", "score":0}
	];
	$scope.profile ={ "personality": "sad", "skills": ["skill3","skill4"], "star":"on9"};
*/
    if ($scope.profile.personality != ""){
      var refPath = getURLParameter("q")+"/team/";
      var ref = firebase.database().ref(refPath);
      $scope.teams = $firebaseArray(ref);

    for (teamindex=0; teamindex<$scope.teams.length; teamindex++)
 		{
      		console.log("team copied");
 			var team = new Array();
 			team[teamindex] = $scope.teams[teamindex];
 			team[teamindex].score = 0;
        	if (team[teamindex].personality){
        		console.log("personality exists");
        	if(team[teamindex].personality.indexOf($scope.profile.personality) > -1) {
        		console.log("if they are the same");
        		team[teamindex].score++;}
        	}
        	 console.log("team:",team);
  	  	}
      	$scope.teams = orderBy($scope.teams,'score',true);
      	console.log("personalitymatch output",$scope.teams);

	/*  $scope.teams.$ref().orderByKey("personality").equalTo($scope.profile.personality).once("value", function(dataSnapshot){
        var teamfound = dataSnapshot.val();
        if(dataSnapshot.exists()){
          console.log("Found", teamfound);
        }
        else {
          console.warn("Not found.");
        }
      });
   */ }
  };

// star match

  $scope.starmatch = function() {
 /* 	$scope.teams = [
	{ "name": "team1", "personality": "sad", "skills":["skill1", "skill2"], "star":"dllm", "score":0},
	{ "name": "team2", "personality": "happy", "skills":["skill3"], "star":"on9", "score":0}
	];
	$scope.profile ={ "personality": "sad", "skills": ["skill3","skill4"], "star":"on9"};
*/
    if ($scope.profile.star != ""){
    	var refPath = getURLParameter("q")+"/team/";
     	var ref = firebase.database().ref(refPath);
  		$scope.teams = $firebaseArray(ref);

    for (teamindex=0; teamindex<$scope.teams.length; teamindex++)
 		{
      		console.log("team copied");
 			var team = new Array();
 			team[teamindex] = $scope.teams[teamindex];
 			team[teamindex].score = 0;
        	if (team[teamindex].star){
        		console.log("star exists");
        	if(team[teamindex].star.indexOf($scope.profile.star) > -1) {
        		console.log("if they are the same");
        		team[teamindex].score++;}
        	}
        	 console.log("team:",team);
  	  	}
      	$scope.teams = orderBy($scope.teams,'score',true);
      	console.log("starmatch output",$scope.teams);
 /*	$scope.teams.$ref().orderByKey("star").equalTo($scope.profile.star).once("value", function(dataSnapshot){
        var teamfound = dataSnapshot.val();
        if(dataSnapshot.exists()){
          console.log("Found", teamfound);
        }
        else {
          console.warn("Not found.");
        }
      });*/
    }
  };

		$scope.sizeText = 0;

		$scope.largerthan = function(val){
	    return function(item){
			if ( typeof item.teamMembers != "undefined" && typeof item.teamMembers != "null")
			{return item.size - item.teamMembers.length - item.teamLeaderSize >= val;}
			else return (item.size - item.teamLeaderSize >= val);
	    }
		}

	// }]);

}])
;
