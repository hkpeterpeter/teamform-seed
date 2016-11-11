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
    }
    $scope.deleteApplicant = function(applicant) {
        $firebaseObject(firebase.database().ref('users/' + applicant.$id + '/teamsApplying/' + $rootScope.currentTeam)).$remove();
        var index = $scope.applicants.indexOf(applicant);
        applicantsID.$remove(index);
        $scope.applicants.splice(index, 1);
    }
    $scope.deleteInvitation = function(invitedPerson) {
        $firebaseObject(firebase.database().ref('users/' + invitedPerson.$id + '/teamsAsInvitedPeople/' + $rootScope.currentTeam)).$remove();
        var index = $scope.invitedPeople.indexOf(invitedPerson);
        invitedPeopleID.$remove(index);
        $scope.invitedPeople.splice(index, 1);
    }

    $scope.sendInvitation = function() {
        if ($scope.members.length < $scope.event.maxSize) {
            for (i = 0; i < $scope.invite.desiredSkills.length; i++) {
                firebase.database().ref('teams/' + $rootScope.currentTeam + '/invitedPeople').child($scope.invite.desiredSkills[i]).set($scope.invite.desiredSkills[i]);
                $scope.invitedPeople.push($firebaseObject(firebase.database().ref('users/' + $scope.invite.desiredSkills[i])));
                firebase.database().ref('users/' + $scope.invite.desiredSkills[i] + '/teamsAsInvitedPeople').child($rootScope.currentTeam).set($rootScope.currentTeam);
            }
            $scope.invite.desiredSkills = [];
            $scope.invite.newSkill = '';
        }
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
