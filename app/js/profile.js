


angular.module('teamform-profile-app', ['firebase'])
.controller('profileinput', ['$firebaseAuth','$scope', '$firebaseObject', '$firebaseArray', function($firebaseAuth, $scope, $firebaseObject, $firebaseArray){

	// Implementation the todoCtrl
    $scope.uid = null;

    initalizeFirebase();


    $scope.input = {
      name: "",
      gender: "",
			uid: $scope.uid,
			pic: "",
			birth: "",
			star: "",
      personality:"",
      location:"".toLowerCase(),
      like: 0,
      skills:[],
      description:""

		};

    $scope.auth=$firebaseAuth();
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      if (firebaseUser) {
        $scope.uid = firebaseUser.uid;
        console.log("Signed in as:", firebaseUser.uid);

        var path= "profile/"+$scope.uid;
        $scope.ref = firebase.database().ref(path);
        $scope.profile = $firebaseObject($scope.ref);
        // $scope.profile = $firebaseArray(ref);
        $scope.profile.$loaded()
          .then( function(data) {
            for (var key in $scope.input) {
              if (typeof $scope.profile[key]=="undefined") {
                $scope.profile[key]= $scope.input[key];
              }
            }
            // if (typeof $scope.input.skills=="undefined"){
            //   $scope..input.skills = [];
            // }

            console.log(data);
          })
          .catch(function(error) {
            // Database connection error handling...
            console.error("Error:", error);
          });

      } else {
        console.log("Signed out");
      }
    });

    $scope.saveProfile = function() {
      if ( $scope.input.name != "" && $scope.input.gender != "" && $scope.input.birth != "" && $scope.input.star != "" && $scope.input.location != "" && $scope.input.description != ""  ) {
        // $scope.input.date = new Date().toString();
        // $scope.input.likes = 0;
        // add an input question
        // for (var key in $scope.input) {
        //
        //     $scope.profile[key] = $scope.input[key];
        //
        // }
        $scope.profile.name = $scope.input.name;
        $scope.input.gender = $scope.input.gender;
        $scope.input.birth = $scope.input.birth;
        $scope.input.star = $scope.input.star;
        $scope.input.location = $scope.input.location;
        $scope.input.description = $scope.input.description;

        $scope.profile.$save();
      }
    }
    $scope.SkillTemp = "";
    $scope.addSkill = function(){

        $scope.profile.skills.push($scope.SkillTemp);
        $scope.profile.$save();

    }






    // var ref = firebase.database().ref("profileApp");
		// $scope.profile = $firebaseArray(ref);



}]);
