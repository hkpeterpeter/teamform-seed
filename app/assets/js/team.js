angular.module('teamform-team-app', ['firebase'])
.controller('TeamCtrl', ['$scope', '$firebaseObject', '$firebaseArray', 
    function($scope, $firebaseObject, $firebaseArray) {
		
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();

	var refPath = "";
	var eventName = getURLParameter("q");	
	var teamName = getURLParameter("tn");

	refPath = "/event/" + eventName + "/team/" + teamName; 
	ref = firebase.database().ref(refPath);
	$scope.teaminfo = $firebaseObject(ref);


	var userid,username,userPath,userref,userObj;





	$scope.jointeam = function()
	{
		/*
		 firebase.auth().onAuthStateChanged(function(user) {
		 	console.log(user);
    	if (user) {
    		console.log(user);
        	userPath = "/user/" + user.uid;
        	userref = firebase.database().ref(userPath);

        	var eventPath ="/event/" + eventName +"/members/"+ userid;
        	var eventref = firebase.database().ref(eventPath);

        	eventref.set({ joined : true })	 
    	} else {
   
    // No user is signed in.
    }
    });
*/
    var user = firebase.auth().currentUser;
    console.log(user);

		if (user != null) {
        	var userPath ="/user/" + user.uid;
        	var userref = firebase.database().ref(userPath);
        	var name;


        	userref.once("value", function(data) {
        		  console.log(data.val());
        			name = data.val().name;
        		var eventPath ="/event/" + eventName + "/team/"+teamName+"/members/"+ user.uid;
        		var eventref = firebase.database().ref(eventPath);

        			eventref.set({ 'joined' : true, 'username' : name})	 
			});
		} else {
  			// No user is signed in.
		}

	}

	refPath = "/event/" + eventName + "/team/"+teamName+"/members";
	$scope.members = [];
	$scope.members = $firebaseArray(firebase.database().ref(refPath));








	refPath =  eventName + "/admin";
	retrieveOnceFirebase(firebase, refPath, function(data) {	

		if ( data.child("param").val() != null ) {
			$scope.range = data.child("param").val();
			$scope.param.currentTeamSize = parseInt(($scope.range.minTeamSize + $scope.range.maxTeamSize)/2);
			$scope.$apply(); // force to refresh
			$('#team_page_controller').show(); // show UI
			
		} 
	});
	
	

	
	












	$scope.input = {
			title: "",
			comment: "",
			date: "",
			likes: 0
		}

	// sync with firebaseArray
		var commentref = firebase.database().ref("comment");
		$scope.comment = $firebaseArray(commentref);

		$scope.addComment = function() {
			
			// update the date
			if ( /*$scope.input.title != "" && */$scope.input.comment != "" ) {
				$scope.input.date = new Date().toString();
				$scope.input.likes = 0;
				// add a comment
				$scope.comment.$add($scope.input);
			}
		}
	
	
	
	
	
		
}]);