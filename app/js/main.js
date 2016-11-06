const teamapp = angular.module('teamapp', ["ngRoute","firebase"]);



teamapp.config(function($routeProvider) {
    $routeProvider
    .when("/search", {
        templateUrl : "zhuxinyu/searchEvent.html"
    })
   
});


teamapp.controller('main_ctroller', ['$scope','$firebase','$rootScope', function($scope,$firebase,$rootScope){
	
}]);

