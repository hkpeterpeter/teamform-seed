app.controller("MyAuthCtrl", ["$scope", "$firebaseAuth"],
  function($scope, $firebaseAuth) {

  $scope.auth=$firebaseAuth();
	$scope.auth.$onAuthStateChanged(function(firebaseUser) {
  		if (firebaseUser) {
    		$scope.uid = firebaseUser.uid;
  		} 
  		else {
    		console.log("Signed out");
  		}
    });
// skills match	

	$scope.skillsmatch = function() {
    if ($scope.profile.skills != ""){
      var refPath = getURLParameter("q")+"/team/";
      var ref = firebase.database().ref(refPath);
      $scope.teams = $firebaseArray(ref);
      

      for(var team in $scope.teams){
        team.score = 0;
        for(var skill in profile.skills){
          if(team.skills.indexOf(skill) !== -1) team.score++;
        }
      }
      $scope.teams = orderBY(teams,'score',false);
      return $scope.teams;
      // for(index = 0; index < $scope.profile.skills.length; index++){
      //     skillsCollection.$ref().orderByKey("skills").equalTo($scope.profile.skills[index]).once("value", function(dataSnapshot){
      //     var teamfound = dataSnapshot.val();
      //     if(dataSnapshot.exists()){
      //       console.log("Found", teamfound);
      //     } 
      //     else {
      //       console.warn("Not found.");
      //     }
      //   });
      // } 
    }
  };

// personality match

  $scope.personalitymatch = function() {
    if ($scope.profile.personality != ""){

     $scope.teams.$ref().orderByKey("personality").equalTo($scope.profile.personality).once("value", function(dataSnapshot){
        var teamfound = dataSnapshot.val();
        if(dataSnapshot.exists()){
          console.log("Found", teamfound);
        } 
        else {
          console.warn("Not found.");
        }
      });
    }
  };

// star match

  $scope.starmatch = function() {
    if ($scope.profile.star != ""){

      var refPath = "team";
      var ref = firebase.database().ref(refPath);
      var starCollection = $firebaseArray(ref);
      $scope.teams.$ref().orderByKey("star").equalTo($scope.profile.star).once("value", function(dataSnapshot){
        var teamfound = dataSnapshot.val();
        if(dataSnapshot.exists()){
          console.log("Found", teamfound);
        } 
        else {
          console.warn("Not found.");
        }
      });
    }
  };
});