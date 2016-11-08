teamapp.controller('teamleader_controll', ['$scope', "$rootScope", function($rootScope, $scope) {

    $rootScope.currentEvent = $rootScope.events[0];
    $scope.event = $rootScope.events[0];
    //$scope.team = $rootScope.teams[0];
    $scope.event2 = {
        eventName: "Event Name",
        //eventName: $rootScope.events[0].eventName,
        maxSize: $rootScope.events.length,
        minSize: $rootScope.teams.length,
        allTeams: ["Team1", "Team2"]
    }
    $scope.team = {
        name: "Team name",
        isPrivate: true,
        preferedSize: 7,
        desiredSkills: ["JavaScript", "Angularjs"],
        newSkill: "",
        leader: $rootScope.currentUser,
        members: ["Member1"],
        requests: ["Applicant1"]
    }
    $scope.smartPick = {
        preferedSize: angular.copy($scope.team.preferedSize),
        desiredSkills: angular.copy($scope.team.desiredSkills),
        newSkill: ""
    }
    $scope.deleteMember = function() {

    }
    $scope.addNewSkill = function(scope) {
        if (scope.newSkill != '' && scope.desiredSkills.indexOf(scope.newSkill) == -1) {
            scope.desiredSkills.push(scope.newSkill);
            scope.newSkill = '';
        }
    }
}]);
