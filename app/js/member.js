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
	$scope.userID = "";
	$scope.userName = "";
	$scope.teams = [];

	$scope.auth=$firebaseAuth();
	$scope.auth.$onAuthStateChanged(function(firebaseUser) {
  		if (firebaseUser) {
    		$scope.uid = firebaseUser.uid;
  		}
  		else {
    		console.log("Signed out");
  		}
    });

	$scope.loadFunc = function() {
		var userID = $scope.userID;
		if ( userID !== '' ) {

			var refPath = "/events/"+ getURLParameter("q") + "/member/" + userID;
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

			var refPath = "/events/"+ getURLParameter("q") + "/member/" + userID;
			var ref = firebase.database().ref(refPath);

			ref.set(newData, function(){
				window.location.href= "index.html";
			});
		}
	}

	$scope.refreshAds = function() {
		var refPath = "/events/"+ getURLParameter("q") + "/advertisement";
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
		var refPath = "/events/"+ getURLParameter("q") + "/team/";
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

				var refPath = "/events/"+ getURLParameter("q") + "/member/" + userID;
				var ref = firebase.database().ref(refPath);

				ref.set(newData, function(){
				})
			}
		})

	}

	$scope.refreshTeams = function() {
		var refPath = "/events/"+ getURLParameter("q") + "/team";
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
		console.log($scope.teams);
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


// skills match
	var getProfile = function(uid){
      var path= "profile/"+uid;
      var ref = firebase.database().ref(path);
      $scope.profile = $firebaseObject(ref);
      $scope.profile.$loaded()
        .catch(function(error) {
          // Database connection error handling...
          console.error("Error:", error);
        });
        return $scope.profile;
    }


	$scope.skillsmatch = function() {

	$scope.profile = getProfile($scope.userID);
      $scope.profile.$loaded()
      	.then(function(data){
		    if ($scope.profile.skills != ""){
	      		console.log("profile =",$scope.profile);

	 			for (teamindex=0; teamindex<$scope.teams.length; teamindex++)
	 			{
		      		console.log("team copied");
		 			var team = new Array();
		 			team[teamindex] = $scope.teams[teamindex];
		 			team[teamindex].score = 0;
					console.log("team_skills",$scope.teams[teamindex].skills);
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
    		}
      	});
	};
// personality match

  $scope.personalitymatch = function() {

	$scope.profile = getProfile($scope.userID);
      $scope.profile.$loaded()
      	.then(function(data){

			if ($scope.profile.personality != ""){
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
	        				team[teamindex].score++;
	        			}
	        		}
	        		console.log("team:",team);
	  	  		}
	      		$scope.teams = orderBy($scope.teams,'score',true);
	      		console.log("personalitymatch output",$scope.teams);
	    	}
	    });
};

// star match

$scope.starmatch = function() {

  	$scope.profile = getProfile($scope.userID);
      $scope.profile.$loaded()
      	.then(function(data){

			if ($scope.profile.star != ""){

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
		        				team[teamindex].score++;
		        			}
		        		}
		        	console.log("team:",team);
		  	  	}

      			$scope.teams = orderBy($scope.teams,'score',true);
      			console.log("starmatch output",$scope.teams);
    		}
	    });
};

$scope.sizeText = 0;

$scope.largerthan = function(val){

	return function(item){
	if ( typeof item.teamMembers != "undefined" && typeof item.teamMembers != "null")
	{
		return item.currentTeamSize - item.teamMembers.length - item.currentTeamLeaderSize >= val;}
	else {
		return (item.currentTeamSize - item.currentTeamLeaderSize >= val);
	}
	}
}

}]);
