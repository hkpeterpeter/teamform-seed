teamapp.controller('teamleader_controll', ['$scope', "$rootScope", "$firebaseObject", "$firebaseArray", function($rootScope, $scope, $firebaseObject, $firebaseArray) {

    $rootScope.users = $firebaseArray($rootScope.user_ref);
    $rootScope.events = $firebaseArray($rootScope.event_ref);
    $rootScope.teams = $firebaseArray($rootScope.team_ref);

    $scope.members = [];
    $scope.applicants = [];
    $scope.invitedPeople = [];
    // Add for test
    // $scope.event = $rootScope.events.$getRecord($rootScope.clickedEvent.$id);
    // // $scope.leader = $firebaseObject(firebase.database().ref('users/' + $rootScope.currentUser.id));
    // $scope.leader = $rootScope.users.$getRecord($rootScope.currentUser.$id);


    var teamID;

    // console.log(event);
    // console.log($rootScope.clickedEvent);
    // console.log($rootScope.currentUser);
    // console.log($scope.leader);
    // console.log($rootScope.users.$getRecord($rootScope.currentUser.$id))

    $scope.event = $firebaseObject($rootScope.event_ref.child($rootScope.clickedEvent.$id));
    $scope.event.$loaded().then(function(data) {
        $scope.leader = $firebaseObject($rootScope.user_ref.child($rootScope.currentUser.$id));
        $scope.leader.$loaded().then(function(data2) {
            $firebaseObject(firebase.database().ref('teams/' + (function() {
                for (team in $scope.leader.teamsAsLeader) {
                    var tempTeam = $rootScope.teams.$getRecord($scope.leader.teamsAsLeader[team]);
                    if (tempTeam.belongstoEvent == $scope.event.$id) {
                        teamID = tempTeam.$id;
                        return tempTeam.$id;
                    }
                }
            })())).$bindTo($scope, "team");

            $scope.invite = {
                desiredSkills: [],
                newSkill: ""
            }

            $scope.activator = "activator";
            var flag = 0;
            $scope.membersID = $firebaseArray(firebase.database().ref('teams/' + teamID + '/membersID'));
            $scope.membersID.$loaded().then(function(data3) {
                $scope.applicantsID = $firebaseArray(firebase.database().ref('teams/' + teamID + '/pendingApplicants'));
                $scope.applicantsID.$loaded().then(function(data4) {
                    $scope.invitedPeopleID = $firebaseArray(firebase.database().ref('teams/' + teamID + '/invitedPeople'));
                    $scope.invitedPeopleID.$loaded().then(function(data5) {
                        $scope.init();
                    })
                })
            })





        });
    });


    var flag = 0;

    $scope.deleteMember = function(member) {
        $firebaseObject(firebase.database().ref('users/' + member.$id + '/teamsAsMember/' + $scope.team.$id)).$remove();
        var index = $scope.members.indexOf(member);
        $scope.membersID.$remove(index);
        $scope.members.splice(index, 1);
        addNotif(member.$id, "normal", "You are removed from Team " + $scope.team.teamName);
        Materialize.toast(member.name + ' has been removed from your team.', 4000);
    }
    $scope.deleteApplicant = function(applicant, reject = true) {
        $firebaseObject(firebase.database().ref('users/' + applicant.$id + '/teamsApplying/' + $scope.team.$id)).$remove();
        var index = $scope.applicants.indexOf(applicant);
        $scope.applicantsID.$remove(index);
        $scope.applicants.splice(index, 1);
        if (reject)
            addNotif(applicant.$id, "normal", "Your request is rejected by Team " + $scope.team.teamName);
    }
    $scope.deleteInvitation = function(invitedPerson) {
        $firebaseObject(firebase.database().ref('users/' + invitedPerson.$id + '/teamsAsInvitedPeople/' + $scope.team.$id)).$remove();
        var index = $scope.invitedPeople.indexOf(invitedPerson);
        $scope.invitedPeopleID.$remove(index);
        $scope.invitedPeople.splice(index, 1);
        // addNotif(invitedPerson.$id, "normal", "The invitation from Team " + $scope.team.teamName + " is canceled");
    }
    $scope.addApplicant = function(applicant) {
        if ($scope.members.length + 1 < $scope.event.maxSize) {
            firebase.database().ref('teams/' + $scope.team.$id + '/membersID').child(applicant.$id).set(applicant.$id);
            $scope.members.push($firebaseObject(firebase.database().ref('users/' + applicant.$id)));
            firebase.database().ref('users/' + applicant.$id + '/teamsAsMember').child($scope.team.$id).set($scope.team.$id);
            $scope.deleteApplicant(applicant, false);
            addNotif(applicant.$id, "request approved", "Your request is approved by Team " + $scope.team.teamName);
            Materialize.toast(applicant.name + ' has been added to your team.', 4000);
        } else {
            Materialize.toast('Your team is full.', 4000);
        }
    }
    $scope.sendInvitation = function() {
        if ($scope.members.length + 1 < $scope.event.maxSize) {
            for (i = 0; i < $scope.invite.desiredSkills.length; i++) {
                for (user in $rootScope.users) {
                    if ($rootScope.users[user].email == $scope.invite.desiredSkills[i]) {
                        var userID = $rootScope.users[user].$id;
                        if ($scope.membersID.$indexFor(userID) == -1) {
                            firebase.database().ref('teams/' + $scope.team.$id + '/invitedPeople').child(userID).set(userID);
                            $scope.invitedPeople.push($rootScope.users[user]);
                            firebase.database().ref('users/' + userID + '/teamsAsInvitedPeople').child($scope.team.$id).set($scope.team.$id);
                            $rootScope.addNotify(userID, "You have been invited to " + $scope.team.teamName, "COMP 3111", $scope.team.teamName, "invitation");
                        } else {
                            window.alert("User is already in your team.")
                        }
                        break;
                    }
                }
                // addNotif($scope.invite.desiredSkills[i], "invitation", "You are invited by Team " + $scope.team.teamName);
            }
        } else {
            window.alert("Your team is full!");
        }
        $scope.invite.desiredSkills = [];
        $scope.invite.newSkill = '';
    }

    $scope.checkApplicants = function() {
        if ($scope.applicants.length == 0) {
            window.alert("There is no applicants.");
            $scope.activator = "";
        }
    }
    $scope.smartAdd = function() {
        var cnt = 0;
        var num = $scope.smartPick.preferedSize - $scope.members.length - 1;
        if (num == 0) {
            Materialize.toast("Your team already has " + $scope.smartPick.preferedSize + " members.", 4000);
        } else {
            // Materialize.toast($scope.smartPick.preferedSize + " " + $scope.members.length + num);
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
                    // Materialize.toast(cnt);
                    if (cnt >= num)
                        return;
                }
            }
            for (i = 0; cnt < num; i++) {
                $scope.addApplicant($scope.applicants[i]);
                cnt++;
            }
            $scope.smartPick.newSkill = '';
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

    function addNotif(userID, type, content) {
        var newNotif = {
            content: content,
            eventName: $scope.event.eventName,
            teamID: $scope.team.$id,
            teamName: $scope.team.teamName,
            read: false,
            imageURL: $scope.leader.profilePic,
            senderEmail: $scope.leader.email,
            sendName: $scope.leader.name,
            type: type
        };
        $firebaseArray(firebase.database().ref('users/' + userID + '/notifs')).$add(newNotif);
    }



    $scope.init = function() {
        if (!flag) {
            $scope.smartPick = {
                    preferedSize: angular.copy($scope.team.preferedSize),
                    desiredSkills: angular.copy($scope.team.desiredSkills),
                    newSkill: ""
                }
                // membersID = $firebaseArray(firebase.database().ref('teams/' + $scope.team.$id + '/membersID'));
                // applicantsID = $firebaseArray(firebase.database().ref('teams/' + $scope.team.$id + '/pendingApplicants'));
                // invitedPeopleID = $firebaseArray(firebase.database().ref('teams/' + $scope.team.$id + '/invitedPeople'));

            $scope.members = [];
            $scope.applicants = [];
            $scope.invitedPeople = [];
            for (i = 0; i < $scope.membersID.length; i++) {
                $scope.members.push($firebaseObject(firebase.database().ref('users/' + $scope.membersID[i].$value)));
            }
            for (i = 0; i < $scope.applicantsID.length; i++) {
                $scope.applicants.push($firebaseObject(firebase.database().ref('users/' + $scope.applicantsID[i].$value)));
            }
            for (i = 0; i < $scope.invitedPeopleID.length; i++) {
                $scope.invitedPeople.push($firebaseObject(firebase.database().ref('users/' + $scope.invitedPeopleID[i].$value)));
            }
            flag = 1;
        }
    };
}]);
// teamapp.directive('memberCard',function(){
//     return{
//         restrict:"E",
//         templateUrl:"jiahe/memberCard.html",
//         scope:{
//             memberId:'@',
//             teamId:'@'
//         },
//         controller:function($rootScope,$scope,$firebaseObject,$firebaseArray){
//
//                 // $scope.imageUrl="zhuxinyu/img/load"+Math.ceil(Math.random()*5)+".gif";
//                 // $scope.member=$rootScope.users.$getRecord($rootScope.currentUser.id)
//                 $scope.member=$rootScope.users.$getRecord($scope.memberId);
//                 $scope.team = $firebaseObject(firebase.database().ref('teams/' + teamId));
//                 $firebaseArray(firebase.database().ref('teams/' + teamId + '/membersID')).$bindTo($scope,"membersID");
//
//                 $scope.deleteMember = function() {
//                     $firebaseObject(firebase.database().ref('users/' + $scope.memberId + '/teamsAsMember/' + $scope.teamId)).$remove();
//                     $scope.membersID.$remove(memberId);
//                     addNotif($scope.memberId, "normal", "You are removed from Team " + $scope.team.teamName);
//                 }
//         }
//     }
//
// });
