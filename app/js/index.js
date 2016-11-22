function adminBtnClick() {
    var val = $('#input_text').val();
    if(val !== '') {
        var url = "admin.html?q=" + val;
        window.location.href= url ;
        return false;
    }
}

function leaderBtnClick() {
    var val = $('#input_text').val();
    if(val !== '') {
        var url = "team.html?q=" + val;
        window.location.href= url ;
        return false;
    }
}

function memberBtnClick() {
    var val = $('#input_text').val();
    if(val !== '') {
        var url = "member.html?q=" + val;
        window.location.href= url ;
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

    var eventDetail = document.getElementById('eventDetail');

    window.onclick = function(event) {
        if(event.target == eventDetail) {
            eventDetail.style.display = "none";
        }
    };

});

angular.module('teamform-app', ['firebase'])
.directive('login', function() {
    return {
        restrict: 'A',
        templateUrl: 'login.html'
    };
}).controller('indexCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
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
    console.log($scope.eventList);

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
        console.log($scope.activeEventList);
    });
    $scope.joinEvent = function(eventName) {
        window.location.href = "admin.html?q=" + eventName;
    };

    $scope.teamList = [];
    $scope.showEventDetail = function(eventName) {
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

}]);