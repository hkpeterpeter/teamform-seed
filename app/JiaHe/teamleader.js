teamapp.controller('teamleader_controll', ['$scope', "$rootScope", "$firebaseObject", "$firebaseArray", function($rootScope, $scope, $firebaseObject, $firebaseArray) {

    $rootScope.currentEvent = 0;
    $rootScope.currentTeam = 0;
    $rootScope.currentUser = 0;

    $scope.event = $firebaseObject(firebase.database().ref('events/' + $rootScope.currentEvent));
    $scope.leader = $firebaseObject(firebase.database().ref('users/' + $rootScope.currentUser));
    $firebaseObject(firebase.database().ref('teams/' + $rootScope.currentTeam)).$bindTo($scope, "team");

    $scope.invite = {
        desiredSkills: [],
        newSkill: ""
    }
    $scope.deleteMember = function(member) {
        $firebaseObject(firebase.database().ref('users/' + member.$id + '/teamsAsMember/' + $rootScope.currentTeam)).$remove();
        var index = $scope.members.indexOf(member);
        membersID.$remove(index);
        $scope.members.splice(index, 1);
        addNotif(member.$id, "normal", "You are removed from Team " + $scope.team.teamName);
    }
    $scope.deleteApplicant = function(applicant, reject = true) {
        $firebaseObject(firebase.database().ref('users/' + applicant.$id + '/teamsApplying/' + $rootScope.currentTeam)).$remove();
        var index = $scope.applicants.indexOf(applicant);
        applicantsID.$remove(index);
        $scope.applicants.splice(index, 1);
        if (reject)
            addNotif(applicant.$id, "normal", "Your request is rejected by Team " + $scope.team.teamName);
    }
    $scope.deleteInvitation = function(invitedPerson) {
        $firebaseObject(firebase.database().ref('users/' + invitedPerson.$id + '/teamsAsInvitedPeople/' + $rootScope.currentTeam)).$remove();
        var index = $scope.invitedPeople.indexOf(invitedPerson);
        invitedPeopleID.$remove(index);
        $scope.invitedPeople.splice(index, 1);
        addNotif(invitedPerson.$id, "normal", "The invitation from Team " + $scope.team.teamName + " is canceled");
    }
    $scope.addApplicant = function(applicant) {
        if ($scope.members.length + 1 < $scope.event.maxSize) {
            firebase.database().ref('teams/' + $rootScope.currentTeam + '/membersID').child(applicant.$id).set(applicant.$id);
            $scope.members.push($firebaseObject(firebase.database().ref('users/' + applicant.$id)));
            firebase.database().ref('users/' + applicant.$id + '/teamsAsMember').child($rootScope.currentTeam).set($rootScope.currentTeam);
            $scope.deleteApplicant(applicant, false);
            addNotif(applicant.$id, "request approved", "Your request is approved by Team " + $scope.team.teamName);
        } else {
            window.alert("Your team is full!");
        }
    }
    $scope.sendInvitation = function() {
        if ($scope.members.length + 1 < $scope.event.maxSize) {
            for (i = 0; i < $scope.invite.desiredSkills.length; i++) {
                firebase.database().ref('teams/' + $rootScope.currentTeam + '/invitedPeople').child($scope.invite.desiredSkills[i]).set($scope.invite.desiredSkills[i]);
                $scope.invitedPeople.push($firebaseObject(firebase.database().ref('users/' + $scope.invite.desiredSkills[i])));
                firebase.database().ref('users/' + $scope.invite.desiredSkills[i] + '/teamsAsInvitedPeople').child($rootScope.currentTeam).set($rootScope.currentTeam);
                addNotif($scope.invite.desiredSkills[i], "invitation", "You are invited by Team " + $scope.team.teamName);
            }
        } else {
            window.alert("Your team is full!");
        }
        $scope.invite.desiredSkills = [];
        $scope.invite.newSkill = '';
    }
    $scope.smartAdd = function() {
        var cnt = 0;
        var num = $scope.smartPick.preferedSize - $scope.members.length - 1;

        function goodMember(applicant) {
            for (i = 0; i < $scope.smartPick.desiredSkills.length; i++) {
                for (skill in applicant.skills) {
                    // window.alert(applicant.skills[skill]+" "+$scope.smartPick.desiredSkills[i]);
                    if (applicant.skills[skill] == $scope.smartPick.desiredSkills[i]) {
                        return true;
                    }
                }
            }
            return false;
        }
        for (k = 0; k < $scope.applicants.length; k++) {
            if (goodMember($scope.applicants[k])) {
                $scope.addApplicant($scope.applicants[k]);
                cnt++;
                if (cnt >= $scope.smartPick.preferedSize - $scope.members.length - 1)
                    return;
            }
        }
        for (i = 0; cnt < num; i++) {
            $scope.addApplicant($scope.applicants[i]);
            cnt++;
        }
        $scope.smartPick.newSkill = '';
    }

    $scope.addNewSkill = function(scope) {
        if (scope.newSkill != '' && scope.desiredSkills.indexOf(scope.newSkill) == -1) {
            scope.desiredSkills.push(scope.newSkill);
            scope.newSkill = '';
        }
    }
    $scope.removeSkill = function(scope, skill) {
        scope.desiredSkills.splice(scope.desiredSkills.indexOf(skill), 1);
    }

    function addNotif(userID, type, content) {
        var newNotif = {
            content: content,
            eventName: $scope.event.eventName,
            teamID: $scope.team.$id,
            teamName: $scope.team.teamName,
            read: false,
            senderEmail: $scope.leader.email,
            sendName: $scope.leader.name,
            type: type
        };
        $firebaseArray(firebase.database().ref('users/' + userID + '/notifs')).$add(newNotif);
    }

    var flag = 0;
    var membersID = $firebaseArray(firebase.database().ref('teams/' + $rootScope.currentTeam + '/membersID'));
    var applicantsID = $firebaseArray(firebase.database().ref('teams/' + $rootScope.currentTeam + '/pendingApplicants'));
    var invitedPeopleID = $firebaseArray(firebase.database().ref('teams/' + $rootScope.currentTeam + '/invitedPeople'));

    $scope.init = function() {
        if (!flag) {
            $scope.smartPick = {
                preferedSize: angular.copy($scope.team.preferedSize),
                desiredSkills: angular.copy($scope.team.desiredSkills),
                newSkill: ""
            }

            $scope.members = [];
            $scope.applicants = [];
            $scope.invitedPeople = [];
            for (i = 0; i < membersID.length; i++) {
                $scope.members.push($firebaseObject(firebase.database().ref('users/' + membersID[i].$value)));
            }
            for (i = 0; i < applicantsID.length; i++) {
                $scope.applicants.push($firebaseObject(firebase.database().ref('users/' + applicantsID[i].$value)));
            }
            for (i = 0; i < invitedPeopleID.length; i++) {
                $scope.invitedPeople.push($firebaseObject(firebase.database().ref('users/' + invitedPeopleID[i].$value)));
            }
            flag = 1;
        }
    };
}]);
