app.controller("TeamCtrl", ["$scope", "$firebaseAuth", "$firebaseArray",
    function($scope, $firebaseAuth, $firebaseArray) {

        $scope.authObj = $firebaseAuth();


        var ref = firebase.database().ref('Course');
        $scope.course = $firebaseArray(ref);
        console.log($scope.course);

        $scope.team = {
        	name : "",
        	info : "",
        }


        $scope.setCourse = function(ID){
        	var courseID = ID;
        	$scope.path = "Course" + "/" +ID + "/"+ "Team";
        	var courseRef = firebase.database().ref($scope.path);
        	$scope.TeamofChosen = $firebaseArray(courseRef)
        }

        $scope.createTeam = function(){
        	$scope.team.lader = $scope.currentUid;
        	var courseRef = firebase.database().ref($scope.path);
        	var coursePath = $firebaseArray(courseRef);

        	coursePath.$add($scope.team);    
        }

        $scope.joinTeam = function(JoinID){
        	var JoinTeamRef = firebase.database().ref($scope.path + "/" + JoinID + "/" + "Member");
        	var JoinTeamPath = $firebaseArray(JoinTeamRef);
        	JoinTeamRef.push($scope.currentUid);
        }
        

    }
]);