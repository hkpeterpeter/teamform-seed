//teamCtrl
app.controller("teamCtrl",
	// Implementation the todoCtrl
	function($scope, Auth, $firebaseArray, $firebaseObject, $stateParams, $filter, Helper, ngDialog, $state, $window) {

		$scope.form = {};
		$scope.eventID = $stateParams.eid;
		$scope.teamID = $stateParams.tid;

		$scope.leader_change = false;
		$scope.isDeletingTeamAnn = false;

		$scope.noSkillTags = false;
		$scope.noLanguageTags = false;
		$scope.noMannerTags = false;

		$scope.modifySkillTags = false;
		$scope.modifyLanguageTags = false;
		$scope.modifyMannerTags = false;

		$scope.newTeaminfo = {};

		$scope.statusList = {
			0 : "pending",
			1 : "accepted",
			2 : "declined",
			3 : "withdrawn"
		}

		Auth.$onAuthStateChanged(function(authData) {
				// console.log($scope.obj);
				if (authData) {
						$scope.userData = authData;

						ref=firebase.database().ref('users');
						$scope.users=$firebaseArray(ref);

						ref=firebase.database().ref('events/' + $scope.eventID + '/teams');
						$scope.teams = $firebaseArray(ref);
						//get role of user
						ref = firebase.database().ref('users/' + $scope.userData.uid + '/writable');
						$scope.myEvents = $firebaseObject(ref);
						// $scope.myEvents.$loaded().then(function(){
						//     //console.log($filter('teamId')($scope.myEvents[$scope.eventID]));
						//     invref = firebase.database().ref('events/' + $scope.eventID + "/teams/" + $filter('teamId')($scope.myEvents[$scope.eventID]) + "/invitations");
						//     $scope.inv = $firebaseObject(invref);
						// });
						// $scope.obj.$loaded().then(function(data){
						//     if($scope.obj[$scope.eventID]===undefine
						//         $scope.role="visitor";
						//     else
						//     {
						//         $scope.role=$scope.obj[$scope.eventID].position;
						//         $scope.teamID=$scope.obj[$scope.eventID].team;
						//         console.log($scope.obj[$scope.eventID]);
						//     }
						// })
						eventref = firebase.database().ref('users/' + $scope.userData.uid + '/writable');

// get the team id of team that user is in
						teamref=firebase.database().ref('users/' + $scope.userData.uid + '/writable/' + $scope.eventID );
						 			$scope.user_teamdata = $firebaseObject(teamref);


							//check whether user has already applied for a team
						var user_appli_ref = firebase.database().ref('users/' + $scope.userData.uid  + '/writable/' + $scope.eventID + '/applications');
						$scope.user_appli = $firebaseObject(user_appli_ref);
							// 		user_appli_ref.once('value', function (snapshot) {
							// 		   if (snapshot.hasChild($scope.teamID)) {

							// 					$scope.alreadyApplied = true;
							// 		  	}
							// 				else{
							// 					$scope.alreadyApplied = false;
							// 				}
							// 			}
							// 	);

				} else console.log("signed out");
		});
		//
		//
		// var ref=firebase.database().ref("users");
		// $scope.users = $firebaseArray(ref);

		// $scope.IsteamLeader = function(){
		// 	if ($scope.myEvents.team == $scope.teamID && $
		// }

		var main_ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
		$scope.teamdata = $firebaseObject(main_ref);

//child ref
		var memref = main_ref.child('members');
		var skilltagref = main_ref.child('tags').child('SkillTags');
		var featuretagref = main_ref.child('tags').child('MannerTags');
		var languagetagref = main_ref.child('tags').child('LanguageTags');
		var announceref = main_ref.child('announcements');
		var applicref = main_ref.child('applications');
		var inviteref = main_ref.child('invitations')


//get member
		var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/members');
		$scope.members = $firebaseObject(ref);


//get leader
		// var leaderref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/leader');
		// $scope.leader = $firebaseObject(leaderref);

//member functions
		// $scope.addMember = function(){
		// 	var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
		// 	var temp = {};
		// 	temp["2RB6DFylc1ZEoVFsuCsgbIYOaSz2"] = "2RB6DFylc1ZEoVFsuCsgbIYOaSz2";
		// 	ref.child('members').update(temp);
		// }
		//
		// $scope.deleteMember = function(){
		// 	memref.child("2RB6DFylc1ZEoVFsuCsgbIYOaSz2").remove();
		// }

		$scope.alreadyApplied = function(){
			if ($scope.user_appli[$scope.teamID] != undefined) return true;
			else return false;
		}

		$scope.ApplyTeam = function(){
			Helper.sendApplicationTo($scope.userData.uid, $scope.eventID, $scope.teamID);
			window.alert("Your application is received");
				// for (leaderuid in $scope.leader){
				// 	Helper.pushNotificationTo(leaderuid, $scope.eventID, Helper.getUsername($scope.userData.uid) + " has applied for your team.")
				// }
				Helper.pushNotificationTo($scope.teamdata.leader, $scope.eventID, Helper.getUsername($scope.userData.uid) + " has applied for your team.")
				// window.location.reload();
		}


		//
		// $scope.updateMember = function(id,content){
		// 	memref.child(id).update({
		// 		uid: content

		// 	});
		// 	$scope.members = memberdata;
		// }

		$scope.DeleteMember = function(uid){
			Helper.deletePersonFromTeam(uid, $scope.eventID, $scope.teamID)
				Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, Helper.getUsername(uid) + " has been kicked off the team");
				for (memberuid in $scope.teamdata.members){
						Helper.pushNotificationTo(memberuid, $scope.eventID, Helper.getUsername(uid) +  " has been kicked off the team.");
				}

		}

		$scope.QuitTeam = function(){
			// need change rule first: should let member access announcement
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, Helper.getUsername($scope.userData.uid) + " has left the team");
			Helper.deletePersonFromTeam($scope.userData.uid, $scope.eventID, $scope.teamID);
			for (memberuid in $scope.teamdata.members){
					Helper.pushNotificationTo(memberuid, $scope.eventID, Helper.getUsername($scope.userData.uid) +  " has left the team.");
			}
		}

		$scope.Change_Leader = function(){
			$scope.leader_change = !$scope.leader_change;
		}

		$scope.SetLeader = function(uid){
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, "Team leader has changed from " + Helper.getUsername($scope.userData.uid) + " to " + Helper.getUsername(uid));
			Helper.changeLeader($scope.userData.uid, uid, $scope.eventID, $scope.teamID);

			for (uid in $scope.teamdata.members){
				Helper.pushNotificationTo(uid, $scope.eventID, "Your team's leader has changed from " + Helper.getUsername($scope.userData.uid) + " to " + Helper.getUsername(uid))

			}
		}

		$scope.filterLeader= function(items, leaderuid) {
				var result = {};
				angular.forEach(items, function(value, key) {
						if (key !== leaderuid) {
								result[key] = value;
						}
				});
				return result;
		}

		$scope.ChangeTeamName = function(newname){


			var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
			ref.child('name').set(newname);

							Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, "Team name has changed to " + newname);

							for (uid in  $scope.teamdata.members){
								Helper.pushNotificationTo(uid, $scope.eventID, "Your team's name has changed to " + newname)

							}
		}

		$scope.ChangeTeamDesc = function(newdesc){




			var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
			ref.child('desc').set(newdesc);
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, "Team intro has changed to \"" + newdesc + "\"");

			for (uid in  $scope.teamdata.members){
				Helper.pushNotificationTo(uid, $scope.eventID, "Your team's intro has changed to \"" + newdesc + "\"")

			}
		}


		$scope.ChangeTeamMax = function(newmax){




			var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
			ref.child('max').set(newmax);
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, "Team max size has changed to " + newmax );

			for (uid in  $scope.teamdata.members){
				Helper.pushNotificationTo(uid, $scope.eventID, "Your team's max size has changed to " + newmax);

			}
		}

		var dialogue;
		$scope.changeTeamInfoDialogue = function(){
				dialogue = ngDialog.open({
						template: 'templates/changeTeamInfo.html',
						className: 'ngdialog-theme-plain',
						scope: $scope
				});

				 // $scope.teamdata.members = $scope.teamdata.members;
				 $scope.newTeaminfo={
						 max: $scope.teamdata.max,
						 name: $scope.teamdata.name,
						 desc: $scope.teamdata.desc
				 };
				 console.log($scope.newTeaminfo);
				 // console.log($scope.teamdata.members);


		};


		$scope.changeTeamInfo=function(){



				// $scope.newTeaminfo.max=parseInt($scope.newTeaminfo.max);
				// console.log($scope.teamdata.name);
				// console.log($scope.newTeaminfo.name);
				if($scope.teamdata.name !== $scope.newTeaminfo.name){
					// console.log("aaaa");
					$scope.ChangeTeamName($scope.newTeaminfo.name);
				}
				// console.log($scope.teamdata.desc );
				// console.log($scope.newTeaminfo.desc);
				if($scope.teamdata.desc !== $scope.newTeaminfo.desc){
					// console.log("bbbb");
					$scope.ChangeTeamDesc($scope.newTeaminfo.desc);
				}
				// console.log($scope.teamdata.max );
				// console.log($scope.newTeaminfo.max);
				if($scope.teamdata.max !== $scope.newTeaminfo.max){
					// console.log("cccc");
					$scope.ChangeTeamMax($scope.newTeaminfo.max);
				}
				dialogue.close();
				// $state.reload();


				// $scope.role=$scope.obj[$scope.eventID].position;
				// $scope.teamID=$scope.obj[$scope.eventID].team;
		}


		var dialogue;
		$scope.ManageTagDialogue = function(){
				dialogue = ngDialog.open({
						template: 'templates/manageTag.html',
						className: 'ngdialog-theme-plain',
						scope: $scope
				});
		};

