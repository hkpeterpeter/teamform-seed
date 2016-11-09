
app.controller("teamedit",["$scope","$firebaseArray", "Auth","$rootScope",
               
  function($scope, $firebaseArray,Auth,$rootscope){
                
                var ref=firebase.database().ref("events");
                $scope.event = $firebaseArray(ref);


        $scope.teamedit = function(eventId, teamId,teamintro) {
          var path = "events" + "/" + eventId + "/" + "Team" + "/" + teamId;
                    console.log(path);
        var newdata = {
            intro : teamintro
        }        
          var itemRef =firebase.database().ref(path);
          itemRef.update(newdata);
        }
               }
               
]);