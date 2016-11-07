app.controller("joinTeam",
               
    function($scope){
                
            var eventRef=firebase.database().ref("events");
            var memberNoTeamRef=firebase.database().ref("memberWithNoTeam");
            
            var movingMember = {
                name:"",
                intro:"",
                team:"",
                uid:""
                };
            
            
            $scope.joinTeamInPerson = function (event,teamName){
                movingMember="";
                if(firebase.auth().currentUser){
                    memberNoTeamRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once("child_added",
                        function(oldLocation){
                            movingMember=oldLocation.val();
                            eventRef.orderByChild("name").equalTo(event).once("child_added",function(targetEventRef){
                                targetEventRef.ref.child("Team").orderByChild("name").equalTo(teamName).once("child_added",function(newLocation){
                                    newLocation.child("member").ref.push().set(movingMember);
                                    newLocation.ref.update({numberOfmember: newLocation.val().numberOfmember+1});
                                    oldLocation.ref.remove();
                                    window.alert("Join team success!");

                                });
                
                            });
                
                        });
                
                }
                else{
                    window.alert("Please sign in first!");
                }    
            
            };
                
    }                      
    
);
               