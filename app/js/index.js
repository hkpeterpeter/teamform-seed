function adminBtnClick() {
    var val = $('#input_text').val();
    if(val !== '') {
        var url = "admin.html?q=" + val;
        window.location.href = url;
        return false;
    }
}

function leaderBtnClick() {
    var val = $('#input_text').val();
    if(val !== '') {
        var url = "team.html?q=" + val;
        window.location.href = url;
        return false;
    }
}

function memberBtnClick() {
    var val = $('#input_text').val();
    if(val !== '') {
        var url = "member.html?q=" + val;
        window.location.href = url;
        return false;
    }
}

$(document).ready(function() {

    $("#btn_admin").click(adminBtnClick);

    $("#btn_leader").click(leaderBtnClick);

    $("#btn_member").click(memberBtnClick);

    firebase.auth().onAuthStateChanged(function(firebaseUser) {
        if(!firebaseUser) {
            $("#btn_admin").prop('disabled', true);
            $("#btn_leader").prop('disabled', true);
            $("#btn_member").prop('disabled', true);
            $("#input_text").prop('placeholder', 'Login to access the features');
            $("#input_text").prop('disabled', true);
        }
    });

});

angular.module('teamform-app', ['firebase'])
.directive('login', function() {
    return {
        restrict: 'A',
        templateUrl: 'login.html'
    };
}).controller('indexCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
    var uid = "";

    $scope.dteam = [
        {name: "Jacky CHEUNG", email: "cycheungar@connect.ust.hk"},
        {name: "Carson CHOW", email: "ccchowae@connect.ust.hk"},
        {name: "Andy LAM", email: "cflamad@connect.ust.hk"},
        {name: "Raymond LUI", email: "kkluiaa@connect.ust.hk"},
        {name: "Brian TSE", email: "cytseab@connect.ust.hk"},
        {name: "Tom WONG", email: "cwwongau@connect.ust.hk"},
        {name: "Steven YAU", email: "kcyauac@connect.ust.hk"}
    ];
    $scope.pageNum = 1;

    $scope.eventList = $firebaseArray(firebase.database().ref().child("eventList"));

    $scope.activeEventList = [];
    $scope.eventList.$loaded().then(function(data) {
        angular.forEach(data, function(event) {
            if(event.status === "active") {
                var eventRef = firebase.database().ref().child(event.$id);
                var adminRefObj = $firebaseObject(eventRef.child("admin").child("param"));
                var memberRefObj = $firebaseArray(eventRef.child("member"));
                var teamRefObj = $firebaseArray(eventRef.child("team"));
                adminRefObj.$loaded().then(function() {
                    memberRefObj.$loaded().then(function() {
                        teamRefObj.$loaded().then(function() {
                            var eventInfo = {
                                name: event.$id,
                                maxTeamSize: adminRefObj.maxTeamSize,
                                minTeamSize: adminRefObj.minTeamSize,
                                numTeams: teamRefObj.length,
                                numMembers: memberRefObj.length
                            };
                            $scope.activeEventList.push(eventInfo);
                        });
                    });
                });
            }
        });
    });

    $scope.joinEvent = function(eventName, mode) {
        uid = firebase.auth().currentUser.uid;
        //check the user has already joined the team (the child member should have his/her record)
        var eventRef = firebase.database().ref().child(eventName).child("member").child(uid);
        var eventRefObj = $firebaseObject(eventRef);
        eventRefObj.$loaded().then(function() {
            if(typeof eventRefObj.weight === "undefined") {    // new joiner
                eventRef.set({weight: 0});
            }
        });        
        if(mode === 'admin') {
            window.location.href = "admin.html?q=" + eventName;
        }
        else if(mode === 'member') {
            window.location.href = "member.html?q=" + eventName;
        }
        else if(mode === 'team') {
            window.location.href = "team.html?q=" + eventName;
        }
    };

    $scope.teamSize = [];
    $scope.showEventTeamSize = function(eventName) {
        uid = firebase.auth().currentUser.uid;
        var member = $firebaseObject(firebase.database().ref().child(eventName).child("member").child(uid));
        member.$loaded().then(function() {
            if(typeof member.inTeam !== "undefined") {
                alert("You are already in a team!");
                return;
            }
            else {
                $scope.teamSize = [];
                var param = $firebaseObject(firebase.database().ref().child(eventName).child("admin").child("param"));
                param.$loaded().then(function() {
                    for(var i = param.minTeamSize; i <= param.maxTeamSize; i++) {
                        $scope.teamSize.push(i);
                    }
                });
                $('#eventDetail').hide();
                $('#createNewTeam').show();
            }
        });        
    };

    $scope.teamList = [];
    $scope.showEventDetail = function(eventName) {
        $scope.eventName = eventName;
        $scope.teamList = [];
        document.getElementById('eventDetail').style.display = 'block';
        var eventRef = firebase.database().ref().child(eventName);
        var teamRefObj = $firebaseArray(eventRef.child("team"));
        teamRefObj.$loaded().then(function(data) {
            angular.forEach(data, function(team) {
                var teamInfo = {
                    name: team.$id,
                    size: team.size,
                    numMembers: team.teamMembers.length,
                    tags: team.tags
                };
                $scope.teamList.push(teamInfo);
            });
        });
    };

    $scope.memberList = [];
    $scope.displayMembersInTeam = function(teamName, eventName) {
        $scope.teamName = teamName;
        $scope.memberList = [];
        document.getElementById('memberlist').style.display='block';
        var memberArray = $firebaseArray(firebase.database().ref().child(eventName).child("member"));
        var teamRef = firebase.database().ref().child(eventName).child("team").child(teamName);
        var teamRefObj = $firebaseObject(teamRef);
        teamRefObj.$loaded().then(function() {
            $scope.teamDescription = teamRefObj.description;
        });
        var teamMembersObj = $firebaseObject(teamRef.child("teamMembers"));
        teamMembersObj.$loaded().then(function(data) {
            angular.forEach(data, function(teamMember) {
                var memberInfo = {};
                var memRecord = memberArray.$getRecord(teamMember);
                var memberName = $firebaseObject(firebase.database().ref().child("user").child(teamMember));
                memberName.$loaded().then(function() {
                    if(memRecord != null) {
                        memberInfo.name = memberName.name;
                        memberInfo.tags = memRecord.tags;
                    }
                });
                $scope.memberList.push(memberInfo);
            });
        });
        // if the user is in the team selected, show the manage button to go to team page when clicked
        uid = firebase.auth().currentUser.uid;
        var memberInfo = $firebaseObject(firebase.database().ref().child($scope.eventName).child("member").child(uid));
        memberInfo.$loaded().then(function() {
            if(memberInfo.inTeam === $scope.teamName) {
                $("#manageTeam").html("<button type=\"button\" class=\"btn btn-primary\" id=\"manageTeamBtn\">Manage</button>");
                $("#manageTeamBtn").click(manageTeam);
            }
            else {
                $("#manageTeam").html("");
            }
        });
    };

    var manageTeam = function() {
        window.location.href = "team.html?q=" + $scope.eventName;
    };

    $scope.createNewEvent = function() {
        uid = firebase.auth().currentUser.uid;
        if($scope.newEvent !== "") {
            //create a new event with name, event admin, max/min teamsize initialized
            //1. add the event to eventlist
            firebase.database().ref("eventList/" + $scope.newEvent).set({status: "active"});
            //2. add the event info to firebase
            var eventParam = $firebaseObject(firebase.database().ref().child($scope.newEvent).child("admin").child("param"));
            eventParam.maxTeamSize = 10;
            eventParam.minTeamSize = 1;
            eventParam.eventAdmin = uid;
            eventParam.$save();
            //3. add the event admin to one of the member
            firebase.database().ref().child($scope.newEvent).child("member").child(uid).set({weight: 0}).then(function() {
                window.location.href = "admin.html?q=" + $scope.newEvent;
            });
        }
    };

    $scope.createNewTeam = function(eventName) {
        // assume the member has no team when this function calls
        if($scope.preferredTeamSize !== "" && $scope.newTeam !== "") {
            uid = firebase.auth().currentUser.uid;
            //newData include size and teamMembers(with the team leaders him/herself)
            var newData = {
                'size': parseInt($scope.preferredTeamSize),
                'teamMembers': [uid]
            };
            //reference eventName/team/$scope.newTeam
            firebase.database().ref().child(eventName).child("team").child($scope.newTeam).set(newData);
            var memberInfoRef = firebase.database().ref().child(eventName).child("member").child(uid);
            var memberInfo = $firebaseObject(memberInfoRef);
            memberInfo.$loaded().then(function() {
                if(typeof memberInfo.weight === "undefined") {
                    memberInfoRef.update({weight: 0});
                }
                memberInfoRef.update({inTeam: $scope.newTeam});
                window.location.href = "team.html?q=" + eventName;
            });
        }
    };

    $scope.joinTeam = function(teamName, eventName) {
        uid = firebase.auth().currentUser.uid;
        var memberRef = firebase.database().ref().child(eventName).child("member").child(uid);
        var memberRefObj = $firebaseObject(memberRef);
        memberRefObj.$loaded().then(function() {
            if(typeof memberRefObj.inTeam !== "undefined") {
                alert("You are already in team " + memberRefObj.inTeam + "!");
                return;
            }
            else if(typeof memberRefObj.selection !== "undefined") {
                if(memberRefObj.selection.indexOf(teamName) > -1) {
                    alert("You have sent the request to this team already!");
                    return;
                }
            }
            if(confirm("Are you sure to request to join the team: " + teamName + " in event " + eventName + "?")) {            
                if(typeof memberRefObj.weight === "undefined") {
                    memberRef.set({weight: 0});
                }
                else if(typeof memberRefObj.selection !== "undefined") {                    
                    memberRefObj.selection.push(teamName);
                    memberRefObj.$save();
                }
                else {
                    var teamSelection = [teamName];
                    memberRef.update({selection: teamSelection});
                }
                alert("Request sent to team " + teamName);
            }
        });
    };

}]);