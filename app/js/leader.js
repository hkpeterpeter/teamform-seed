angular.module('leader-app', ['firebase'])
.controller('LeaderCtrl', ['$scope', '$firebaseObject', '$firebaseArray','$window', function($scope, $firebaseObject, $firebaseArray,$window) {


    //sth that should be include for navbar
	$scope.loggedIn = true;
	// Call Firebase initialization code defined in site.js
	initalizeFirebase();	

    //eventid & teamid from url
    $scope.eventid = getURLParameter("eventid");
    $scope.teamid = getURLParameter("teamid");

    //team description, preference
    $scope.teamDescription = '';
    $scope.preference = [];
    $scope.addpreference = '';
    $scope.filtedUsers = [];

    //change description
    $scope.changeDescription = function(){
        console.log('click change')
        var db = firebase.database();
        var teamRef  = db.ref('events/'+$scope.eventid+'/teams/'+$scope.teamid);
        var teamData = $firebaseObject(teamRef);
        teamData.$loaded()
            .then(function(data){
                console.log($scope.teamDescription);
                teamData.description = $scope.teamDescription;
                teamData.$save()
                    .then(function(s){
                        console.log('saved');
                    })
                    .catch(e=>console.log(e));
            })
            .catch(e=>console.log(e));
    }
    
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
	
    //addpreference
    $scope.addPre = function(){
        console.log('addPre pressed');
        $scope.preference.push($scope.addpreference);
        $scope.preference.sort();
        $scope.addpreference = '';
        var db = firebase.database();
        var teamRef  = db.ref('events/'+$scope.eventid+'/teams/'+$scope.teamid);
        var teamData = $firebaseObject(teamRef);
        teamData.$loaded()
            .then(function(data){
                teamData.preference = $scope.preference;
                teamData.$save()
                    .then(function(s){
                        console.log('saved');
                    })
                    .catch(e=>console.log(e));
            })
            .catch(e=>console.log(e));
    }
    //filter
        $scope.filterPre = function(){
            $scope.filtedUsers = [];
        console.log('filterPre pressed');
        var db = firebase.database();
        var teamRef  = db.ref('events/'+$scope.eventid+'/teams/'+$scope.teamid);
        var teamData = $firebaseObject(teamRef);   

        var ref = firebase.database().ref('users');
        var u = $firebaseArray(ref);

        u.$loaded()
         .then(function(data){
            console.log(u);
            angular.forEach(u, function(user){
                var haveAllPre = true;
                for (var i = teamData.preference.length - 1; i >= 0; i--) {
                   var haveThisPre = false;
                   for (var j = user.language.length - 1; j >= 0; j--) {
                     if(teamData.preference[i]==user.language[j]){
                         haveThisPre = true;
                        }
                     }
                   if(!haveThisPre){
                      haveAllPre = false;
                      }
                    } 
                if(haveAllPre){
                    var userR = firebase.database().ref('users/'+user.$id+'/teams/'+$scope.eventid);
                    var uEvent = $firebaseObject(userR);
                    uEvent.$loaded()
                        .then(function(data){
                            console.log(uEvent.role);
                            if(uEvent.role == null || uEvent.role == "null"){
                               $scope.filtedUsers.push(user);

                          }
                        })
                        .catch(e=>console.log(e));
                  }   
             });
         });

        
    }

      

        


    //removepreference
    $scope.removePre = function(target){
        console.log('remove clicked');
        console.log($scope.preference.indexOf(target));
        $scope.preference.splice($scope.preference.indexOf(target),1);
        var db = firebase.database();
        var teamRef  = db.ref('events/'+$scope.eventid+'/teams/'+$scope.teamid);
        var teamData = $firebaseObject(teamRef);
        teamData.$loaded()
            .then(function(data){
                teamData.preference = $scope.preference;
                teamData.$save()
                    .then(function(s){
                        console.log('saved');
                    })
                    .catch(e=>console.log(e));
            })
            .catch(e=>console.log(e));

    }

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
            //teamData
            var teamRef  = database.ref('events/'+$scope.eventid+'/teams/'+$scope.teamid);
            var teamData = $firebaseObject(teamRef);
            teamData.$loaded()
                .then(function(data){
                    console.log(data);
                    console.log('teamData loaded');
                    console.log(teamData.description);
                    if(teamData.preference == null){
                        $scope.preference = [];
                    }else{
                        $scope.preference = teamData.preference;
                    }
                    if(teamData.description == null){
                        $scope.teamDescription = '';
                    }else{
                        $scope.teamDescription = teamData.description;
                    }
                });
            }else{
			console.log('not log in');
            $window.location.href = '/index.html';
		}
	})
}]);

