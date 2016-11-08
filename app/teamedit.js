
app.controller("teamedit",["$scope","$firebaseArray", "Auth","$rootScope",
               
  function($scope, $firebaseArray,Auth,$rootscope){
                
                var ref=firebase.database().ref("events");
                $scope.event = $firebaseArray(ref);


        $scope.teamedit = function(eventId, teamId, teamintro) {
          var path = "events" + "/" + eventId + "/" + "Team" + "/" + teamId;
                    console.log(path);
        var newdata = {
            name : teamId,
            intro : teamintro
        }        
          var itemRef =firebase.database().ref(path);
          itemRef.update(newdata);
        }
               }
               
]);
               








//                function($scope, $firebaseArray){
                
//                 $scope.input = {
//                     event:"",
//                     name:"",
//                     intro:"",
//                     holder:"",
//                     state:false
//                 };
                
//                 var ref=firebase.database().ref("events");
                
//                 $scope.teamedit = function() {
                    
//                     if($scope.input.name!==""&&$scope.input.intro!==""){
//                         $scope.input.state=true;
//                         $scope.input.holder=1;
//                         $scope.team = {
//                               name:"",
//                               intro:""                  
//       };

//                               $scope.team.name=$scope.input.name;
//                               $scope.team.intro=$scope.input.intro;
//                               childRef=ref.child($scope.input.event);
                              
//                               if(!firebase.auth().currentUser){
//                                         ref.orderByChild("name").equalTo($scope.input.event).{
//                                                   location.child("Team").ref.update($scope.team);
//                                         };
//         }
//                               else{
//                                         window.alert("Please sign in first!");
//                               }
//                               $scope.input.event= "";
//                               $scope.input.intro= "";
//                               $scope.input.name= "";
                                    

                    
//                     }
                    
                    
                    
//                 };
                
                
//                }
               
               
// );