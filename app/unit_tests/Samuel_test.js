/**
 * Created by Samuel on 15/11/2016.
 */
describe('dashboardController', function () {

    beforeEach(module('teamapp', 'firebase'));

    var $controller, $scope, $firebaseArray, $firebaseObject, $q, $rootScope;
    var ctrl, deferred;

    beforeEach(inject(function (_$controller_, _$rootScope_, _$firebaseObject_,_$firebaseArray_) {
        //scope = _$rootScope_.$new();
        $controller = _$controller_;
        $firebaseArray = _$firebaseArray_;
        $firebaseObject = _$firebaseObject_;
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        // $q = _$q_;
        // // deferred = _$q_.defer();
        // deferred.resolve();
        $rootScope.currentUser = {
            "$id": "-KVu4OAjfPRTsmQ_8Ict",
            "$priority": null,
            "$resolved": true,
            "email": "User4@connect.ust.hk",
            "name": "User4",
            "notifs": {
                "-KW69X9FGoxxtHzl7VTJ": {
                    "content": "You are removed from Team Fuck",
                    "eventID": "0",
                    "eventName": "+1s",
                    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
                    "read": false,
                    "receiverEmail": "abc@connect.ust.hk",
                    "senderEmail": "xzhuah@connect.ust.hk",
                    "senderName": "Xinyu",
                    "type": "System"
                },
                "-KW98hBH7GIbsai7": {
                    "accepted": "undecided",
                    "content": "You are invited to Team Elder!",
                    "eventID": "0",
                    "eventName": "+1s",
                    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
                    "read": false,
                    "receiverEmail": "abc@connect.ust.hk",
                    "senderEmail": "zzhaoah@ust.hk",
                    "senderName": "Zixuan",
                    "teamID": 0,
                    "teamName": "Undefined",
                    "type": "normal"
                },
                "-KWSjWFyJEntn3RoBp9b": {
                    "content": "A new event Event Fuck has been created",
                    "eventID": "1",
                    "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWGXo4U6CCvNItlDYFgEQz4d3T-YjLj13nqUZ-crpAr3qMPx-",
                    "read": false,
                    "type": "System"
                }
            },
            "profilePic": "http://i.stack.imgur.com/WCveg.jpg",
            "skills": ["Angular", "database", "computer"],
            "teamsApplying": [{"eventID": "0", "teamID": "0", "teamName": "Undefined"}],
            "teamsAsInvitedPeople": [null, 1, 666],
            "teamsAsMember": {"0": 777, "-KWaE8Oiq7iNf-nHKxhm": 0}
        };
    }));

    beforeEach(function () {
        ctrl = $controller('dashboardController', {$scope: $scope, $rootScope: $rootScope});
        // deferred.resolve();
        // spyOn(scope.event, '$loaded').and.returnValue(deferred.promise);
        // deferred.resolve();

    });


    describe('test receiving new skill', function () {
        it("test", function () {
            expect($rootScope.currentUser.id).toEqual("-KVu4OAjfPRTsmQ_8Ict");
        });
        it('receive not existing skill', function () {
            $scope.newSkill = "BMW";
            $scope.receiveNewSikll();
        });
        it('receive existing skill', function () {
            $scope.newSkill = "database";
            $scope.receiveNewSikll();
        });
    });
    
    // describe("test accepting/turning down invitation",function () {
    //     it("accept",function () {
    //         $rootScope.currentUser.teamsAsInvitedPeople.push(222);
    //         var index = $scope.invitedList.indexOf(222);
    //         $scope.acceptInvitation(index);
    //     });
    //     it("decline",function () {
    //         $rootScope.currentUser.teamsAsInvitedPeople.push(222);
    //         var index = $scope.invitedList.indexOf(222);
    //         $scope.turndownInvitation(index);
    //     });
    // });

    describe("test retrieving",function () {
        it("retrieve events",function () {
            expect($scope.retrieveEvents()).toEqual(true);
        });
        it("retrieve applying",function(){
           expect($scope.retrieveApplying()).toEqual(true);
        });
        it("retrieve member",function(){
            expect($scope.retrieveMember()).toEqual(true);
        });
        it("retrieve leader",function(){
            expect($scope.retrieveLeading()).toEqual(true);
        });
        it("retrieve invited",function(){
            expect($scope.retrieveInvited()).toEqual(true);
        });

    });


});