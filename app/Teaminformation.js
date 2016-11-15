app.controller("teaminfo",["$scope","$firebaseArray", "Auth","$rootScope",
               
               function($scope, $firebaseArray,Auth,$rootscope){
                
                var ref=firebase.database().ref("events");
                $scope.event = $firebaseArray(ref);
				
				
				}
               }
               
]);
               