//get skill tags
		var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/tags/SkillTags');
		$scope.skilltags = $firebaseObject(ref);

//skill tag functions


//get manner tags
		var ftref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/tags/MannerTags');
		$scope.mannertags = $firebaseObject(ftref);

//manner tag functions


//get language tags
		var ltref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/tags/LanguageTags');
		$scope.languagetags = $firebaseObject(ltref);

//language tag functions


		$scope.filterSkillTags = function(items) {
				var result = {};
				angular.forEach(items, function(value, key) {
						if (value !== 0) {
								result[key] = value;
						}
				});
				// console.log(Object.keys(result).length + "skill");
				if (Object.keys(result).length == 0){
					$scope.noSkillTags = true;
				}
				else{
						$scope.noSkillTags = false;
				}
				return result;
		}

		$scope.filterLanguageTags = function(items) {
				var result = {};
				angular.forEach(items, function(value, key) {

						if (value !== false) {
								result[key] = value;
						}
				});
				//  console.log(Object.keys(result).length + "language");
				if (Object.keys(result).length == 0){
					$scope.noLanguageTags = true;
				}
				else{
					$scope.noLanguageTags = false;
				}
				return result;
		}

		$scope.filterMannerTags = function(items) {
				var result = {};
				angular.forEach(items, function(value, key) {
						if (value !== false) {
								result[key] = value;
						}
				});
				// console.log(Object.keys(result).length + "manners");
				if (Object.keys(result).length == 0){
					$scope.noMannerTags = true;
				}
				else{
					$scope.noMannerTags = false;
				}
				return result;
		}

		$scope.aaa = $scope.teamdata.leader;

		$scope.modifySkillTagsChoice = function(){
			$scope.modifySkillTags = !$scope.modifySkillTags;
			$scope.newSkillTags = {
				"JavaScript" : $scope.skilltags.JavaScript,
				 "HTML" : $scope.skilltags.HTML,
				 "CSS" : $scope.skilltags.CSS,
				"Cpp" : $scope.skilltags.Cpp,
				"Python" : $scope.skilltags.Python,
				"SQL" : $scope.skilltags.SQL,
				"SML" : $scope.skilltags.SML,
				"C" : $scope.skilltags.C,
				"Java" : $scope.skilltags.Java,
				"Objective_C" : $scope.skilltags.Objective_C,
				"FLEX" : $scope.skilltags.FLEX,
				"PHP" : $scope.skilltags.PHP
			}

			console.log($scope.newSkillTags);
		}


		$scope.modifyLanguageTagsChoice = function(){
			$scope.modifyLanguageTags = !$scope.modifyLanguageTags;

			$scope.newLanguageTags = {
				"Mandarin" : $scope.languagetags.Mandarin,
				"Korean" : $scope.languagetags.Korean,
				"Cantonese" : $scope.languagetags.Cantonese,
				"English" : $scope.languagetags.English,
				"Japanese" : $scope.languagetags.Japanese,
				"German" : $scope.languagetags.German,
				"Spanish" : $scope.languagetags.Spanish
			}

			console.log($scope.newLanguageTags);

		}
		$scope.modifyMannerTagsChoice = function(){
			$scope.modifyMannerTags = !$scope.modifyMannerTags;
			$scope.newMannerTags = {
				"Cool" : $scope.mannertags.Cool ,
				"Creative" : $scope.mannertags.Creative,
				"Oncampus" : $scope.mannertags.Oncampus,
				"Outgoing" : $scope.mannertags.Outgoing,
				"Pretty" : $scope.mannertags.Pretty,
				"SleepLate" : $scope.mannertags.SleepLate,
				"Thoughtful" : $scope.mannertags.Thoughtful
			}

			console.log($scope.newMannerTags);
		}

		$scope.changeSkillTags = function(){
			Helper.updateSkillTags($scope.eventID, $scope.teamID, $scope.newSkillTags);
			$scope.modifySkillTags = !$scope.modifySkillTags;
		}

		$scope.changeLanguageTags = function(){
			Helper.updateLanguageTags($scope.eventID, $scope.teamID, $scope.newLanguageTags);
			$scope.modifyLanguageTags = !$scope.modifyLanguageTags;
		}

		$scope.changeMannerTags = function(){
			Helper.updateMannerTags($scope.eventID, $scope.teamID, $scope.newMannerTags);
			$scope.modifyMannerTags = !$scope.modifyMannerTags;
		}
		//get announcements
		var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/announcements');
		$scope.announcements = $firebaseArray(ref);

