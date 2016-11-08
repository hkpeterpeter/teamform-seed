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
	$scope.userData = {
        name: $scope.displayEmail,
        language: [],
        gpa: 0,
        team: [],
        description: ''
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
							name: 'default',
							language: ['C++'],
							gpa: 3,
							team: ['null']
						});
					}
					$scope.userData.name = usersArray.$getRecord(user.uid).name;
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