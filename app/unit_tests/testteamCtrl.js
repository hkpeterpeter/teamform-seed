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
                helper.getTeamname = function(teamID){}
                helper.joinEvent = function(uid, eventID) {}
                helper.changeReadState = function(uid,eid,nid){}
                helper.updateSkillTags = function(eventID, teamID, skilltags){}
                helper.updateLanguageTags = function(eventID, teamID, languagetags){}
                helper.updateMannerTags = function(eventID, teamID, mannertags){}
               return helper;
             });

             $provide.service('ngDialog',function(){
                this.open=function(dummyParams){
                  dialogue={};
                  dialogue.close=function(){}
                  return dialogue;
                }
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

        it('$scope.Change_Leader() should be change $scope.leader_change  to true ', function() {
          $scope.Change_Leader();
          expect($scope.leader_change).toEqual(true);
          console.log("test");
        });



        it('$scope.ApplyTeam() should apply for a team', function() {
          $scope.ApplyTeam();
          // expect(window.alert).toHaveBeenCalledWith("Your application is received");
        });



        it('$scope.DeleteMember() should delete a member in a team', function() {
          $scope.DeleteMember();
        });



        it('$scope.QuitTeam() should quit a team', function() {
          $scope.QuitTeam();
        });



        it('$scope.SetLeader() should assign team leader to another member', function() {
          $scope.SetLeader();
        });



        it('$scope.filterLeader() should return a filter list with leader uid not in it', function() {
          $scope.filterLeader();

        });



        it('$scope.ChangeTeamName() should change a team name', function() {
          $scope.ChangeTeamName("s");

        });



        it('$scope.ChangeTeamDesc() should change a team description', function() {
          $scope.ChangeTeamDesc("s");

        });



        it('$scope.ChangeTeamMax() should change a team maximum limit', function() {
          $scope.ChangeTeamMax(9);

        });


        it('$scope.changeTeamInfo() should change a team infomation', function() {
          $scope.changeTeamInfoDialogue();
          $scope.changeTeamInfo();
        });


        it('$scope.filterSkillTags() should filter skill tags', function() {
          $scope.filterSkillTags();

        });


        it('$scope.filterLanguageTags() should filter language tags', function() {
          $scope.filterLanguageTags();

        });


        it('$scope.filterMannerTags() should filter manner tags', function() {
          $scope.filterMannerTags();

        });
        //
        it('$scope.modifySkillTagsChoice() should change the state of modifySkillTags', function() {
          $scope.modifySkillTagsChoice();
          $scope.modifySkillTags = true;
        });

        it('$scope.modifyLanguageTagsChoice() should change the state of modifyLanguageTags', function() {
          $scope.modifyLanguageTagsChoice();
          $scope.modifyLanguageTags = true;
        });

        it('$scope.modifyMannerTagsChoice() should change the state of modifyMannerTags', function() {
          $scope.modifyMannerTagsChoice();
          $scope.modifyMannerTags = true;
        });

        it('$scope.changeSkillTags() should change skill tags', function() {
          $scope.changeSkillTags();
        });

        it('$scope.changeLanguageTags() should change language tags', function() {
          $scope.changeLanguageTags();
        });

        it('$scope.changeMannerTags() should change manner tags', function() {
          $scope.changeMannerTags();
        });

        it('$scope.addAnnouncement() should add an announcement', function() {
          $scope.addAnnouncement();
        });

        it('$scope.deleteTeamAnnouncementChoice() should change state', function() {
          $scope.deleteTeamAnnouncementChoice();
        });

        it('$scope.deleteAnnouncement() should delete an announcement', function() {
          $scope.deleteAnnouncement("dasdsa");
        });

        it('$scope.filterByStatus() should filter applications and invitations by status', function() {
          $scope.filterByStatus();
        });

        it('$scope.accept_Application() should accept an application', function() {
          $scope.accept_Application("111");
        });

        it('$scope.decline_Application() should decline an application', function() {
          $scope.decline_Application("111");
        });
    });

});
