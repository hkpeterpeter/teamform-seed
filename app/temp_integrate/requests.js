app.controller("handleRequests",

    function($scope, $firebaseArray) {               
        var reqRef = firebase.database().ref("requests");
        $scope.requests=$firebaseArray(reqRef);


        $scope.acceptPerson=function(eventName,targetName,memberName){
            
            var eventRef=firebase.database().ref("events");
            var memberNoTeamRef=firebase.database().ref("memberWithNoTeam");
            
            var movingMember = {
                name:"",
                intro:"",
                team:"",
                uid:""
                };
            memberNoTeamRef.orderByChild("username").equalTo(memberName).once("child_added",
                function(oldLocation){
                    movingMember=oldLocation.val();
                    eventRef.orderByChild("name").equalTo(eventName).once("child_added",function(targetEventRef){
                    targetEventRef.ref.child("Team").orderByChild("name").equalTo(targetName).once("child_added",function(newLocation){
                        newLocation.child("member").ref.push().set(movingMember);
                        newLocation.ref.update({numberOfmember: newLocation.val().numberOfmember+1});
                        oldLocation.ref.remove();
                        reqRef.orderByChild("memberName").equalTo(memberName).on("child_added",
                            function(oldrequest){
                                oldrequest.ref.remove();
                            });
                        window.alert("New member accepted!");
                    });
                
                });
            
            
            });
        };
        
        
            $scope.rejectPerson=function(eventName,targetName,memberName){
            

            };
        

    }

);

            //
            //$scope.joinTeamInPerson = function (event,teamName){
            //    movingMember="";
            //    if(firebase.auth().currentUser){
            //        memberNoTeamRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once("child_added",
            //            function(oldLocation){
            //                movingMember=oldLocation.val();
            //                eventRef.orderByChild("name").equalTo(event).once("child_added",function(targetEventRef){
            //                    targetEventRef.ref.child("Team").orderByChild("name").equalTo(teamName).once("child_added",function(newLocation){
            //                        newLocation.child("member").ref.push().set(movingMember);
            //                        newLocation.ref.update({numberOfmember: newLocation.val().numberOfmember+1});
            //                        oldLocation.ref.remove();
            //                        window.alert("Join team success!");
            //
            //                    });
            //    
            //                });
            //    
            //            });
            //    
            //    }
            //    else{
            //        window.alert("Please sign in first!");
            //    }                                         
            //
            //};