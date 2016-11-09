
app.controller("kick",["$scope","$firebaseArray", "Auth","$rootScope",
               
  function($scope, $firebaseArray,Auth,$rootscope){
                
                var ref=firebase.database().ref("events");
                $scope.event = $firebaseArray(ref);

$scope.idd=firebase.auth().currentUser.uid;
        $scope.kickk = function(eventobj,teamid,memid,teamobj) {
          if ((teamobj.teamleader!=$scope.idd)) {

            window.alert("Please sign in first!");
          }
          else{
          var path = "events" + "/" + eventobj.$id +"/Team/" +teamid+"/member/" +memid;
          console.log(path);
         var itemRef =firebase.database().ref(path);
					if(itemRef.remove())
          {
            if ((teamobj.numberOfmember-1)==1)
            window.alert("Each team must have at least 1 member!");
            else {
            itemRef.remove();
        path = "events" + "/" + eventobj.$id + "/" + "Team" + "/" + teamid;
         itemRef =firebase.database().ref(path);
         itemRef.update({numberOfmember : teamobj.numberOfmember-1 });
         console.log('done');
            }
          }
          else
           window.alert("There is an error! Please try again!");
} 
        
        }
               }
               
]);
               
