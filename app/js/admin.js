$(document).ready(function(){
	
	$('#admin_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event id ");
	var eventid = getURLParameter("q");
	if (eventid != null && eventid !== '' ) {
		$('#text_event_name').text("Event ID: " + eventid);
	}
});



angular.module('teamform-admin-app', ['firebase'])
.controller('AdminCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window', function($scope, $firebaseObject, $firebaseArray, $window) {
	
	// TODO: implementation of AdminCtrl
	
	// Initialize $scope.param as an empty JSON object
	$scope.param = {}; //event.{eventid}.admin.param
	$scope.editable = false;
	$scope.writingAnnouncement = false;
	$scope.loggedIn = true;
			
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();	
	
	var refPath, ref, eventid; //ref for sqecified event

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
	
	$scope.edit_click = function(){
		$scope.editable = true;
    };

	$scope.generate_click=function(){//TODO
		//find team that member less than minTeamSize
		//put user without team who have responding preference into above team
		//random put remaining user into teams
		$window.alert("TODO: waiting for teams ");
	}

	$scope.new_announcement_click=function(){
		$scope.writingAnnouncement = true;
	}

	$scope.make_announcement=function(announcement_text){
		if (announcement_text == ""|| announcement_text == null){
			$window.alert("Announcement cannot be empty.");
		}else{
			console.log("Save Announcement to firebase");
			var announcementRefPath = "events/"+eventid+"/announcements/";
			console.log(announcementRefPath);
			announcementRefPath=  announcementRefPath + firebase.database().ref(announcementRefPath).push().key;
			//key of announcements = date & time
			//val of Announcement = announcement text
			announcementRef = $firebaseObject(firebase.database().ref(announcementRefPath));
			announcementRef.text = announcement_text;
			announcementRef.date = new Date().toISOString();
			announcementRef.$save();
			$scope.writingAnnouncement = false;
		}
	}

	refPath = "events/"+ eventid + "/team";	
	$scope.team = [];
	$scope.team = $firebaseArray(firebase.database().ref(refPath));
	
	refPath = "events/"+ eventid + "/member";
	$scope.member = [];
	$scope.member = $firebaseArray(firebase.database().ref(refPath));

	$scope.changeMinTeamSize = function(delta) {
		var newVal = $scope.param.minTeamSize + delta;
		if (newVal >=1 && newVal <= $scope.param.maxTeamSize ) {
			$scope.param.minTeamSize = newVal;
		} 
	}

	$scope.changeMaxTeamSize = function(delta) {
		var newVal = $scope.param.maxTeamSize + delta;
		if (newVal >=1 && newVal >= $scope.param.minTeamSize ) {
			$scope.param.maxTeamSize = newVal;
		} 
	}

//TODO: move some code to here from createEvent so that check valid 
	$scope.saveFunc = function() {
		if ($scope.param.eventName == ""|| $scope.param.eventName == null){
			$window.alert("Event Name cannot be empty");
		}else{
			console.log("eventname in saveFunc: "+$scope.param.eventName);
			$scope.isEventExist($scope.param.eventName,function(result){
				console.log("result:" + result);
				if(result){
					console.log("Event "+ $scope.param.eventName + " already exist.");
					$window.alert("Event "+ $scope.param.eventName + " already exist.");
				}else{
					$scope.param.deadline =$scope.deadline.toISOString();
					$scope.param.$save();
					$('#text_event_name').text("Event Name: " + $scope.param.eventName);
					$scope.editable = false;
				}
			})
		}
	}
	
	$scope.isEventExist = function(eventname, callback){
		console.log("eventname: "+ eventname);
		var ref = firebase.database().ref("events/");
		var eventsList = $firebaseObject(ref);
		var existflag = false;
		eventsList.$loaded(function(data) {
				data.forEach(function(eventObj){
					console.log("eventObj: "+eventObj.admin.param.eventName);
					console.log("eventname: "+ eventname);
					if (eventObj.admin.param.eventName == eventname){
						console.log("callback true");
						existflag = true;
					}
				})
		}).then(function(){
			callback(existflag);
		});
	}

	//$scope.users is an array of users in firebase
    var usersRef = firebase.database().ref('users');
    $scope.users = $firebaseArray(usersRef);
	
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