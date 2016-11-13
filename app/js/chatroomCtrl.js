var app = angular.module("chatroomApp", ["firebase"]);

app.controller("chatroomCtrl",

    function ($scope, $firebaseArray) {
        var ref = firebase.database().ref("chats");
        $scope.chatrooms = $firebaseArray(ref);

        $scope.tempcontent = "";

        $scope.input = {
            "members": [],
            "msgs": [{
                "content": "",
                "date": ""
            }]
        }

        $scope.hasChatRecord = function (currentMemberList) {
            
        var checking = true;

        for(var t=0;t<$scope.chatrooms.length;t++){
             for(var i=0;i<$scope.chatrooms[t].members.length && checking ==true;i++){
                 if($scope.chatrooms[t].members.length==1 && $scope.chatrooms[t].members[0]!=currentMemberList[0]){
                     break;
                    }

                 for(var j=0;j<currentMemberList.length;j++){
                    if($scope.chatrooms[t].members[i]==currentMemberList[j]){
                        break;
                    }

                    if($scope.chatrooms[t].members[i]!=currentMemberList[j] && (j == (currentMemberList.length-1))){
                        checking =false;
                        break;
                    }
            }
            if(i==($scope.chatrooms[t].members.length-1)){
                    return t;}
            }
        }
            return -1;
        }

        $scope.addChatRecord = function () {
            //$scope.input.members = $scope.input.members.split(" ").join("").split(",");
            var currentMemberList = ["g0001"];
            var index = $scope.hasChatRecord(currentMemberList);

            if (index >= 0) {
                $scope.chatrooms.$ref().child(index).child("msgs").child($scope.chatrooms[index].msgs.length).set({
                    "content": $scope.tempcontent,
                    "date": new Date().toString()
                });
            }
            else {
                $scope.chatrooms.$ref().child($scope.chatrooms.length).set({
                    "members": currentMemberList,
                    "msgs": [{ "content": $scope.tempcontent, "date": new Date().toString() }]
                });
            }

        }


        $scope.addNewMessage = function () {
            if ($scope.tempcontent != "") {
                $scope.addChatRecord();
            }
        }

    }
);