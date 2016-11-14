initFirebase();

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
	 var $controller, scope, $firebaseArray, $firebaseObject, $q;
	 var ctrl, deferred;

    beforeEach(inject(function(_$controller_, _$q_, _$firebaseArray_, _$firebaseObject_, _$rootScope_){

    	//scope = _$rootScope_.$new();
    	$controller = _$controller_;
    	$firebaseArray = _$firebaseArray_;
      $firebaseObject = _$firebaseObject_;
    	scope = _$rootScope_.$new();
      $q = _$q_;
      deferred = _$q_.defer();
      deferred.resolve();

    	//$firebaseObject = _$firebaseObject_;
    	//$compile = _$compile_;
    	
    }));	
  
    beforeEach(function() {
  	  ctrl = $controller('admin_ctrl', { $scope: scope });
      deferred.resolve();     
      spyOn(scope.event, '$loaded').and.returnValue(deferred.promise);
      deferred.resolve();     
      

    });
   //
   // the data used for testing
   //
   var teams = [{
                membersID: {mem11: 'member11', mem12: 'member12'}, 
                leaderID: 'leader1',
                invitedPeople: {inv11: 'invite11',inv12: 'invite12'},
                teamName: 'teamOne',
                desiredSkills: {ski11: 'angular',ski12: 'java'}
                }, {
                membersID: {mem21: 'member21'}, 
                leaderID: 'leader2',
                invitedPeople: {inv21: 'invite11',inv22: 'invite12'},
                teamName: 'testTwo',
                desiredSkills: {ski21: 'angular'}
                }, {
                membersID: {mem31: 'member31', mem32: 'member32', mem33: 'member33', mem34: 'member34', mem35: 'member35', mem36: 'member36', mem37: 'member37' }, 
                leaderID: 'leader3',
                invitedPeople: {inv31: 'invite31'},
                teamName: 'testThree',
                desiredSkills: {ski31: 'angular'}
                },{ 
                leaderID: 'leader4',
                teamName: 'testFour'
                }];
  var users = [{
    name: 'user1',
    skills: {ski11: 'angular',ski12: 'java'},
    teamsAsLeader: {t0: 0},
    teamsAsMember: {t0: 1},
    teamsApplying: {t0: {eventID: 0, teamID: 0, teamName: 'teamOne'}, t1: {eventID: 0, teamID: 1, teamName: 'testTwo'}}
  }, {
    name: 'user2',
    skills: {ski21: 'angular'},
    teamsAsMember: {t0: 1},
    teamsApplying: {t0: {eventID: 0, teamID: 0, teamName: 'teamOne'} }
  }, {
    name: 'user3',
    skills: {ski31: 'angular'},
    teamsAsMember: {t0: 1}
  }];
              


   describe('admin basic control', function() {

  		it('should have defined event', function() {
  				expect(scope.event_ref).toBeDefined();
			});
  		it('should have defined event2', function() {
  				expect(scope.event).toBeDefined();

			});
      it('should have promise', function() {
          deferred.resolve();
          scope.event.$loaded();
          deferred.resolve();
          scope.$apply();
          expect(scope.event.$loaded).toHaveBeenCalled();

      });
      it('should have team size', function() {
          //deferred.resolve();
          scope.event.$loaded().then(scope.$apply());
          expect(scope.size).toBeDefined();   
      });

   });

    describe('team filter test', function(){
      it ('should not show any team', function() {
        scope.adminTeamFull = false;
        scope.adminTeamNotFull = false;
        scope.adminTeamSearch = null;
        expect(scope.teamFilter(teams[0])).toEqual(false);
        expect(scope.teamFilter(teams[2])).toEqual(false);
      }); 
      it ('should not show full team', function() {
        scope.adminTeamFull = false;
        scope.adminTeamNotFull = true;
        scope.adminTeamSearch = null;
        scope.event.$loaded().then(function(){
          expect(scope.getLength(teams[3])).toEqual(1);
          expect(scope.teamFilter(teams[3])).toEqual(true);
          expect(scope.teamFilter(teams[2])).toEqual(false);
        });
      }); 
      it ('should show full team', function() {
        scope.adminTeamFull = true;
        scope.adminTeamNotFull = false;
        scope.adminTeamSearch = null;
        scope.event.$loaded().then(function() {
          expect(scope.teamFilter(teams[0])).toEqual(false);
          expect(scope.teamFilter(teams[2])).toEqual(true);
        });
      });
      it ('should find skill', function() {
        scope.adminTeamSearch = 'jav';
        expect(scope.teamFilter(teams[0])).toEqual(true);
        expect(scope.teamFilter(teams[1])).toEqual(false);
      });  
    });

    describe('user filter test', function(){
      it ('should not show any team', function() {
        scope.adminUserRequest = false;
        scope.adminUserNotRequest = false;
        scope.adminUserSearch = null;
        expect(scope.userFilter(users[0])).toEqual(false);
        expect(scope.userFilter(users[2])).toEqual(false);
      }); 
      it ('should not show full team', function() {
        scope.adminUserRequest = false;
        scope.adminUserNotRequest = true;
        scope.adminUserSearch = null;
          scope.$apply();
          expect(scope.userFilter(users[3])).toEqual(true);
          expect(scope.userFilter(users[2])).toEqual(false);
      }); 
      it ('should show full team', function() {
        scope.adminUserRequest = true;
        scope.adminUserNotRequest = false;
        scope.adminUserSearch = null;
          scope.$apply();
          expect(scope.userFilter(users[0])).toEqual(false);
          expect(scope.userFilter(users[2])).toEqual(true);
      });
      it ('should find skill', function() {
        scope.adminUserSearch = 'jav';
        expect(scope.userFilter(users[0])).toEqual(true);
        expect(scope.userFilter(users[1])).toEqual(false);
      });  
    });

 });
});
