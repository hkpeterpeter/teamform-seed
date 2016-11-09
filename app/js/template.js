function logout(){
firebase.auth().signOut();
}

angular.module('___-app', ['firebase'])
.controller('n____Ctrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window',function($scope, $firebaseObject, $firebaseArray, $window) {
	//init firebase
	initalizeFirebase();
    
    $scope.username ='';
    
    //$scope.users is an array of users in firebase
    var ref = firebase.database().ref('users');
    $scope.users = $firebaseArray(ref);
	
	//logout function
	$scope.logout = function(){
		firebase.auth().signOut();
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