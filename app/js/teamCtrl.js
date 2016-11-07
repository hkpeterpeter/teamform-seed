//teamCtrl
app.controller("teamCtrl",



	// Implementation the todoCtrl
	function($scope, Auth, $firebaseArray, $firebaseObject) {



	$scope.form = {};


	$scope.tagShowList = [
		{name :"javascript", state: false},
		{name :"html" , state: false},
		{name :"css" , state: false},
		{name :"c++" , state: false},
	  {name :"python" , state: false},
		{name :"SQL" , state: false}
	];


		var main_ref = firebase.database().ref('events/-KVcVgeRPOOdr-vUyDLV/teams/team1');
		var teamdata = $firebaseObject(main_ref);
		teamdata.$loaded().then(function(){
			console.log(teamdata);
		})
		//console.log(uidlistObj);
		$scope.data = teamdata;
		// teamdata.desc = "blablabla";
		// teamdata.$save();
		console.log(teamdata);


		$scope.updateTeaminfo = function(){
			ref.update({
				name: $scope.name,
				desc: $scope.desc,
				max: $scope.teammax,
				currentSize: $scope.currentsize
			})
		}

//child ref
		var memref = main_ref.child("members");
		var tagref = main_ref.child("tags");
		var announceref = main_ref.child("announcements");
		var applicref = main_ref.child("applications");
		var inviteref = main_ref.child("invitations")

//get member
		var ref = firebase.database().ref('events/-KVcVgeRPOOdr-vUyDLV/teams/team1/members');
		var memberdata = $firebaseObject(ref);
		memberdata.$loaded().then(function(){
			console.log(memberdata);
		})

		$scope.members = memberdata;

//member functions
		$scope.addMember = function(uid){
			memberdata[uid] = uid;
			memberdata.$save();
			$scope.members = memberdata;
		}

		$scope.deleteMember = function(uid){
			memref.child(uid).remove().then(function(){
				console.log(memberdata);
			});
			$scope.members = memberdata;
		}
		//
		// $scope.updateMember = function(id,content){
		// 	memref.child(id).update({
		// 		uid: content
		// 	});
		// 	$scope.members = memberdata;
		// }
//get tags
		var ref = firebase.database().ref('events/-KVcVgeRPOOdr-vUyDLV/teams/team1/tags');
		var tagdata = $firebaseObject(ref);
		tagdata.$loaded().then(function(){
			console.log(tagdata);
		})

		$scope.tags = tagdata;
//tag functions

		$scope.addTag = function(name, neednum, currnum){
			tagref.child(name).set({
				need: neednum,
				num : currnum
			}).then(function(){
				console.log(tagdata);
			});
			$scope.tags = tagdata;
		}

		$scope.deleteTag = function(name){
			tagref.child(name).remove().then(function(){
				console.log(tagdata);
			});
			$scope.tags = tagdata;
		}

		$scope.updateTag = function(name, neednum, currnum){
			tagref.child(name).update({
				need: neednum,
				num : currnum
			});
			$scope.tags = tagdata;
		}

		//get announcements
		var ref = firebase.database().ref('events/-KVcVgeRPOOdr-vUyDLV/teams/team1/announcements');
		var announcementdata = $firebaseArray(ref);
		announcementdata.$loaded().then(function(){
			console.log(announcementdata);
		})

		$scope.announcements = announcementdata;

//announcement functions
		$scope.addAnnouncement = function(aid, announce, date){
			announceref.child(aid).set({
				content: announce,
				timeStamp: date
			}).then(function(){
				console.log(announcementdata);
			})
			$scope.announcements = announcementdata;
		}

		$scope.deleteAnnouncement = function(aid){
			announceref.child(aid).remove().then(function(){
				console.log(announcementdata);
			});
			$scope.announcements = announcementdata;
		}

		$scope.updateAnnouncement = function(aid, announce, date){
			announceref.child(username).update({
				content: announce,
				timeStamp: date
			}).then(function(){
				console.log(announcementdata);
			})
			$scope.announcements = announcementdata;
		}

//get invitations
		var ref = firebase.database().ref('events/-KVcVgeRPOOdr-vUyDLV/teams/team1/invitations');
		var invitationdata = $firebaseArray(ref);
		invitationdata.$loaded().then(function(){
			console.log(invitationdata);
		})


		$scope.invitations = invitationdata;

//invitations functions
		$scope.addInvitation = function(username, state){
			inviteref.child(username).set({
				status: state,
			}).then(function(){
				console.log(invitationdata);
			})
			$scope.invitations = invitationdata;
		}

		$scope.deleteInvitation = function(username){
			inviteref.child(username).remove().then(function(){
				console.log(invitationdata);
			});
			$scope.invitations = invitationdata;
				}

				$scope.updateInvitation = function(username, state){
					inviteref.child(username).set({
						status: state
					}).then(function(){
						console.log(invitationdata);
					})
					$scope.invitations = invitationdata;
				}
//get application
		var ref = firebase.database().ref('events/-KVcVgeRPOOdr-vUyDLV/teams/team1/applications');
		var applicationdata = $firebaseArray(ref);
		applicationdata.$loaded().then(function(){
			console.log(applicationdata);
		})

		$scope.applications = applicationdata;

		//invitations functions
				$scope.addApplication = function(username, state){
					applicref.child(username).set({
						status: state,
					}).then(function(){
						console.log(applicationdata);
					})
					$scope.applications = applicationdata;
				}

				$scope.deleteApplication = function(username){
					applicref.child(username).remove().then(function(){
						console.log(applicationdata);
					});
					$scope.applications = applicationdata;
						}

						$scope.updateApplication = function(username, state){
							applicref.child(username).set({
								status: state
							}).then(function(){
								console.log(applicationdata);
							})
							$scope.applications = applicationdata;
						}

}
);
