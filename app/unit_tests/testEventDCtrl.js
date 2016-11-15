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
                }
               return {
                   $onAuthStateChanged:$onAuthStateChanged
                }
             });

             $provide.factory('$firebaseObject', function(){
                return function(params){
                    var dummyObj={};
                    dummyObj.$loaded = function(){
                        var dummyResolve={};
                        dummyResolve.then = function(callback){
                            callback("dummyData");
                        };
                        return dummyResolve;
                    }
                    dummyObj.$save = function(){
                        var dummyResolve={};
                        dummyResolve.then = function(callback){
                            callback("dummyData");
                        };
                        return dummyResolve;
                    }
                    return dummyObj;
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

             $provide.service('ngDialog',function(){
                this.open=function(dummyParams){
                  dialog={};
                  dialog.close=function(){}
                  return dialog;
                }
             });
        });


    });

    var $controller, auth, $filter;

    beforeEach(inject(function(_$controller_, Auth, _$filter_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        auth = Auth;
        $filter = _$filter_
    }));

    describe('eventDCtrl', function() {
        var $scope, controller;

         beforeEach(function() {
            $scope = {};
            controller = $controller('eventDCtrl', { $scope: $scope});
            
        });

        it('test $scope.userData',function(){
            expect($scope.userData).toEqual({uid:"testUid"});
        });

        it('$scope.manage() should be change $scope.isManaging to true and $scope.selectTeam to false', function() {
            $scope.manage();
            expect($scope.isManaging).toEqual(true);
            expect($scope.selectTeam).toEqual(false);
            console.log("pppp");
        });

        it('test $scope.deleteTeam', function() {
            $scope.deleteTeam("dummyTeamKey");
        });

        it('test $scope.addToTeam, after which the personToBeAdded should be the input', function() {
            $scope.addToTeam("dummyPersonId");
            expect(personToBeAdded).toEqual("dummyPersonId")
        });

        it('test $scope.toTeam', function() {
            $scope.toTeam("dummyTeamKey");
            expect($scope.selectTeam).toEqual(false);
        });

        it('test $scope.deleteAnn', function() {
            $scope.deleteAnn("dummyAnnKey");
        });
        
        it('test $scope.invite', function() {
            $scope.invite("dummyPersonKey");
        });

        it('test $scope.quit', function() {
            $scope.quit();
        });

        it('test $scope.joinEvent', function() {
            $scope.joinEvent();
        });

        it('test $scope.createTeamDialogue() and $scope.createTeam', function() {
            $scope.createTeamDialogue()
             $scope.createTeam();
             expect($scope.newTeam.leader).toEqual("testUid");
        });

        it("test $scope.createAnnouncementDialogue() and $scope.postAnnouncement()",function(){
            $scope.createAnnouncementDialogue();
            $scope.postAnnouncement();
        });

        it("test $scope.deleteAnnouncementChoice()",function(){
            $scope.deleteAnnouncementChoice();
        });

        it("test $scope.editInfo() when $scope.editButton == 'Edit'",function(){
            $scope.editButton = "Edit";
            $scope.editInfo();
            expect($scope.editButton).toEqual("Save");
            expect($scope.editingInfo).toEqual(true);
        });

        it("test $scope.editInfo() when $scope.editButton != 'Edit'",function(){
            $scope.editButton = "NotEdit";
            $scope.editInfo();
            expect($scope.editButton).toEqual("Edit");
            expect($scope.editingInfo).toEqual(false);
        });

        it("test $scope.validInvite()",function(){
            $scope.myEvent=undefined;
            $scope.validInvite("testUid");
            $scope.myEvent={team:"dummyTeam"};
            $scope.eventObj.teams={dummyTeam:{invitations:{}}};
            $scope.validInvite("testUid");
            $scope.eventObj.teams[$filter('teamId')($scope.myEvent)].invitations={testUid:"testUid"};
            $scope.eventObj.teams[$filter('teamId')($scope.myEvent)].invitations['testUid'] ='pending';
            $scope.validInvite("testUid");
        })

        it("test filter teamId", function(){
            result1 = $filter('teamId')();
            expect(result1).toEqual(null);
            result2 = $filter('teamId')({team:"dummyId"});
            expect(result2).toEqual("dummyId");
        })

        it("test filter role", function(){
            result1 = $filter('role')();
            expect(result1).toEqual('visitor');
            result2 = $filter('role')({position:"dummyRole"});
            expect(result2).toEqual("dummyRole");
        })

        it("test filter numKeys", function(){
            result1 = $filter('numKeys')();
            expect(result1).toEqual(0);
            result2 = $filter('numKeys')({key:"dummy"});
            expect(result2).toEqual(1);
        })





    });
});