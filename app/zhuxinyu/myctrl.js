

teamapp.factory("allteams", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the database where we will store our data
    var ref = firebase.database().ref("teams");

    return $firebaseArray(ref); 
  }
]);

teamapp.factory("allevents", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the database where we will store our data
    var ref = firebase.database().ref("events");

    return $firebaseArray(ref);
  }
]);

teamapp.factory("allusers", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the database where we will store our data
    var ref = firebase.database().ref("users");

    return $firebaseArray(ref);
  }
]);

teamapp.controller('search_controll', ['$scope',"$rootScope","allteams","allevents", "allusers",function($rootScope,$scope,allteams,allevents,allusers) {


   
    $scope.event = {
        name: "",
        adm: "",
        detail: "Event Detail"
    };

    $scope.createflip = function() {
        if ($scope.event.name != "") {
            document.getElementById('myflipper').classList.toggle('flipped');
            
        } else {
            Materialize.toast('Please Enter The Event Name!', 1000);
        }
    };

   
    $scope.cancelEvent = function() {

        $scope.event.name="";
        document.getElementById('myflipper').classList.toggle('flipped');
    };

  

    $scope.searchEvent = function() {
      

        if($scope.event.name!=""){
            var resultList=[];
            for(var i=0;i<$rootScope.events.length;i++){
             
                if($rootScope.events[i].eventName!=null && $rootScope.events[i].eventName.toLowerCase().includes($scope.event.name.toLowerCase())){
                    
                    resultList.push($rootScope.events[i]);
                }
            } 
         
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
            eid:"@"
        },
        restrict: 'E',
        templateUrl: 'zhuxinyu/js/components/eventCard/eventCard.html',
        replace: true,
        controller: function ($rootScope,$scope, $element,$firebaseObject,allteams,allevents,allusers) {
            $rootScope.addEventCard = function (cardInfo) {
                var el = $compile("<event-card eid='"+cardInfo.$id+"'etitle='"+cardInfo.eventName+"' epicture='"+cardInfo.imageUrl+"' eadmin='"+cardInfo.adminID+"' emin-size='"+cardInfo.minSize+"' emax-size='"+cardInfo.maxSize+"' edescription='"+cardInfo.description+"'></event-card>")($scope);
                $("#eventCardList").prepend(el);

            };


            $scope.goToEvent =function(){

          
                 
             
                $rootScope.clickedEvent=$firebaseObject($rootScope.event_ref.child($scope.eid));
               
                $rootScope.clickedEvent.$loaded().then(function(data){
                    console.log(data);
                    console.log($rootScope.currentUser.id);

                if($rootScope.currentUser.id==data.adminID){
                //is Admin

                    console.log("An Admin");
                    window.location.href = '#/admin';
                }else{
                    var isLeader=false;
                    var isMember=false;

                    console.log("All teams are "+data.allTeams);

                    for(var i=0;i<data.allTeams.length;i++){
                        if(data.allTeams[i].leader==$rootScope.currentUser.id){
                            isLeader=true;
                            console.log("a leader");
                             window.location.href = '#/teamleader';
                           return;
                        }
                       for(var j=0;j<data.allTeams[i].member.length;j++){
                            if(data.allTeams[i].member[j]==$rootScope.currentUser.id){
                                isMember=true;
                                console.log("a member");
                                window.location.href = '#/team';
                              return;
                            }
                       }

                    }
                    if(!(isLeader||isMember)){
                        console.log("a people");
                        window.location.href = '#/eventx';
                    }

                

                }


                },function(err){

                });
              
               

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
        templateUrl: "zhuxinyu/js/components/submitCancelPanel/subcan.html",
        controller: function ($rootScope,$scope, $element,$firebaseObject,$firebaseArray,allteams,allevents,allusers) {

            $scope.createEvent=function(){
                
                var eventCreating={};
              // eventCreating.description=document.getElementById("event_detail").value;
                eventCreating.description=$scope.eventDescription;
                eventCreating.min_num=$scope.eventMin;
                eventCreating.max_num=$scope.eventMax;
                eventCreating.adminID=$rootScope.currentUser.id;
                eventCreating.evnetName=$scope.event.name;
                eventCreating.imageUrl=$rootScope.currentUser.profilePic;
                console.log(eventCreating);

                $rootScope.events.$add(eventCreating).then(function(ref){
                    var eventID=ref.key;
                    console.log(eventID);

                    $firebaseArray($rootScope.user_ref.child($rootScope.currentUser.id).child("eventsManaging")).$add(eventID);


                    $firebaseArray($rootScope.user_ref.child($rootScope.currentUser.id).child("notifs")).$add({
                        content: "An new event "+ $scope.event.name +" has been created",
                        read: false,
                        type:"System"
                    });

                     Materialize.toast("Your new event "+$scope.event.name+" has been created", 3000);

                   
                    $scope.cancelEvent();
                });
            }

        }
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


teamapp.directive("zhuNavi", function() {
    return {
        restrict: "E",
        templateUrl: "zhuxinyu/js/components/fish-navi.html",
         controller: function ($rootScope,$scope,$firebaseObject,$firebaseArray) {
            $scope.allnoti=$firebaseArray($rootScope.user_ref.child($rootScope.currentUser.id).child("notifs"));

            $scope.markRead=function(id){
                console.log(id);
            var temp=$firebaseObject($rootScope.user_ref.child($rootScope.currentUser.id).child("notifs").child(id).child("read"));
           temp.$loaded().then(function(data){
                temp.$value=true;
                temp.$save();
            });
            }   
       }
         
    };
});

teamapp.directive("notifyBar",function(){
    return {
        restrict:"E",
        templateUrl:"zhuxinyu/js/components/notifyBar/notifyBar.html",
        scope:{
            cpic:"@",
            type:"@"
            
        },
        transclude:true
    }
});

teamapp.directive("invitationBar",function(){
    return {
        restrict:"E",
        templateUrl:"zhuxinyu/js/components/invitationBar/invitationBar.html",
        scope:{
            cpic:"@",
            type:"@",
            from:"@",
            event:"@",
            team:"@"
            
        },
        transclude:true,
        controller: function ($rootScope,$scope,$firebaseObject,$firebaseArray) {
            $scope.accept=function(){
                console.log("User:"+$rootScope.currentUser.id+" should be added to team "+$scope.team);
            }
        }
    }
});


