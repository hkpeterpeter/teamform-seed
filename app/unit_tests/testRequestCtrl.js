describe("tfApp", function() {
  beforeEach(function(){
    //angular.module("firebase",[]);
    //angular.module("ui.router",[]);
    //angular.module("ngDialog",[]);
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

  var $controller, auth;

  beforeEach(inject(function(_$controller_, Auth){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    auth = Auth;
  }));

  describe('requestCtrl', function() {
    var $scope, controller;

     beforeEach(function() {
      $scope = {};
      controller = $controller('requestCtrl', { $scope: $scope});

    });

    it('test withdrawApp', function() {
        $scope.withdrawApp(0,0);
        expect(0).toEqual(0);
    });

    it('test acceptInvi', function() {
        $scope.acceptInvi(0,0);
        expect(0).toEqual(0);

    });

    it('test declineInvi', function(){
        $scope.declineInvi(0,0);
        expect(0).toEqual(0);
    });

    it('test filter', function(){
        result = $scope.filterEvent({a:1, b:2, c:"str"}, a );
        expect(result).toEqual({a:1});
    });

  });
});
