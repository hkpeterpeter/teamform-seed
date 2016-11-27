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

		$scope.colorList = {
			0 : "green",
			1 : "red"
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
				angular.forEach(items, function(name, key) {
					// console.log(name);
						if (name.value !== 0) {
								result[key] = name;
						}
				});
				// console.log(result);
				// console.log(Object.keys(result).length + "skill");
				if (Object.keys(result).length == 0){
					$scope.noSkillTags = true;
				}
				else{
						$scope.noSkillTags = false;
				}
				// console.log($scope.noSkillTags);
				return result;

		}

		//
		// console.log($scope.noSkillTags);
		// console.log($scope.namelist2);

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

		$scope.modifySkillTagsChoice = function(){
			$scope.modifySkillTags = !$scope.modifySkillTags;
			$scope.newSkillTags = {
				"JavaScript" : {color:$scope.skilltags.JavaScript.color, value:$scope.skilltags.JavaScript.value},
				 "HTML" : {color:$scope.skilltags.HTML.color, value:$scope.skilltags.HTML.value},
				 "CSS" : {color:$scope.skilltags.CSS.color, value:$scope.skilltags.CSS.value},
				"Cpp" : {color:$scope.skilltags.Cpp.color, value:$scope.skilltags.Cpp.value},
				"Python" : {color:$scope.skilltags.Python.color, value:$scope.skilltags.Python.value},
				"SQL" : {color:$scope.skilltags.SQL.color, value:$scope.skilltags.SQL.value},
				"SML" : {color:$scope.skilltags.SML.color, value:$scope.skilltags.SML.value},
				"C" : {color:$scope.skilltags.C.color, value:$scope.skilltags.C.value},
				"Java" : {color:$scope.skilltags.Java.color, value:$scope.skilltags.Java.value},
				"Objective_C" : {color:$scope.skilltags.Objective_C.color, value:$scope.skilltags.Objective_C.value},
				"FLEX" : {color:$scope.skilltags.FLEX.color, value:$scope.skilltags.FLEX.value},
				"PHP" : {color:$scope.skilltags.PHP.color, value:$scope.skilltags.PHP.value}
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
			// console.log($scope.mannertags);
			$scope.modifyMannerTags = !$scope.modifyMannerTags;
			$scope.newMannerTags = {
				"Cool" : $scope.mannertags.Cool ,
				"Creative" : $scope.mannertags.Creative,
				"OnCampus" : $scope.mannertags.OnCampus,
				"Outgoing" : $scope.mannertags.Outgoing,
				"Pretty" : $scope.mannertags.Pretty,
				"SleepLate" : $scope.mannertags.SleepLate,
				"Thoughtful" : $scope.mannertags.Thoughtful
			}

			// console.log($scope.newMannerTags);
		}

		$scope.changeSkillTags = function(){
			Helper.updateSkillTags($scope.eventID, $scope.teamID, $scope.newSkillTags);
			$scope.modifySkillTags = !$scope.modifySkillTags;
			// $scope.initchart();
			// window.location.reload()
		}

		$scope.changeLanguageTags = function(){
			Helper.updateLanguageTags($scope.eventID, $scope.teamID, $scope.newLanguageTags);
			$scope.modifyLanguageTags = !$scope.modifyLanguageTags;
				// $scope.initchart();
				// window.location.reload()
		}

		$scope.changeMannerTags = function(){
			Helper.updateMannerTags($scope.eventID, $scope.teamID, $scope.newMannerTags);
			$scope.modifyMannerTags = !$scope.modifyMannerTags;
				// $scope.initchart();

		}
		
		// Aeolian Add Here
		$scope.editTagsButtonName = "Edit";
		$scope.editTags = function(){			
			if($scope.modifyLanguageTags && $scope.modifyMannerTags && $scope.modifySkillTags)	{
				$scope.changeLanguageTags();
				$scope.changeMannerTags();
				$scope.changeSkillTags();
				$scope.editTagsButtonName = "Edit";
			}
			else {
				$scope.modifyLanguageTagsChoice();
				$scope.modifyMannerTagsChoice();
				$scope.modifySkillTagsChoice();
				$scope.editTagsButtonName = "Save";
			}
		};	
		
		//get announcements
		var ref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/announcements');
		$scope.announcements = $firebaseArray(ref);

//announcement functions

var dialogue;
$scope.addAnnouncementDialogue = function(){
		dialogue = ngDialog.open({
				template: 'templates/addAnnouncement.html',
				className: 'ngdialog-theme-plain',
				scope: $scope
		});

};

		$scope.addAnnouncement = function(msg){
			Helper.postTeamAnnouncement($scope.eventID, $scope.teamID, msg);
			for (memberuid in  $scope.teamdata.members){
					Helper.pushNotificationTo(memberuid, $scope.eventID, "Team leader has post a new message:\"" + msg + "\"" );
			}

			dialogue.close();
		}

		$scope.deleteTeamAnnouncementChoice=function(){
				$scope.isDeletingTeamAnn = !$scope.isDeletingTeamAnn;
		}

		$scope.deleteAnnouncement = function(aid){
			announceref.child(aid).remove();
		}


// invitation funcitons
$scope.invitations = $firebaseObject(inviteref);


$scope.search_model_appli = "all";
$scope.search_model_invi = "all";

$scope.filterByStatus = function(items, filter_model) {
		var result = {};
		angular.forEach(items, function(value, key) {
				if (value == filter_model || filter_model == "all") {
						result[key] = value;
				}
		});
		return result;
}
$scope.invite=function(uid){
            Helper.sendInvitationTo(uid,$scope.eventID,$filter('teamId')($scope.myEvents[$scope.eventID]));
    	}

$scope.validInvite = function(uid){
    // console.log($scope.inv, ' ' , uid);
    if ($filter('teamId')($scope.myEvents[$scope.eventID]) != null) {
        for (key in $scope.eventObj.teams[$filter('teamId')($scope.myEvents[$scope.eventID])].invitations){
            // console.log($scope.eventObj.teams[].key);
            if (key == uid && $scope.eventObj.teams[$filter('teamId')($scope.myEvents[$scope.eventID])].invitations[key] =='pending') return false;
        }
        return true;
    }
    return false;

};    	

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

				// chart for skill tags

					var tagref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/tags');
					$scope.tags = $firebaseObject(tagref);
					$scope.tags.$loaded().then(function(){
						// console.log($scope.tags.SkillTags);
						// $scope.skilltagnames = $scope.tags.SkillTags;
						// console.log($scope.skilltagnames);
									$scope.stnames = [];
									$scope.stvalues = [];
									$scope.stseries = [];
									$scope.stcolors = [];

									$scope.stoptions = {scales: {
													yAxes: [{
															ticks: {
																	beginAtZero:true,
																	steps: 10,
																// stepValue: 5,
																max:100
															}

													}],
													xAxes: [{ barPercentage: 0.6 }]
											}};

									var team_stvalues = [];
									// var values = {name: 'misko', gender: 'male'};
									angular.forEach($scope.tags.SkillTags,function(value,key){
										if(value.value!==0 && value.color == 'green'){
											$scope.stnames.push(key);
											team_stvalues.push(value.value);
										}
									});


									//
									// console.log($scope.stnames);
									$scope.stvalues.push(team_stvalues);
									$scope.stseries.push('Rating of team');
									$scope.stcolors.push("#c44133");
									// console.log($scope.stvalues);
									// console.log($scope.stseries);
// console.log($scope.stvalues);
							angular.forEach($scope.teamdata.members,function(value,key){
								// console.log(uid);
									var ref = firebase.database().ref('users/' + value+ '/readOnly/info/tags');
									var user_tags = $firebaseObject(ref);
									// console.log(user_tags);
									user_tags.$loaded()
									  .then(function() {
										// var user_skilltags = user_tags.SkillTags;
										// console.log(user_skilltags);
										var userstvalues = [];
										// var user_skilltags = user_tags;
										// console.log(user_skilltags);
										angular.forEach($scope.stnames,function(name) {
												if(user_tags.SkillTags[name] === undefined){
													userstvalues.push(0);
												}
												else{
												userstvalues.push(user_tags.SkillTags[name]);
												}
										});
			// 							console.log(userstvalues);
			// console.log(value);
										//  console.log(userstvalues);
										$scope.stvalues.push(userstvalues);
										$scope.stseries.push('Rating of ' + Helper.getUsername(value));
										$scope.stcolors.push("#16a085");


											});
							});
					});


					// var tagref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/tags');
					// $scope.tags = $firebaseObject(tagref);
					$scope.tags.$loaded().then(function(){
						// console.log($scope.tags.SkillTags);
						//  console.log($scope.languagetagnames);
									$scope.ltnames = [];
									$scope.ltseries = [];
									$scope.ltvalues = [];
									$scope.ltcolors = [];
									$scope.ltoptions = {scales: {
													yAxes: [{
															ticks: {
																	beginAtZero:true,
																	steps: 1,
                                // stepValue: 5,
                                max: $scope.teamdata.max
															}

													}],
													xAxes: [{ barPercentage: 0.3 }]
											}};

									// var values = {name: 'misko', gender: 'male'};
									angular.forEach($scope.tags.LanguageTags,function(value,key){
										if(value!==false){
												$scope.ltnames.push(key);
											// ltvalues.push($scope.skilltagnames[key].value);
											$scope.ltseries.push(key);
												$scope.ltvalues.push(0);
												$scope.ltcolors.push("#16a085");
										}
									});

									// console.log(ltnames);
									var lt_matching_list = {
										"Mandarin" : 0,
										"Korean" : 0,
										"Cantonese" : 0,
										"English" : 0,
										"Japanese" : 0,
										"German" : 0,
										"Spanish" : 0
									}
									angular.forEach($scope.teamdata.members,function(value,key){
										// console.log(uid);
											var ref = firebase.database().ref('users/' + value+ '/readOnly/info/tags');
											var user_tags = $firebaseObject(ref);
											// console.log(user_tags);
										user_tags.$loaded()
												.then(function() {
												// var user_languagetags = user_tags.LanguageTags;
												// console.log(user_skilltags);


												// var user_skilltags = user_tags;
												// console.log(user_skilltags);
												angular.forEach(lt_matching_list,function(value,key){
													// console.log(key);
													// console.log(user_tags.LanguageTags[key]);
														if(user_tags.LanguageTags[key]){
															lt_matching_list[key] = lt_matching_list[key]+ 1;


														}
												});
												// console.log(lt_matching_list);
									// 							console.log(userstvalues);
									// console.log(value);
												//  console.log(userstvalues);
															// console.log(lt_matching_list);
															// console.log(lt_matching_list);
												for(i=0;i<$scope.ltnames.length;i++){
													var key = $scope.ltnames[i];
													// console.log(key);
													$scope.ltvalues[i] = (lt_matching_list[key]);
													// console.log(mt_matching_list);
												};

											});
									});
					});

					// var tagref = firebase.database().ref('events/' + $scope.eventID + '/teams/' + $scope.teamID + '/tags');
					// $scope.tags = $firebaseObject(tagref);
					$scope.tags.$loaded().then(function(){

									$scope.mtnames = [];
									$scope.mtseries = [];
									$scope.mtvalues = [];
									$scope.mtcolors = [];
									$scope.mtoptions = {scales: {
													yAxes: [{
															ticks: {
																	beginAtZero:true,
																	steps: 1,
																// stepValue: 5,
																max: $scope.teamdata.max
															}

													}],
													xAxes: [{ barPercentage: 0.3 }]
											}};

									angular.forEach($scope.tags.MannerTags,function(value,key){
										if(value!==false){
												$scope.mtnames.push(key);

											$scope.mtseries.push(key);
												$scope.mtvalues.push(0);
												$scope.mtcolors.push("#16a085");
										}
									});


									var mt_matching_list = {
											"Cool" : 0,
											"Creative" : 0,
											"OnCampus" : 0,
											"Outgoing" : 0,
											"Pretty" : 0,
											"SleepLate" : 0,
											"Thoughtful" : 0
										}
									angular.forEach($scope.teamdata.members,function(value,key){
										// console.log(uid);
											var ref = firebase.database().ref('users/' + value+ '/readOnly/info/tags');
											var user_tags = $firebaseObject(ref);
											// console.log(user_tags);
										user_tags.$loaded()
												.then(function() {

												angular.forEach(mt_matching_list,function(value,key){
													// console.log(key);
													// console.log(user_tags.LanguageTags[key]);
														if(user_tags.MannerTags[key]){
															mt_matching_list[key] = mt_matching_list[key]+ 1;
														}
												});

												for(i=0;i<$scope.mtnames.length;i++){
													var key = $scope.mtnames[i];
													// console.log(key);
													$scope.mtvalues[i] = (mt_matching_list[key]);
													// console.log(mt_matching_list);
												};
											});
									});
					});


			// Recommend TBAs
			var eventRef = firebase.database().ref("events/" + $scope.eventID);
			$scope.eventObj = $firebaseObject(eventRef);

				// $scope.RecommendTBA = function(people) {
				// 		var result = {};
						$scope.tba_featurelist = {};
						$scope.tba_featurelist_arr = [];
						$scope.recommend = function(){
							$scope.tba_featurelist = {};
							$scope.tba_featurelist_arr = [];
							angular.forEach($scope.eventObj.tba, function(name, uid) {
								// console.log(name);
								// console.log(uid);
								var key = uid;
								// console.log(key);
								angular.extend($scope.tba_featurelist, {[key]: 0});
							});
							console.log($scope.tba_featurelist);

							angular.forEach($scope.tba_featurelist,function(score,uid){
								//... gg

								var ref = firebase.database().ref('users/' + uid+ '/readOnly/info/tags');
								var user_tags = $firebaseObject(ref);
								user_tags.$loaded().then(function(){
									var team_skilltags = $scope.filterSkillTags($scope.skilltags);
									var team_languagetags = $scope.filterLanguageTags($scope.languagetags);
									var team_mannertags = $scope.filterMannerTags($scope.mannertags);
									angular.forEach(user_tags.SkillTags, function(value,key){
										// console.log(key);
										// console.log(team_skilltags);
										if(team_skilltags[key] !== undefined && team_skilltags[key].color =='green' && value >= team_skilltags[key].value){
											// console.log(team_skilltags[key]);
											// console.log(team_skilltags[key].color );
											// console.log(team_skilltags[key].value);
											//
											// console.log("a");
											$scope.tba_featurelist[uid] = $scope.tba_featurelist[uid] + 3;
										}
									});
									angular.forEach(user_tags.LanguageTags, function(value,key){
										// console.log(key);
										// console.log(team_languagetags);
										if(team_languagetags[key] == true){
											// console.log(team_skilltags[key]);
											// console.log(team_skilltags[key].color );
											// console.log(team_skilltags[key].value);
											//
											// console.log("a");
											$scope.tba_featurelist[uid] = $scope.tba_featurelist[uid] + 2;
										}
									});
									angular.forEach(user_tags.MannerTags, function(value,key){
										// console.log(key);
										// console.log(team_mannertags);
										if(team_mannertags[key] == true){
											// console.log(team_skilltags[key]);
											// console.log(team_skilltags[key].color );
											// console.log(team_skilltags[key].value);
											//
											// console.log("a");
											$scope.tba_featurelist[uid] = $scope.tba_featurelist[uid] + 1;
										}
									});
									$scope.tba_featurelist_arr.push({uid: uid,score: $scope.tba_featurelist[uid]});
									// console.log($scope.tba_featurelist);
								})
							});
							// console.log($scope.tba_featurelist);

							// for (key in $scope.tba_featurelist){
							// 	// console.log(123);
							// 	$scope.tba_featurelist_arr.push({uid: key,score: $scope.tba_featurelist[key]});
							// }
							// console.log($scope.tba_featurelist_arr);							
					}


			// 		return result;
			//
			// }

});
