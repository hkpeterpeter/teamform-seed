angular.module('leader-app', ['firebase'])
.controller('LeaderCtrl', ['$scope', '$firebaseObject', '$firebaseArray','$window', function($scope, $firebaseObject, $firebaseArray,$window) {


    //sth that should be include for navbar
	$scope.loggedIn = true;
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();	

    //eventid & teamid from url
    $scope.eventid = getURLParameter("eventid");
    $scope.teamid = getURLParameter("teamid");

    
   //create team function
    //  $scope.createTeam = function(){
    //      console.log('creating team');
    //      var ref = firebase.database().ref("events/"+$scope.eventid+"/teams");
    //      console.log(ref);
    //      var teamkey = ref.push().key;
    //      console.log(teamkey);
    //     var event = $firebaseObject(ref);
    //     event.$loaded()
    //         .then(function(data){
    //             console.log(data);
    //             var newteamRef = firebase.database().ref('events/'+$scope.eventid+'/teams/'+teamkey);
    //             var teamobject = $firebaseObject(newteamRef);
    //             teamobject.teamName = "test name";
    //             teamobject.$save();
    //         });
    // }

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
            console.log('leader.js')
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

