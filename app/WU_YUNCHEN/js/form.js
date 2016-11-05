var app = angular.module('form_app', []);
    
    app.controller('myCtrl', function($scope) {
        $scope.team_min = 0;
        $scope.team_max = 0;
    });
    
    app.directive("simpleField",function(){
        return {
            restrict: "E",
            scope: {
                id: '@',
                label: '@'
            },
            templateUrl: "component/simple_field.html"
        };
    });
    
    app.directive("textareaField",function(){
        return {
            restrict: "E",
            scope: {
                id: '@',
                label: '@'
            },
            templateUrl: "component/textarea_field.html"
        };
    });
    
    app.directive("imageUpload",function(){
        return {
            restrict: "E",
            scope: {
                id: '@',
                label: '@'
            },
            templateUrl: "component/image_upload.html"
        };
    });
    
    app.directive("eventForm",function(){
        return {
            restrict: "E",
            templateUrl: "component/event_form.html"
        };
    });
    
    app.directive("teamForm",function(){
        return {
            restrict: "E",
            templateUrl: "component/team_form.html"
        };
    });
