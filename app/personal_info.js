// var app = angular.module("personal_info", ["firebase"]);

// app.factory("userInformation", ["$firebaseArray",
// 	function($firebaseArray){
//         var ref = new Firebase("https://comp3111-bb108.firebaseio.com/")

//         return $firebaseArray(ref);
//     }
// )

app.controller ("userInformationControl", ["$scope","$firebaseArray", "Auth","$rootScope",
    function writeUserData($rootScope, fname, oname, email, college, education, skills, contact ){
        firebase.database().ref('users/' + $rootScopt.id).set({
            userid: $rootscope.id,
            fullname: fname,
            nickname: oname,
            emailaddress: email,
            collegename: college,
            currenteducation: education,
            itskills: skills,
            personalcontact: contact
        });
               

    // Get a key for a new user information
    var newPostKey = firebase.database().ref().child('').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['userInformation' + newPostKey] = postData;

    return firebase.database().ref().update(updates);         
    }         
]);
/*              
Username
Account Create date
Full name
Nickname
Email
College
Education
Joined Team
Skills
Personal Contact*/
