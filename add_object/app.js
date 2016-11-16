var app = angular.module('plunker', ['checklist-model']);

app.controller('MainCtrl', function($scope) {
<<<<<<< HEAD
    $scope.language = [
        {name:"C++", clicked:false},
        {name:"Python", clicked:false},
        {name:"Java", clicked:false},
        {name:"JavaScript", clicked:false},
        {name:"Ruby", clicked:false}];

    $scope.pos= [
    {name:"web developer", clicked:false},
    {name:"designer", clicked:false},
    {name:"debugger", clicked:false},
    {name:"programmer", clicked:false}
    ];


    $scope.query ={}  
    $scope.queryBy = '$'

    $scope.validation = {
        "modules":
            [
                    
            ]
    };

   $scope.addItem = function () {
            /*
         	$scope.validation.modules.push({
            Name: $scope.Name,
            Skills: $scope.Skills,
            Position: $scope.Position,
            GradeAimed: $scope.GradeAimed
            
        });
        */
    };

    $scope.addNewItem = function () {

        let skills = [];
        for (let i = 0; i < $scope.language.length; i += 1) {
            if ($scope.language[i].clicked) {
                skills.push($scope.language[i].name);
            }
        }
        let positionS =[];
        for (let i = 0; i < $scope.pos.length; i+=1){
                if($scope.pos[i].clicked){
                    positionS.push($scope.pos[i].name);
                }
        }    
        
        $scope.validation.modules.push({
            Name: $scope.Name,
            Skills: skills,
            Position: positionS,
            GradeAimed: $scope.GradeAimed

        });

    }
=======
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
>>>>>>> 916cf08f0b37dd0baef2346546cbd79acc9e28b4
});



