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

						ref=firebase.database().ref("users");
						$scope.users=$firebaseArray(ref);
						//get role of user
						ref = firebase.database().ref("users/" + $scope.userData.uid + "/writable");
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
		var memref = main_ref.child("members");
		var skilltagref = main_ref.child("tags").child("SkillTags");
		var featuretagref = main_ref.child("tags").child("FeatureTags");
		var languagetagref = main_ref.child("tags").child("LanguageTags");
		var announceref = main_ref.child("announcements");
		var applicref = main_ref.child("applications");
		var inviteref = main_ref.child("invitations")

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
		}

		$scope.QuitTeam = function(){
			// need change rule first: should let member access announcement
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, helper.getUsername($scope.userData.uid) + " has left the team");
			Helper.deletePersonFromTeam($scope.userData.uid, $scope.eventID, $scope.teamID);
		}

		$scope.Change_Leader = function(){
			$scope.leader_change = !$scope.leader_change;
		}

		$scope.SetLeader = function(uid){
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, "Team leader change from " + helper.getUsername($scope.userData.uid) + " to " + helper.getUsername(uid));
			Helper.changeLeader($scope.userData.uid, uid, $scope.eventID, $scope.teamID);
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

//get feature tags
		var ftref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/tags/FeatureTags');
		$scope.featuretags = $firebaseObject(ftref);

//feature tag functions

		$scope.addFeatureTag = function(name){
			var temp = {};
	    temp[name] = name;
	    ftref.update(temp);
		}

		$scope.deleteFeatureTag = function(name){
			ftref.child(name).remove();
		}

		$scope.updateFeatureTag = function(name){
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

//get invitations
		var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/invitations');
		$scope.invitations = $firebaseArray(ref);

//invitations functions
		$scope.addInvitation = function(){
			var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
			var temp = {};
			temp["2RB6DFylc1ZEoVFsuCsgbIYOaSz2"] = "withdrawn";
			ref.child('invitations').update(temp);
		}

		$scope.deleteInvitation = function(){
			inviteref.child("2RB6DFylc1ZEoVFsuCsgbIYOaSz2").remove();
		}

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
				}

				$scope.decline_Application = function(uid){
					Helper.declineApplication(uid, $scope.eventID, $scope.teamID);
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
