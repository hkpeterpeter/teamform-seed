var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.query ={}
  $scope.queryBy = '$'

  $scope.validation = {
    "modules":
        [
                {
                   "title":"name of validation1",
                   "description":"description of validation1"
                   
                },

                {
                   "title":"name of validation2",
                   "description":"description of validation2"
                  
                }
        ]
  };
   $scope.addItem = function () {
         	$scope.validation.modules.push({
            title: $scope.itemAmount,
            description: $scope.itemName
        });
    };
});
