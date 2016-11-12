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

        $scope.hasChatRecord = function () {
            //TODO check if the group is already exist, and check if there are old chat records
            //if yes, return the index of the array, else return -1
            // for(var i=0;i<;i++){

            // }
            return -1;
        }

        $scope.addChatRecord = function () {
            //$scope.input.members = $scope.input.members.split(" ").join("").split(",");

            var index = $scope.hasChatRecord();

            //for testing, dummy data
            index = 1;  //assume the records exist, and it is located at index 1
            var currentMemberList = ["g0001"];

            if (index >= 0) {
                $scope.chatrooms.$ref().child(index).child("msgs").child($scope.chatrooms[index].msgs.length).set({
                    "content": $scope.tempcontent,
                    "date": new Date().toString()
                });
            }
            else {
                $scope.chatrooms.$ref().child($scope.chatrooms.length).set({
                    "members": ["g111", "g111", "g111"],
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