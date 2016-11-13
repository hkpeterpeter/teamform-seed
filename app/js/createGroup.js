var app = angular.module("createGroupApp", ["firebase"]);

app.controller("createGroupCtrl",
 function($scope, $firebaseArray){
	//init Firebase
	//initalizeFirebase();

	//var ref = firebase.database().ref('created_group');
	//var teamList = $firebaseArray(ref);

	$scope.team = {
		id: "",
		name: "",
		max: 2,
		destination: "",
		departure_date: "",
		return_date: "",
		preference: "",
		estimated_budget_per_person: "",
		descriptions: "",
		language_for_communication: "",
		members: [],
		tags: []
	};

	$scope.tempTeam = {
		//id: "",
		name: "",
		max: 2,
		//destination: "",
		//departure_date: "",
		//return_date: "",
		preference: "N",
		estimatedBudgetPerPerson: 100,
		//descriptions: "",
		//language_for_communication: "",
		//members: [],
		//tags: []
	};	
	/***********************************************************************
		set team name:
		1. can't be empty
		-->2. can't use the same name again
			- compare with all team.name in firebase
		3. not less than 3 words and not longer than 50 words
	************************************************************************/
	$scope.setTeamName = function(){
		if($scope.tempTeam.name == ""){
			alert("Team name cannot be empty!");
			return;
		}else if($scope.tempTeam.name.length < 3){
			alert("Team name should be shorter than 3 words!");
			return;
		}else if($scope.tempTeam.name.length > 50){
			alert("Team name should not be longer than 50 words!");
			return;
		}

		
	};

	// set maximun number of team member
	$scope.setMaxTeamMember = function(change){
		if($scope.tempTeam.max == 20 && change == 1){
			alert("Our website can only form a group with not more than 20 members.");
			return;
		} else if($scope.tempTeam.max == 2 && change == -1){
			alert("Our website can only form a group with more than 2 members");
			return;
		}

		$scope.tempTeam.max += change;
	};

	// set sex perference: M = Male, F = Female, N = No perference
	$scope.setSexPreference = function(sexPreference){
		$scope.tempTeam.preference = sexPreference;
	};

	// set budget per person
	/**************************************************************************
		1. In US dollars
		2. $100 <= budget <= $100000
	***************************************************************************/
	$scope.setEstimateBudgetPerPerson = function(){
		if($scope.tempTeam.estimatedBudgetPerPerson < 100){
			$scope.tempTeam.estimatedBudgetPerPerson = 100;
			alert("Budget should not be less than $100.");
			return;
		} else if($scope.tempTeam.estimatedBudgetPerPerson > 100000){
			$scope.tempTeam.estimatedBudgetPerPerson = 100;			
			alert("Budget should not be larger than 100000.");
			return;
		}

	};

	// add group into firebase
	$scope.createGroup = function(teamName){
		//$scope.setTeamName
	};

});