$(document).ready(function(){

    $("#btn_admin").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "admin.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });

    $("#btn_leader").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "team.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });

    $("#btn_member").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "member.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });


});

angular.module('index-app', ['firebase'])
.controller('LoginCtrl', ['$scope', '$firebaseObject', '$firebaseArray','$window', function($scope, $firebaseObject, $firebaseArray,$window) {
	//init firebase
	initalizeFirebase();
	$scope.txtEmail = '';
	$scope.txtPassword = '';
	$scope.loggedIn  = false;
	$scope.displayEmail = '';
	$scope.username='';

	$scope.newEventname='';

	//testing abt firebase
	var ref = firebase.database().ref('events');
    $scope.events = $firebaseArray(ref);

	//enter event
	$scope.enterEvent =function(eventid){

		var database = firebase.database();
        var currentUser = firebase.auth().currentUser;
		var refpath = "users/" + currentUser.uid + "/teams";
        var ref = database.ref(refpath);
        var teamList = $firebaseArray(ref);

		teamList.$loaded()
			.then(function(x){
				console.log(teamList.$getRecord(eventid));
				if (teamList.$getRecord(eventid) == null){
				//the first time the user enters an event
					var userTeamRefPath = refpath + '/' + eventid;
					var userTeamRef = firebase.database().ref(userTeamRefPath);
					adminData = $firebaseObject(userTeamRef);
					adminData.role = {};
					adminData.role = "null";
					adminData.$save();

					var url = "event.html?q=" + eventid;
    				window.location.href = url;
					return true;

				}else if (teamList.$getRecord(eventid).role == "admin"){
				//the user is the admin of the event
					var url = "admin.html?q=" + eventid;
    				window.location.href = url;
					return true;
				}else if (teamList.$getRecord(eventid).role == "leader"){
				//the user is the one of the leaders of a team of the event
					var url = "leader.html?q=" + eventid;
    				window.location.href = url;
					return true;
				}else if (teamList.$getRecord(eventid).role == "member"){
				//the user is the one of the members of a team of the event
					var url = "member.html?q=" + eventid;
    				window.location.href = url;
					return true;
				}else if (teamList.$getRecord(eventid).role == "null"){
				//the user has not yet enter a team
					var url = "event.html?q=" + eventid;
    				window.location.href= url;
					return true;
				}
			});
	}
	
	//create new event
	$scope.createNewEvent =function (eventname){
		var val = $('#eventName').val();
		if (val == '' ){
			var url = "createEvent.html?q=" + val;
    		window.location.href= url ;
    		return false;
		//todo: check if the event already exsist
		}else if ( $scope.isEventExist(val) ) {
    	 	$window.alert("Event ", val , "already exist.");
			 return false;
    	}else{
			var url = "createEvent.html?q=" + val;
    		window.location.href = url;
    		return true;
		}
	}

	//check if event exist//not work for new firebase
	$scope.isEventExist = function(eventname){
		var eventsRef = firebase.database().ref('events');
		var eventList = $firebaseArray(eventsRef);
		eventList.$loaded()
			.then(function(x){
				console.log(eventList.$getRecord(eventname));
				if(eventList.$getRecord(eventname) == null){
					return false;
				}
			});
	}

	//login function
	$scope.login = function(){
		const email = $scope.txtEmail;
		const pass = $scope.txtPassword;
		console.log(email);
		console.log(pass);
		const auth = firebase.auth();
		//Sign in
		auth.signInWithEmailAndPassword(email,pass)
			.then(user =>{
				console.log('promise is done');
				$window.alert("You have successfully loggedin");
			}).catch(e => {
				console.log(e.message);
				$window.alert(e.message);
				});
	}

	//signup function
	$scope.signup = function(){
		const email = $scope.txtEmail;
		const pass = $scope.txtPassword;
		console.log(email);
		console.log(pass);
		const auth = firebase.auth();
		//Sign up
		auth.createUserWithEmailAndPassword(email,pass)
			.then(user =>{
				console.log('promise is done');
				$window.alert("You have successfully signed up");
			} )
			.catch(e =>{
				 console.log(e.message);
				 $window.alert(e.message);
			});
	}

	//logout function
	$scope.logout = function(){
		firebase.auth().signOut();
	}

	//Change LoggedIn
	$scope.changeLoggedIn = function(bool){
		$scope.loggedIn = bool;
	}

	firebase.auth().onAuthStateChanged(user => {
		if(user){
			console.log(user);
			$scope.changeLoggedIn(true);
			console.log($scope.loggedIn);
			$scope.displayEmail = user.email;
			$scope.userData={};
			$scope.$apply();

			var usersRef = firebase.database().ref('users');
			var usersArray = $firebaseArray(usersRef);
			usersArray.$loaded()
				.then(function(x){
					console.log(usersArray.$getRecord(user.uid));
					if(usersArray.$getRecord(user.uid) == null){
						console.log('it is null and i am setting new profile for it');
						firebase.database().ref('users/'+user.uid).set({
							name: user.email,
							language: ['C++'],
							gpa: 3,
							team: ['null'],
							test: 'never change'
						});
						$scope.username = user.email;
					}else{
						$scope.username = usersArray.$getRecord(user.uid).name;
					}

					// $scope.username = usersArray.$getRecord(user.uid).name;
					// $scope.username = user.email;

				})
				.catch(function(error){
					console.log("Error:"+error);
				});
		}else{
			console.log('not log in');
			$scope.changeLoggedIn(false);
			$scope.$apply();
		}
	})

	//show event list in the index.html when people login the homepage
			// var eventRef = firebase.database().ref('event');
			// var eventArray = $firebaseArray(eventRef);
			// var allParam = ;
			// for( eachEvent in eventArray){
			// allParam += eachEvent.admin.param;
			// }
			// $scope.currentEventList = allParam;

}]);