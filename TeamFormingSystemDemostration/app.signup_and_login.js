// app.controller("eventSubmit",
               
//     function($scope, $firebaseArray){
            

//         $scope.input = {
//             name:"",
//             intro:"",
//             holder:"",
//             state:false,
//             member:""
//             };

//         var ref=firebase.database().ref("events");
//         $scope.event = $firebaseArray(ref);
                
//         $scope.submit = function() {
//                     //$scope.input.state=true;
//                     //$scope.input.holder=1;
//                     ////$scope.input.holder=
//                     //$scope.event.$add($scope.input);
//                     //window.alert("Event create success!");
//                     //$scope.input.intro= "";
//                     //$scope.input.name= "";
//                     //$scope.nameTouched = false;
//                 var event=firebase.database().ref("events"); 
//                 return (event.push().set($scope.input));
//                 };

//         }
                         
// );
               


app.controller("AuthCtrl", [
                            "$scope", "Auth","$rootScope", '$state',
                            function($scope, Auth, $rootScope, $state) {

	var ref = firebase.database().ref();
   //new code
    var memberNoTeamRef=firebase.database().ref("memberWithNoTeam");
   //

    $scope.newMember = {
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

    $scope.lInput = {
        email: "",
        password: ""
    }
    
    
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
            $scope.newMember.position = $scope.position1==true?"designer":"" + "," + $scope.position2==true?"promotion":"" + "," + $scope.position3==true?"developer":"";
            $scope.newMember.uid=authData.uid;
            $scope.newMember.email = $scope.user.email;
            memberNoTeamRef.child(authData.uid).set($scope.newMember);
            //
        }).catch(function(error) {
            console.error("Error: ", error);
        });
    };
	
	$scope.signIn = function() {
        Auth.$signInWithEmailAndPassword($scope.lInput.email, $scope.lInput.password)
		.then(function(authData) {
            console.log("Logged in as:", authData.uid);
			$scope.LoginMessage = "Logged in as:" + authData.uid;
            $rootScope.id=authData.uid;
            $state.go('home');
		}).catch(function(error) {
			LoginMessage = "Authentication failed:" + error;
		});
    };
}]);
