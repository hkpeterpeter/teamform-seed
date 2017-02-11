

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

                if($rootScope.events[i].eventName && $rootScope.events[i].eventName.toLowerCase().includes($scope.event.name.toLowerCase())){

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

                    $rootScope.addSuperEventCard(eventlist[i]);
                }
                 $("#eventCardList").hide();

                  $("#searching").fadeOut(1000,function(){
                     $("#eventCardList").show(1000);

                       $('html, body').animate({
                        scrollTop: $("#event_list").offset().top
                        }, 1000);

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
    return{
        scope:{
            eid:"@"
        },
        restrict:"E",
        templateUrl: 'zhuxinyu/js/components/eventCard/eventCard.html',
        replace:true,
        controller: function($rootScope,$scope, $element,$firebaseObject){

            $scope.eventPicture="zhuxinyu/img/load"+Math.ceil(Math.random()*5)+".gif";

            $scope.element=$firebaseObject(firebase.database().ref("events").child($scope.eid));
            $scope.element.$loaded().then(function(data){
                $scope.eventTitle=data.eventName;

                $scope.eminSize=data.minSize;
                $scope.emaxSize=data.maxSize;
                $scope.edescription=data.description;
                $scope.eadmin=$firebaseObject(firebase.database().ref("users").child(data.adminID));
                $scope.eadmin.$loaded().then(function(data){
                    $scope.eadmin=data.name;
                });
                $scope.eventPicture=data.imageUrl;
            });

            //A very smart function developed by ZHU Xinyu on 2016/11/20
            $scope.getTeamInfo=function(index){
                var team={};
                 try{
                    team.member=$scope.element.allTeams[index].member.length;
                }catch(err){
                    team.member=0;
                }
                 var leaderName=$firebaseObject(firebase.database().ref("users").child($scope.element.allTeams[index].leader).child("name"));
                  leaderName.$loaded().then(function(data){
                        team.leader=data.$value;

                        var teamName=$firebaseObject(firebase.database().ref("teams").child($scope.element.allTeams[index].teamID).child('teamName'));
                        teamName.$loaded().then(function(data2){
                            team.teamName=data2.$value;
                             $scope.Teams.push(team);
                             if(index<$scope.element.allTeams.length-1){
                                $scope.getTeamInfo(index+1);
                             }
                        });
                });
            }

            //Magic code here. This function use recursion instead of itration for a asynchronous process to get all team name in the event
            $scope.showMore=function(){

                $('#second'+ $scope.eid).slideToggle(800);
                $('#first'+ $scope.eid).slideToggle(800);

                $('#sideButton'+$scope.eid).fadeToggle(800);
                $('#sideButton2'+$scope.eid).fadeToggle(800);


                if(!$scope.Teams){
                    $scope.Teams=[];
                    if(!$scope.element.allTeams){
                        return;
                    }
                    if($scope.element.allTeams.length>0){
                        $scope.getTeamInfo(0);//The recursive function
                    }
                }
            }

             $rootScope.addSuperEventCard = function (cardInfo) {
                var el = $compile("<event-card eid="+cardInfo.$id+"></event-card>")($scope);
                $("#eventCardList").prepend(el);

            };
            $scope.goToEvent =function(){
                $rootScope.clickedEvent=$scope.element;


                    console.log($scope.element);
                    console.log($rootScope.currentUser.$id);

                if($rootScope.currentUser.$id==$scope.element.adminID){
                //is Admin

                    console.log("An Admin");
                    window.location.href = '#/admin';
                    $(window).scrollTop(0);
                     console.log("to top");
                     return;
                }else{
                    var isLeader=false;
                    var isMember=false;

                    console.log("All teams are "+$scope.element.allTeams);

                    if(!$scope.element.allTeams) $scope.element.allTeams=[];

                    if(!$scope.element.allTeams.length){
                        var x=[]
                        $.each($scope.element.allTeams, function(i,n) {
                            x.push(n);});
                        $scope.element.allTeams=x;
                    }

                    for(var i=0;i<$scope.element.allTeams.length;i++){
                        if($scope.element.allTeams[i].leader==$rootScope.currentUser.$id){
                            isLeader=true;
                            console.log("a leader");
                             window.location.href = '#/teamleader';
                             $(window).scrollTop(0);
                           return;
                        }

                    if(!$scope.element.allTeams[i].member) $scope.element.allTeams[i].member=[];

                    if(!$scope.element.allTeams[i].member.length){
                        var x=[]
                        $.each($scope.element.allTeams[i].member, function(i,n) {
                            x.push(n);});
                        $scope.element.allTeams[i].member=x;
                    }

                       for(var j=0;j<$scope.element.allTeams[i].member.length;j++){
                            if($scope.element.allTeams[i].member[j]==$rootScope.currentUser.$id){
                                isMember=true;
                                console.log("a member");
                                window.location.href = '#/team';
                               $(window).scrollTop(0);
                              return;
                            }
                       }


                    }
                    if(!(isLeader||isMember)){
                        console.log("a people");
                        window.location.href = '#/eventx';
                        $(window).scrollTop(0);
                    }
                }

            }

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
                eventCreating.minSize=$scope.eventMin;
                eventCreating.maxSize=$scope.eventMax;
                eventCreating.adminID=$rootScope.currentUser.$id;
                eventCreating.eventName=$scope.event.name;
                eventCreating.imageUrl=$rootScope.currentUser.profilePic;
                console.log(eventCreating);
                console.log($rootScope.currentUser);

                $rootScope.events.$add(eventCreating).then(function(ref){
                    var eventID=ref.key;
                    console.log(eventID);

                     console.log("ID is "+$rootScope.currentUser.$id);

                     var tempabc=$rootScope.currentUser;

                     console.log("Current User 1 "+$rootScope.currentUser);
                      console.log($rootScope.currentUser);

                    $firebaseArray($rootScope.user_ref.child($rootScope.currentUser.$id).child("eventsManaging")).$add(eventID).then(function(ref){
                       
                        $rootScope.addNotify($rootScope.currentUser.$id,"A new Event "+eventCreating.eventName+" has been created","","","System");

                        Materialize.toast("Your new event "+$scope.event.name+" has been created", 3000);


                        $scope.cancelEvent();
                         $rootScope.currentUser=tempabc;
                            console.log("Current User 2 ");
                            console.log($rootScope.currentUser);

                    });
                     
                      

                  
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
            $scope.allnoti=[];
        $rootScope.initilizaNofi=function(){
            console.log("Navibar init");
            console.log($rootScope.currentUser);
            $scope.allnoti=$firebaseArray($rootScope.user_ref.child($rootScope.currentUser.$id).child("notifs"));
             $scope.allnoti.$loaded().then(function(data){
                for(var i=0;i<data.length;i++){
                    if(data[i].type!='invitation'){
                        data[i].type='System';
                    }

                }
             });

            $scope.markRead=function(id){
                console.log(id);
            var temp=$firebaseObject($rootScope.user_ref.child($rootScope.currentUser.$id).child("notifs").child(id).child("read"));
           temp.$loaded().then(function(data){
                temp.$value=true;
                temp.$save();
            });
            }
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
                console.log("User:"+$rootScope.currentUser.$id+" should be added to team "+$scope.team);
            }
        }
    }
});

teamapp.directive('teamCard',function(){
    return{
        restrict:"E",
        templateUrl:"zhuxinyu/js/components/teamCard/teamCard.html",
        scope:{
            teamId:'@'
        },
        controller:function($rootScope,$scope,$firebaseObject,$firebaseArray){

                $scope.imageUrl="zhuxinyu/img/load"+Math.ceil(Math.random()*5)+".gif";

                $scope.element=$firebaseObject(firebase.database().ref("teams").child($scope.teamId));
                $scope.element.$loaded().then(function(data){

                    $scope.list=[];
                    $scope.map={};
                    $scope.quota=data.max_num - 1 - (data.membersID instanceof Array ? data.membersID.length : 0);
                    $scope.needed=(data.min_num - 1) > 0 ? data.min_num - 1 : 0;


                    if(!data.desiredSkills){
                        data.desiredSkills=[];
                    }else if(!data.desiredSkills.length){
                        x=[]
                        $.each(data.desiredSkills, function(i,n) {
                        x.push(n);});
                        data.desiredSkills=x;
                    }
                    for(var i=0;i<data.desiredSkills.length;i++){
                        $scope.list.push(data.desiredSkills[i].toLowerCase());
                        $scope.map[data.desiredSkills[i].toLowerCase()]=0;
                    }

                    var leaderSkill=$firebaseArray(firebase.database().ref("users").child($scope.element.leaderID).child("skills"));
                    leaderSkill.$loaded().then(function(data2){
                        console.log(data2)
                        for(var i=0;i<data2.length;i++){
                            if($scope.map[(""+data2[i].$value).toLowerCase()]){
                                $scope.map[(""+data2[i].$value).toLowerCase()]=$scope.map[(""+data2[i].$value).toLowerCase()]+1;
                            }
                        }

                        $scope.countMember(0);
                    });



                });
                $scope.goToTeam=function(){
                    if($scope.invited){

                    }else{
                        if($rootScope.currentUser.$id==$scope.element.leaderID){
                            //Team leader
                             $rootScope.clickedEvent.$id=$scope.element.belongstoEvent;
                              window.location.href = '#/teamleader';
                             return;
                        }else{
                            for(var i=0;i<$scope.element.membersID.length;i++){
                                if($rootScope.currentUser.$id==$scope.element.membersID[i]){
                                   $rootScope.clickedEvent.$id=$scope.element.belongstoEvent;
                                    window.location.href = '#/team';

                                   return
                                }
                            }
                        }
                    }
                }
                $scope.countMember=function(index){
                    if(!$scope.element.membersID){
                        $scope.element.membersID=[];
                    }
                    if(!$scope.element.membersID.length){

                        var array = $.map($scope.element.membersID, function(value, index) {
                            return [value];
                        });
                        $scope.element.membersID=array;

                    }

                    if(index<$scope.element.membersID.length){

                        var Skill=$firebaseArray(firebase.database().ref("users").child($scope.element.membersID[index]).child("skills"));

                            Skill.$loaded().then(function(data){
                            for(var i=0;i<data.length;i++){
                                if($scope.map[(""+data[i].$value).toLowerCase()]){

                                    $scope.map[(""+data[i].$value).toLowerCase()]=$scope.map[(""+data[i].$value).toLowerCase()]+1;

                                }
                            }
                              $scope.countMember(index+1);
                        });

                    }else{

                        $scope.labels=$scope.list;
                        var value=[];
                        for(var i=0;i<$scope.list.length;i++){
                            value.push($scope.map[(""+$scope.list[i])]);
                        }
                        while (value.length<=2){
                            $scope.labels.push('auxiliary');
                            value.push(0);
                        }
                      $scope.data = [
                            value

                        ];
                        $scope.imageUrl=$scope.element.imageUrl;
                        console.log($scope.data);
                    }
                }


        }
    }

});


teamapp.directive('teamSkill',function(){
    return{
        restrict:"E",
        templateUrl:"zhuxinyu/js/components/teamCard/teamSkill.html",
        scope:{
            teamId:'@'
        },
        controller:function($rootScope,$scope,$firebaseObject,$firebaseArray){

                $scope.imageUrl="zhuxinyu/img/load"+Math.ceil(Math.random()*5)+".gif";

                $scope.element=$firebaseObject(firebase.database().ref("teams").child($scope.teamId));
                $scope.element.$loaded().then(function(data){

                    $scope.list=[];
                    $scope.map={};
                    $scope.quota=data.max_num - 1 - (data.membersID instanceof Array ? data.membersID.length : 0);
                    $scope.needed=(data.min_num - 1) > 0 ? data.min_num - 1 : 0;
                    for(var i=0;i<data.desiredSkills.length;i++){
                        $scope.list.push(data.desiredSkills[i].toLowerCase());
                        $scope.map[data.desiredSkills[i].toLowerCase()]=0;
                    }

                    var leaderSkill=$firebaseArray(firebase.database().ref("users").child($scope.element.leaderID).child("skills"));
                    leaderSkill.$loaded().then(function(data2){
                        console.log(data2)
                        for(var i=0;i<data2.length;i++){
                            if($scope.map[(""+data2[i].$value).toLowerCase()]){
                                $scope.map[(""+data2[i].$value).toLowerCase()]=$scope.map[(""+data2[i].$value).toLowerCase()]+1;
                            }
                        }

                        $scope.countMember(0);
                    });



                });
                $scope.goToTeam=function(){
                    if($scope.invited){

                    }else{
                        if($rootScope.currentUser.$id==$scope.element.leaderID){
                            //Team leader
                             $rootScope.clickedEvent.$id=$scope.element.belongstoEvent;
                              window.location.href = '#/teamleader';
                             return;
                        }else{
                            for(var i=0;i<$scope.element.membersID.length;i++){
                                if($rootScope.currentUser.$id==$scope.element.membersID[i]){
                                   $rootScope.clickedEvent.$id=$scope.element.belongstoEvent;
                                    window.location.href = '#/team';

                                   return
                                }
                            }
                        }
                    }
                }
                $scope.countMember=function(index){
                    if(!$scope.element.membersID){
                        $scope.element.membersID=[];
                    }
                    if(!$scope.element.membersID.length){

                        var array = $.map($scope.element.membersID, function(value, index) {
                            return [value];
                        });
                        $scope.element.membersID=array;

                    }

                    if(index<$scope.element.membersID.length){

                        var Skill=$firebaseArray(firebase.database().ref("users").child($scope.element.membersID[index]).child("skills"));

                            Skill.$loaded().then(function(data){
                            for(var i=0;i<data.length;i++){
                                if($scope.map[(""+data[i].$value).toLowerCase()]){

                                    $scope.map[(""+data[i].$value).toLowerCase()]=$scope.map[(""+data[i].$value).toLowerCase()]+1;

                                }
                            }
                              $scope.countMember(index+1);
                        });

                    }else{

                        $scope.labels=$scope.list;
                        var value=[];
                        for(var i=0;i<$scope.list.length;i++){
                            value.push($scope.map[(""+$scope.list[i])]);
                        }
                        while (value.length<=2){
                            $scope.labels.push('auxiliary');
                            value.push(0);
                        }
                      $scope.data = [
                            value

                        ];
                        $scope.imageUrl=$scope.element.imageUrl;
                        console.log($scope.data);
                    }
                }


        }
    }

});
