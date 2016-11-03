angular.module('profile-app', ['firebase'])
.controller('ProfileCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window',function($scope, $firebaseObject, $firebaseArray, $window) {
	//init firebase
	initalizeFirebase();

    $scope.userData = {
        name: '',
        language: [],
        gpa: 0
    }
    $scope.txtLanguage = '';
    
    //users is array of users
    var ref = firebase.database().ref('users');
    $scope.users = $firebaseArray(ref);

	
	//logout function
	$scope.logout = function(){
		firebase.auth().signOut();
	}

    //Add language
    $scope.addLanguage = function(){
        $scope.userData.language.push($scope.txtLanguage);
        $scope.txtLanguage = '';
    }

    //Submit userData
    $scope.submitUserData = function(){
        var database = firebase.database();
        var currentUser = firebase.auth().currentUser;
        database.ref('users/'+currentUser.uid).set($scope.userData);
        console.log(currentUser.uid);
        console.log('Submitted');
    }

   




	firebase.auth().onAuthStateChanged(user => {
		if(user){
			console.log('logged in');
        }else{
			console.log('not log in');
            $window.location.href = '/index.html';
		}
	})

  



}]);