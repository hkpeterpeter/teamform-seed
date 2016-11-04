var app = angular.module("events", ["firebase"]);

app.controller("eventSubmit",
               
               function($scope, $firebaseArray){
                
                $scope.input = {
                    name:"",
                    intro:"",
                    holder:"",
                    state:false
                };
                
                var ref=firebase.database().ref("events");
                $scope.event = $firebaseArray(ref);
                
                $scope.submit = function() {
                    
                    if($scope.input.name!==""&&$scope.input.intro!==""){
                        $scope.input.state=true;
                        $scope.input.holder=1;
                        //$scope.input.holder=
                        $scope.event.$add($scope.input);
                        $scope.input.intro= "";
                        $scope.input.name= "";
                    }
                    
                    
                };
                
                
               }
               
               
);
               