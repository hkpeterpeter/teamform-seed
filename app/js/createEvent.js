$(document).ready(function(){
	
	$('#admin_page_controller').hide();
	$('#text_event_name').text("Create New Event");
	var eventName = getURLParameter("q");
	console.log("eventName (inside ready):" + eventName)
	if (eventName != null && eventName !== '' && eventName != "undefined"){
		$('#text_event_name').text("Event name: " + eventName);
	}
});

angular.module('create-event-app', ['firebase'])
.controller('newEventCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	console.log("enter create-event-app");
	// TODO: implementation of AdminCtrl
	
	// Initialize $scope.param as an empty JSON object
	$scope.param = {};
	$scope.editDescription = false;

	// Call Firebase initialization code defined in site.js
	initalizeFirebase();	
	
	var refPath, ref, eventName;

	eventName = getURLParameter("q");
	console.log("eventName (inside app):" + eventName)
	eventid = firebase.database().ref("event/").push().key;
	refPath = "event/"+ eventid + "/admin/param";	
	ref = firebase.database().ref(refPath);
		
	// Link and sync a firebase object
	$scope.param = $firebaseObject(ref);
	$scope.param.$loaded()
		.then( function(data) {
			// // Fill in some initial values when the DB entry doesn't exist
			$scope.param.eventName = eventName;
			if (typeof $scope.param.admin == "undefined"){
				$scope.param.admin = $scope.uid;
			}
			if (typeof $scope.param.description == "undefined"){
				$scope.param.description = "This is team form for " + eventName + ".";
			}
			if(typeof $scope.param.maxTeamSize == "undefined"){				
				$scope.param.maxTeamSize = 10;
			}			
			if(typeof $scope.param.minTeamSize == "undefined"){				
				$scope.param.minTeamSize = 1;
			}			
			if (typeof $scope.param.deadline =="undefined"){
				$scope.deadline = new Date(new Date().setDate(new Date().getDate()+30));
				//outside new Date: change string to date object, 2nd Date: create date, 3 rd Date: get today day
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
			$('#admin_page_controller').show(); 				
		}) 
		.catch(function(error) {
			// Database connection error handling...
			console.error("Error:", error);
		});	
	
	refPath = "event/"+ eventid + "/team";	
	$scope.team = [];
	$scope.team = $firebaseArray(firebase.database().ref(refPath));

	refPath = "event/"+ eventid + "/member";
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

	$scope.changeTeamName = function(){
		$('#text_event_name').text("Event name: " + $scope.param.eventName);
		if ($scope.editDescription == false){
			$scope.param.description = "This is team form for " + $scope.param.eventName + ".";
		}
	}

	$scope.changeDescription = function(){
		$scope.editDescription = true;
	}

	$scope.saveFunc = function() {
		$scope.param.deadline =$scope.deadline.toISOString(); 
		$scope.param.$save();
		// Finally, go back to the front-end
		window.location.href= "admin.html?q="+eventid;
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