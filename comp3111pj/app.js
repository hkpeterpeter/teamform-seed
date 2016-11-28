// Code goes here


var webApp = angular.module('webApp', []);


//controllers

webApp.controller ('VotesCtrl', function ($scope, Votes) {
    $scope.votes  = Votes;
    
    $scope.expand = function(vote) {
       vote.show = !vote.show;
    }
});


//services


webApp.factory('Votes', [function() {

    //temporary repository till integration with DB this will be translated into restful get query
    var votes = [

        {
            title: 'My Skills',
            q:[
                
                {
                    text: 'c++'
                },
              ]
        }
    ];
    
    return votes;
    
    
}]);






