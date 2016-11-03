/**
 * Created by Samuel on 2/11/2016.
 */

var dasApp = angular.module("dashboard",['firebase']);
dasApp.controller("dashboardController",function($scope, $firebaseArray){
    $scope.username = "Samuel He";
    var firebaseRef = firebase.database().ref().child("skills");
    $scope.skills = $firebaseArray(firebaseRef);

    $scope.receiveNewSikll = function(){
        $scope.skills.$add($scope.newSkill);
        $scope.newSkill = '';
    };
});