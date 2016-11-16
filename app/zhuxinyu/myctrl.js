

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
            try{
            document.getElementById('myflipper').classList.toggle('flipped');
            }catch(err){
                return "NONE";
            }
            
        } else {
            Materialize.toast('Please Enter The Event Name!', 1000);
        }
    };

   
    $scope.cancelEvent = function() {

        $scope.event.name="";
        try{
        document.getElementById('myflipper').classList.toggle('flipped');
        }catch(err){
            return "ERR";
        }
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
            return "SUCCESS";
           
        }else{
             Materialize.toast('Please Enter The Event Name!', 1000);
             return "FAIL";
        }
    }
    $scope.deleteChild=function(eventlist){
        $("#eventCardList").children().remove();


        for(var i=0;i<eventlist.length;i++){
            try{
            $rootScope.addEventCard(eventlist[i]);
            }catch(err){};
        }
        $("#eventCardList").hide();

        $("#searching").fadeOut(1000,function(){
        $("#eventCardList").show(1000);

        });       
    }
    $scope.updateEventList=function(eventlist){
        if(eventlist.length>0){
            try{
            $('html, body').animate({
            scrollTop: $("#event_list").offset().top
            }, 1000);
            }catch(err){};
          $("#searching").show();
          
           $("#eventCardList").children().hide(1000,function(){
                $scope.deleteChild(eventlist);

               
           });
           return "SUCCESS";
       }else{
            Materialize.toast("Sorry We didn't find your event! You may create this event.", 3000);
             return "Fail";
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

            $rootScope.goEvent=function(){
                $scope.goToEvent();
            };

            $rootScope.checkUser=function(data){
                if($rootScope.currentUser.id==data.adminID){
                //is Admin

                   
                    window.location.href = '#admin';
                }else{
                    var isLeader=false;
                    var isMember=false;

                 

                    for(var i=0;i<data.allTeams.length;i++){
                        if(data.allTeams[i].leader==$rootScope.currentUser.id){
                            isLeader=true;
                         
                             window.location.href = '#teamleader';
                           return;
                        }
                       for(var j=0;j<data.allTeams[i].member.length;j++){
                            if(data.allTeams[i].member[j]==$rootScope.currentUser.id){
                                isMember=true;
                            
                                window.location.href = '#team';
                              return;
                            }
                       }

                    }
                    if(!(isLeader||isMember)){
                     
                        window.location.href = '#eventx';
                    }

                

                }
            };
            $scope.goToEvent=function(){

          
                 try{
                $firebaseObject($rootScope.event_ref.child($scope.eid)).$bindTo($rootScope,"bindedclickedEvent");
                }catch(err){

                }
                 try{
                $rootScope.clickedEvent=$firebaseObject($rootScope.event_ref.child($scope.eid));
               }catch(err){
                    $rootScope.clickedEvent={};
               }

               try{
                $rootScope.clickedEvent.$loaded().then(function(data){
                    $rootScope.checkUser(data);
                });
            }catch(err){
                   
            }
              
               

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
            $rootScope.processRef=function(ref){
                 var eventID=ref.key;
         
                 try{
                $firebaseArray($rootScope.user_ref.child($rootScope.currentUser.id).child("eventsManaging")).$add(eventID);
                }catch(err){}

                try{
                $firebaseArray($rootScope.user_ref.child($rootScope.currentUser.id).child("notifs")).$add({
                    content: "An new event "+ $scope.event.name +" has been created",
                    read: false,
                    type:"System"
                });
                }catch(err){}

                 Materialize.toast("Your new event "+$scope.event.name+" has been created", 3000);

               
                $scope.cancelEvent();
                return eventID;
            }
            $scope.createEvent=function(){
                
                var eventCreating={};
              // eventCreating.description=document.getElementById("event_detail").value;
                eventCreating.description=$scope.eventDescription;
                eventCreating.min_num=$scope.eventMin;
                eventCreating.max_num=$scope.eventMax;
                eventCreating.evnetName=$scope.event.name;
              
                 try{
                 eventCreating.imageUrl=$rootScope.currentUser.profilePic;
               
                }catch(err){
                   eventCreating.imageUrl="abc.jpg";
                }

            

                try{
                eventCreating.adminID=$rootScope.currentUser.id;
               
                }catch(err){
                    eventCreating.adminID="0";
                }
                
                try{

                $rootScope.events.$add(eventCreating).then(function(ref){

                    $rootScope.processRef(ref);
               
                });
            }catch(err){}
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
           
             try{

           $firebaseObject($rootScope.user_ref.child($rootScope.currentUser.id).child("notifs")).$bindTo($scope,"allNotif");
       }catch(err){
            $scope.allNotif={1:{type:"invitation",content:"You are invited",read:false},2:{type:"System",content:"You are invited",read:false},3:{type:"System",content:"You are invited",read:true}};
       }
        try{
            $scope.shownotify=function(){
                $scope.ntList=[];


                $scope.invite_ntList=[];

                $.each($scope.allNotif, function(i,n) {

                    if(n!=null&&n.content!=null&&n.read==false){

                        if(n.type=="invitation"){

                             $scope.invite_ntList.push(n);
                          
                        }else{

                             $scope.ntList.push(n);
                            

                        }
                        //n.read=true;
                       
                    }
                });
              
            }
        }catch(err){}

             
          
     
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
           
        }
    }
});


