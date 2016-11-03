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
.controller('LoginCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
	//init firebase
	initalizeFirebase();
	$scope.txtEmail = '';
	$scope.txtPassword = '';
	$scope.showLogout  = false;
	$scope.displayEmail = '';
	
	//login function
	$scope.login = function(){
		const email = $scope.txtEmail;
		const pass = $scope.txtPassword;
		console.log(email);
		console.log(pass);
		const auth = firebase.auth();
		//Sign in
		const promise = auth.signInWithEmailAndPassword(email,pass);
		promsie.catch(e => console.log(e.message));
	}

	//signup function
	$scope.signup = function(){
		const email = $scope.txtEmail;
		const pass = $scope.txtPassword;
		console.log(email);
		console.log(pass);
		const auth = firebase.auth();
		//Sign up
		const promise = auth.createUserWithEmailAndPassword(email,pass);
		promsie.catch(e => console.log(e.message));
	}

	//logout function
	$scope.logout = function(){
		firebase.auth().signOut();
	}

	//Change showLogout
	$scope.changeShowLogout = function(bool){
		$scope.showLogout = bool;
	}

	firebase.auth().onAuthStateChanged(user => {
		if(user){
			console.log(user);
			$scope.changeShowLogout(true);
			console.log($scope.showLogout);
			$scope.displayEmail = user.email;
			$scope.$apply();
		}else{
			console.log('not log in');
			$scope.changeShowLogout(false);
			$scope.$apply();
		}
	})


}]);