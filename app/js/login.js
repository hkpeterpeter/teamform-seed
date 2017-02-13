app.controller("loginController",


    function($scope, Auth, $firebaseArray, $firebaseObject, $window) {


        $scope.input = {
            name: "",
            pwd: ""
        }
        $scope.profile_info = {};
        $scope.profile_info.tags = {
            "LanguageTags":{
                "Cantonese": false,
                "English": false,
                "German": false,
                "Japanese": false,
                "Korean": false,
                "Mandarin": false,
                "Spanish": false
            },
            "MannerTags":{
                "Cool":false,
                "Creative":false,
                "OnCampus":false,
                "Outgoing":false,
                "Pretty":false,
                "SleepLate":false,
                "Thoughtful":false
            },
            "SkillTags":{
                "C" : 0,
                "Cpp" : 0,
                "CSS": 0,
                "FLEX": 0,
                "HTML": 0,
                "Java": 0,
                "JavaScript": 0,
                "Objective_C": 0,
                "PHP": 0,
                "Python": 0,
                "SML": 0,
                "SQL": 0,
            }
        };

        Auth.$onAuthStateChanged(function(authData) {
            //$scope.authData = authData;

            if (authData) {
                console.log(authData.uid);
                $window.location.href = '/#/dashboard/home';
            } else console.log("signed out");
        });

        $scope.signedIn = function() {
            return $scope.authData != null;
        };

        $scope.login = function() {
            if ($scope.input.name != undefined && $scope.input.pwd != undefined) {
                console.log('in');
                Auth.$signInWithEmailAndPassword(
                    $scope.input.name,
                    $scope.input.pwd
                ).then(function(authData) {
                    console.log("Logged in as:", authData);
                }).catch(function(error) {
                    console.log("Authentication failed:", error);
                    $window.alert(error);
                });
            } else {
                $window.alert("Missing required fields!");
            }

        };

        $scope.facebookLogin = function() {
            Auth.$signInWithPopup("facebook").then(function(result) {
                console.log("Signed in as:", result.user.uid);
                var ref = firebase.database().ref("users/" + result.user.uid + "/readOnly");
                ref.update({
                    email: result.user.email,
                    name: result.user.displayName
                }).then(function(){
                    firebase.database().ref("users/" + result.user.uid + "/readOnly/info")
                    .once('value').then(function(snapshot){
                        if (!snapshot.hasChild("tags")){
                            firebase.database().ref("users/" + result.user.uid + "/readOnly/info")
                            .update($scope.profile_info);
                        }
                    });
                });


                // ref = firebase.database().ref("users/" + userData.uid + "/writable");
                // var wirteObj = $firebaseObject(ref);
                // wirteObj

                var key = null;
                ref = firebase.database().ref("users/uidList");
                var uidlistObj = $firebaseArray(ref);
                uidlistObj.$loaded().then(function(uidlistObj) {
                    //console.log(uidlistObj.length);
                    for (var i = 0; i < uidlistObj.length; i++) {
                        //console.log(uidlistObj[i],' ', result.user.uid);
                        if (uidlistObj[i].$value == result.user.uid) key = i;
                    }
                    if (key == null) uidlistObj.$add(result.user.uid);
                });



                ref = firebase.database().ref("users/nameList");
                // var namelistObj = $firebaseObject(ref);
                var dict = {};
                dict[result.user.displayName] = result.user.uid;
                ref.update(dict);
            }).catch(function(error) {
                console.error("Authentication failed:", error);
                $window.alert(error);
            });
        };

        $scope.logout = function() {
            Auth.$signOut().then(function() {
                console.log("Logged out");
            }).catch(function(error) {
                console.log(error);
            });
        };

    }

);

app.controller("signupCtrl",

    function($scope, Auth, $firebaseArray, $firebaseObject, $window) {


        $scope.input = {
            email: "",
            name: "",
            pwd: ""
        }

        $scope.profile_info = {};
        $scope.profile_info.tags = {
            "LanguageTags":{
                "Cantonese": false,
                "English": false,
                "German": false,
                "Japanese": false,
                "Korean": false,
                "Mandarin": false,
                "Spanish": false
            },
            "MannerTags":{
                "Cool":false,
                "Creative":false,
                "OnCampus":false,
                "Outgoing":false,
                "Pretty":false,
                "SleepLate":false,
                "Thoughtful":false
            },
            "SkillTags":{
                "C" : 0,
                "Cpp" : 0,
                "CSS": 0,
                "FLEX": 0,
                "HTML": 0,
                "Java": 0,
                "JavaScript": 0,
                "Objective_C": 0,
                "PHP": 0,
                "Python": 0,
                "SML": 0,
                "SQL": 0,
            }
        };
        console.log($scope.profile_info);


        Auth.$onAuthStateChanged(function(authData) {
            //$scope.authData = authData;

            if (authData) {
                console.log(authData);
                $window.location.href = '/#/dashboard/home';
            } else console.log("signed out");
        });


        $scope.register = function() {
            if ($scope.input.email != undefined && $scope.input.pwd != undefined && $scope.input.name != "") {
                Auth.$createUserWithEmailAndPassword($scope.input.email, $scope.input.pwd)
                    .then(function(userData) {
                        console.log(userData.uid);
                        var ref = firebase.database().ref("users/" + userData.uid + "/readOnly");
                        var readonlyObj = $firebaseObject(ref);
                        readonlyObj.$loaded().then(function(){
                            readonlyObj.email = userData.email;
                            readonlyObj.name = $scope.input.name;
                            readonlyObj.info = $scope.profile_info;
                            readonlyObj.$save();                            
                        });


                        // ref = firebase.database().ref("users/" + userData.uid + "/writable");
                        // var wirteObj = $firebaseObject(ref);
                        // wirteObj


                        ref = firebase.database().ref("users/uidList");
                        var uidlistObj = $firebaseArray(ref);
                        //console.log(uidlistObj);
                        uidlistObj.$loaded().then(function(){
                            uidlistObj.$add(userData.uid);
                        })

                ref = firebase.database().ref("users/nameList");
                // var namelistObj = $firebaseObject(ref);
                var dict = {};
                dict[$scope.input.name] = userData.uid;
                ref.update(dict);
                // // namelistObj.$add(dict);

                // namelistObj[$scope.input.name] = userData.uid;
                // console.log(namelistObj);
                // namelistObj.$save();
                    }).catch(function(error) {
                        $window.alert(error);
                    });
            } else {
                $window.alert("Missing required fields!");
            }
        };

    }
);
