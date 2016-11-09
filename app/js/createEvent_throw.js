$(document).ready(function(){
	
	$('#admin_page_controller').hide();
	$('#text_event_name').text("Error: Invalid event name ");
	var eventName = getURLParameter("q");
	if (eventName != null && eventName !== '' ) {
	//	$('#text_event_name').text("Event name: " + eventName);
	}else{
		$('#text_event_name').text("Create new name");
	}

});

angular.module('teamform-admin-app', ['firebase'])
.controller('AdminCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	
	// TODO: implementation of AdminCtrl
	
	// Initialize $scope.param as an empty JSON object
	$scope.param = {};
			
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();	
	
	var eventName;

	eventName = getURLParameter("q");
	$scope.param.eventName = eventname;
	$scope.param.admin = $scope.uid;
	$scope.param.description = "This is teamform for " + $scope.eventName +".";
	$scope.param.maxTeamSize = 10;
	$scope.param.minTeamSize =1;
	$scope.deadline = new Date(new Date().setDate(new Date().getDate()+30));
	//outside new Date: change string to date object, 2nd Date: create date, 3 rd Date: get today day
	//date object to be model of html, but cannot save date object to firebase
	$scope.deadline=new Date();
	$scope.today=new Date();
	//load admin name
	var database = firebase.database();
	var adminRef = database.ref('users/'+$scope.param.admin);
	var adminData = $firebaseObject(adminRef);
	adminData.$loaded()
		.then(function(data){
			$scope.param.adminName = adminData.name;
		})
	// Enable the UI when the data is successfully loaded and synchornized
	$('#admin_page_controller').show();

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

	$scope.saveFunc = function() {
		$scope.param.deadline = $scope.deadline.toISOString();
		var eventRef= firebase.database().ref("event/");
		var eventID = eventRef.push().key;

		// var eventID = eventRef.push({eventName:$scope.eventName, admin:{
		// 	param:{admin:$scope.admin,deadline:$scope.deadline,description:$scope.description,
		// 		eventName:$scope.eventname,maxTeamSize:$scope.maxTeamSize, minTeamSize:$scope.minTeamSize 
		// }}});
		// Finally, go back to the admin page
		window.location.href= "admin.html?="+eventID;
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