var myapp = angular.module('eventSearch', []);
myapp.controller('ctroller', ['$scope', function($scope) {
    $scope.event = {
        name: "",
        invite: [],
        adm: "",
        detail: "Event Detail"
    };
    $scope.createflip = function() {
        if ($scope.event.name != "") {
            document.getElementById('myflipper').classList.toggle('flipped');
            console.log($scope.event.name);
        }
    }
}]);
myapp.directive('eventSearchPanel', function() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {
        //     backgroundImage:"@backgroundImage"
        // },
        // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        //template: '',
        templateUrl: 'js/components/eventSearchPanel/eventSearchPanel.html',
        replace: false,
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {}
    };
});
myapp.directive('eventCard', function() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            eventTitle: "@etitle",
            eventPicture: "@epicture",
            eadmin: "@eadmin",
            eGroupSize: "@eGroupSize",
            eSkill: "@eSkill"
        }, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        //template: '',
        templateUrl: 'js/components/eventCard/eventCard.html',
        replace: true,
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {}
    };
});


 myapp.directive("subcan",function(){
        return {
            restrict: "E",
            templateUrl: "js/components/submitCancelPanel/subcan.html"
        };
    });
    

/*By Wu Yun Qing*/

 myapp.directive("simpleField",function(){
        return {
            restrict: "E",
            scope: {
                id: '@',
                label: '@'
            },
            templateUrl: "js/components/simple_field.html"
        };
    });
    
    myapp.directive("textareaField",function(){
        return {
            restrict: "E",
            scope: {
                id: '@',
                label: '@'
            },
            templateUrl: "js/components/textarea_field.html"
        };
    });
    
    myapp.directive("imageUpload",function(){
        return {
            restrict: "E",
            scope: {
                id: '@',
                label: '@'
            },
            templateUrl: "js/components/image_upload.html"
        };
    });
    
    myapp.directive("eventForm",function(){
        return {
            restrict: "E",
            templateUrl: "js/components/event_form.html"
        };
    });
    
    myapp.directive("teamForm",function(){
        return {
            restrict: "E",
            templateUrl: "components/team_form.html"
        };
    });