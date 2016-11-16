// initFirebase();
describe('teamleader_controll', function() {
    beforeEach(module('teamapp'));

    var $controller, $rootScope, $scope, $firebaseObject, $firebaseArray;

    beforeEach(inject(function($controller, _$rootScope_, _$firebaseObject_, _$firebaseArray_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $firebaseObject = _$firebaseObject_;
        $firebaseArray = _$firebaseArray_;
        $rootScope.currentUser = {
            id: "0"
        };

        $controller = $controller('teamleader_controll', {
            $scope: $scope,
            $rootScope: $rootScope,
            $firebaseObject: $firebaseObject,
            $firebaseArray: $firebaseArray
        });
    }));

    describe('teamleader', function() {
        beforeEach(function(){
            $scope.init();
            $scope.event = {
              "adminID" : "0",
              "allTeams" : [ {
                "leader" : "-KVu4ejVupv9aXH-WWxu",
                "member" : [ 1 ],
                "teamID" : 1
              } ],
              "description" : "A special event",
              "eventName" : "3111h",
              "imageUrl" : "https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/11811378_670467616420822_8367557776291472237_n.jpg?oh=daf68581e51d412ce96010adf7d77648&oe=588A7872",
              "maxSize" : 8,
              "minSize" : 5,
              "waitingUsers" : [ "-KVu4OAjfPRTsmQ_8Ict", "-KVu4ejVupv9aXH-WWxu" ]
          };
            $scope.team = {
              "belongstoEvent" : "0",
              "desiredSkills" : [ "love!sung", "Java expert", "cspeter", "HTML", "love peter", "database" ],
              "imageUrl" : "http://i.stack.imgur.com/WCveg.jpg",
              "isPrivate" : false,
              "leaderID" : "1",
              "membersID" : {
                "2" : 2,
                "-KWaE8OnTnHEEcXGVYFB" : "-KVu4OAjfPRTsmQ_8Ict"
              },
              "newSkill" : "unit testing",
              "pendingApplicants" : {
                "3" : 3
              },
              "preferedSize" : "8",
              "teamName" : "UndefinedTeam"
            };
            $scope.members = [{
                "email": "abc@connect.ust.hk",
                "name": "User2",
                "skills": ["Angular", "database", "computer"],
                "teamsAsMember": [0, 777]
            }];
            $scope.applicants = [{
              "$id":1234567,
              "email" : "User3@connect.ust.hk",
              "name" : "User3",
              "skills" : [ "Angular", "computer" ],
              "teamsApplying" : [ 0 ],
              "teamsAsLeader" : [ 666 ]
          },{
            "$id":1234567890,
            "email" : "User5@connect.ust.hk",
            "eventsManaging" : [ 1 ],
            "name" : "User5",
            "skills" : [ "Angular", "database", "computer" ],
            "teamsAsInvitedPeople" : [ null, 666 ],
            "teamsAsLeader" : [ "1" ]
          }];
          $scope.invitedPeople = [{
              "email" : "User5@connect.ust.hk",
              "eventsManaging" : [ 1 ],
              "name" : "User5",
              "skills" : [ "Angular", "database", "computer" ],
              "teamsAsInvitedPeople" : [ 0, 666 ],
              "teamsAsLeader" : [ "1" ]
          }];
          $scope.smartPick = {
              preferedSize: angular.copy($scope.team.preferedSize),
              desiredSkills: angular.copy($scope.team.desiredSkills),
              newSkill: "newskill"
          };
          $scope.invite = {
              desiredSkills: ["2f"],
              newSkill: ""
          };
        });
        it("should delete member", function() {
            $scope.deleteMember($scope.members[0]);
            expect($scope.members).toEqual([{ email: 'abc@connect.ust.hk', name: 'User2', skills: [ 'Angular', 'database', 'computer' ], teamsAsMember: [ 0, 777 ] }]);
        });
        it('should delete applicant', function() {
            $scope.deleteApplicant($scope.applicants[0]);
            expect($scope.applicants).toEqual([{ $id: 1234567, email: 'User3@connect.ust.hk', name: 'User3', skills: [ 'Angular', 'computer' ], teamsApplying: [ 0 ], teamsAsLeader: [ 666 ] },{ $id: 1234567890, email: 'User5@connect.ust.hk', eventsManaging: [ 1 ], name: 'User5', skills: [ 'Angular', 'database', 'computer' ], teamsAsInvitedPeople: [ null, 666 ], teamsAsLeader: [ '1' ] }]);
        });
        it("should delete invitation", function() {
            $scope.deleteInvitation($scope.invitedPeople[0])
            expect($scope.invitedPeople).toEqual([{ email: 'User5@connect.ust.hk', eventsManaging: [ 1 ], name: 'User5', skills: [ 'Angular', 'database', 'computer' ], teamsAsInvitedPeople: [ 0, 666 ], teamsAsLeader: [ '1' ] }]);
        });
        it('should add Applicant', function() {
            $scope.addApplicant();
            $scope.addApplicant($scope.applicants[0],$scope.event,$scope.team,$scope.members);
            expect($scope.members[0]).toEqual({
                "email": "abc@connect.ust.hk",
                "name": "User2",
                "skills": ["Angular", "database", "computer"],
                "teamsAsMember": [0, 777]
            });
        });
        it('should send invitation', function() {
            $scope.sendInvitation();
            $scope.sendInvitation($scope.event,$scope.members,$scope.invitedPeople,$scope.invite);
            expect($scope.invite.desiredSkills).toEqual([]);
        });
        it('should check if there is no applicant', function() {
            $scope.checkApplicants();
            $scope.checkApplicants($scope.applicants);
            expect().toEqual();
        });
        it('should smart pick proper applicants', function() {
            $scope.smartAdd($scope.event,$scope.team,$scope.smartPick,$scope.members,$scope.applicants);
            expect($scope.members).toEqual([{
                "email": "abc@connect.ust.hk",
                "name": "User2",
                "skills": ["Angular", "database", "computer"],
                "teamsAsMember": [0, 777]
            }]);
        });
        it('should add new skill', function() {
            $scope.addNewSkill($scope.invite);
            $scope.addNewSkill($scope.team);
            expect($scope.team.desiredSkills).toEqual([ "love!sung", "Java expert", "cspeter", "HTML", "love peter", "database", "unit testing" ]);
        });
        it('should remove skill', function() {
            $scope.removeSkill($scope.team, "HTML");
            expect($scope.team.desiredSkills).toEqual([ "love!sung", "Java expert", "cspeter", "love peter", "database" ]);
        });
        it('should not initialize after first time load', function() {
            flag = true;
            $scope.init();
            expect().toEqual();
        });
    });
});
