angular.module('profile-app', ['firebase'])
.controller('ProfileCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$window',function($scope, $firebaseObject, $firebaseArray, $window) {
	//init firebase
	initalizeFirebase();
    
    $scope.userData = {
        name: 'default',
        language: [],
        gpa: 0,
        team: [],
        description: '',
        eventlist:{},
        userid: ''
    }
    $scope.txtLanguage = '';
    $scope.username ='';
    
    //$scope.users is an array of users in firebase
    var ref = firebase.database().ref('users');
    $scope.users = $firebaseArray(ref);

    //test eventlist
    // $scope.testeventlist = function(){
    //     var currentUser = firebase.auth().currentUser;
    //     var database = firebase.database();
    //     var ref = database.ref('users/'+currentUser.uid);
    //     var currentUserData = $firebaseObject(ref);
    //     currentUserData.$loaded()
    //         .then(function(data){
    //             console.log(data.eventlist);
    //             data.eventlist.eventid3 = {name:'event3'};
    //             console.log(data.eventlist);
    //             data.$save();
    //             })
    //         .catch(function(error){
    //             console.error("Error: "+error);
    //         });
    // }
	
	//logout function
	$scope.logout = function(){
		firebase.auth().signOut();
	}

    //Add language
    $scope.addLanguage = function(){
        if($scope.userData.language==null){
            $scope.userData.language = [];
            $scope.userData.language.push($scope.txtLanguage);
        }else{
            $scope.userData.language.push($scope.txtLanguage);
        }
        $scope.txtLanguage = '';
    }

    //Remove language
    $scope.removeLanguage = function(lan){
        console.log('remove pressed');
        $scope.userData.language.splice($scope.userData.language.indexOf(lan),1);
    }

    //check userdata(Name,language,gpa cannot be null)
    $scope.checkUserData = function(){
        if($scope.userData.name == null){
            $window.alert('Name cannot be null');
            return false;
        }else if($scope.userData.language == null){
            $window.alert('Language cannot be null');
            return false;
        }else if($scope.userData.gpa == null){
            $window.alert('gpa cannot be null');
            return false;
        }else{
            return true;
        }
    }

    //Submit u-fixserData
    //this will only submit name, language, gpa and description
    $scope.submitUserData = function(){
        if($scope.checkUserData() == false){
            $window.alert('Please correct your profile')
            return;
        }
        var database = firebase.database();
        var currentUser = firebase.auth().currentUser;
        //add user data under users/currentUser.uid
        //database.ref('users/'+currentUser.uid).set($scope.userData);
        var ref = database.ref('users/'+currentUser.uid);
        var currentUserData = $firebaseObject(ref);
        currentUserData.$loaded()
            .then(function(data){
                data.name = $scope.userData.name;
                data.language = $scope.userData.language;
                data.gpa = $scope.userData.gpa;
                data.description = $scope.userData.description;
                data.$save()
                    .then(function(s){
                        console.log('saved');
                        $window.alert('You have submitted your profile');
                        $scope.refreshInput();
                    })
                    .catch(e=>console.log(e));
                console.log('done');
                })
            .catch(function(error){
                console.error("Error: "+error);
            });
        console.log(currentUser.uid);
        console.log('Submitted');
       // $scope.refreshInput();
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
                    console.log(data.language);
                    $scope.userData.language = currentUserData.language;
                    $scope.userData.eventlist = currentUserData.eventlist;
                    $scope.username = currentUserData.name;
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
                    // $scope.userData.description = currentUserData.description;
                    if(currentUserData.description == null){
                        $scope.userData.description = '';
                    }else{
                        $scope.userData.description = currentUserData.description;
                    }
                    if(currentUserData.eventlist == null){
                        $scope.userData.eventlist = {};
                    }else{
                        $scope.userData.eventlist = currentUserData.eventlist;
                    }
                    $scope.userData.language = currentUserData.language;
                    $scope.username = currentUserData.name;
                    $scope.userData.userid = user.uid;
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