app.controller("teaminfo",["$scope","$firebaseArray", "Auth","$rootScope",
               
               function($scope, $firebaseArray,Auth,$rootscope){
                
                var ref=firebase.database().ref("events");
                $scope.event = $firebaseArray(ref);
				
				$scope.RemoveTeam = function(eventId, teamId) {
					var path = "events" + "/" + eventId + "/" + "Team" + "/" + teamId;
                    console.log(path);
					var itemRef =firebase.database().ref(path);
					itemRef.remove();
				}
               }
               
]);
               