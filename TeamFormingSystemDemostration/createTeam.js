app.controller("teamSubmit",

    function($scope, $firebaseArray) {

        $scope.input = {
            event: "",
            name: "",
            intro: "",
            holder: "",
            state: false,
            teamleader: "",
            member: ""
        };

        var ref = firebase.database().ref("events");

        $scope.submit = function() {

            if ($scope.input.name !== "" && $scope.input.intro !== "") {
                $scope.input.state = true;
                $scope.input.holder = 1;
                $scope.team = {
                    name: "",
                    intro: "",
                    teamleader: "",
                    openness: true,
                    member: "",
                    numberOfmember: 0
                };

                var eventRef = firebase.database().ref("events");
                var memberNoTeamRef = firebase.database().ref("memberWithNoTeam");
                $scope.team.teamleader = firebase.auth().currentUser.uid;
                $scope.team.name = $scope.input.name;
                $scope.team.intro = $scope.input.intro;
                childRef = ref.child($scope.input.event);
                ref.orderByChild("name").equalTo($scope.input.event).once("child_added", function(location) {
                    location.child("Team").ref.push().set($scope.team);

                    ////
                    memberNoTeamRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once("child_added",
                        function(oldLocation) {
                            movingMember = oldLocation.val();
                            location.ref.child("Team").orderByChild("name").equalTo($scope.team.name).once("child_added", function(newLocation) {
                                newLocation.child("member").ref.push().set(movingMember);
                                newLocation.ref.update({
                                    numberOfmember: newLocation.val().numberOfmember + 1
                                });
                                oldLocation.ref.remove();
                                window.alert("Create team success!");

                            });

                        });
                    ////         

                });


                $scope.input.event = "";
                $scope.input.intro1 = "";
                $scope.input.name1 = "";

                $scope.input.intro = "";
                $scope.input.name = "";



            }



        };
        $scope.createFreeTeam = function() {
console.log("ggg");
            if ($scope.input.name1 !== "" && $scope.input.intro1 !== "") {
                $scope.input.state = true;
                $scope.input.holder = 1;
                $scope.team = {
                    name: "",
                    intro: "",
                    teamleader: "",
                    openness: true,
                    member: "",
                    numberOfmember: 0
                };

                var Ref = firebase.database().ref("TeamWithNoEvent");
                var memberNoTeamRef = firebase.database().ref("memberWithNoTeam");
                $scope.team.teamleader = firebase.auth().currentUser.uid;
                $scope.team.name = $scope.input.name1;
                $scope.team.intro = $scope.input.intro1;
                Ref.push().set($scope.team);
                console.log("ggg");

                    ////
                memberNoTeamRef.orderByChild("uid").equalTo(firebase.auth().currentUser.uid).once("child_added",
                    function(oldLocation) {
                        movingMember = oldLocation.val();
                        Ref.ref.orderByChild("name").equalTo($scope.team.name).once("child_added", function(newLocation) {
                            newLocation.child("member").ref.push().set(movingMember);
                            newLocation.ref.update({
                                numberOfmember: newLocation.val().numberOfmember + 1
                            });
                            oldLocation.ref.remove();
                            window.alert("Create team success!");

                        });

                    ////         

                });

                $scope.input.event = "";
                $scope.input.intro1 = "";
                $scope.input.name1 = "";

                $scope.input.intro = "";
                $scope.input.name = "";



            }



        };

    }


);