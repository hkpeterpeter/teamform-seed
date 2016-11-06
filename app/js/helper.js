app.factory("Auth", function($firebaseAuth) {
    return $firebaseAuth();
});

app.factory("Helper", function($firebaseArray, $firebaseObject) {
    helper = {};
    helper.debug = {};
    helper.addPersonToTeam = function(uid, eventID, teamID, position="member") {
     
        ref=firebase.database().ref("users/"+uid+"/writable/"+eventID);
        ref.update({team:teamID}).then(function(){
            ref.update({position:position}).then(function(){
                ref=firebase.database().ref("events/"+eventID);
                tbaref=ref.child("tba/"+uid);
                tbaref.remove().then(function(data){
                        var temp = {};
                        temp[uid]=uid;
                        ref.child("/teams/"+teamID).child('members').update(temp);
                });
            });
        });

    }
    helper.deletePersonFromTeam = function(uid, eventID, teamID) {

        teamRef=firebase.database().ref("events/"+eventID+"/teams/"+teamID+"members");
        teamRef.child(uid).remove().then(function(error){
            uref=firebase.database().ref("users/"+uid+"/writable/"+eventID);
            uref.child("position").set("tba");
            uref.child("team").remove();
            eref=firebase.database().ref("events/"+eventID+"/tba/"+uid);
            eref.set(uid);
        });

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
            for(key in team.members)
            {
                id=team.members[key];
                if(id!=team.leader)
                helper.deletePersonFromTeam(id,eventID,teamID);
            }
            helper.deletePersonFromTeam(team.leader,eventID,teamID);
            team.$remove();
        });
    }
    helper.createEvent = function(uid, event) {
        //zlb
    }

    helper.pushNotificationTo = function(toUid, eventID, msg) {
        //dht
    }
    helper.sendInvitationTo = function(toUid, eventID, teamID) {
        //lby
        tref=firebase.database().ref("events/"+eventID+"/teams/"+teamID+"/invitations");
        var temp = {};
        temp[toUid] = "pending";
        tref.update(temp);
        
            
        uref=firebase.database().ref("users/"+toUid+"/writable/"+eventID+"/invitations");
        temp = {};
        temp[teamID] = teamID;
        uref.update(temp);
    }
    helper.sendApplicationTo = function(uid, eventID, teamID) {
        //wyz
    }
    helper.withdrawApplication = function(uid, eventID, teamID) {
        //dht
    }
    helper.quitEvent = function(uid, eventID) {
        //order of operation matters?
        //delete user from event record
        eref=firebase.database().ref("events/"+eventID+"/tba/"+uid);
        eref.remove().then(function(data){
            //delete event from user record
            uref=firebase.database().ref("users/"+uid+"/writable/"+eventID);
            uref.remove();
        });

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
    helper.updateEvent = function(eventID) {
        //lby
        //1.rename 2.changeInfo 3.changesize
        //changes should be made by 3-way binding, so we only need to use $save() on the event obj correspondingly
        //this function is not used
    }
    helper.updateTeam = function(eventID, teamID) {
        //lby
        //1.rename 2.changeInfo 3.changesize
        //changes should be made by 3-way binding, so we only need to use $save() on the event obj correspondingly
        //this function is not used
    }
    helper.postEventAnnouncement = function(eventID, msg) {
        //lby
        ref=firebase.database().ref("events/"+eventID+"/eventInfo/announcements");
        $firebaseArray(ref).$add({content: msg, timeStamp: new Date().toString()});
    }
    helper.postTeamAnnouncement = function(uid, eventID, teamID, msg) {
        //wyz
    }
    helper.setEventState= function(uid, eventID, state) {
        //lby
        //we only need to use $save() on the event obj correspondingly
        //this function is not used
    }
    helper.changeLeader = function(fromuid, touid, eventID, teamID){
        //wyz
    }



    helper.joinEvent = function(uid, eventID) {
        ref=firebase.database().ref("users/"+uid+"/writable/"+eventID);
        ref.set({position:"tba"}).then(function(data){
                eventRef=firebase.database().ref("events/"+eventID+"/tba/"+uid);
                eventRef.set(uid);
            });        
    }

    return helper;
})