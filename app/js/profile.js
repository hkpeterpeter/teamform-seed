


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
        $scope.profile.gender = $scope.input.gender;
        $scope.profile.birth = $scope.input.birth;
        $scope.profile.star = $scope.input.star;
        $scope.profile.location = $scope.input.location;
        $scope.profile.description = $scope.input.description;

        $scope.profile.$save();
      }
    }
    $scope.SkillTemp = "";
    $scope.addSkill = function(){

        $scope.profile.skills.push($scope.SkillTemp);
        $scope.profile.$save();

    }

    $("#file").on("change", function(event){
      selectedFile = event.target.files[0];
      $("#uploadButton").show();

    });

    $scope.uploadFile = function(){
      var filename = selectedFile.name;
      var storageRef = firebase.storage().ref('/profilepic' + filename);
      var uploadTask = storageRef.put(selectedFile);

      uploadTask.on('state_changed', function(snapshot){
      },function(error){


      },function(){
        $scope.profile.pic = uploadTask.snapshot.downloadURL.toString();
        $scope.profile.$save();
        console.log($scope.profile.pic);
      });
    }

    




    // var ref = firebase.database().ref("profileApp");
		// $scope.profile = $firebaseArray(ref);



}]);
