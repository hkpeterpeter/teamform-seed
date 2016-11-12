$(document).ready(function() {

    $("#btn_admin").click(function() {
    	var val = $('#input_text').val();
    	if(val !== '') {
    		var url = "admin.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });

    $("#btn_leader").click(function() {
    	var val = $('#input_text').val();
    	if(val !== '') {
    		var url = "team.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });

    $("#btn_member").click(function() {
    	var val = $('#input_text').val();
    	if(val !== '') {
    		var url = "member.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });

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
});