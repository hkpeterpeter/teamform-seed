app.factory("Auth", function($firebaseAuth) {
    return $firebaseAuth();
});

app.factory("Helper", function($firebaseArray, $firebaseObject) {
    helper = {};
    helper.debug = {};
    helper.addPersonToTeam = function(uid, eventID, teamID, position="member") {
     
        // ref=firebase.database().ref("users/"+uid+"/writable/"+eventID);
        // eventRec=$firebaseObject(ref);
        // eventRec.$loaded().then(function(data){
        //     eventRec.team = teamID;
        //     eventRec.$save().then(function(data){
        //         eventRec.position = position;
        //         eventRec.$save().then(function(data){
        //             // delete eventObj.tba[uid];
        //             ref=firebase.database().ref("events/"+eventID);
        //             tbaref=ref.child("tba/"+uid);
        //             tbaref.remove().then(function(data){
        //                 // membersref=ref.child("/teams/"+teamID+"/members");
        //                 // temp={};
        //                 // temp[uid]=uid;
        //                 // membersref.update(temp);
        //                 teamObj=$firebaseObject(ref.child("/teams/"+teamID));
        //                 teamObj.$loaded().then(function(data){
        //                     console.log(teamObj);
        //                     if(teamObj.members===undefined)
        //                         teamObj.members={};
        //                     teamObj.members[uid]=uid;
        //                     teamObj.$save();
        //                 });
        //             });
        //         });
        //     })

        // })

        ref=firebase.database().ref("users/"+uid+"/writable/"+eventID);
        ref.update({team:teamID}).then(function(){
            ref.update({position:position}).then(function(){
                    ref=firebase.database().ref("events/"+eventID);
                    tbaref=ref.child("tba/"+uid);
                    tbaref.remove().then(function(data){
                        teamObj=$firebaseObject(ref.child("/teams/"+teamID));
                        teamObj.$loaded().then(function(data){
                            console.log(ref);
                            var temp = {};
                            temp[uid]=uid;
                            ref.child("/teams/"+teamID).child('members').update(temp);

                        });

                    });
            });
        });



    }
    helper.deletePersonFromTeam = function(uid, eventID, teamID) {
        ref=firebase.database().ref("users/"+uid+"/writable/"+eventID);
        record=$firebaseObject(ref);
        record.$loaded().then(function(data){
            record.position="tba";
            teamID=record.team;
            record.team= null;
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
            for(key in team.members)
                {
                    id=team.members[key];
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
        // eObj=$firebaseObject(eref);
        // eObj.$loaded().then(function(data){
            // delete eObj[uid];
            // eObj.$save().
            eref.remove().then(function(data){
                //delete event from user record
                uref=firebase.database().ref("users/"+uid+"/writable");
                uObj=$firebaseObject(uref);
                uObj.$loaded().then(function(data){
                    delete uObj[eventID];
                    uObj.$save();
                })
            });

            
        // })

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
        ref=firebase.database().ref("users/"+uid+"/writable");
        obj=$firebaseObject(ref);
        obj.$loaded().then(function(data){
            obj[eventID]={
                //team: "",
                position: "tba",
            }
            // console.log(obj);
            obj.$save().then(function(data){

                eventRef=firebase.database().ref("events/"+eventID+"/tba");
                // eventObj=$firebaseObject(eventRef);
                // eventObj.$loaded().then(function(data){
                //     eventObj[uid]=uid;
                //     eventObj.$save();
                // });

                var temp = {};
                temp[uid] = uid;
                eventRef.update(temp);
            });
   
        })
        
    }



    // helper.debug.createEventList = function(userData) {
    //     ref = firebase.database().ref("events");
    //     eventList = $firebaseArray(ref);
    //     var event = {};
    //     event.eventInfo = {
    //         admin: userData.uid,
    //         name: "Test",
    //         desc: "This event is for testing",
    //         max: 8,
    //         min: 4,
    //         isClosed: false,
    //         ddl: "testDate",
    //         announcement: "NULL"
    //     };
    //     console.log(event);
    //     eventList.$add(event).then(function(ref) {
    //         eventID = ref.key;
    //         userRef = firebase.database().ref("users/" + userData.uid);
    //         console.log(userData.uid);
    //         userObj = $firebaseObject(userRef);
    //         userObj.$loaded().then(function(data) {
    //             if (userObj.writable === undefined) userObj.writable = {};
    //             userObj.writable[eventID] = {
    //                 position: "admin"
    //             };
    //             userObj.$save();
    //         });
    //     });
    // };
    return helper;
})