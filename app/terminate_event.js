app.controller("eventterm",["$scope","$firebaseArray", "Auth","$rootScope",
               
               function($scope, $firebaseArray,Auth,$rootscope){
                
                var ref=firebase.database().ref("events");
                $scope.event = $firebaseArray(ref);

                  $scope.removeit = function(o){
                    
                    var path = "events" + "/" + o.$id;
                    console.log(path);
            var itemRef =firebase.database().ref(path);
                itemRef.remove();
            }; 
                
               }
               
               
]);
               