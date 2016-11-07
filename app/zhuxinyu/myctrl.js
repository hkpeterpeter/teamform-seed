
teamapp.controller('search_controll', ['$scope',"$rootScope", function($rootScope,$scope) {
    
    $scope.event = {
        name: "",
        invite: [],
        adm: "",
        detail: "Event Detail"
    };

    $rootScope.hello="hello";
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


    $scope.searchEvent = function() {
        if($scope.event.name!=""){


            $('html, body').animate({
            scrollTop: $("#event_list").offset().top
            }, 1000);

            resultList=[];
            for(var i=0;i<$rootScope.events.length;i++){
             
                if($rootScope.events[i].eventName&&$rootScope.events[i].eventName.toLowerCase().includes($scope.event.name.toLowerCase())){
                    
                    resultList.push($rootScope.events[i]);
                }
            } console.log(resultList);
            $scope.updateEventList(resultList);
        }else{
             Materialize.toast('Please Enter The Event Name!', 1000);
        }
    }

    $scope.updateEventList=function(eventlist){
      
       $("#eventCardList").children().hide(1000)

     $("#eventCardList").children().empty();
    

   
        for(var i=0;i<eventlist.length;i++){
            eventlist[i].epicture="https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/12109238_1656263351287356_1864357102807069265_n.jpg?oh=29b8245a109516606c82c7127d8ce0c0&oe=58946C3D";
            $rootScope.addEventCard(eventlist[i]);
            
        }
 
         $("#eventCardList").children().show(1000);
            
        }

}]);

teamapp.directive('eventSearchPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'zhuxinyu/js/components/eventSearchPanel/eventSearchPanel.html',
        replace: true,
    };
});
teamapp.directive('eventCard', function($compile) {
    return {
        scope: {
            eventTitle: "@etitle",
            eventPicture: "@epicture",
            eadmin: "@eadmin",
            eminSize: "@",
            emaxSize: "@",
            edescription: "@",
            eSkill: "@eSkill",
            etarget: "@"
        },
        restrict: 'E',
        templateUrl: 'zhuxinyu/js/components/eventCard/eventCard.html',
        replace: true,
        controller: function ($rootScope,$scope, $element) {
            $rootScope.addEventCard = function (cardInfo) {
                var el = $compile("<event-card etitle='"+cardInfo.eventName+"' epicture='"+cardInfo.epicture+"' eadmin='"+cardInfo.adminID+"' emin-size='"+cardInfo.minSize+"' emax-size='"+cardInfo.maxSize+"' edescription='"+cardInfo.description+"' e-skill='"+cardInfo.eSkill+"' etarget='"+cardInfo.etarget+"'></event-card>")($scope);
                $element.parent().prepend(el);
            };
        },
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
