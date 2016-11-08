angular.module('profile-app', ['firebase'])
.controller('ProfileCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window',function($scope, $firebaseObject, $firebaseArray, $window) {
	//init firebase
	initalizeFirebase();
    
    $scope.userData = {
        name: 'default',
        language: [],
        gpa: 0,
        team: [],
        description: ''
    }
    $scope.txtLanguage = '';
    $scope.username ='';
    
    //$scope.users is an array of users in firebase
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

    //Remove language
    $scope.removeLanguage = function(lan){
        console.log('remove pressed');
        $scope.userData.language.splice($scope.userData.language.indexOf(lan),1);
    }

    //Submit userData
    $scope.submitUserData = function(){
        var database = firebase.database();
        var currentUser = firebase.auth().currentUser;
        //add user data under users/currentUser.uid
        database.ref('users/'+currentUser.uid).set($scope.userData);
        console.log(currentUser.uid);
        console.log('Submitted');
        $scope.refreshInput();
    }

    //refresh input box
    $scope.refreshInput = function(){
        var currentUser = firebase.auth().currentUser;
        var database = firebase.database();
        var ref = database.ref('users/'+currentUser.uid);
        var currentUserData = $firebaseObject(ref);
            currentUserData.$loaded()
                .then(function(data){
                    console.log(data===currentUserData);
                    console.log(currentUserData.name);
                    $scope.userData.name = currentUserData.name;
                    $scope.userData.gpa = currentUserData.gpa;
                    $scope.userData.team = currentUserData.team;
                    $scope.userData.language = currentUserData.language;
                    console.log('refreshed');
                   // $scope.$apply();
                })
                .catch(function(error){
                    console.error("Error: "+error);
                });
    }



    //monitor if the user is logged in or not
	firebase.auth().onAuthStateChanged(user => {
		if(user){
			console.log('logged in');
            var database = firebase.database();
            var ref = database.ref('users/'+user.uid);
            var currentUserData = $firebaseObject(ref);
            currentUserData.$loaded()
                .then(function(data){
                    console.log(data===currentUserData);
                    console.log(currentUserData.name);
                    $scope.userData.name = currentUserData.name;
                    $scope.userData.gpa = currentUserData.gpa;
                    $scope.userData.team = currentUserData.team;
                    $scope.userData.description = currentUserData.description;
                    $scope.userData.language = currentUserData.language;
                    $scope.username = currentUserData.name;
                })
                .catch(function(error){
                    console.error("Error: "+error);
                });
            $scope.loggedIn = true;
        }else{
			console.log('not log in');
            $window.location.href = '/index.html';
		}
	})
}]);