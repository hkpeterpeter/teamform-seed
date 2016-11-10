//teamCtrl
app.controller("teamCtrl",
	// Implementation the todoCtrl
	function($scope, Auth, $firebaseArray, $firebaseObject, $stateParams, $filter, Helper, ngDialog, $state) {

		$scope.form = {};
		$scope.eventID = $stateParams.eid;
		$scope.teamID = $stateParams.tid;

		$scope.tagShowList = [
			{name :"javascript", state: false},
			{name :"html" , state: false},
			{name :"css" , state: false},
			{name :"c++" , state: false},
	  	{name :"python" , state: false},
			{name :"SQL" , state: false}
		];


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
		var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/leader');
		$scope.leader = $firebaseObject(ref);

//member functions
		$scope.addMember = function(){
			var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
			var temp = {};
			temp["2RB6DFylc1ZEoVFsuCsgbIYOaSz2"] = "2RB6DFylc1ZEoVFsuCsgbIYOaSz2";
			ref.child('members').update(temp);
		}

		$scope.deleteMember = function(){
			memref.child("2RB6DFylc1ZEoVFsuCsgbIYOaSz2").remove();
		}
		//
		// $scope.updateMember = function(id,content){
		// 	memref.child(id).update({
		// 		uid: content
		// 	});
		// 	$scope.members = memberdata;
		// }
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
		var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/tags/FeatureTags');
		$scope.featuretags = $firebaseObject(ref);

//feature tag functions

		$scope.addFeatureTag = function(name){
			var temp = {};
	    temp[name] = name;
	    ref.update(temp);
		}

		$scope.deleteFeatureTag = function(name){
			ref.child(name).remove();
		}

		$scope.updateFeatureTag = function(name){
			var temp = {};
	    temp[name] = name;
	    ref.update(temp);
		}

//get language tags
		var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/tags/LanguageTags');
		$scope.languagetags = $firebaseObject(ref);

//language tag functions

		$scope.addLanguageTag = function(name){
			var temp = {};
			temp[name] = name;
			ref.update(temp);
		}

		$scope.deleteLanguageTag = function(name){
			ref.child(name).remove();
		}

		$scope.updateLanguageTag = function(name){
			var temp = {};
			temp[name] = name;
			ref.update(temp);
		}

		//get announcements
		var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/announcements');
		$scope.announcements = $firebaseArray(ref);

//announcement functions
		$scope.addAnnouncement = function(aid, announce, date){
			announceref.child(aid).set({
				content: announce,
				timeStamp: date
			});
		}

		$scope.deleteAnnouncement = function(aid){
			announceref.child(aid).remove();
		}

		$scope.updateAnnouncement = function(aid, announce, date){
			announceref.child(username).update({
				content: announce,
				timeStamp: date
			});
		}

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

		//invitations functions
				$scope.addApplication = function(){
					var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID);
					var temp = {};
					temp["2RB6DFylc1ZEoVFsuCsgbIYOaSz2"] = "pending";
					ref.child('applications').update(temp);
				}

				$scope.deleteApplication = function(){
					applicref.child("2RB6DFylc1ZEoVFsuCsgbIYOaSz2").remove();
				}


		      var ref=firebase.database().ref("users");
		      $scope.users = $firebaseArray(ref);
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
