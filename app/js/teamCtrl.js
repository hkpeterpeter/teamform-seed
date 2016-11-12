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

		$scope.tagList = {
			0 : "javascript",
			1 : "html",
			2 : "css",
			3 : "c++",
			4 : "python",
			5 : "SQL"
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
						//     if($scope.obj[$scope.eventID]===undefined)
						//         $scope.role="visitor";
						//     else
						//     {
						//         $scope.role=$scope.obj[$scope.eventID].position;
						//         $scope.teamID=$scope.obj[$scope.eventID].team;
						//         console.log($scope.obj[$scope.eventID]);
						//     }
						// })
						eventref = firebase.database().ref('users/' + $scope.userData.uid + '/writable');
						eventref.once('value', function (snapshot) {
    					if (!snapshot.hasChild($scope.eventID)) {
        				$scope.inthisteam = false;
    				}
						else{
							teamref=firebase.database().ref('users/' + $scope.userData.uid + '/writable/' + $scope.eventID );
							$scope.team_id = $firebaseObject(teamref);
							$scope.team_id.$loaded().then(function(){
								// console.log(team_id);
								if($scope.team_id.team == $scope.teamID){
									$scope.inthisteam = true;
								}
								else{
									$scope.inthisteam = false;
								}
							})
						}
					});
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

		$scope.teamdata.$loaded().then(function(){
			$scope.memberlist = $scope.teamdata.members;
			$scope.leaderlist = $scope.teamdata.leader;
			console.log($scope.memberlist);
		})

		// $scope.sendmsgtomembers = function(){
		// 	for ( uid in $scope.memberlist){
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
		var leaderref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/leader');
		$scope.leader = $firebaseObject(leaderref);

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

			for (uid in $scope.leaderlist){
				Helper.pushNotificationTo(uid, $scope.eventID, helper.getUsername($scope.userData.uid) + " has applied for your team.")
			}
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
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, helper.getUsername(uid) + " has been kicked off the team");
			for (memberuid in uid){
					Helper.pushNotificationTo(memberuid, $scope.eventID, helper.getUsername(uid) +  " has been kicked off the team.");
			}
		}

		$scope.QuitTeam = function(){
			// need change rule first: should let member access announcement
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, helper.getUsername($scope.userData.uid) + " has left the team");
			Helper.deletePersonFromTeam($scope.userData.uid, $scope.eventID, $scope.teamID);
			for (memberuid in $scope.memberlist){
					Helper.pushNotificationTo(memberuid, $scope.eventID, helper.getUsername($scope.userData.uid) +  " has left the team.");
			}
		}

		$scope.Change_Leader = function(){
			$scope.leader_change = !$scope.leader_change;
		}

		$scope.SetLeader = function(uid){
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, "Team leader has changed from " + helper.getUsername($scope.userData.uid) + " to " + helper.getUsername(uid));
			Helper.changeLeader($scope.userData.uid, uid, $scope.eventID, $scope.teamID);
			for (uid in $scope.memberlist){
				Helper.pushNotificationTo(uid, $scope.eventID, "Your team's leader has changed from " + helper.getUsername($scope.userData.uid) + " to " + helper.getUsername(uid))
			}
		}

		$scope.ChangeTeamName = function(newname){




			var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
			ref.child('name').set(newname);

							Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, "Team name has changed to " + newname);
							for (uid in $scope.memberlist){
								Helper.pushNotificationTo(uid, $scope.eventID, "Your team's name has changed to " + newname)
							}
		}

		$scope.ChangeTeamDesc = function(newdesc){




			var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
			ref.child('desc').set(newdesc);
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, "Team intro has changed to \"" + newdesc + "\"");
			for (uid in $scope.memberlist){
				Helper.pushNotificationTo(uid, $scope.eventID, "Your team's intro has changed to \"" + newdesc + "\"")
			}
		}


		$scope.ChangeTeamMax = function(newmax){




			var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
			ref.child('max').set(newmax);
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, "Team max size has changed to " + newmax );
			for (uid in $scope.memberlist){
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

		$scope.teamdata.$loaded().then(function(){
			// $scope.memberlist = $scope.teamdata.members;
			$scope.teamname = $scope.teamdata.name;
			$scope.teamdesc = $scope.teamdata.desc;
			$scope.teammax = $scope.teamdata.max;
			// console.log($scope.memberlist);
		})

		$scope.newTeaminfo={
				max: 0,
				name: "",
				desc: ""
		};

		console.log($scope.newTeaminfo);
		$scope.changeTeamInfo=function(){

			$scope.teamdata.$loaded().then(function(){
				// $scope.memberlist = $scope.teamdata.members;
				$scope.teamname = $scope.teamdata.name;
				$scope.teamdesc = $scope.teamdata.desc;
				$scope.teammax = $scope.teamdata.max;
				// console.log($scope.memberlist);
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

//feature tag functions

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
			for (memberuid in $scope.memberlist){
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
		$scope.applications = $firebaseArray(ref);

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

					Helper.pushNotificationTo(uid, $scope.eventID, "Your application to team " + $scope.teams.$getRecord($scope.teamID.team).name +  " has been accepted.");
					for (memberuid in $scope.memberlist){
							Helper.pushNotificationTo(memberuid, $scope.eventID, getUsername(uid) +  " has joined the team.");
					}
				}

				$scope.decline_Application = function(uid){
					Helper.declineApplication(uid, $scope.eventID, $scope.teamID);
					Helper.pushNotificationTo(uid, $scope.eventID, "Your application to team " + $scope.teams.$getRecord($scope.teamID.team).name +  " has been declined.");
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
