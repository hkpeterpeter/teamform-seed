/*// inject firebase service
var app = angular.module("position", ["firebase"]); 

app.controller("positionSubmit", 

  // Implementation the todoCtrl 
  function($scope, $firebaseArray) {

    $scope.input = {
      title: "Testing the Position",
      position: ""
    }
    // sync with firebaseArray
    var ref = firebase.database().ref("position");
    $scope.questions = $firebaseArray(ref);

    $scope.addPosition = function() {
      
      // update the date
      if ( $scope.input.title != "") {
        
      }
    }

  }
);

// Choose the position
$(function () {
    $('#buttonFoward').on('click', function () {
        var text = $('#text');
        text.val('Forward');    
    });

    $('#buttonMidfield').on('click', function () {
        var text = $('#text');
        text.val('Midfield');    
    });

    $('#buttonBack').on('click', function () {
        var text = $('#text');
        text.val('Back');    
    });

    $('#buttonGoalkeeper').on('click', function () {
        var text = $('#text');
        text.val('Goalkeeper');    
    });
});
*/


angular.module('teamform-member-app', ['firebase'])
.controller('MemberCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray) {
  
  // TODO: implementation of MemberCtrl
  
  
  // Call Firebase initialization code defined in site.js
  initalizeFirebase();
  
  $scope.userID = "";
  $scope.userName = ""; 
  $scope.teams = {};
  
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var userPath = "/user/" + user.uid;
        var userref = firebase.database().ref(userPath);
        $scope.userObj = $firebaseObject(userref);
		$(document).ready(function(){
		$("#hide").click(function(){
				$("p").hide();
			});
			$("#show").click(function(){
				$("p").show();
			});
		});

    } else {
    // No user is signed in.
    }
    });

    $scope.addPosition = function()
    {
      var userPath ="/user/" + userID;
      var userRef = firebase.database().ref(userPath);

      userRef.update({
        position : $scope.position
    })
    }
 
  $scope.loadFunc = function() {
    var userID = $scope.userID;
    if ( userID !== '' ) {
      
      var refPath ="/user/" + userID;
      retrieveOnceFirebase(firebase, refPath, function(data) {
                
        if ( data.child("name").val() != null ) {
          $scope.userName = data.child("name").val();
        } else {
          $scope.userName = "";
        }
        
         console.log($scope.userName);
        if (data.child("selection").val() != null ) {
          $scope.selection = data.child("selection").val();
        }
        else {
          $scope.selection = [];
        }
        $scope.$apply();
      });
    }
  }
  
  $scope.saveFunc = function() {
    var userID = $.trim( $scope.userID );
    var userName = $.trim( $scope.userName );
    
    if ( userID !== '' && userName !== '' ) {
                  
      var newData = {       
        'name': userName,
        'selection': $scope.selection
      };
      
      var refPath = getURLParameter("q") + "/member/" + userID; 
      var ref = firebase.database().ref(refPath);
      
      ref.set(newData, function(){
        // complete call back
        //alert("data pushed...");
        
        // Finally, go back to the front-end
        window.location.href= "index.html";
      });    
    }
  }
  
  $scope.refreshTeams = function() {
    var refPath = getURLParameter("q") + "/team"; 
    var ref = firebase.database().ref(refPath);
    
    // Link and sync a firebase object
    $scope.selection = [];    
    $scope.toggleSelection = function (item) {
      var idx = $scope.selection.indexOf(item);    
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }
      else {
        $scope.selection.push(item);
      }
    }
  
    $scope.teams = $firebaseArray(ref);
    $scope.teams.$loaded()
      .then( function(data) {      
      }) 
      .catch(function(error) {
        // Database connection error handling...
        //console.error("Error:", error);
      });
  }
  
  $scope.refreshTeams(); // call to refresh teams...
    
}]);
