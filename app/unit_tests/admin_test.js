//initFirebase();
describe('admin request filter', function() {
	beforeEach(module('teamapp', 'firebase'));

  var $filter;

  beforeEach(inject(function(_$filter_){
    $filter = _$filter_;

  }));

  var items = {item1: {eventID: '0', $id: '1'},
  						item2: {eventID: '1', $id: '0'},
  						item3: {eventID: '0'}};

  it('returns empty list when given null', function() {
  	var requestFilter = $filter('adminRequest');
    expect(requestFilter(null)).toEqual([]);
  });
  it('returns list of items belonging to current event', function() {
  	var requestFilter = $filter('adminRequest');
  	expect(requestFilter(items)).toEqual([{eventID: '0', $id: '1'}, {eventID: '0'}]);
  });
});


describe('teamapp_admin', function() {
	beforeEach(module('teamapp', 'firebase'));
  describe('admin_ctrl', function(){
	 var $controller, scope, $firebaseArray, $firebaseObject, $q, $timeout;
	 var ctrl, deferred;

   var teams = {0: {
                $id: "0",
                membersID: {mem11: 'member11', mem12: 'member12'},
                leaderID: 'leader1',
                invitedPeople: {inv11: 'user0', inv12: 'user2'},
                teamName: 'teamOne',
                desiredSkills: {ski11: 'angular',ski12: 'java' }
                },1: {
                membersID: {mem21: 'member21'},
                leaderID: 'leader2',
                invitedPeople: {inv21: 'user0',inv22: 'user2'},
                teamName: 'testTwo',
                desiredSkills: {ski21: 'angular', ski13: 'random', ski14: 'test'}
                },2: {
                $id: "2",
                membersID: {mem31: 'member31', mem32: 'member32', mem33: 'member33', mem34: 'member34', mem35: 'member35', mem36: 'member36', mem37: 'member37' },
                leaderID: 'leader3',
                teamName: 'testThree',
                desiredSkills: {ski31: 'angular'}
                },3: {
                leaderID: 'leader4',
                teamName: 'testFour',
                invitedPeople: {inv21: 'user0',inv22: 'user2', inv23: 'user4', inv24: 'user6'},
                desiredSkills: {ski41: 'angular'}
                }};

    beforeEach(inject(function(_$controller_, _$q_, _$firebaseArray_, _$firebaseObject_, _$rootScope_, _$timeout_){

    	//scope = _$rootScope_.$new();
    	$controller = _$controller_;
    	$firebaseArray = _$firebaseArray_;
      $firebaseObject = _$firebaseObject_;
    	scope = _$rootScope_.$new();
      $q = _$q_;
      $timeout = _$timeout_;
      deferred = _$q_.defer();
      deferred.resolve();
      scope.event = {
    $id: 0,
    adminID: '0',
    allTeams: {0: {leader: 'leader1', teamID: '1', member: {0: '0'} } },
    eventName: '3111h',
    maxSize: 8,
    minSize: 5,
    waitingUsers: {0: '-KVu4OAjfPRTsmQ_8Ict', 1: 'user0'}
    };

    	//$firebaseObject = _$firebaseObject_;
    	//$compile = _$compile_;
    }));

    beforeEach(function() {


  	  ctrl = $controller('admin_ctrl', { $scope: scope });
      //deferred.resolve();
      //spyOn(scope.event, '$loaded').and.returnValue(deferred.promise);
      //deferred.resolve();
    });
   //
   // the data used for testing
   //

  var users = [{
    $id: 'user0',
    name: 'user1',
    skills: {ski11: 'angular',ski12: 'java'},
    teamsAsLeader: {t0: 0},
    teamsAsMember: {t0: 1},
    teamsApplying: {0: {eventID: '0', teamID: '0', teamName: 'UndefinedTeam'}, 1: {eventID: 0, teamID: 1, teamName: 'testTwo'}, 2: {eventID: '123', teamID: 'a', teamName: 'test'} }
  }, {
    $id: 'user2',
    name: 'user2',
    teamsAsMember: {t0: 1},
    teamsApplying: {0: {eventID: '1', teamID: '0', teamName: 'teamOne'} }
  }, {
    $id: 'user4',
    name: 'user3',
    skills: {ski31: 'angular', ski32: 'random', ski33: 'test' },
    teamsAsMember: {t0: 1}
  }, {
    $id: 'user6',
    name: 'user4',
    skills: {ski31: 'nullskill' },
    teamsAsMember: {t0: 1}
  }];




   describe('admin basic control', function() {

  		it('should have defined event', function() {
  				expect(scope.event_ref).toBeDefined();
			});
  		it('should have defined event2', function() {
        	expect(scope.event).toBeDefined();

			});
      /*it('should have promise', function() {
          deferred.resolve();
          scope.$apply();
          deferred.resolve();
          scope.$apply();
          expect(scope.event.$loaded).toHaveBeenCalled();
      });*/

   });



   describe('delete team test', function(){
    it ('shoulddelte team', function(){
      scope.remove(teams['0']);

    })
   });

   describe('team merge test', function() {
    it ('should return false', function() {
      expect(scope.canMergeTeams(teams['0'], teams['2'])).toEqual(false);
    });
    it ('should return true', function() {
      expect(scope.canMergeTeams(teams['0'], teams['1'])).toEqual(true);
    })
    it ('should not merge', function() {

      scope.$apply();
      teams['0'].adminMerge = 'FULL';
      /*
      $timeout(function(){
      expect('0').toEqual('1');
      scope.$apply();
      scope.adminMergeTeam(teams['0']);
      expect(teams['0']).toBeDefined();
      scope.$apply();
      teams['0'].adminMerge = 'notFULL';
      scope.$apply();
      scope.adminMergeTeam(teams['0']);
      expect(teams['0']).toBeDefined();
      expect(scope.teams['0']).toBeDefined();
      }, 5000);
      $timeout.flush(6000);
      expect('0').toEqual('1');
      scope.$apply();
      scope.adminMergeTeam(teams['0']);
      expect(teams['0']).toBeDefined();
      scope.$apply();
      teams['0'].adminMerge = 'notFULL';
      */
      scope.$apply();
      scope.adminMergeTeam(teams['0']);

      expect(teams['0']).toBeDefined();
    })
   });

/*
   describe("add user test", function() {
    it('should add user to other team', function() {
      users[0].adminAdd = "UndefinedTeam";
      scope.$apply();
      scope.adminAddUserToOtherTeam(users[0]);
      expect(users[0]).toBeDefined();
    });
    it ('should add user to requested team', function() {
      scope.$apply();
      var request = {eventID: '0', teamID: '666', teamName: 'Undefined666'};
      scope.adminAddUserToTeam('t0', request, users[0]);
      expect(users[0]).toBeDefined();
    });
    it ("should find this team full", function() {
      expect(scope.adminAddUser('0', 8, {}, users[0])).toEqual(false);
    });
   });
*/




    describe('team filter test', function(){

      it ('should not show any team', function() {


        scope.adminTeamFull = false;
        scope.adminTeamNotFull = false;
        scope.adminTeamSearch = null;
        expect(scope.teamFilter(teams['0'])).toEqual(false);
        expect(scope.teamFilter(teams['2'])).toEqual(false);
      });
      it ('should not show full team', function() {
        scope.maxSize = 8;
        scope.adminTeamFull = false;
        scope.adminTeamNotFull = true;
        scope.adminTeamSearch = null;
        scope.$apply();
        expect(scope.getLength(teams['3'])).toEqual(1);
        expect(scope.getLength(teams['2'])).toEqual(8);
        expect(scope.maxSize).toEqual(8);
        expect(scope.teamFilter(teams['3'])).toEqual(true);
        expect(scope.teamFilter(teams['2'])).toEqual(false);
      });
      it ('should show full team', function() {
        scope.adminTeamFull = true;
        scope.adminTeamNotFull = false;
        scope.adminTeamSearch = null;
        scope.maxSize = 8;
        scope.$apply();
        expect(scope.teamFilter(teams['0'])).toEqual(false);
        expect(scope.teamFilter(teams['2'])).toEqual(true);
      });
      it ('should find skill', function() {
        scope.adminTeamSearch = 'jav';
        expect(scope.teamFilter(teams['0'])).toEqual(true);
        expect(scope.teamFilter(teams['1'])).toEqual(false);
      });
    });




    describe('user filter test', function(){
      it ('should not show any user', function() {
        scope.adminUserRequest = false;
        scope.adminUserNotRequest = false;
        scope.adminUserSearch = null;
        expect(scope.userFilter(users[0])).toEqual(false);
        expect(scope.userFilter(users[2])).toEqual(false);
      });
      it ('should not show requested user', function() {
        scope.adminUserRequest = false;
        scope.adminUserNotRequest = true;
        scope.adminUserSearch = null;
          scope.$apply();
          expect(scope.userFilter(users[1])).toEqual(true);
          expect(scope.userFilter(users[2])).toEqual(true);
          expect(scope.userFilter(users[0])).toEqual(false);
      });
      it ('should show requested user only', function() {
        scope.adminUserRequest = true;
        scope.adminUserNotRequest = false;
        scope.adminUserSearch = null;
          scope.$apply();
          expect(scope.userFilter(users[0])).toEqual(true);
          expect(scope.userFilter(users[1])).toEqual(false);
          expect(scope.userFilter(users[2])).toEqual(false);
      });
      it ('should find skill', function() {
        scope.adminUserSearch = 'jav';
        expect(scope.userFilter(users[0])).toEqual(true);
        expect(scope.userFilter(users[1])).toEqual(false);
        expect(scope.userFilter(users[2])).toEqual(false);
      });
    });

   describe('recommend test', function() {
    it ('should return invited user', function() {
      expect(scope.findSuitableUser(teams['0'], users).$id).toEqual('user0');
      expect(scope.findSuitableUser(teams['3'], users).$id).toEqual('user0');
    });
    it ('should return not invited user', function() {
      expect(scope.findSuitableUser(teams['2'], users).$id).toEqual('user0');
      expect(scope.findSuitableUser(teams['1'], users).$id).toEqual('user4');
    });
    it ('should have null user list', function() {
      expect(scope.findSuitableUser(teams['2']).$id).toBeDefined();
    })
   })

   describe('invite user test', function() {
    it ('should return false', function() {
      expect(scope.adminUpdateUserInfo(teams['2'], users[0])).toEqual(false);
    });
    it ('should add successfully', function() {
      expect(scope.adminUpdateUserInfo(teams['0'], users[0])).toEqual(true);
    });
   });




 });
});
