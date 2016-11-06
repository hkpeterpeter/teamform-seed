const teamapp = angular.module('teamapp', ["ngRoute","firebase"]);



teamapp.config(function($routeProvider) {
    $routeProvider
    .when("/search", {
        templateUrl : "zhuxinyu/searchEvent.html"
    })
   
});


teamapp.controller('main_ctroller', ['$scope','$firebase','$rootScope', function($scope,$firebase,$rootScope){
	$rootScope.user_ref=firebase.database().ref("users");
	$rootScope.event_ref=firebase.database().ref("events");
	$rootScope.team_ref=firebase.database().ref("teams");

	console.log($rootScope.user_ref);



}]);

