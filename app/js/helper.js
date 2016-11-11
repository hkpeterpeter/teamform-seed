app.factory("Auth", function($firebaseAuth) {
    return $firebaseAuth();
});

app.factory("Helper", function($firebaseArray, $firebaseObject) {
    helper = {};
    helper.debug = {};
    //checked
    helper.addPersonToTeam = function(uid, eventID, teamID, position="member") {
        teamref = firebase.database().ref("users/"+uid+"/writable/"+eventID);
        teamref.update({team:teamID}).then(function(){
            teamref.child("position").set(position).then(function(error){
                eventref = firebase.database().ref("events/"+eventID);
                tbaref = eventref.child("tba/"+uid);
                tbaref.remove().then(function(data){
                        var temp = {};
                        temp[uid] = uid;
                        eventref.child("/teams/"+teamID).child('members').update(temp);
                });
            });
        });
    }

    //checked
    helper.deletePersonFromTeam = function(uid, eventID, teamID) {

        teamRef=firebase.database().ref("events/"+eventID+"/teams/"+teamID+"/members");
        teamRef.child(uid).remove().then(function(error){
            uref=firebase.database().ref("users/"+uid+"/writable/"+eventID);
            uref.child("position").set("tba");
            uref.child("team").remove();
            eref=firebase.database().ref("events/"+eventID+"/tba/"+uid);
            eref.set(uid);
        });
    }

    //checked
    helper.createTeam = function(uid, eventID, team) {
        ref = firebase.database().ref("events/"+eventID+"/teams");
        teams=$firebaseArray(ref);
        teams.$add(team).then(function(ref){
            teamID=ref.key;
            helper.addPersonToTeam(uid, eventID,teamID,"leader");
        })
    }

    //checked
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

    //checked
    helper.createEvent = function(uid, event) {


        //add event to events tree
        ref = firebase.database().ref("events");
        var events=$firebaseArray(ref);
        events.$add(event).then(function(ref){
            var eventId = ref.key;
            //add event to users tree

            var date = new Date();


            ref = firebase.database().ref("users/"+uid+"/writable");
            var user = {};

                user[eventId] = {
                    position:"admin",
                    lastLogin: date.toJSON()
                };
                ref.update(user);
            });

        }

    //violating rules
    helper.pushNotificationTo = function(toUid, eventID, msg) {
        //dht
        var target_ref = firebase.database().ref("users/" + toUid + "/writable/" + eventID + "/notifications");
		var notifications = $firebaseArray(target_ref);

        console.log("notifications created");

        notifications.$loaded().then(function(){
            notifications.$add({content: msg, isRead: false});
        });
    }

    //checked
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
        var ref = firebase.database().ref("events/" + eventID + "/teams/" + teamID );
        var temp = {};
  			temp[uid] = "pending";
  			ref.child('applications').update(temp);


        uref=firebase.database().ref("users/"+uid+"/writable/"+eventID+"/applications");
        temp = {};
        temp[teamID] = teamID;
        uref.update(temp);
    }

    //checked
    helper.withdrawApplication = function(uid, eventID, teamID) {
        //dht
		var team_ref = firebase.database().ref("events/" + eventID + "/teams/" + teamID);
		var team = $firebaseObject(team_ref);

        var user_ref = firebase.database().ref("users/" + uid);
        var user = $firebaseObject(user_ref);

        var applicationList_ref = firebase.database().ref("events/" + eventID + "/teams/" + teamID + "/applications/" + uid);
       //  var applicationList = $firebaseObject(applicationList_ref)

       //  applicationList.$loaded().then(function(){
       //          // modify application in target team
			    // applicationList[uid] = "withdrawn";
			    // applicationList.$save();
       //  });
        applicationList_ref.set("withdrawn");

		team.$loaded().then(function(){
            user.$loaded().then(function(){
                // send notification to leader
                var msg = user.readOnly.name + " has withdrawn an application for your team " + team.name;
                helper.pushNotificationTo(team.leader, eventID, msg);

                //delete application in user info
                // delete user.writable[eventID]["applications"][teamID];
                // user.$save();
                user_ref.child("writable/" + eventID + "/applications/" + teamID).remove();
            });
		});
    }

    //checked
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

    //checked
    helper.acceptInvitation = function(uid, eventID, teamID) {
        //dht
        var event_ref = firebase.database().ref("events/" + eventID);
        var event = $firebaseObject(event_ref);

		var team_ref = firebase.database().ref("events/" + eventID + "/teams/" + teamID);
		var team = $firebaseObject(team_ref);

        var user_ref = firebase.database().ref("users/" + uid);
        var user = $firebaseObject(user_ref);

        var applicationList_ref = firebase.database().ref("events/" + eventID + "/teams/" + teamID + "/invitations");
        // var applicationList = $firebaseObject(applicationList_ref);

        event.$loaded().then(function(){
            team.$loaded().then(function(){
                user.$loaded().then(function(){

                    //check event state
                    if (event.eventInfo.isClosed == true){
                        // delete user.writable[eventID]["invitations"][teamID];
                        // user.$save();
                        user_ref.child("writable/" + eventID + "/invitations/" + teamID).remove();
				        alert("Invalid operation! The event has already been closed.");
				        return;
			        }

                    //check team size
            		if (team.currentSize >= team.max){
				        alert("Invalid operation! The team has reached its maximum capacity.");
				        return;
			        }

                    // modify invitation in target team , send notification, delete application
               //      applicationList.$loaded().then(function(){
			            // applicationList[uid] = "accepted";
			            // applicationList.$save();
               //      });

                    // add person to team
                    helper.addPersonToTeam(uid, eventID, teamID).then(function(){

                        var msg = user.readOnly.name + " has accepted an invitation from your team " + team.name;
                        helper.pushNotificationTo(team.leader, eventID, msg);
                        // delete user.writable[eventID]["invitations"][teamID];
                        // user.$save();
                        var temp = {};
                        temp[uid] = "accepted";
                        applicationList_ref.update(temp);
                        user_ref.child("writable/" + eventID + "/invitations/" + teamID).remove();
                    });
                });
            });
        });
    }


    //checked
    helper.declineInvitation = function(uid, eventID, teamID) {
        //dht
		var team_ref = firebase.database().ref("events/" + eventID + "/teams/" + teamID);
		var team = $firebaseObject(team_ref);

        var user_ref = firebase.database().ref("users/" + uid);
        var user = $firebaseObject(user_ref);

        var invitationList_ref = firebase.database().ref("events/" + eventID + "/teams/" + teamID + "/invitations/" + uid);
       //  var invitationList = $firebaseObject(invitationList_ref);

       //  invitationList.$loaded().then(function(){
       //          // modify invitation in target team
			    // invitationList[uid] = "declined";
			    // invitationList.$save();
       //  });
        invitationList_ref.set("declined");

		team.$loaded().then(function(){
            user.$loaded().then(function(){
                // send notification to leader
                var msg = user.readOnly.name + " has declined an invitation from your team " + team.name;
                helper.pushNotificationTo(team.leader, eventID, msg);

                //delete application in user info
                // delete user.writable[eventID]["invitations"][teamID];
                // user.$save();
                user_ref.child("writable/" + eventID + "/invitations/" + teamID).remove();
            });
		});
    }
    helper.acceptApplication = function(uid, eventID, teamID) {
        //wyz
        var ref = firebase.database().ref("events/" + eventID + "/teams/" + teamID );
        var temp = {};
  			temp[uid] = "accepted";
  			ref.child('applications').update(temp);
        helper.addPersonToTeam(uid, eventID,teamID, "member");
        helper.postTeamAnnouncement(eventID, teamID, users.$getRecord(uid).readOnly.name + " has joined the team");
    }
    helper.declineApplication = function(uid, eventID, teamID) {
        //wyz
        var ref = firebase.database().ref("events/" + eventID + "/teams/" + teamID );
        var temp = {};
  			temp[uid] = "declined";
  			ref.child('applications').update(temp);
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
    helper.postTeamAnnouncement = function(eventID, teamID, msg) {
        //wyz
        // DON'T NEED UID IN THIS CASE?
        ref=firebase.database().ref("events/"+eventID+"/teams/" + teamID  + "/announcements");
        $firebaseArray(ref).$add({content: msg, timeStamp: new Date().toString()});
    }
    helper.setEventState= function(uid, eventID, state) {
        //lby
        //we only need to use $save() on the event obj correspondingly
        //this function is not used
    }
    helper.changeLeader = function(fromuid, touid, eventID, teamID){
        //wyz
        var ref = firebase.database().ref("events/" + eventID + "/teams/" + teamID );
        var temp = {};
        temp[touid] = touid;
        ref.child("leader").update(temp);
        memberRef = firebase.database().ref("users/" + touid + "/writable/" + eventID);
        memberRef.child("position").set("leader");
        leaderRef = firebase.database().ref("events/" + eventID + "/teams/" + teamID + "/leader");
        leaderRef.child(fromuid).remove();
        memberRef = firebase.database().ref("users/" + fromuid + "/writable/" + eventID);
        memberRef.child("position").set("member");

        helper.postTeamAnnouncement(eventID, teamID, "Team Leader change from " + helper.getUsername(fromuid) + " to " + helper.getUsername(touid));
    }

    helper.getUsername  = function(uid){

      return users.$getRecord(uid).readOnly.name;
    }

    var ref=firebase.database().ref("users");
    var users = $firebaseArray(ref);

    helper.joinEvent = function(uid, eventID) {
        ref=firebase.database().ref("users/"+uid+"/writable/"+eventID);
        ref.set({position:"tba"}).then(function(data){
                eventRef=firebase.database().ref("events/"+eventID+"/tba/"+uid);
                eventRef.set(uid);
            });

    }

    helper.changeReadState = function(uid,eid,nid){

        ref = firebase.database().ref("users/"+uid+"/writable/"+eid+"/notifications/"+nid)
        ref.child("isRead").set(true);

    }



    return helper;
})
