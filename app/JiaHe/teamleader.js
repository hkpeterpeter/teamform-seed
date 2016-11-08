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
    $scope.smartPick = {
        preferredSize: angular.copy($scope.team.preferredSize),
        preferredSkills: angular.copy($scope.team.preferredSkills),
        newSkill: ""
    }
    $scope.deleteMember = function() {

    }
    $scope.addNewSkill = function(scope) {
        if (scope.newSkill != '' && scope.preferredSkills.indexOf(scope.newSkill) == -1) {
            scope.preferredSkills.push(scope.newSkill);
            scope.newSkill = '';
        }
    }
}]);
