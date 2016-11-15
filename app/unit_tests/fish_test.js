describe('fishCtrl',function(){
	beforeEach(module('teamapp','firebase'));
	var $scope, $firebaseArray, $firebaseObject, createController, $q, defered;
	//initFirebase();

	beforeEach(inject(function($rootScope, $controller, _$rootScope_, _$firebaseArray_, _$firebaseObject_, _$q_){
		$firebaseArray = _$firebaseArray_;
		$firebaseObject = _$firebaseObject_;

		$q = _$q_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		deferred = _$q_.defer();

	//spyOn($scope.allData.$loaded(), 'teamapp').and.returnValue(deferred.promise);

	createController = function() {
		return $controller('fishCtrl', {
			'$rootScope': $rootScope,
			'$scope': $scope
		});

	};
	$rootScope.currentUser = {id:0};


}));

	it('const test', function(){
		var controller = createController();
		expect($scope.currentEvent).toBe(0);
	});
	it('show body', function(){
		var controller = createController();
		$scope.clickCount=0;
		$scope.showBody("a");
		expect($scope.clickCount).toBe(1);
	});
	it('init show body', function(){
		var controller = createController();
		$scope.clickCount=0;
		$scope.initShowBody("a");
		expect($scope.clickCount).toBe(0);
		$scope.clickCount=1;
		$scope.initShowBody("a");
		expect($scope.clickCount).toBe(1);
	});
	it('allData promise', function(){
		
		var controller = createController();


	});
	it('pe1', function(){
		var controller = createController();
		expect($scope.projectEuler001(1000)).toBe(233168);
	});
	it('pe2', function(){
		var controller = createController();
		expect($scope.projectEuler002(4000000)).toBe(4613732);
	});
	it('pe3', function(){
		var controller = createController();
		expect($scope.projectEuler003(600851475143)).toBe(6857);
	});
	it('pe4', function(){
		var controller = createController();
		expect($scope.projectEuler004(3)).toBe(906609);
	});
	it('pe5', function(){
		var controller = createController();
		expect($scope.projectEuler005(20)).toBe(232792560);
	});
	it('process data', function(){
		var controller = createController();

		var allData={
			"events" : {
				"0" : {
					"adminID" : "0",
					"allTeams" : [ {
						"leader" : 1,
						"member" : [ 2 ],
						"teamID" : 0
					}, {
						"leader" : 3,
						"teamID" : 666
					} ],
					"description" : "a course",
					"eventName" : "3111h",
					"imageUrl" : "https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/11811378_670467616420822_8367557776291472237_n.jpg?oh=daf68581e51d412ce96010adf7d77648&oe=588A7872",
					"maxSize" : 8,
					"minSize" : 5,
					"waitingUsers" : [ null, "-KVu4OAjfPRTsmQ_8Ict" ]
				},
				"1" : {
					"adminID" : "-KVu4ejVupv9aXH-WWxu",
					"allTeams" : [ {
						"leader" : 0,
						"member" : [ 1, 2, "-KVu4OAjfPRTsmQ_8Ict" ]
					} ],
					"description" : "Programming using java",
					"eventName" : "Big Java",
					"imageUrl" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbBMgO-f6bU_HosLpsY0JDlY4rPsKykRBRaQ4GIsPEBfeHawIgLQ",
					"maxSize" : 8,
					"minSize" : 5
				},
				"-KVuCpLge5iLhFhStPfb" : {
					"adminID" : "0",
					"allTeams" : [ {
						"leader" : "-KVu4ejVupv9aXH-WWxu",
						"member" : [ 1 ],
						"teamID" : 1
					} ],
					"description" : "A special event",
					"eventName" : "3111h Hacker",
					"imageUrl" : "https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/11811378_670467616420822_8367557776291472237_n.jpg?oh=daf68581e51d412ce96010adf7d77648&oe=588A7872",
					"maxSize" : 8,
					"minSize" : 5
				}
			},
			"teams" : {
				"0" : {
					"belongstoEvent" : 0,
					"desiredSkills" : [ "love!sung", "Java expert", "cspeter", "HTML", "love peter" ],
					"imageUrl" : "http://i.stack.imgur.com/WCveg.jpg",
					"invitedPeople" : {
						"-KVu5KtIGZyaMZ6b2ymk" : "-KVu4ejVupv9aXH-WWxu"
					},
					"isPrivate" : false,
					"leaderID" : "1",
					"membersID" : [ "2f" ],
					"newSkill" : "",
					"preferedSize" : "8",
					"teamName" : "Undefined"
				},
				"1" : {
					"belongstoEvent" : 0,
					"desiredSkills" : [ "love!sung", "Java expert", "cspeter", "HTML", "love peter" ],
					"imageUrl" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbBMgO-f6bU_HosLpsY0JDlY4rPsKykRBRaQ4GIsPEBfeHawIgLQ",
					"isPrivate" : false,
					"leaderID" : "-KVu4ejVupv9aXH-WWxu",
					"membersID" : [ 1 ],
					"newSkill" : "",
					"preferedSize" : "8",
					"teamName" : "AwesomeTeam"
				},
				"666" : {
					"belongstoEvent" : 0,
					"desiredSkills" : [ "love!sung", "Java expert", "cspeter", "HTML", "love peter" ],
					"imageUrl" : "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcROAxjcxosTwQLGFK5n13_aorErUL8Jo-oQqBbi13jEVB3XVCUo",
					"invitedPeople" : {
						"-KVu5KtIGZyaMZ6b2ymk" : "-KVu4ejVupv9aXH-WWxu"
					},
					"isPrivate" : true,
					"leaderID" : 3,
					"newSkill" : "",
					"preferedSize" : "8",
					"teamName" : "Undefined666"
				},
				"777" : {
					"belongstoEvent" : 1,
					"desiredSkills" : [ "love!sung", "Java expert", "cspeter", "HTML", "love peter" ],
					"imageUrl" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbBMgO-f6bU_HosLpsY0JDlY4rPsKykRBRaQ4GIsPEBfeHawIgLQ",
					"isPrivate" : false,
					"leaderID" : "-KVu4ejVupv9aXH-WWxu",
					"membersID" : {
						"-KVu5RkDNLBHyl6MYf_f" : 1,
						"-KWObyxLQwIEIt_F06_R" : 2,
						"-KWOcPRa48PMX04aIh5Q" : "-KVu4OAjfPRTsmQ_8Ict"
					},
					"newSkill" : "",
					"preferedSize" : "8",
					"teamName" : "Like Java Team"
				}
			},
			"users" : {
				"0" : {
					"email" : "abc@connect.ust.hk",
					"eventsManaging" : [ "0", "-KVuCpLge5iLhFhStPfb" ],
					"name" : "samuel",
					"notifs" : {
						"-KW98hBH7GIbsai7" : {
							"accepted" : "undecided",
							"content" : "You are invited to Team Elder!",
							"eventID" : "0",
							"eventName" : "+1s",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"receiverEmail" : "abc@connect.ust.hk",
							"senderEmail" : "zzhaoah@ust.hk",
							"senderName" : "Zixuan",
							"teamID" : 0,
							"teamName" : "Undefined",
							"type" : "invitation"
						},
						"-KWSjWFyJEntn3RoBp9b" : {
							"content" : "A new event Event 3111h has been created",
							"eventID" : "1",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"type" : "System"
						},
						"-KWSwY592ZW41pKb6bRm" : {
							"content" : {
								"teamID" : "0",
								"teamName" : "Undefined"
							},
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"sendName" : "samuel",
							"senderEmail" : "abc@connect.ust.hk",
							"type" : "invitation"
						}
					},
					"profilePic" : "https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/11811378_670467616420822_8367557776291472237_n.jpg?oh=daf68581e51d412ce96010adf7d77648&oe=588A7872",
					"skills" : [ "Angular", "database", "computer" ],
					"teamsAsLeader" : 777
				},
				"1" : {
					"email" : "user1@connect.ust.hk",
					"name" : "User 1",
					"notifs" : {
						"-KW69X9FGoxxtHzl7VTJ" : {
							"content" : "You are removed from Team Fuck",
							"eventID" : "0",
							"eventName" : "+1s",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"receiverEmail" : "abc@connect.ust.hk",
							"senderEmail" : "xzhuah@connect.ust.hk",
							"senderName" : "Xinyu",
							"type" : "System"
						},
						"-KW98hBH7GIbsai7" : {
							"accepted" : "undecided",
							"content" : "You are invited to Team Elder!",
							"eventID" : "0",
							"eventName" : "+1s",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"receiverEmail" : "abc@connect.ust.hk",
							"senderEmail" : "zzhaoah@ust.hk",
							"senderName" : "Zixuan",
							"teamID" : 0,
							"teamName" : "Undefined",
							"type" : "invitation"
						},
						"-KWSjWFyJEntn3RoBp9b" : {
							"content" : "A new event Event Fuck has been created",
							"eventID" : "1",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"type" : "System"
						},
						"-KWSwY592ZW41pKb6bRm" : {
							"content" : {
								"teamID" : "0",
								"teamName" : "Undefined"
							},
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"sendName" : "samuel",
							"senderEmail" : "abc@connect.ust.hk",
							"type" : "invitation"
						}
					},
					"profilePic" : "http://i.stack.imgur.com/WCveg.jpg",
					"skills" : [ "Angular", "database", "computer" ],
					"teamsAsLeader" : [ "0" ],
					"teamsAsMember" : [ null, 1 ]
				},
				"2" : {
					"email" : "abc@connect.ust.hk",
					"name" : "User2",
					"notifs" : {
						"-KW69X9FGoxxtHzl7VTJ" : {
							"content" : "You are removed from Team Fuck",
							"eventID" : "0",
							"eventName" : "+1s",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"receiverEmail" : "abc@connect.ust.hk",
							"senderEmail" : "xzhuah@connect.ust.hk",
							"senderName" : "Xinyu",
							"type" : "System"
						},
						"-KW98hBH7GIbsai7" : {
							"accepted" : "undecided",
							"content" : "You are invited to Team Elder!",
							"eventID" : "0",
							"eventName" : "+1s",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"receiverEmail" : "abc@connect.ust.hk",
							"senderEmail" : "zzhaoah@ust.hk",
							"senderName" : "Zixuan",
							"teamID" : 0,
							"teamName" : "Undefined",
							"type" : "invitation"
						},
						"-KWSjWFyJEntn3RoBp9b" : {
							"content" : "A new event Event Fuck has been created",
							"eventID" : "1",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"type" : "System"
						},
						"-KWSwY592ZW41pKb6bRm" : {
							"content" : {
								"teamID" : "0",
								"teamName" : "Undefined"
							},
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"sendName" : "samuel",
							"senderEmail" : "abc@connect.ust.hk",
							"type" : "invitation"
						}
					},
					"profilePic" : "https://amazingslider.com/wp-content/uploads/2012/12/dandelion.jpg",
					"skills" : [ "Angular", "database", "computer" ],
					"teamsAsMember" : [ 0, 777 ]
				},
				"3" : {
					"email" : "User3@connect.ust.hk",
					"name" : "User3",
					"notifs" : {
						"-KW69X9FGoxxtHzl7VTJ" : {
							"content" : "You are removed from Team Fuck",
							"eventID" : "0",
							"eventName" : "+1s",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"receiverEmail" : "abc@connect.ust.hk",
							"senderEmail" : "xzhuah@connect.ust.hk",
							"senderName" : "Xinyu",
							"type" : "System"
						},
						"-KW98hBH7GIbsai7" : {
							"accepted" : "undecided",
							"content" : "You are invited to Team Elder!",
							"eventID" : "0",
							"eventName" : "+1s",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"receiverEmail" : "abc@connect.ust.hk",
							"senderEmail" : "zzhaoah@ust.hk",
							"senderName" : "Zixuan",
							"teamID" : 0,
							"teamName" : "Undefined",
							"type" : "invitation"
						},
						"-KWSjWFyJEntn3RoBp9b" : {
							"content" : "A new event Event Fuck has been created",
							"eventID" : "1",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"type" : "System"
						},
						"-KWSwY592ZW41pKb6bRm" : {
							"content" : {
								"teamID" : "0",
								"teamName" : "Undefined"
							},
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"sendName" : "samuel",
							"senderEmail" : "abc@connect.ust.hk",
							"type" : "invitation"
						}
					},
					"profilePic" : "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcROAxjcxosTwQLGFK5n13_aorErUL8Jo-oQqBbi13jEVB3XVCUo",
					"skills" : [ "Angular", "database", "computer" ],
					"teamsAsLeader" : [ 666 ]
				},
				"-KVu4OAjfPRTsmQ_8Ict" : {
					"email" : "User4@connect.ust.hk",
					"name" : "User4",
					"notifs" : {
						"-KW69X9FGoxxtHzl7VTJ" : {
							"content" : "You are removed from Team Fuck",
							"eventID" : "0",
							"eventName" : "+1s",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"receiverEmail" : "abc@connect.ust.hk",
							"senderEmail" : "xzhuah@connect.ust.hk",
							"senderName" : "Xinyu",
							"type" : "System"
						},
						"-KW98hBH7GIbsai7" : {
							"accepted" : "undecided",
							"content" : "You are invited to Team Elder!",
							"eventID" : "0",
							"eventName" : "+1s",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"receiverEmail" : "abc@connect.ust.hk",
							"senderEmail" : "zzhaoah@ust.hk",
							"senderName" : "Zixuan",
							"teamID" : 0,
							"teamName" : "Undefined",
							"type" : "invitation"
						},
						"-KWSjWFyJEntn3RoBp9b" : {
							"content" : "A new event Event Fuck has been created",
							"eventID" : "1",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"type" : "System"
						},
						"-KWSwY592ZW41pKb6bRm" : {
							"content" : {
								"teamID" : "0",
								"teamName" : "Undefined"
							},
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"sendName" : "samuel",
							"senderEmail" : "abc@connect.ust.hk",
							"type" : "invitation"
						}
					},
					"profilePic" : "http://i.stack.imgur.com/WCveg.jpg",
					"skills" : [ "Angular", "database", "computer" ],
					"teamsApplying" : [ {
						"eventID" : 0,
						"teamID" : 0,
						"teamName" : "Undefined"
					} ],
					"teamsAsMember" : [ 777 ]
				},
				"-KVu4ejVupv9aXH-WWxu" : {
					"email" : "User5@connect.ust.hk",
					"eventsManaging" : [ 1 ],
					"name" : "User5",
					"notifs" : {
						"-KW69X9FGoxxtHzl7VTJ" : {
							"content" : "You are removed from Team Fuck",
							"eventID" : "0",
							"eventName" : "+1s",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"receiverEmail" : "abc@connect.ust.hk",
							"senderEmail" : "xzhuah@connect.ust.hk",
							"senderName" : "Xinyu",
							"type" : "System"
						},
						"-KW98hBH7GIbsai7" : {
							"accepted" : "undecided",
							"content" : "You are invited to Team Elder!",
							"eventID" : "0",
							"eventName" : "+1s",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"receiverEmail" : "abc@connect.ust.hk",
							"senderEmail" : "zzhaoah@ust.hk",
							"senderName" : "Zixuan",
							"teamID" : 0,
							"teamName" : "Undefined",
							"type" : "invitation"
						},
						"-KWSjWFyJEntn3RoBp9b" : {
							"content" : "A new event Event Fuck has been created",
							"eventID" : "1",
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"type" : "System"
						},
						"-KWSwY592ZW41pKb6bRm" : {
							"content" : {
								"teamID" : "0",
								"teamName" : "Undefined"
							},
							"imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
							"read" : false,
							"sendName" : "samuel",
							"senderEmail" : "abc@connect.ust.hk",
							"type" : "invitation"
						}
					},
					"profilePic" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbBMgO-f6bU_HosLpsY0JDlY4rPsKykRBRaQ4GIsPEBfeHawIgLQ",
					"skills" : [ "Angular", "database", "computer" ],
					"teamsAsInvitedPeople" : [ 0, 666 ],
					"teamsAsLeader" : [ "1" ]
				}
			},
			"$loaded()": true
		};
		expect($scope.processData(allData,0,"0","0")).toBeDefined();

	});



});