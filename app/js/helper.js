app.factory("Auth", function($firebaseAuth) {
    return $firebaseAuth();
});

app.factory("Helper", function($firebaseArray, $firebaseObject) {
    helper = {};
    helper.debug = {};
    helper.addPersonToTeam = function(uid, eventID, teamID, position="member") {
        ref=firebase.database().ref("events/"+eventID);
        eventObj=$firebaseObject(ref);
        eventObj.$loaded().then(function(data){
            delete eventObj.tba[uid];
            console.log(eventObj);
            if(eventObj.teams[teamID].members===undefined)
                eventObj.teams[teamID].members={};
            eventObj.teams[teamID].members[uid]=uid;
            eventObj.$save();
        });
        ref=firebase.database().ref("users/"+uid+"/writable/"+eventID);
        eventRec=$firebaseObject(ref);
        eventRec.$loaded().then(function(data){
            eventRec.position = "position";
            eventRec.team = teamID;
            eventRec.$save();
        })
    }
    helper.deletePersonFromTeam = function(uid, eventID, teamID) {
        ref=firebase.database().ref("users/"+uid+"/writable/"+eventID);
        record=$firebaseObject(ref);
        record.$loaded().then(function(data){
            record.position="tba";
            teamID=record.team;
            record.team="";
            record.$save();
            eventRef=firebase.database().ref("events/"+eventID);
            eventObj=$firebaseObject(eventRef);
            eventObj.$loaded().then(function(data){
                if(eventObj.tba===undefined)
                    eventObj.tba={};
                eventObj.tba[uid]=uid;
                eventObj.$save();
            });
            teamRef=firebase.database().ref("events/"+eventID+"/teams/"+teamID);
            team=$firebaseObject(teamRef);
            team.$loaded().then(function(data){
                for(key in team.member)
                {
                    if(team.member[key]==uid)
                        delete team.member[key];
                }
                team.$save;
            });
            // helper.pushNotificationTo(uid, eventID, "You have been deleted from your team");
        })
    }
    helper.createTeam = function(uid, eventID, team) {
        ref = firebase.database().ref("events/"+eventID+"/teams");
        teams=$firebaseArray(ref);
        teams.$add(team).then(function(ref){
            teamID=ref.key;
            helper.addPersonToTeam(uid, eventID,teamID,"leader");
        })
    }
    helper.deleteTeam = function(eventID, teamID) {
        ref=firebase.database().ref("events/"+eventID+"/teams/"+teamID);
        team=$firebaseObject(ref);
        team.$loaded().then(function(data){
            for(key in team.member)
                {
                    id=team.member[key];
                    console.log(id);
                    helper.pushNotificationTo(id, eventID, "Your team has been deleted");
                    helper.deletePersonFromTeam(id,eventID,teamID);
                }
                team.$remove();
        });
    }
    helper.createEvent = function(uid, event) {
        //zlb
    }
    // helper.deleteEvent = function(uid, eventID) {

    // }
    helper.pushNotificationTo = function(toUid, eventID, msg) {
        //dht
    }
    helper.sendInvitationTo = function(toUid, eventID, teamID) {
        //wyz
    }
    helper.sendApplicationTo = function(uid, eventID, teamID) {
        //wyz
    }
    helper.withdrawApplication = function(uid, eventID, teamID) {
        //dht
    }
    helper.quitEvent = function(uid, eventID) {
        //lby
    }
    helper.acceptInvitation = function(uid, eventID, teamID) {
        //dht
    }
    helper.declineInvitation = function(uid, eventID, teamID) {
        //dht
    }
    helper.acceptApplication = function(uid, eventID, teamID) {
        //wyz
    }
    helper.declineApplication = function(uid, eventID, teamID) {
        //wyz
    }
    helper.updateEvent = function(uid, eventID, event) {
        //lby
        //1.rename 2.changeInfo 3.changesize
    }
    helper.updateTeam = function(uid, eventID, teamID, event) {
        //lby
        //1.rename 2.changeInfo 3.changesize
    }
    helper.postEventAnnouncement = function(uid, eventID, msg) {
        //lby
    }
    helper.postTeamAnnouncement = function(uid, eventID, teamID, msg) {
        //wyz
    }
    helper.setEventState= function(uid, eventID, state) {
        //lby
    }
    helper.changeLeader = function(fromuid, touid, eventID, teamID){
        //wyz
    }



    helper.joinEvent = function(uid, eventID) {
        eventRef=firebase.database().ref("events/"+eventID);
        eventObj=$firebaseObject(eventRef);
        eventObj.$loaded().then(function(data){
            if(eventObj.tba===undefined)
                eventObj.tba={};
            eventObj.tba[uid]=uid;
            eventObj.$save();
        });
        ref=firebase.database().ref("users/"+uid+"/writable");
        obj=$firebaseObject(ref);
        obj.$loaded.then(function(data){
            obj[eventID]={
                team: "",
                postion: "tba",
            }
            obj.$save();
        })
        
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
                if (userObj.writable === undefined) userObj.writable = {};
                userObj.writable[eventID] = {
                    position: "admin"
                };
                userObj.$save();
            });
        });
    };
    return helper;
})