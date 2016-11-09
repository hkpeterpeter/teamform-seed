
teamapp.controller('search_controll', ['$scope',"$rootScope", function($rootScope,$scope) {
    
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
    $scope.searchEvent = function() {
        if($scope.event.name!=""){
            resultList=[];
            for(var i=0;i<$rootScope.events.length;i++){
             
                if($rootScope.events[i].eventName&&$rootScope.events[i].eventName.toLowerCase().includes($scope.event.name.toLowerCase())){
                    
                    resultList.push($rootScope.events[i]);
                }
            } 
            console.log(resultList);
            $scope.updateEventList(resultList);
        }else{
             Materialize.toast('Please Enter The Event Name!', 1000);
        }
    }

    $scope.updateEventList=function(eventlist){
        if(eventlist.length>0){
            $('html, body').animate({
            scrollTop: $("#event_list").offset().top
            }, 1000);
          $("#searching").show();
           $("#eventCardList").children().hide(1000,function(){


                 $("#eventCardList").children().remove();


                for(var i=0;i<eventlist.length;i++){
                    eventlist[i].epicture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFx-uG2jowZG3cIHd204vbRprSKtNx4BHCeK7yZ5T0VaYslKeE";
                    $rootScope.addEventCard(eventlist[i]);
                }
                 $("#eventCardList").hide();

                  $("#searching").fadeOut(1000,function(){
                     $("#eventCardList").show(1000);
                  });       
           });
       }else{
            Materialize.toast("Sorry We didn't find your event! You may create this event.", 3000);
       }

      
    }

}]);

teamapp.directive("imageBoard",function(){
    return {
        restrict: 'E',
        templateUrl: 'zhuxinyu/js/components/imageBoard/imageBoard.html',
        replace: true,
        scope:{
            image:"@",
            content:"@"
        }
    }
});




teamapp.directive("footerPanel",function(){
    return{
        restrict: 'E',
        templateUrl: 'zhuxinyu/js/components/footerPanel/footerPanel.html',
        transclude: true,
        scope:{
            ftitle:"@",
            
        }
    };

});



teamapp.directive("basicCard",function(){
    return{
        restrict: 'E',
        templateUrl: 'zhuxinyu/js/components/basicCard/basicCard.html',
        transclude: true,
        scope:{
            ctitle:"@",
            clink:"@",
            cpic:"@"
            
        }
    };

});

teamapp.directive('eventSearchPanel', function() {
    return {
        restrict: 'E',
        templateUrl: 'zhuxinyu/js/components/eventSearchPanel/eventSearchPanel.html',
        replace: true
    };
});
teamapp.directive('eventCard', function($compile) {
    return {
        scope: {
            eventTitle: "@etitle",
            eventPicture: "@epicture",
            eadmin: "@",
            eminSize: "@",
            emaxSize: "@",
            edescription: "@",
            eSkill: "@",
            etarget: "@",
            eid:"="
        },
        restrict: 'E',
        templateUrl: 'zhuxinyu/js/components/eventCard/eventCard.html',
        replace: true,
        controller: function ($rootScope,$scope, $element,$firebaseObject) {
            $rootScope.addEventCard = function (cardInfo) {
                var el = $compile("<event-card eid='"+cardInfo.$id+"'etitle='"+cardInfo.eventName+"' epicture='"+cardInfo.epicture+"' eadmin='"+cardInfo.adminID+"' emin-size='"+cardInfo.minSize+"' emax-size='"+cardInfo.maxSize+"' edescription='"+cardInfo.description+"' e-skill='"+cardInfo.eSkill+"' etarget='"+cardInfo.etarget+"'></event-card>")($scope);
                $("#eventCardList").prepend(el);

            };
            $scope.goToEvent =function(){
                

                
               
                //Bind the event object into rootScope
                $firebaseObject($rootScope.event_ref.child($scope.eid)).$bindTo($rootScope,"clickedEvent");

                //Determine the relarion ship between the current user and the event

                
                //redirect to the correct page


            }
        },
        link: function($scope, iElm, iAttrs, controller) {

        }
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

teamapp.directive("boardList",function(){
    return {
        restrict:"E",
        templateUrl:"zhuxinyu/js/components/boardList/boardList.html",
         scope: {
            size:"@"
         }
    }
})



