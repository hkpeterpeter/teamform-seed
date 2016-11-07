teamapp.controller('teamleader_controll', ['$scope', "$rootScope", function($rootScope, $scope) {

    $scope.event = {
        name: "Event Name",
        maxSize: 10,
        minSize: 5,
        teams: ["Team1", "Team2"]
    };
    $scope.team = {
        name: "Team name",
        isPrivate: true,
        preferredSize: 7,
        preferredSkills: ["JavaScript", "Angularjs"],
        newSkill: "",
        leader: "Leader name",
        members: ["Member1"],
        requests: ["Applicant1"]
    }
    $scope.addNewSkill = function() {
        if ($scope.team.newSkill != '' && $scope.team.preferredSkills.indexOf($scope.team.newSkill) == -1)
        $scope.team.preferredSkills.push($scope.team.newSkill);
    }
}]);
