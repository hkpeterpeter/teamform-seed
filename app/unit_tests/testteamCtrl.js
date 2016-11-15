describe("tfApp", function(){
  beforeEach(function(){
    module("tfApp");
    module(function($provide){
        $provide.factory('Auth', function(){
            $onAuthStateChanged=function(callback){
              callback({uid:"testUid"});
              callback(null);
              // console.log("fffffffffffffffffff")
            }
            return {
              $onAuthStateChanged:$onAuthStateChanged
            }
        });
        // $provide.factory('$firebaseObject', function(){
        //     return function(ref){
        //       return {

        //       }
        //     }
        // });
        $provide.factory('Helper', function(){
                var helper={};
                helper.addPersonToTeam = function(uid, eventID, teamID, position="member") {}
                helper.deletePersonFromTeam = function(uid, eventID, teamID) {}
                helper.createTeam = function(uid, eventID, team) {}
                helper.deleteTeam = function(eventID, teamID) {}
                helper.createEvent = function(uid, event) {}
                helper.pushNotificationTo = function(toUid, eventID, msg) {}
                helper.sendInvitationTo = function(toUid, eventID, teamID) {}
                helper.sendApplicationTo = function(uid, eventID, teamID) {}
                helper.withdrawApplication = function(uid, eventID, teamID) {}
                helper.quitEvent = function(uid, eventID) {}
                helper.acceptInvitation = function(uid, eventID, teamID) {}
                helper.declineInvitation = function(uid, eventID, teamID) {}
                helper.acceptApplication = function(uid, eventID, teamID) {}
                helper.declineApplication = function(uid, eventID, teamID) {}
                helper.updateEvent = function(eventID) {}
                helper.updateTeam = function(eventID, teamID) {}
                helper.postEventAnnouncement = function(eventID, msg) {}
                helper.postTeamAnnouncement = function(eventID, teamID, msg) {}
                helper.deleteEventAnnouncement = function(eventID, announcementKey) {}
                helper.setEventState= function(uid, eventID, state) {}
                helper.changeLeader = function(fromuid, touid, eventID, teamID){}
                helper.getUsername  = function(uid){}
                helper.joinEvent = function(uid, eventID) {}
                helper.changeReadState = function(uid,eid,nid){}
               return helper;
             });
      });
      // initalizeFirebase();
  });

  var $controller, auth, helper;

  beforeEach(inject(function(_$controller_, Auth, Helper){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    auth = Auth;
    helper = Helper;
  }));


    describe('teamCtrl', function() {
      var $scope, controller;

       beforeEach(function() {
        $scope = {};
        controller = $controller('teamCtrl', { $scope: $scope});

      });
      describe('testing Change_Leader()', function(){
        it('$scope.Change_Leader() should be change $scope.leader_change  to true ', function() {
          $scope.Change_Leader();
          expect($scope.leader_change).toEqual(true);
          console.log("test");
        });
      });

      describe('testing ApplyTeam()', function(){
        it('$scope.ApplyTeam() should apply for a team', function() {
      //   $scope.password = 'longerthaneightchars';
      //   $scope.grade();
          $scope.ApplyTeam();
          // expect(window.alert).toHaveBeenCalledWith("Your application is received");
        });
      });

      describe('testing DeleteMember()', function(){
        it('$scope.DeleteMember() should delete a member in a team', function() {
      //   $scope.password = 'longerthaneightchars';
      //   $scope.grade();
          var uid = "123";
          $scope.DeleteMember(uid);
        });
      });

      describe('testing QuitTeam()', function(){
        it('$scope.QuitTeam() should quit a team', function() {
      //   $scope.password = 'longerthaneightchars';
      //   $scope.grade();
        $scope.QuitTeam();
        });
      });

      describe('testing SetLeader()', function(){
        it('$scope.SetLeader() should assign team leader to another member', function() {
      //   $scope.password = 'longerthaneightchars';
      //   $scope.grade();
        $scope.SetLeader();
        });
      });

      describe('testing SetLeader()', function(){
        it('$scope.filterLeader() should return a filter list with leader uid not in it', function() {
      //   $scope.password = 'longerthaneightchars';
      //   $scope.grade();
        $scope.filterLeader();

        });
      });

      describe('testing ChangeTeamName()', function(){
        it('$scope.ChangeTeamName() should change the team name', function() {
      //   $scope.password = 'longerthaneightchars';
      //   $scope.grade();
         var newname = "www";
        $scope.ChangeTeamName(newname);

        });
      });

      describe('testing ChangeTeamDesc()', function(){
        it('$scope.ChangeTeamDesc() should change the team description', function() {
      //   $scope.password = 'longerthaneightchars';
      //   $scope.grade();
      var newdesc = "sss";
        $scope.ChangeTeamDesc(newdesc);

        });
      });
      // it('Listen', function() {
        // auth.$signInWithEmailAndPassword(
        //               "test@test.com",
        //               "123456"
        // ).then(function(authData) {
        //     console.log("Logged in as:", authData);
        // }).catch(function(error) {
        //     console.log("Authentication failed:", error);
        //     // $window.alert(error);
        // });
        // setTimeout(function(){console.log('hhh')},3000);
        // expect($scope.selectTeam).toEqual(false);
      // });

    });

});
