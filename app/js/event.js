$(document).ready(function(){
	
	$('#admin_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event id ");
	var eventid = getURLParameter("q");
	if (eventid != null && eventid !== '' ) {
		$('#text_event_name').text("Event ID: " + eventid);
	}
});

//TODO:
//join button in event?q=
//then there will look for user that want to join but without team
//to generate

angular.module('teamform-event-app', ['firebase'])
.controller('EventCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window', function($scope, $firebaseObject, $firebaseArray, $window) {
	
	// TODO: implementation of AdminCtrl
	
	// Initialize $scope.param as an empty JSON object
	$scope.param = {}; //event.{eventid}.admin.param
	$scope.loggedIn = true;
			
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();	
	
	var refPath, ref, eventid; //ref for sqecified event
    $scope.eventid = getURLParameter("q");
	eventid = getURLParameter("q");
	console.log("event id : " + eventid)
	refPath = "events/"+ eventid + "/admin/param";
	ref = firebase.database().ref(refPath);
		
	// Link and sync a firebase object
	$scope.param = $firebaseObject(ref);
	$scope.param.$loaded()
		.then( function(data) {
			// // Fill in some initial values when the DB entry doesn't exist
			console.log("loaded: " + $scope.param.eventName);
			console.log("loaded: " + $scope.param);
			if (typeof $scope.param.eventName == "undefined"){
				$scope.param.eventName ="";
			}
			if (typeof $scope.param.admin == "undefined"){
				$scope.param.admin = $scope.uid;
			}
			if (typeof $scope.param.description == "undefined"){
				$scope.param.description = "This is team form for " + $scope.param.eventName + ".";
			}
			if(typeof $scope.param.maxTeamSize == "undefined"){				
				$scope.param.maxTeamSize = 10;
			}			
			if(typeof $scope.param.minTeamSize == "undefined"){				
				$scope.param.minTeamSize = 1;
			}			
			if (typeof $scope.param.deadline =="undefined"){
				$scope.deadline = new Date(new Date().setDate(new Date().getDate()+30));//outside new Date: change string to date object, 2nd Date: create date, 3 rd Date: get today day
			}else{
				$scope.deadline = new Date($scope.param.deadline);
				console.log(new Date($scope.param.deadline ));
			}
			$scope.today=new Date();
			var database = firebase.database();
            var adminRef = database.ref('users/'+$scope.param.admin);
            var adminData = $firebaseObject(adminRef);
            adminData.$loaded()
                .then(function(data){
                    $scope.adminName = adminData.name;
                })
			// Enable the UI when the data is successfully loaded and synchornized
			$('#text_event_name').text("Event Name: " + $scope.param.eventName);
			$('#admin_page_controller').show();			
		}) 
		.catch(function(error) {
			// Database connection error handling...
			//console.error("Error:", error);
		});
	
   //create team function 
    $scope.createTeam = function(teamName){

        var teamNameVal = $('#teamName').val();
		if(teamNameVal == undefined){
			teamNameVal = teamName;
		}
     	console.log(teamNameVal);
        console.log('creating team');
        var ref = firebase.database().ref('events/'+$scope.eventid+'/teams/');
        console.log($scope.eventid);
        var teamkey = ref.push().key;
        console.log(teamkey);
        var event = $firebaseObject(ref);
        event.$loaded()
            .then(function(data){
                //console.log(data);
                var newteamRef = firebase.database().ref('events/'+$scope.eventid+'/teams/'+ teamkey);
                var teamobject = $firebaseObject(newteamRef);
                teamobject.teamName = teamNameVal; 
				teamobject.teamLeader = $scope.uid;
                teamobject.$save();
                console.log(teamobject);

                var currentUser = firebase.auth().currentUser;
                var currentUsersRef = firebase.database().ref('users/'+currentUser.uid+'/teams/'+$scope.eventid);
                var userNewTeamObject = $firebaseObject(currentUsersRef);
               if(userNewTeamObject.role != 'admin'){
				userNewTeamObject.role = 'leader';
				userNewTeamObject.teamid = teamkey;
			   }
			   userNewTeamObject.teamid = teamkey;
                userNewTeamObject.$save();
				console.log(userNewTeamObject);
            });
		if (teamNameVal == '' ){
 			var url = "team.html?teamid=" + teamkey+ "&eventid="+$scope.eventid;
	    	//	window.location.href = url;
    		return false;
		//user will enter team page which is created by user who become leader
    	}else{
		//	var url = "team.html?teamid=" + teamkey+ "&eventid="+$scope.eventid;
			var url = "leader.html?teamid=" + teamkey+ "&eventid="+$scope.eventid;
    		window.location.href = url;
    		return true;
		}
    }



	refPath = "events/"+ eventid + "/teams";	
	$scope.teams = [];
	$scope.teams = $firebaseArray(firebase.database().ref(refPath));
	
	refPath = "events/"+ eventid + "/member";
	$scope.member = [];
	$scope.member = $firebaseArray(firebase.database().ref(refPath));

	refPath = "events/"+ eventid + "/announcements";
	$scope.announcements = [];
	$scope.announcements = $firebaseArray(firebase.database().ref(refPath));
	
	//$scope.users is an array of users in firebase
    var usersRef = firebase.database().ref('users');
    $scope.users = $firebaseArray(usersRef);

	$scope.getUserNameInTeam = function(team){
		var resultName;
		console.log("getUserNameInTeam for team"+team);
		$scope.getUserNameByID(team.teamLeader,function(resultFromCallback){
			resultName = resultFromCallback;
			console.log("Leader: getMemberNameByID: "+ resultName);
			team.teamLeaderName = resultName;
		})
		angular.forEach(team.members,function(member,key){
			$scope.getUserNameByID(member.memberID,function(resultFromCallback){
				resultName = resultFromCallback;
				//console.log("Member: getMemberNameByID: "+ resultName);
				member.memberName = resultName;
				console.log("member: "+member.memberID+"\nmember: "+member.memberName);
				team.memberNames=[];
				team.memberNames.push(resultName);
			})
			console.log("team.members: "+team.members);
			console.log("team.memberNames: "+team.memberNames);
		})
	}

	$scope.getUserNameByID = function(userid,callback){
		var foundName;
		var userDatabase = firebase.database();
		var userRef = userDatabase.ref('users/'+userid+'/name');
		var userData = $firebaseObject(userRef);
		userData.$loaded()
			.then(function(data){
				//console.log("getUserNameByID: "+userData.$value);
				callback(userData.$value);
			})
	}

	//logout function
	$scope.logout = function(){
		firebase.auth().signOut();
	}

	//monitor if the user is logged in or not
	firebase.auth().onAuthStateChanged(user => {
		if(user){
			console.log('logged in');
            var database = firebase.database();
            var usersRef = database.ref('users/'+user.uid);
            var currentUserData = $firebaseObject(usersRef);
            currentUserData.$loaded()
                .then(function(data){
                    $scope.username = currentUserData.name;
                })
                .catch(function(error){
                    console.error("Error: "+error);
                });
            $scope.loggedIn = true;
			$scope.uid = user.uid;
        }else{
			console.log('not log in');
            $window.location.href = '/index.html';
		}
	})
}]);