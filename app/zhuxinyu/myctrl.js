
teamapp.controller('ctroller', ['$scope', function($scope) {
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

teamapp.directive('eventSearchPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'zhuxinyu/js/components/eventSearchPanel/eventSearchPanel.html',
        replace: true,
    };
});
teamapp.directive('eventCard', function() {
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
        templateUrl: 'zhuxinyu/js/components/eventCard/eventCard.html',
        replace: true,
        link: function($scope, iElm, iAttrs, controller) {}
    };
});
teamapp.directive("subcan", function() {
    return {
        restrict: "E",
        templateUrl: "zhuxinyu/js/components/submitCancelPanel/subcan.html"
    };
});
teamapp.directive("eventFooter", function() {
    return {
        restrict: "E",
        templateUrl: "zhuxinyu/js/components/searchEventFooter/eventfooter.html"
    };
});
/*By Wu Yun Qing*/
teamapp.directive("simpleField", function() {
    return {
        restrict: "E",
        scope: {
            id: '@',
            label: '@'
        },
        templateUrl: "zhuxinyu/js/components/simple_field.html"
    };
});
teamapp.directive("textareaField", function() {
    return {
        restrict: "E",
        scope: {
            id: '@',
            label: '@'
        },
        templateUrl: "zhuxinyu/js/components/textarea_field.html"
    };
});
teamapp.directive("imageUpload", function() {
    return {
        restrict: "E",
        scope: {
            id: '@',
            label: '@'
        },
        templateUrl: "zhuxinyu/js/components/image_upload.html"
    };
});
teamapp.directive("eventForm", function() {
    return {
        restrict: "E",
        templateUrl: "zhuxinyu/js/components/event_form.html"
    };
});
