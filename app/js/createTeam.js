// $(document).ready(function(){
	
// 	$('#admin_page_controller').hide();
// 	$('#text_event_name').text("Create New Event");
// 	var eventName = getURLParameter("q");
// 	console.log("eventName (inside ready):" + eventName)
// 	if (eventName != null && eventName !== '' && eventName != "undefined"){
// 		$('#text_event_name').text("Event name: " + eventName);
// 	}
// });

angular.module('create-event-app', ['firebase'])
.controller('newEventCtrl', ['$scope', '$firebaseObject', '$firebaseArray','$window', function($scope, $firebaseObject, $firebaseArray,$window) {
	console.log("enter create-event-app");
	// TODO: implementation of AdminCtrl
	
	// Initialize $scope.param as an empty JSON object
	$scope.param = {};
	$scope.editDescription = false;

	// Call Firebase initialization code defined in site.js
	initalizeFirebase();	
	
    //eventid & teamid from url
    $scope.eventid = getURLParameter("eventid");
   // $scope.teamid = getURLParameter("teamid");

    //create team function
    $scope.createTeam = function(){
        console.log('creating team');
        var ref = firebase.database().ref("events/"+$scope.eventid);
        console.log(ref);
        var teamkey = ref.push().key;
        console.log(teamkey);
        var event = $firebaseObject(ref);
        event.$loaded()
            .then(function(data){
                console.log(data);
                var newteamRef = firebase.database().ref('events/'+$scope.eventid+'/'+teamkey);
                var teamobject = $firebaseObject(newteamRef);
                teamobject.teamName = "test name";
                teamobject.$save();
            });
    }







// 	var refPath, ref, eventName;

// 	eventName = getURLParameter("q");
// 	console.log("eventName (inside app):" + eventName)
// 	eventid = firebase.database().ref("events/").push().key;
// 	refPath = "events/"+ eventid + "/admin/param";	
// 	ref = firebase.database().ref(refPath);
		
// 	// Link and sync a firebase object
// 	$scope.param = $firebaseObject(ref);
// 	$scope.param.$loaded()
// 		.then( function(data) {
// 			// // Fill in some initial values when the DB entry doesn't exist
// 			$scope.param.eventName = eventName;
// 			if (typeof $scope.param.admin == "undefined"){
// 				$scope.param.admin = $scope.uid;
// 			}
// 			if (typeof $scope.param.description == "undefined"){
// 				$scope.param.description = "This is team form for " + eventName + ".";
// 			}
// 			if(typeof $scope.param.maxTeamSize == "undefined"){				
// 				$scope.param.maxTeamSize = 10;
// 			}			
// 			if(typeof $scope.param.minTeamSize == "undefined"){				
// 				$scope.param.minTeamSize = 1;
// 			}			
// 			if (typeof $scope.param.deadline =="undefined"){
// 				$scope.deadline = new Date(new Date().setDate(new Date().getDate()+30));
// 				//outside new Date: change string to date object, 2nd Date: create date, 3 rd Date: get today day
// 			}else{
// 				$scope.deadline = new Date($scope.param.deadline);
// 				console.log(new Date($scope.param.deadline ));
// 			}
// 			$scope.today=new Date();
// 			var database = firebase.database();
//             var adminRef = database.ref('users/'+$scope.param.admin);
//             $adminData = $firebaseObject(adminRef);
//             $adminData.$loaded()
//                 .then(function(data){
//                     $scope.adminName = $adminData.name;
//                 })
// 			// Enable the UI when the data is successfully loaded and synchornized
// 			$('#admin_page_controller').show(); 				
// 		}) 
// 		.catch(function(error) {
// 			// Database connection error handling...
// 			console.error("Error:", error);
// 		});	

// 	$scope.changeMinTeamSize = function(delta) {
// 		var newVal = $scope.param.minTeamSize + delta;
// 		if (newVal >=1 && newVal <= $scope.param.maxTeamSize ) {
// 			$scope.param.minTeamSize = newVal;
// 		} 
// 	}

// 	$scope.changeMaxTeamSize = function(delta) {
// 		var newVal = $scope.param.maxTeamSize + delta;
// 		if (newVal >=1 && newVal >= $scope.param.minTeamSize ) {
// 			$scope.param.maxTeamSize = newVal;
// 		} 
// 	}

// 	$scope.changeEventName = function(){
// 		$('#text_event_name').text("Event name: " + $scope.param.eventName);
// 		if ($scope.editDescription == false){
// 			$scope.param.description = "This is team form for " + $scope.param.eventName + ".";
// 		}
// 	}

// 	$scope.changeDescription = function(){
// 		$scope.editDescription = true;
// 	}

// 	$scope.saveFunc = function() {
// 		if ($scope.param.eventName == ""|| $scope.param.eventName == null){
// 			$window.alert("Event Name cannot be empty");
// 		}else{
// 			console.log("eventname in saveFunc: "+$scope.param.eventName);
// 			$scope.isEventExist($scope.param.eventName,function(result){
// 				console.log("result:" + result);
// 				if(result){
// 					console.log("Event "+ $scope.param.eventName + " already exist.");
// 					$window.alert("Event "+ $scope.param.eventName + " already exist.");
// 				}else{
// 					console.log("event created");
// 					$scope.param.deadline =$scope.deadline.toISOString(); 
// 					$scope.param.$save();
// 					//save to user
// 					var userTeamRefPath = "users/"+$scope.uid+"/teams/"+ eventid;
// 					var userTeamRef = firebase.database().ref(userTeamRefPath);
// 					adminData = $firebaseObject(userTeamRef);
// 					adminData.role = {};
// 					adminData.role = "admin";
// 					adminData.$save();
// 					// jump to admin page
// 					window.location.href= "admin.html?q="+eventid;
// 				}
// 			})
// 		}
// 	}

// 	$scope.isEventExist = function(eventname, callback){
// 		console.log("eventname: "+ eventname);
// 		var ref = firebase.database().ref("events/");
// 		var eventsList = $firebaseObject(ref);
// 		var existflag = false;
// 		eventsList.$loaded(function(data) {
// 				data.forEach(function(eventObj){
// 					console.log("eventObj: "+eventObj.admin.param.eventName);
// 					console.log("eventname: "+ eventname);
// 					if (eventObj.admin.param.eventName == eventname){
// 						console.log("callback true");
// 						existflag = true;
// 					}
// 				})
// 		}).then(function(){
// 			callback(existflag);
// 		});
// 	}

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