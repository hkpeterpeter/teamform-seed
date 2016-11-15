
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

angular.module('teamform-index-app', ['firebase', 'login', 'search'])
.controller('indexCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {

$scope.click_team = function(){
  $scope.pFilter = "team_info";
  $scope.$apply();

}
  initalizeFirebase();
  var id = "";
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    user.providerData.forEach(function (profile) {
    id = firebase.auth().currentUser.uid;

  });
  } else {
    // No user is signed in.
  }
  });

  var path = "";

  path = "events/";
  $scope.team = [];
  $scope.member = [];

  firebase.database().ref(path).orderByChild("eventName").on("child_added", function(data) {

    path = "events/" + data.key + "/teams/";
    var event = data.key;
    firebase.database().ref(path).orderByChild("teams").on("child_added", function(data) {
    path = "events/" + event + "/teams/" + data.key + "/members/" ;
    var team = data.key;
      firebase.database().ref(path).orderByChild("members").on("child_added", function(data) {
          if(id == data.val().uid)
          {
            if(data.val().role == "leader")
            {
              $scope.team.push({"event": event, "team" : team, "link" : "event.html?e=" + event + "&t=" + team });
            }
            else if(data.val().role == "member"){
              $scope.member.push({"event": event, "team" : team, "link" : "event.html?e=" + event + "&t=" + team });
            }
            $scope.$apply();

          }
      });


    });


  });




}]);
