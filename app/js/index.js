angular.module('teamform-index-app', ['firebase'])
.controller('IndexCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function ($scope, $firebaseObject, $firebaseArray) {

    // TODO: implementation of MemberCtrl


    // Call Firebase initialization code defined in site.js
    initializeFirebase();
    $scope.eventID = "";

  ;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            $scope.$apply($scope.logined = true);
            $scope.$apply($scope.username = user.displayName);
            $scope.$apply($scope.uid = user.uid);
            if ($scope.username == null) { $scope.$apply($scope.fb = false); $scope.$apply($scope.username = user.email); } else { $scope.$apply($scope.fb = true); };
        } else {
            // No user is signed in.
        }
    });
    $scope.info = {
        "major": '',
        "native": '',
        "hall": '',
        "name": $scope.username
        }
    $scope.btn_fb = function () {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // ...
                $scope.$apply($scope.username = result.user.displayName);
                $scope.$apply($scope.logined = true);
            // The signed-in user info.
                
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    $scope.btn_admin = function() {
        var val = $scope.eventID;
        if (val !== '') {
            var url = "admin.html?q=" + val;
            window.location.href = url;
            //return false;
        }
    }

    $scope.btn_logout = function () {
        if ($scope.logined) {
            firebase.auth().signOut().then(function () {
                // Sign-out successful.
                $scope.$apply($scope.logined=false);
            }, function (error) {
                // An error happened.
            });
        }
    }

    $scope.btn_email = function () {
       window.location.href = "signin.html";
    }

    $scope.btn_leader = function() {
        var val = $scope.eventID;
        if (val !== '') {
            var url = "team.html?q=" + val;
            window.location.href = url;
            //return false;
        }
    }

    $scope.btn_member = function() {
        var val = $scope.eventID;
        if (val !== '') {
            var url = "member.html?q=" + val;
            window.location.href = url;
            //return false;
        }
    }
    $scope.btn_enter = function (eventId) {
        var val = eventId;
        if (val !== '') {
            var url;
            if ($scope.fb) { url = "member.html?q=" + val; } else { url = "admin.html?q=" + val; };
            window.location.href = url;
            //return false;
        }
    }

    $scope.refreshEvents = function () {
        var ref = firebase.database().ref("event/");

        // Link and sync a firebase object
       /* $scope.selection = [];
        $scope.toggleSelection = function (item) {
            var idx = $scope.selection.indexOf(item);
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            }
            else {
                $scope.selection.push(item);
            }
        }*/


        $scope.events = $firebaseArray(ref);
        $scope.events.$loaded()
			.then(function (data) {



			})
			.catch(function (error) {
			    // Database connection error handling...
			    //console.error("Error:", error);
			});


    }
   $scope.btn_save = function () {
        if ($scope.uid !== '') {

                var refPath = "info/" + $scope.uid;
                var ref = firebase.database().ref(refPath);


                // for each team members, clear the selection in /[eventName]/team/




                ref.set($scope.info, function () {

                    // console.log("Success..");

                    // Finally, go back to the front-end
                    window.location.href= "index.html";
                });



        }


    }

    $scope.loadFunc = function () {
        if ($scope.uid !== '') {
            var refPath = "info/" + $scope.uid;
            retrieveOnceFirebase(firebase, refPath, function (data) {
                if (data.child("major").val() != null) {

                    $scope.info.major = data.child("major").val();

                    $scope.refreshViewRequestsReceived();


                }

                if (data.child("native").val() != null) {

                    $scope.info.native = data.child("native").val();



                }
                if (data.child("hall").val() != null) {

                    $scope.info.hall = data.child("hall").val();



                }

                $scope.$apply(); // force to refresh
            });
        }
    }
    if ($scope.uid != undefined) { $scope.loadFunc() };
    $scope.refreshEvents(); // call to refresh teams...
}]);