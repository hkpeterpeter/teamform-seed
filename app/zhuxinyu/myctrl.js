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
        } else {
            Materialize.toast('Please Enter The Event Name!', 1000);
        }
    };
    $scope.cancelEvent = function() {
        document.getElementById('myflipper').classList.toggle('flipped');
    };
    $scope.showEventCard = function() {
        $("#myCard").toggle(500);
    }
}]);
myapp.directive('eventSearchPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/components/eventSearchPanel/eventSearchPanel.html',
        replace: true,
    };
});
myapp.directive('eventCard', function() {
    return {
        scope: {
            eventTitle: "@etitle",
            eventPicture: "@epicture",
            eadmin: "@eadmin",
            eGroupSize: "@eGroupSize",
            eSkill: "@eSkill",
            etarget: "@"
        },
        restrict: 'E',
        templateUrl: 'js/components/eventCard/eventCard.html',
        replace: true,
        link: function($scope, iElm, iAttrs, controller) {}
    };
});
myapp.directive("subcan", function() {
    return {
        restrict: "E",
        templateUrl: "js/components/submitCancelPanel/subcan.html"
    };
});
myapp.directive("eventFooter", function() {
    return {
        restrict: "E",
        templateUrl: "js/components/searchEventFooter/eventfooter.html"
    };
});
/*By Wu Yun Qing*/
myapp.directive("simpleField", function() {
    return {
        restrict: "E",
        scope: {
            id: '@',
            label: '@'
        },
        templateUrl: "js/components/simple_field.html"
    };
});
myapp.directive("textareaField", function() {
    return {
        restrict: "E",
        scope: {
            id: '@',
            label: '@'
        },
        templateUrl: "js/components/textarea_field.html"
    };
});
myapp.directive("imageUpload", function() {
    return {
        restrict: "E",
        scope: {
            id: '@',
            label: '@'
        },
        templateUrl: "js/components/image_upload.html"
    };
});
myapp.directive("eventForm", function() {
    return {
        restrict: "E",
        templateUrl: "js/components/event_form.html"
    };
});