//announcement functions
		$scope.addAnnouncement = function(msg){
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, msg);
			for (memberuid in  $scope.teamdata.members){
					Helper.pushNotificationTo(memberuid, $scope.eventID, "Team leader has post a new message:\"" + msg + "\"" );
			}
		}

		$scope.deleteTeamAnnouncementChoice=function(){
				$scope.isDeletingTeamAnn = !$scope.isDeletingTeamAnn;
		}

		$scope.deleteAnnouncement = function(aid){
			announceref.child(aid).remove();
		}


// invitation funcitons
$scope.invitations = $firebaseObject(inviteref);


$scope.search_model = "all";

$scope.filterByStatus = function(items, filter_model) {
		var result = {};
		angular.forEach(items, function(value, key) {
				if (value == filter_model || filter_model == "all") {
						result[key] = value;
				}
		});
		return result;
}

//get application
		var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/applications');
		$scope.applications = $firebaseObject(ref);

				$scope.accept_Application = function(uid){
					Helper.acceptApplication(uid, $scope.eventID, $scope.teamID);

					Helper.pushNotificationTo(uid, $scope.eventID, "Your application to team " + $scope.teamdata.name+  " has been accepted.");
					for (memberuid in  $scope.teamdata.members){
							Helper.pushNotificationTo(memberuid, $scope.eventID, Helper.getUsername(uid) +  " has joined the team.");
					}
				}

				$scope.decline_Application = function(uid){
					Helper.declineApplication(uid, $scope.eventID, $scope.teamID);
					Helper.pushNotificationTo(uid, $scope.eventID, "Your application to team " + $scope.teamdata.name +  " has been declined.");
				}

});

app.filter('DateFormat', function(){
		return function(obj) {
			if (obj == undefined){
					return null;
			}
			else{
				var datefiltered = new Date(obj);
				return datefiltered;
			}
		}
});
