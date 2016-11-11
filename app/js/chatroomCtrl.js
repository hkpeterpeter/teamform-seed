var app = angular.module("chatroomApp", ["firebase"]);

app.controller("chatroomCtrl",

    function ($scope, $firebaseArray) {
        var ref = firebase.database().ref("chats");
        $scope.chatrooms = $firebaseArray(ref);

        $scope.input = {
            "members": [],
            "msgs": {
                "content": "",
                "date": ""
            }
        };

        $scope.hasChatRecord = function (memberlist) {
            //TODO check if the group is already exist, and check if there are old chat records
            //if yes, return the index of the array, else return -1


            return 0;
        }

        $scope.addChatRecord = function () {
            $scope.input.members = $scope.input.members.split(" ").join("").split(",");

            var index = hasChatRecord($scope.input.members);

            var recd = firebase.database().ref("chats/" + index + "/msgs");
            $scope.record = $firebaseArray(recd);
            $scope.record.$ref().child($scope.record.length).set({
                "content": "fdsjfsdjfi",
                "date": new Date().toString
            });
            // if (index >= 0) {
            //     var recd = firebase.database().ref("chats/" + index + "/msgs");
            //     $scope.record = $firebaseArray(recd);
            //     $scope.record.$ref().child($scope.record.length).set({
            //         "content": "fdsjfsdjfi",
            //         "date": new Date().toString
            //     });
            // } else
            //     $scope.chatrooms.$add(createChat($scope.input.members,
            //         [createMsg($scope.tempContent, new Date().toString)]));
        }


        $scope.addNewMessage = function () {
            if ($scope.input.msgs.content != "") {
                $scope.input.msgs.date = new Date().toString;
                addChatRecord();
            }
        }

    }
);