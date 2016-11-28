angular.module('plunker', ['checklist-model'])
.controller("DemoCtrl", ["$scope", function ($scope) {
  $scope.citiesHospitals = [
    {
      city: "Paris",
      hospitals: [
          {name:"Hospital Nicolas"},
          {name:"Hospital Bruni"}]
    },
    {
        city: "New York",
        hospitals: [
          {name:"Hospital Trinity"},
          {name:"Hospital Van Gogh"},
          {name:"Hospital Bonaqua"}]
    }
  ];

  $scope.filter = {
      citiesHospitals: []
  };
  
  $scope.citiesHospitals.forEach(function(e,i){
          $scope.filter.citiesHospitals[e.city] = angular.copy(e.hospitals);
      });

 console.log($scope.filter);
}]);