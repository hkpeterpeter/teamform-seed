var app = angular.module("chatroomApp", ["firebase"]);

app.controller("chatroomCtrl",
    function ($scope, $firebaseArray, $timeout) {
        var ref = firebase.database().ref("chats");
        $scope.chatrooms = $firebaseArray(ref);
        $scope.members = $firebaseArray(firebase.database().ref("members"));
        $scope.user = null;
        $scope.userID = "";
        $scope.msg = "";
        $scope.currentConversation = null;
        $scope.readableTime = Utils.getDateAndTimeString;
        var lastPos = 0;

        function record(_sender, _message) {
            this.sender = _sender;
            this.message = _message;
            this.time = new Date().toUTCString();
        }

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                $scope.user = user;
                $scope.members.$loaded().then(function () {
                    angular.forEach($scope.members, function (e) {
                        if (e.uid == $scope.user.uid)
                            $scope.userID = e.id;
                    });
                });
            } else {
                // No user is signed in.
                showLoginDialog();
            }
        });

        function scrolling() {
            scrollToBottom();
            if ($("#left-top-panel").scrollTop() != lastPos) {
                lastPos = $("#left-top-panel").scrollTop();
                if (lastPos > 0)
                    return;
            }
            $timeout(scrolling, 200);
        }
        scrolling();

        $scope.getNameByID = function (id) {
            for (var i = 0; i < $scope.members.length; i++)
                if ($scope.members[i].id == id)
                    return $scope.members[i].first_name;
        }

        $scope.send = function () {
            $scope.user = firebase.auth().currentUser;
            if (!$scope.user || !$scope.currentConversation || $scope.msg == "")
                return;

            $scope.chatrooms.$loaded().then(function () {
                var m = new record($scope.userID, $scope.msg);

                for (var i = 0; i < $scope.chatrooms.length; i++) {
                    if ($scope.chatrooms[i].list.length != $scope.currentConversation.list.length)
                        continue;
                    var exist = true;
                    for (var j = 0; j < $scope.chatrooms[i].list.length; j++)
                        exist &= Utils.arrayContains($scope.chatrooms[i].list[j], $scope.currentConversation.list);
                    if (exist) {
                        $scope.chatrooms.$ref().child(i).child("messages").child($scope.chatrooms[i].messages.length).set(m);
                        break;
                    }
                }
                $scope.msg = "";
                $("#left-bottom-panel input[type='text']").focus();
                scrolling();
            });
        };

        $scope.createConversation = function () {
            $scope.user = firebase.auth().currentUser;
            if (!$scope.user)
                return;

            $scope.chatrooms.$loaded().then(function () {
                $scope.members.$loaded().then(function () {
                    var list1 = prompt("Please input the IDs you want to add into the group.\nSplit the IDs with comma (e.g. ID_1, ID_2)");
                    var name1 = prompt("Please input a name for the chat group.");
                    list1 = list1.split(" ").join("");
                    list1 = list1.split(",");
                    list1.push($scope.userID);

                    var alreadyExist = false;
                    for (var i = 0; i < $scope.chatrooms.length && !alreadyExist; i++) {
                        if ($scope.chatrooms[i].list.length != list1.length)
                            continue;
                        var exist = true;
                        for (var j = 0; j < $scope.chatrooms[i].list.length; j++)
                            exist &= Utils.arrayContains($scope.chatrooms[i].list[j], list1);
                        if (exist)
                            alreadyExist = true;
                    }

                    var tempCount = 0;
                    for (var i = 0; i < $scope.members.length; i++) {
                        if (Utils.arrayContains($scope.members[i].id, list1))
                            tempCount++;
                    }

                    if (tempCount < list1.length)
                        alert("At least one of the IDs is not valid!");
                    else if (alreadyExist)
                        alert("This conversation has already exist!");
                    else {
                        var obj = {
                            name: name1,
                            list: list1,
                            messages: [{
                                sender: "System",
                                message: "Welcome to this new chat group!",
                                time: new Date().toUTCString()
                            }]
                        };
                        $scope.chatrooms.$ref().child($scope.chatrooms.length).set(obj);
                    }
                });
            });
        }

        $scope.showConversation = function (conversation) {
            $scope.currentConversation = conversation;
        };
    }
);

function showLoginDialog() {
    $("#loginDialog").removeClass("hide");
}

function hideLoginDialog() {
    $("#loginDialog").addClass("hide");
}

function scrollToBottom() {
    $("#left-top-panel").scrollTop($("#left-top-panel")[0].scrollHeight);
}

$(document).ready(function () {
    $("#left-bottom-panel input[type='text']").keypress(function (event) {
        if (event.which == 13)
            $("#left-bottom-panel input[type='button']").click();
    });
});