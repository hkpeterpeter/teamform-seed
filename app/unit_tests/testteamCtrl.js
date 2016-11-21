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

  var $controller, $filter, auth, helper;

  beforeEach(inject(function(_$controller_, _$filter_ ,  Auth, Helper){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $filter = _$filter_;
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


        it('$scope.alreadyApplied() should return whether user has already applied for a team', function() {
          $scope.user_appli = {"a" : "pending"};
          $scope.teamID = "b";
          $scope.user_appli[$scope.teamID] == undefined;
            expect($scope.alreadyApplied()).toEqual(false);

            $scope.user_appli = {"a" : "pending"};
            $scope.teamID = "a";
            $scope.user_appli[$scope.teamID] = "pending";
            expect($scope.alreadyApplied()).toEqual(true);

          // expect(window.alert).toHaveBeenCalledWith("Your application is received");
        });

        it('$scope.ApplyTeam() should apply for a team', function() {
          $scope.ApplyTeam();
          // expect(window.alert).toHaveBeenCalledWith("Your application is received");
        });



        it('$scope.DeleteMember() should delete a member in a team', function() {
          $scope.teamdata.members =
            { "a" : "a",
              "b":"b"
            };
          $scope.DeleteMember();

        });



        it('$scope.QuitTeam() should quit a team', function() {
          $scope.teamdata.members =
            { "a" : "a",
              "b":"b"
            };
          $scope.QuitTeam();
        });



        it('$scope.SetLeader() should assign team leader to another member', function() {
          $scope.teamdata.members =
            { "a" : "a",
              "b":"b"
            };
          $scope.SetLeader();
        });



        it('$scope.filterLeader() should return a filter list with leader uid not in it', function() {
          var items =
          { "a" : "a",
            "b":"b"
          };
          var leaderuid = "a";

          expect($scope.filterLeader(items,leaderuid)).toEqual({"b" : "b"});

        });



        it('$scope.ChangeTeamName() should change a team name', function() {
          $scope.teamdata.members =
            { "a" : "a",
              "b":"b"
            };
          $scope.ChangeTeamName("s");

        });



        it('$scope.ChangeTeamDesc() should change a team description', function() {
          $scope.teamdata.members =
            { "a" : "a",
              "b":"b"
            };
          $scope.ChangeTeamDesc("s");

        });



        it('$scope.ChangeTeamMax() should change a team maximum limit', function() {
          $scope.teamdata.members =
            { "a" : "a",
              "b":"b"
            };
          $scope.ChangeTeamMax(9);

        });


        it('$scope.changeTeamInfo() should change a team infomation', function() {
          $scope.changeTeamInfoDialogue();
          $scope.teamdata.name = "mark";
          $scope.newTeaminfo.name = "god";
          $scope.teamdata.desc = "aaa";
          $scope.newTeaminfo.desc = "bbb";
          $scope.teamdata.max = 7;
          $scope.newTeaminfo.max = 8;
          $scope.changeTeamInfo();
          $scope.teamdata.name = "mark";
          $scope.newTeaminfo.name = "mark";
          $scope.teamdata.desc = "aaa";
          $scope.newTeaminfo.desc = "aaa";
          $scope.teamdata.max = 7;
          $scope.newTeaminfo.max = 7;
          $scope.changeTeamInfo();

        });



        it('$scope.ManageTagDialogue() should jump a dialogue', function() {
          $scope.ManageTagDialogue();
        });


        it('$scope.filterSkillTags() should filter skill tags', function() {
          var items =
          { "a" : 0,
            "b": 1
          };
          expect($scope.filterSkillTags(items)).toEqual({"b":1});
          $scope.noSkillTags = false;

          var items =
          { "a" : 0,
            "b": 0
          };
          expect($scope.filterSkillTags(items)).toEqual({});
          $scope.noSkillTags = true;

        });


        it('$scope.filterLanguageTags() should filter language tags', function() {
          var items =
          { "a" : false,
            "b": true
          };
          expect($scope.filterLanguageTags(items)).toEqual({"b":true});
          $scope.noLanguageTags = false;

          var items =
          { "a" : false,
            "b": false
          };
          expect($scope.filterLanguageTags(items)).toEqual({});
          $scope.noLanguageTags = true;

        });


        it('$scope.filterMannerTags() should filter manner tags', function() {
          var items =
          { "a" : false,
            "b": true
          };
          expect($scope.filterMannerTags(items)).toEqual({"b":true});
          $scope.noMannerTags = false;

          var items =
          { "a" : false,
            "b": false
          };
          expect($scope.filterMannerTags(items)).toEqual({});
          $scope.noMannerTags = true;

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
          $scope.teamdata.members =
            { "a" : "a",
              "b":"b"
            };
          $scope.addAnnouncement();
        });

        it('$scope.deleteTeamAnnouncementChoice() should change state', function() {
          $scope.deleteTeamAnnouncementChoice();
        });

        it('$scope.deleteAnnouncement() should delete an announcement', function() {
          $scope.deleteAnnouncement("dasdsa");
        });

        it('$scope.filterByStatus() should filter applications and invitations by status', function() {
          var items =
          { "a" : "pending",
            "b":"accepted"
          };
          var search_model = "all";
          expect($scope.filterByStatus(items, search_model)).toEqual({ "a" : "pending","b":"accepted"});

          var items =
          { "a" : "pending",
            "b":"accepted"
          };
          var search_model = "pending";
          expect($scope.filterByStatus(items, search_model)).toEqual({ "a" : "pending"});

        });

        it('$scope.accept_Application() should accept an application', function() {
          $scope.teamdata.members =
            { "a" : "a",
              "b":"b"
            };
          $scope.accept_Application("111");
        });

        it('$scope.decline_Application() should decline an application', function() {
          $scope.decline_Application("111");
        });

        it('filter DateFormat should return a date from a string', function() {
          var foo = "2016-11-15 16:56";

          var foofiltered = new Date(foo);

          var result = $filter('DateFormat')(foo);
          expect(result).toEqual(foofiltered);

          var foo = undefined;

          var result = $filter('DateFormat')(foo);
          expect(result).toEqual(null);

        });
    });

});
