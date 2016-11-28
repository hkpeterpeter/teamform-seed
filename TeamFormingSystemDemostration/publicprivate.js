
app.controller("openness",["$scope","$firebaseArray", "Auth","$rootScope",
               
  function($scope, $firebaseArray,Auth,$rootscope){
                
                var ref=firebase.database().ref("events");
                $scope.event = $firebaseArray(ref);

        $scope.toprivate = function(eventobj,teamid) {

          var path = "events" + "/" + eventobj.$id +"/Team/" +teamid;
          console.log(path);
         var itemRef =firebase.database().ref(path);
         itemRef.update({openness : 'private' });
         console.log('done');
            }
 $scope.topublic = function(eventobj,teamid) {

          var path = "events" + "/" + eventobj.$id +"/Team/" +teamid;
          console.log(path);
         var itemRef =firebase.database().ref(path);
         itemRef.update({openness : 'public' });
         console.log('done');
            }
    
               }
               
]);
               
