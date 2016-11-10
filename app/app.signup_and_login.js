app.controller("AuthCtrl", ["$scope", "Auth","$rootScope", '$state', function($scope, Auth, $rootScope, $state) {

	var ref = firebase.database().ref();
   //new code
    var memberNoTeamRef=firebase.database().ref("memberWithNoTeam");
   //

    $scope.newMember[$scope.key] = {
        username:"",
        email:"",
        intro:"",
        team:"",
        uid:"",
        gender: "",
        phone:"",
        birth: "",
        position: "",
        skill: "",
        remark: ""
        };
    
    
    $scope.signUp = function() {
        Auth.$createUserWithEmailAndPassword($scope.user.email,$scope.user.password)
        .then(function(userData) {
            $scope.regMessage = "User " + userData.uid + " created successfully!";

            return Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password);
        }).then(function(authData) {
            console.log("Logged in as:", authData.uid);
            $rootScope.id=authData.uid;
            $state.go('login');
            //new code
            $scope.newMember.position = position1 + "," + position2 + "," + position3;
            $scope.newMember.uid=authData.uid;
            $scope.key = authData.uid;
            $scope.newMember.email = $scope.user.email;
            memberNoTeamRef.push().set($scope.newMember);
            //
        }).catch(function(error) {
            console.error("Error: ", error);
        });
    };
	
	$scope.signIn = function() {
        Auth.$signInWithEmailAndPassword($scope.lInput.email, $scope.lInput.password)
		.then(function(authData) {
			$scope.LoginMessage = "Logged in as:" + authData.uid;
            $rootScope.id=authData.uid;
		}).catch(function(error) {
			LoginMessage = "Authentication failed:" + error;
		});
    };
}]);
