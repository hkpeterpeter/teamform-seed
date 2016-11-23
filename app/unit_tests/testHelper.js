describe('Helper', function () {
  // Load your module.
  beforeEach(module('tfApp'));
  module(function($provide){

       $provide.factory('$firebaseArray', function(){
          return function(params){
              var dummyObj={};
              console.log("!!!!!!!!!!!!!!!!!!!!!");
              dummyObj.$getRecord = function(key){
                  return {readOnly:{name: "dummy"}};
              }
              return dummyObj;
          }
       });
     });

  // Setup the mock service in an anonymous module.
  var $controller, $filter, firebase, $firebaseObject, $firebaseArray, $rootScope;

  // var config = {
  //   apiKey: "AIzaSyDo8JkS1VWAV6K1c3zNev7LVUu6qNtB8t4",
  //   authDomain: "todoappfirebase-a2dc5.firebaseapp.com",
  //   databaseURL: "https://todoappfirebase-a2dc5.firebaseio.com",
  //   storageBucket: "todoappfirebase-a2dc5.appspot.com",
  // };

  beforeEach(inject(function(_$controller_, _$filter_, $firebase, _$firebaseObject_, _$firebaseArray_, _$rootScope_, $q){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $filter = _$filter_;
    firebase = $firebase;
    $firebaseObject = _$firebaseObject_;
    $firebaseArray = _$firebaseArray_;
    $rootScope = _$rootScope_;

    var deferred = $q.defer();
      deferred.resolve('somevalue');
  }));


  it('Should okay', inject(function(Helper,  $firebase) {
    // firebase.initializeApp(config);
    Helper.setEventState();


  }));

  it('Should okay', inject(function(Helper,  $firebase) {
    Helper.updateTeam();
  }));


  it('Should okay', inject(function(Helper,  $firebase) {
    Helper.updateEvent();
  }));


    it('add person to team', inject(function(Helper,  $firebase) {
      Helper.addPersonToTeam("user", "event", "team", "member");
    }));

    it('delete person from team', inject(function(Helper,  $firebase) {
      Helper.deletePersonFromTeam("user", "event", "team", "member");
    }));

    it('create a team', inject(function(Helper,  $firebase) {
      Helper.createTeam("team1", "event", "team");
    }));

    it('delete a team', inject(function(Helper,  $firebase) {
      Helper.deleteTeam("team1", "event", "team");
    }));

    it('update skill tags', inject(function(Helper,  $firebase) {
      var skilltags = {"a":90};
      Helper.updateSkillTags("event", "team", skilltags);
    }));

    it('update language tags', inject(function(Helper,  $firebase) {
      var languagetags = {"a":false};
      Helper.updateLanguageTags("event", "team", languagetags);
    }));

    it('update manner tags', inject(function(Helper,  $firebase) {
      var mannertags = {"a":false};
      Helper.updateMannerTags("event", "team", mannertags);
    }));

    it('push notifications', inject(function(Helper,  $firebase) {
      Helper.pushNotificationTo("user", "event", "aaa");
    }));

    it('send invitations', inject(function(Helper,  $firebase) {
      Helper.sendInvitationTo("user", "event", "team");
    }));

    it('send applications', inject(function(Helper,  $firebase) {
      Helper.sendApplicationTo("user", "event", "team");
    }));

    it('withdraw applications', inject(function(Helper,  $firebase) {
      Helper.withdrawApplication("user", "event", "team");
    }));

    it('quit event', inject(function(Helper,  $firebase) {
      Helper.quitEvent("user", "event");
    }));

    it('accpet invitations', inject(function(Helper,  $firebase) {
      Helper.acceptInvitation("user", "event", "team");
    }));

    it('decline invitations', inject(function(Helper,  $firebase) {
      Helper.declineInvitation("user", "event", "team");
    }));

    it('accpet applications', inject(function(Helper,  $firebase) {
      Helper.acceptApplication("user", "event", "team");
    }));

    it('deline applications', inject(function(Helper,  $firebase) {
      Helper.declineApplication("user", "event", "team");
    }));

    it('post event announcements', inject(function(Helper,  $firebase) {
      Helper.postEventAnnouncement("event", "aaa");
    }));

    it('post team announcements', inject(function(Helper,  $firebase) {
      Helper.postTeamAnnouncement("event", "team", "aaa");
    }));

    it('delete event announcements', inject(function(Helper,  $firebase) {
      Helper.deleteEventAnnouncement("event", "aaa");
    }));

    it('change leader', inject(function(Helper,  $firebase) {
      Helper.changeLeader("user1", "user2", "event", "team");
    }));

    // it('get user name', inject(function(Helper,  $firebase) {
    //   var users = {
    //     $getRecord : function(key){
    //         return {readOnly:{name: "dummy"}};
    //     }
    //   };
    //   expect(Helper.getUsername("user1")).toEqual("dummy");
    // }));
    //
    // it('get team name', inject(function(Helper,  $firebase) {
    //   Helper.getTeamname("team1");
    // }));

    it('join Event', inject(function(Helper,  $firebase) {
      Helper.joinEvent("usrer1", "event");
    }));

    it('change read state', inject(function(Helper,  $firebase) {
      Helper.changeReadState("uid", "eid", "nid");
    }));
});

//
// describe('Auth', function () {
//   // Load your module.
//   beforeEach(module('tfApp'));
//
//   // Setup the mock service in an anonymous module.
//
//
//   it('Should okay', inject(function(Auth) {
//     Helper.setEventState();
//   }));
//
//
// });
