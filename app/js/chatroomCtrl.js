var app = angular.module("chatroomApp", ["firebase"]);

app.controller("chatroomCtrl", 

    function($scope, $firebaseArray) {
        var ref = firebase.database().ref("chats");
        $scope.chatrooms = $firebaseArray(ref);

        //for creating chats
        //if memberlist contains only one id, that should be group id, else it should be member ids
        function createChat(memberlist, msgs) {
            return {
                "members": memberlist,
                "msgs": msgs
            };
        }

        this.createMsg = function(content, date) {
            return {
                "content": content,
                "date": date
            };
        }

       

        this.hasChatRecord = function(memberlist) {
            //TODO check if the group is already exist, and check if there are old chat records
            //if yes, return the index of the array, else return -1

            return -1;
        }

        this.addChatRecord = function() {
            //transform the memberlist string into array
            $scope.input.members = $scope.input.members.split(" ").join("").split(",");

            var index = hasChatRecord($scope.input.members);

            if (index >= 0) {
                var msg = createMsg($scope.tempContent, new Date().toString);
                $firebaseArray("chats/" + index + "/msgs").$add(msg);
            } else
                $scope.chatrooms.$add(createChat($scope.input.members,
                    [createMsg($scope.tempContent, new Date().toString)]));
        }

        //initialization, create empty chat
        $scope.input = createChat([], "");
        $scope.tempContent = "";

        $scope.addNewMessage = function() {
            if ($scope.input.to != "" && $scope.input.content != "") {
                addChatRecord();
            }
        }

    }
);