//teamCtrl
app.controller("teamCtrl",
	// Implementation the todoCtrl
	function($scope, Auth, $firebaseArray, $firebaseObject, $stateParams, $filter, Helper, ngDialog, $state, $window) {

		$scope.form = {};
		$scope.eventID = $stateParams.eid;
		$scope.teamID = $stateParams.tid;

		$scope.leader_change = false;
		$scope.tagShowList = [
			{name :"javascript", state: false},
			{name :"html" , state: false},
			{name :"css" , state: false},
			{name :"c++" , state: false},
	  	{name :"python" , state: false},
			{name :"SQL" , state: false}
		];

		$scope.SkillTagsList = {
			0 : "JavaScript",
			1 : "HTML",
			2 : "CSS",
			3 : "C++",
			4 : "Python",
			5 : "SQL",
			6 : "SML",
			7 : "C",
			8 : "C#",
			9 : "Java",
			10 : "Objective-C",
			11 : "FLEX",
			12 : "PHP"
		}

		$scope.LanguageTagsList = {
			"Mandarin" : false,
			"Korean" : false,
			"Cantonese" : false,
			"English" : false,
			"Japanese" : false,
			"German" : false,
			"Spanish" : false
		}

		$scope.SkillTagsList = {
			0 : "JavaScript",
			1 : "HTML",
			2 : "CSS",
			3 : "C++",
			4 : "Python",
			5 : "SQL",
			6 : "SML",
			7 : "C",
			8 : "C#",
			9 : "Java",
			10 : "Objective-C",
			11 : "FLEX",
			12 : "PHP"
		}

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
									user_appli_ref.once('value', function (snapshot) {
									   if (snapshot.hasChild($scope.teamID)) {

												$scope.alreadyApplied = true;
									  	}
											else{
												$scope.alreadyApplied = false;
											}
										}
								);
						// eventref.once('value', function (snapshot) {
	    	// 				if (!snapshot.hasChild($scope.eventID)) {
		    //     				$scope.inthisteam = false;
		    // 				}
						// 	else{
						// 			teamref=firebase.database().ref('users/' + $scope.userData.uid + '/writable/' + $scope.eventID );
						// 			$scope.team_id = $firebaseObject(teamref);
						// 			$scope.team_id.$loaded().then(function(){
						// 				// console.log(team_id);
						// 				if($scope.team_id.team == $scope.teamID){
						// 					$scope.inthisteam = true;
						// 				}
						// 				else{
						// 					$scope.inthisteam = false;
						// 				}
						// 			})
						// 		}
						// });
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

		// $scope.teamdata.$loaded().then(function(){
		// 	$scope.teamdata.members = $scope.teamdata.members;
		// 	$scope.teamdata.leader = $scope.teamdata.leader;
		// 	console.log($scope.teamdata.members);
		// })

		// $scope.sendmsgtomembers = function(){
		// 	for ( uid in $scope.teamdata.members){
		// 		console.log(uid);
		// 	}
		// }
		//
		// $scope.updateTeaminfo = function(){
		// 	ref.update({
		// 		name: $scope.name,
		// 		desc: $scope.desc,
		// 		max: $scope.max,
		// 		currentSize: $scope.currentsize
		// 	})
		// }

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

		$scope.ApplyTeam = function(){
			Helper.sendApplicationTo($scope.userData.uid, $scope.eventID, $scope.teamID);
			window.alert("Your application is received");


			// for (leaderuid in $scope.leader){
			// 	Helper.pushNotificationTo(leaderuid, $scope.eventID, Helper.getUsername($scope.userData.uid) + " has applied for your team.")
			// }
			Helper.pushNotificationTo($scope.teamdata.leader, $scope.eventID, Helper.getUsername($scope.userData.uid) + " has applied for your team.")

		}


		//
		// $scope.updateMember = function(id,content){
		// 	memref.child(id).update({
		// 		uid: content

		// 	});
		// 	$scope.members = memberdata;
		// }

		$scope.DeleteMember = function(uid){
			Helper.deletePersonFromTeam(uid, $scope.eventID, $scope.teamID);
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


$scope.test = $scope.teamdata.members;

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
		};

		// $scope.teamdata.$loaded().then(function(){
		// 	// $scope.teamdata.members = $scope.teamdata.members;
		// 	$scope.teamname = $scope.teamdata.name;
		// 	$scope.teamdesc = $scope.teamdata.desc;
		// 	$scope.teammax = $scope.teamdata.max;
		// 	// console.log($scope.teamdata.members);
		// })

		$scope.newTeaminfo={
				max: 0,
				name: "",
				desc: ""
		};

		console.log($scope.newTeaminfo);
		$scope.changeTeamInfo=function(){

			 $scope.teamdata.$loaded().then(function(){
				// $scope.teamdata.members = $scope.teamdata.members;
				$scope.teamname = $scope.teamdata.name;
				$scope.teamdesc = $scope.teamdata.desc;
				$scope.teammax = $scope.teamdata.max;
				// console.log($scope.teamdata.members);
			 })

				$scope.newTeaminfo.max=parseInt($scope.newTeaminfo.max);
				console.log($scope.newTeaminfo);
				console.log($scope.teamname, $scope.teamdesc, $scope.teammax);
				if($scope.teamname !== $scope.newTeaminfo.name){
					$scope.ChangeTeamName($scope.newTeaminfo.name);
				}
				if($scope.teamdesc !== $scope.newTeaminfo.desc){
					$scope.ChangeTeamDesc($scope.newTeaminfo.desc);
				}
				if($scope.teammax !== $scope.newTeaminfo.max){
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


		$scope.addSkillTag = function(name, neednum, currnum){
			skilltagref.child(name).set({
				need: neednum,
				num : currnum
			});
		}

		$scope.deleteSkillTag = function(name){
			skilltagref.child(name).remove();
		}

		$scope.updateSkillTag = function(name, neednum, currnum){
			skilltagref.child(name).update({
				need: neednum,
				num : currnum
			});
		}

//get manner tags
		var ftref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/tags/MannerTags');
		$scope.mannertags = $firebaseObject(ftref);

//manner tag functions

		$scope.addMannerTag = function(name){
			var temp = {};
	    temp[name] = name;
	    ftref.update(temp);
		}

		$scope.deleteMannerTag = function(name){
			ftref.child(name).remove();
		}

		$scope.updateMannerTag = function(name){
			var temp = {};
	    temp[name] = name;
	    ftref.update(temp);
		}

//get language tags
		var ltref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/tags/LanguageTags');
		$scope.languagetags = $firebaseObject(ltref);

//language tag functions

		$scope.addLanguageTag = function(name){
			var temp = {};
			temp[name] = name;
			ltref.update(temp);
		}

		$scope.deleteLanguageTag = function(name){
			ltref.child(name).remove();
		}

		$scope.updateLanguageTag = function(name){
			var temp = {};
			temp[name] = name;
			ltref.update(temp);
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

		$scope.deleteAnnouncement = function(aid){
			announceref.child(aid).remove();
		}

		// $scope.retreiveAnnouncement = function(aid){
		// 		$scope.applicationid = aid;
		// }

		// $scope.updateAnnouncement = function(aid, announce, date){
		// 	announceref.child(username).update({
		// 		content: announce,
		// 		timeStamp: date
		// 	});
		// }
//
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

// //get invitations
// 		var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/invitations');
// 		$scope.invitations = $firebaseArray(ref);
//
// //invitations functions
// 		$scope.addInvitation = function(){
// 			var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
// 			var temp = {};
// 			temp["2RB6DFylc1ZEoVFsuCsgbIYOaSz2"] = "withdrawn";
// 			ref.child('invitations').update(temp);
// 		}
//
// 		$scope.deleteInvitation = function(){
// 			inviteref.child("2RB6DFylc1ZEoVFsuCsgbIYOaSz2").remove();
// 		}

				// $scope.updateInvitation = function(username, state){
				// 	inviteref.child(username).set({
				// 		status: state
				// 	}).then(function(){
				// 		console.log(invitationdata);
				// 	})
				// 	$scope.invitations = invitationdata;
				// }
//get application
		var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/applications');
		$scope.applications = $firebaseObject(ref);

		//applicaations functions
				// $scope.addApplication = function(){
				// 	var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
				// 	var temp = {};
				// 	temp["2RB6DFylc1ZEoVFsuCsgbIYOaSz2"] = "pending";
				// 	ref.child('applications').update(temp);
				// }
				//
				// $scope.deleteApplication = function(){
				// 	applicref.child("2RB6DFylc1ZEoVFsuCsgbIYOaSz2").remove();
				// }
				$scope.accept_Application = function(uid){
					Helper.acceptApplication(uid, $scope.eventID, $scope.teamID);

					Helper.pushNotificationTo(uid, $scope.eventID, "Your application to team " + $scope.teams.$getRecord($scope.teamID).name +  " has been accepted.");
					for (memberuid in  $scope.teamdata.members){
							Helper.pushNotificationTo(memberuid, $scope.eventID, Helper.getUsername(uid) +  " has joined the team.");
					}
				}

				$scope.decline_Application = function(uid){
					Helper.declineApplication(uid, $scope.eventID, $scope.teamID);
					Helper.pushNotificationTo(uid, $scope.eventID, "Your application to team " + $scope.teams.$getRecord($scope.teamID).name +  " has been declined.");
				}
					// return data;
					//
					// $scope.getUsername = function(uid){
					// 	var ref=firebase.database().ref("users/" + uid + "/readOnly/name");
					// 	var data = $firebaseObject(ref);
					// 	return data;
					// }

						// $scope.updateApplication = function(username, state){
						// 	applicref.child(username).set({
						// 		status: state
						// 	}).then(function(){
						// 		console.log(applicationdata);
						// 	})
						// 	$scope.applications = applicationdata;
						// }

}
);
