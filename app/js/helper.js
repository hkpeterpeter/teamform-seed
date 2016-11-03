app.factory("Helper", function($firebaseArray, $firebaseObject) {
    helper = {};
    helper.debug = {};
    helper.addPersonToTeam = function(uid, eventID, teamID) {

    }
    helper.deletePersonFromTeam = function(uid, eventID, teamID) {

    }
    helper.createTeam = function(uid, eventID, team) {

    }
    helper.deleteTeam = function(uid, eventID, teamID) {

    }
    helper.createEvent = function(uid, event) {

    }
    helper.deleteEvent = function(uid, eventID) {

    }
    helper.pushNotificationTo = function(toUid, msg) {

    }
    helper.sendInvitationTo = function(toUid, eventID, teamID) {

    }
    helper.sendApplicationTo = function(uid, eventID, teamID) {

    }
    helper.joinEvent = function(uid, eventID) {

    }



    helper.debug.createEventList = function(userData) {
        ref = firebase.database().ref("events");
        eventList = $firebaseArray(ref);
        var event = {};
        event.eventInfo = {
            admin: userData.uid,
            name: "Test",
            desc: "This event is for testing",
            max: 8,
            min: 4,
            isClosed: false,
            ddl: "testDate",
            announcement: "NULL"
        };
        console.log(event);
        eventList.$add(event).then(function(ref) {
            eventID = ref.key;
            userRef = firebase.database().ref("users/" + userData.uid);
            console.log(userData.uid);
            userObj = $firebaseObject(userRef);
            userObj.$loaded().then(function(data) {
                // userObj.writable = {};
                userObj.writable[eventID] = {
                    position: "admin"
                };
                userObj.$save();
            });
        });
    };
    return helper;
})