// inject firebase service
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


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/