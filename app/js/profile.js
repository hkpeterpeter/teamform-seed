$(document).ready(function(){
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {

            document.getElementById('name').textContent = user.displayName;
            document.getElementById('email').textContent = user.email;

            if (user.photoURL){
            	document.getElementById('photo').src = user.photoURL;
            	document.getElementById('photo').style.display = 'block';
          	} else {
    			photoURL = 'placeholder.svg';
            	document.getElementById('photo').src = photoURL;
    			document.getElementById('photo').style.display = 'block';
          	}
		}
		else {

		}
	});
}); 

angular.module('teamform-profile-app', ['firebase'])
.controller('ProfileCtrl', ['$scope', '$firebaseObject', '$firebaseArray', 
    function($scope, $firebaseObject, $firebaseArray) {


	// Call Firebase initialization code defined in site.js
	initalizeFirebase();

	var logged_in=getUID();

}]);