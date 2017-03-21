angular.module('teamform-index-app', ['firebase'])
.controller('IndexCtrl', ['$scope', '$firebaseObject', '$firebaseArray','$window', function($scope, $firebaseObject, $firebaseArray,$window) {
    
    initalizeFirebase();

    var eventRef, refPath;

    refPath = "/event/"
    eventRef = firebase.database().ref(refPath);
    $scope.events = [];
    $scope.events = $firebaseArray(eventRef);

    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var userPath = "/user/" + user.uid;
        var userref = firebase.database().ref(userPath);
        $scope.userObj = $firebaseObject(userref);
    } else {
    

    // No user is signed in.
    }
    });


    $scope.viewevent = function(eventname) {
        // Finally, go back to the front-end
        if(eventname != 'null')
        {
            window.location.href= "event.html?q=" + eventname;
            return true;
            
        }
        else
        {
            return false;
        }


    }


    //Logout
    $scope.logout = function(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("Sign-out successful");
    $window.alert("You are signed-out");
    window.location.href= "index.html";
    return true;
    }, function(error) {
     // An error happened.
    console.log("Sign-out unsuccessful");
    return false;
    });
};

}]);
