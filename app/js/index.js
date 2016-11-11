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

angular
.module('index-app', ['firebase'])
.controller('LoginCtrl', ['$scope', '$firebaseObject', '$firebaseArray','$window', function($scope, $firebaseObject, $firebaseArray,$window) {
	//init firebase
	initalizeFirebase();
	$scope.txtEmail = '';
	$scope.txtPassword = '';
	$scope.loggedIn  = false;
	$scope.displayEmail = '';
	$scope.username='';

	$scope.eventName='';

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
					var url = "leader.html?eventid=" + eventid + "&teamid=" + teamList.$getRecord(eventid).teamid;
    				window.location.href = url;
					return true;
				}else if (teamList.$getRecord(eventid).role == "member"){
				//the user is the one of the members of a team of the event
					var url = "member.html?eventid=" + eventid + "$teamid=" + teamList.$getRecord(eventid).teamid;
    				window.location.href = url;
					return true;
				}else if (teamList.$getRecord(eventid).role == "null"){
				//the user has not yet enter a team
					var url = "event.html?q=" + eventid;
    				window.location.href= url;
					return true;
				}else if (teamList.$getRecord(eventid).role == ""){
				//the user has not yet enter a team
					var url = "event.html?q=" + eventid;
    				window.location.href= url;
					return true;
				}
			});
	}

	//filter test for rule.*
	// $scope.matchRuleShort = function(str, rule){
	// 	var matchtest = new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
	// 	console.log("match: " + matchtest);
	// 	return matchtest;
	// }
    //filter for *.rule and rule.*
	$scope.matchRule = function(str, rule){
		var matchtest = new RegExp(rule).test(str);
		console.log("match: " + matchtest);
		return matchtest;
	}

	$scope.filter = function(eventname){
	//	var rulename = $scope.eventName + "*";
	//	var reultRight=$scope.matchRuleShort(eventname, rulename);
		var rulename = $scope.eventName ;
		var reultLeft=$scope.matchRule(eventname, rulename);
		return (reultLeft);
	}

	
	
	//create new event
	$scope.createNewEvent =function (eventname){
		var val = $('#eventName').val();
		if (val == '' ){
			var url = "createEvent.html?q=" + val;
    		window.location.href= url ;
    		return false;
		//user can enter create event page with existing event name,  it will warning when user create it
    	}else{
			var url = "createEvent.html?q=" + val;
    		window.location.href = url;
    		return true;
		}
	}

	$scope.enterEventWithName=function(eventName){
		$scope.getEventid(eventName,function(result){
			console.log("get event id:" + result);
			if(result){
				console.log("found event");
				$scope.enterEvent(result);
			}else{//result = null
				//ask if user want to create new event
				console.log("cannot found event, ask user if they want to create new event");
				if (confirm(eventName+" is not existed. \n Do you want to create new event?")==true){
					console.log("create event "+ eventName);
					$scope.createNewEvent(eventName);
				}else{
					console.log("Canceled");
				}
			}
		})
	}
	
	$scope.getEventid = function(eventname, callback){
		console.log("get event id by eventname");
		console.log("eventname: "+ eventname);
		var ref = firebase.database().ref("events/");
		var eventsList = $firebaseObject(ref);
		var eventid = null;
		eventsList.$loaded(function(data) {
				data.forEach(function(eventObj, key){
					console.log("eventObj's key: "+key);
					if ((eventObj.admin.param.eventName == eventname)){
						console.log("found, callback eventid");
						eventid = key;
					}
				})
		}).then(function(){
			callback(eventid);
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
}]);