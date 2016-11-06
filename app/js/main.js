const teamapp = angular.module('teamapp', ["ngRoute"]);



teamapp.config(function($routeProvider) {
    $routeProvider
    .when("/search", {
        templateUrl : "zhuxinyu/searchEvent.html"
    })
   
});


