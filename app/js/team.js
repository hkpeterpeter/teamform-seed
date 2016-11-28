angular.module("teamform-team-app", ["firebase"])
    .controller("TeamCtrl", function($scope, $firebaseArray) {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAlt_yl9mLcadDyhjtT2h4Ct9DDCxjGL4M",
            authDomain: "comp3111-5fbe5.firebaseapp.com",
            databaseURL: "https://comp3111-5fbe5.firebaseio.com",
            storageBucket: "comp3111-5fbe5.appspot.com",
            messagingSenderId: "946291658553"
        };
        firebase.initializeApp(config);
        var teamId = getURLParameter("teamId");
        var ref = firebase.database().ref("members");
        var refT = firebase.database().ref("teams");
        $scope.mems = $firebaseArray(ref);
        $scope.teams = $firebaseArray(refT);
        $scope.user = null;
        $scope.teamsJoined = [];
		var indexTeamOption = 0;
		var indexTeamObj = 0;
        $scope.membersAll = [];

		$scope.checkAuth = function(index) {
			var user = firebase.auth().currentUser;
			var team = $scope.teamsJoined[index];
			indexTeamObj = team;
			var members = team.members;
			var can = false;
			var memId;
			for(var i = 0; i < $scope.membersAll.length; i++) {
				if($scope.membersAll[i].uid == user.uid) {
					memId = i;
					break;
				}
			}

			for(var i = 0; i < members.length; i++) {
				// console.log(members[i] + " vs " + $scope.membersAll[memId].id)
				if(members[i] == $scope.membersAll[memId].id) {
					// console.log("can");
					can = true;
					break;
				} else {

				}
			}

			if(can == true) {
				indexTeamOption = index;
				$("#modifyDialog").dialog();
				$("#modifyDialog").dialog('option', 'title', team.name);

				// change params
				$("#dateD").val(team.departure_date);
				$("#des").val(team.descriptions);
				$("#dest").val(team.destination);
				$("#ebp").val(team.estimated_budget_per_person);
				$("#lang").val(team.language_for_communication);
				$("#mnp").val(team.max);
				$("#pre").val(team.preference);
				$("#dateR").val(team.returnDate);
			} else {
				alert("You are not authorised to modify this team!");
			}
		};

	$("#modiForm").submit(function (event) {
		var dateD = $("#dateD").val();
		var des = $("#des").val();
		var dest = $("#dest").val();
		var ebp = $("#ebp").val();
		var lang = $("#lang").val();
		var mnp = $("#mnp").val();
		var pre = $("#pre").val();
		var dateR = $("#dateR").val();

		$input = {
			departure_date: dateD,
			descriptions: des,
			destination: dest,
			estimated_budget_per_person: ebp,
			id: indexTeamObj.id,
			language_for_communication: lang,
			max: mnp,
			members: indexTeamObj.members,
			name: indexTeamObj.name,
			preference: pre,
			returnDate: dateR,
			tags: indexTeamObj.tags
		}

		console.log($input);
		console.log(indexTeamOption);
		// set data
		$scope.teams.$ref().child(indexTeamOption).set($input).then(function() {
			$("#modifyDialog").dialog('close');
			alert("Success!");
  		});
    });


		
        firebase.auth().onAuthStateChanged(function(user) {
            $scope.mems.$loaded()
                .then(function(x) {
                    $scope.membersAll = $scope.mems;
                    var loggedInId = "";
                    if (user) {
                        var email = user.email;
                        var canStop = false;

                        if (canStop == false)
                            for (var i = 0; i < $scope.mems.length; i++) {
                                // console.log($scope.mems[i].email + " vs " + email);
                                if ($scope.mems[i].email == email) {
                                    $scope.user = $scope.mems[i];
                                    loggedInId = i;
                                    break;
                                }
                            }
                            // console.log(user);
                    } else {
                        // No user is signed in.
                    }

                    $scope.teams.$loaded()
                        .then(function(x) {
                            if (user) {
                                var memberId_searched = "";
                                memberId_searched = loggedInId;
                                // console.log(memberId_searched);
                                var canStop = false;
                                for (var i = 0; i < $scope.teams.length; i++) {
                                    if (canStop == true) break;
                                    // console.log($scope.mems[i].email + " vs " + email);
                                    var members = $scope.teams[i].members;
                                    var len = $scope.teams[i].members.length;
                                    for (var j = 0; j < len; j++) {
                                        if (teamId != null && teamId.trim().length != 0 && user != null && teamId != undefined && $scope.teams[i].id == teamId) {
                                            $scope.teamsJoined.push($scope.teams[i]);
                                            canStop = true;
                                            break;
                                        }
                                        if (members[j] == memberId_searched && !(teamId != null && teamId.trim().length != 0 && user != null && teamId != undefined)) {
                                            $scope.teamsJoined.push($scope.teams[i]);
                                            break;
                                        }
                                    }
                                }

                                // console.log($scope.teamsJoined);
                                // console.log(user);
                            } else {
                                // No user is signed in.
                            }
                        })
                        .catch(function(error) {
                            console.log("Error:", error);
                        });
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });
        });
    });