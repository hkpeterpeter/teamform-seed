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

});

angular.module('teamform-app', [])
.directive('login', function() {
    return {
        restrict: 'A',
        templateUrl: 'login.html'
    };
}).controller('indexCtrl', ['$scope', function($scope) {
    $scope.dteam = [
        {name: "Jacky CHEUNG", email: "cycheungar@connect.ust.hk"},
        {name: "Carson CHOW", email: "ccchowae@connect.ust.hk"},
        {name: "Andy LAM", email: "cflamad@connect.ust.hk"},
        {name: "Raymond LUI", email: "kkluiaa@connect.ust.hk"},
        {name: "Brian TSE", email: "cytseab@connect.ust.hk"},
        {name: "Tom WONG", email: "cwwongau@connect.ust.hk"},
        {name: "Steven YAU", email: "kcyauac@connect.ust.hk"}
    ];
}]);