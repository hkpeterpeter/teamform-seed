var app = angular.module('plunker', ['checklist-model']);

app.controller('MainCtrl', function($scope) {
    $scope.citiesHospitals = [
    
              {
      city: "Languages",
      hospitals: [
          {name:"C++"},
          {name:"Pyhton"},
          {name:"Java"},
          {name:"JavaScript"},
          {name:"Ruby"},]
    },
    


  ];


  $scope.filter = {
      citiesHospitals: []
  };
  
  $scope.citiesHospitals.forEach(function(e,i){
          $scope.filter.citiesHospitals[e.city] = angular.copy(e.hospitals);
      });

 console.log($scope.filter);
  $scope.query ={}
  $scope.queryBy = '$'

  $scope.validation = {
    "modules":
        [
                
        ]
  };
   $scope.addItem = function () {
         	$scope.validation.modules.push({
            Name: $scope.Name,
            Skills: $scope.citiesHospitals.hospitals.name,
            Position: $scope.Position,
            GradeAimed: $scope.GradeAimed

        });
    };
});



