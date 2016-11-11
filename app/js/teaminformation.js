app.controller("teaminfo",["$scope","$firebaseArray", "Auth",
               
               function($scope, $firebaseArray,Auth,){
                
                var ref=firebase.database().ref("teams");
                $scope.teams = $firebaseArray(ref);	
               }
               
]);
    