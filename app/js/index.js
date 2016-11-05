
$(document).ready(function(){
    $("#btn_admin").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "admin.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });

    $("#btn_leader").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "team.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });

    $("#btn_member").click(function(){
    	var val = $('#input_text').val();
    	if ( val !== '' ) {
    		var url = "member.html?q=" + val;
    		window.location.href= url ;
    		return false;
    	}
    });


});



angular.module('teamform-index-app', ['login','firebase'])
.controller('indexCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

	var refPath = "";
	var eventName = "COMP3511";
  var id = "";

  firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// User is signed in.
		id = firebase.auth().currentUser.uid;
	}
 else {
		// No user is signed in.
	}


	// TODO: implementation of MemberCtrl
	$scope.param = {
		"teamName" : '',
		"leader" : id,
		"currentTeamSize" : 0,
		"teamMembers" : []
	};




  refPath =  "/users/" + id + "/event/admin";
  $scope.admin = [];
  $scope.admin = $firebaseArray(firebase.database().ref(refPath));

  retrieveOnceFirebase(firebase, refPath, function(data) {

			$scope.$apply(); // force to refresh
      $('#team_page_controller').show(); // show UI

	});

  refPath = "/users/" + id + "/event/member";
	$scope.member = [];
	$scope.member = $firebaseArray(firebase.database().ref(refPath));

  refPath = "/users/" + id + "/event/leader";
  $scope.team = [];
  $scope.team = $firebaseArray(firebase.database().ref(refPath));


	});







}]);
